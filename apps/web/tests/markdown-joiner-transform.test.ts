import { describe, expect, test } from "bun:test"
import { MarkdownJoiner } from "../lib/markdown-joiner-transform"

describe("MarkdownJoiner", () => {
  test("passes through plain text unchanged", () => {
    const joiner = new MarkdownJoiner()
    expect(joiner.processText("hello world")).toBe("hello world")
  })

  test("joins a complete bold span", () => {
    const joiner = new MarkdownJoiner()
    expect(joiner.processText("**bold**")).toBe("**bold**")
  })

  test("joins a bold span split across streamed chunks", () => {
    const joiner = new MarkdownJoiner()
    expect(joiner.processText("**bo")).toBe("")
    expect(joiner.processText("ld**")).toBe("**bold**")
  })

  test("joins a complete inline code block", () => {
    const joiner = new MarkdownJoiner()
    expect(joiner.processText("```js\ncode\n```")).toBe("```js\ncode\n```")
  })

  test("joins a complete unordered list item", () => {
    const joiner = new MarkdownJoiner()
    expect(joiner.processText("- item one")).toBe("- item one")
  })

  test("joins a complete ordered list item", () => {
    const joiner = new MarkdownJoiner()
    expect(joiner.processText("1. item one")).toBe("1. item one")
  })

  test("joins a complete todo list item", () => {
    const joiner = new MarkdownJoiner()
    expect(joiner.processText("- [x] done")).toBe("- [x] done")
  })

  test("joins a complete link", () => {
    const joiner = new MarkdownJoiner()
    expect(joiner.processText("[text](https://example.com)")).toBe(
      "[text](https://example.com)"
    )
  })

  test("joins a complete mdx tag", () => {
    const joiner = new MarkdownJoiner()
    expect(joiner.processText("<Callout>")).toBe("<Callout>")
  })

  test("flush returns and clears any buffered remainder", () => {
    const joiner = new MarkdownJoiner()
    // "**bo" leaves an incomplete bold buffered
    expect(joiner.processText("**bo")).toBe("")
    expect(joiner.flush()).toBe("**bo")
    expect(joiner.flush()).toBe("")
  })

  test("streams a multi-line markdown table", () => {
    const joiner = new MarkdownJoiner()
    // Each row must end with a newline for the stream buffer to flush it.
    const table = "| a | b |\n|---|---|\n| 1 | 2 |\n"
    expect(joiner.processText(table)).toBe(table)
  })

  test("flushes a long unclosed bold span as raw text (false positive)", () => {
    const joiner = new MarkdownJoiner()
    const longText = "**this line exceeds thirty characters so it can never be bold"
    // Once the buffer grows beyond 30 chars without a closing "**", it is
    // treated as a false positive and flushed as raw text.
    expect(joiner.processText(longText)).toBe(longText)
  })

  test("treats a long bold span as a false positive (flushes as raw text)", () => {
    const joiner = new MarkdownJoiner()
    const text = "**this is a legitimately long bold span that closes correctly**"
    const processed = joiner.processText(text)
    // Once the buffer grows past 30 chars the false-positive heuristic flushes
    // it as raw text before the closing "**" arrives, which then stays buffered.
    expect(processed.endsWith("correctly")).toBe(true)
    expect(processed).toBe("**this is a legitimately long bold span that closes correctly")
    expect(joiner.flush()).toBe("**")
  })
})
