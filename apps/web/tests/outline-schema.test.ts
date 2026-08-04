import { describe, expect, test } from "bun:test"
import { outlineSchema } from "@/lib/types"

const validOutline = {
  id: "doc-1",
  title: "A Valid Document Title",
  hasRefs: true,
  sections: [
    { title: "Introduction", content: "Explain the research problem" },
    { title: "Literature Review", content: "Summarize prior work" },
  ],
  references: ["Author, A. (2024). Some paper.", "Author, B. (2023). Another one."],
}

describe("outlineSchema", () => {
  test("accepts a valid outline", () => {
    expect(outlineSchema.safeParse(validOutline).success).toBe(true)
  })

  test("accepts an outline without references", () => {
    const outline = { ...validOutline, hasRefs: false, references: [] }
    expect(outlineSchema.safeParse(outline).success).toBe(true)
  })

  test("accepts a single-section outline", () => {
    const outline = { ...validOutline, sections: validOutline.sections.slice(0, 1) }
    expect(outlineSchema.safeParse(outline).success).toBe(true)
  })

  test("rejects when id is missing", () => {
    const { id: _id, ...rest } = validOutline
    expect(outlineSchema.safeParse(rest).success).toBe(false)
  })

  test("rejects when title is not a string", () => {
    expect(
      outlineSchema.safeParse({ ...validOutline, title: 123 }).success
    ).toBe(false)
  })

  test("rejects when hasRefs is not a boolean", () => {
    expect(
      outlineSchema.safeParse({ ...validOutline, hasRefs: "yes" }).success
    ).toBe(false)
  })

  test("rejects when sections is missing or not an array", () => {
    expect(outlineSchema.safeParse({ ...validOutline, sections: undefined }).success).toBe(false)
    expect(outlineSchema.safeParse({ ...validOutline, sections: "intro" }).success).toBe(false)
  })

  test("rejects a section missing its content field", () => {
    const bad = {
      ...validOutline,
      sections: [{ title: "Intro" }],
    }
    expect(outlineSchema.safeParse(bad).success).toBe(false)
  })

  test("rejects when references is not an array of strings", () => {
    expect(
      outlineSchema.safeParse({ ...validOutline, references: [1, 2] }).success
    ).toBe(false)
  })
})
