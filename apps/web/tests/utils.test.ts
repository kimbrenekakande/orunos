import { describe, expect, test } from "bun:test"
import { cn } from "../lib/utils"

describe("cn", () => {
  test("joins class names with a space", () => {
    expect(cn("a", "b", "c")).toBe("a b c")
  })

  test("returns an empty string when given nothing", () => {
    expect(cn()).toBe("")
  })

  test("filters out falsy values", () => {
    expect(cn("a", null, undefined, false, "b")).toBe("a b")
  })

  test("supports conditional objects", () => {
    expect(cn({ a: true, b: false, c: true })).toBe("a c")
  })

  test("supports nested arrays", () => {
    expect(cn(["a", ["b", "c"]])).toBe("a b c")
  })

  test("tailwind-merge dedupes conflicting classes in favor of the last", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
  })
})
