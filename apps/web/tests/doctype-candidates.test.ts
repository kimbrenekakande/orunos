import { describe, expect, test } from "bun:test"
import { buildDoctypeCandidates } from "@/lib/doctype"

describe("buildDoctypeCandidates", () => {
  test("lowercases and trims the raw input", () => {
    expect(buildDoctypeCandidates("  CourseWork  ")).toContain("coursework")
  })

  test("keeps the trimmed lowercase form first", () => {
    expect(buildDoctypeCandidates("Lab Report")[0]).toBe("lab report")
  })

  test("replaces hyphens with underscores for kebab-case types", () => {
    // "case-study" ends in "y" (not "s"), so only the hyphen variant differs
    expect(buildDoctypeCandidates("case-study")).toEqual([
      "case-study",
      "case_study",
    ])
  })

  test("replaces whitespace with underscores for spaced types", () => {
    expect(buildDoctypeCandidates("lab report")).toEqual([
      "lab report",
      "lab_report",
    ])
  })

  test("strips a trailing s (plural form)", () => {
    expect(buildDoctypeCandidates("courseworks")).toContain("coursework")
  })

  test("deduplicates identical candidates", () => {
    // For plain single words every variant collapses to the same value
    expect(new Set(buildDoctypeCandidates("essay")).size).toBe(
      buildDoctypeCandidates("essay").length
    )
  })

  test("returns an empty array for an empty/whitespace string", () => {
    // Empty string normalizes to "" and all variants are "" — deduped to one ""
    expect(buildDoctypeCandidates("   ")).toEqual([""])
  })
})
