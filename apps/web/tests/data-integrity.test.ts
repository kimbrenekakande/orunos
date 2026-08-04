import { describe, expect, test } from "bun:test"
import { templates } from "@/lib/templates"
import { features } from "@/lib/features"
import { items } from "@/lib/items_list"
import { flipper_words } from "@/lib/data/words"
import { rules } from "@/lib/ai/rules"

describe("templates", () => {
  const types = templates.map((t) => t.type)

  test("is a non-empty array", () => {
    expect(templates.length).toBeGreaterThan(0)
  })

  test("every template has a name, type, and image path", () => {
    for (const t of templates) {
      expect(t.name).toBeTruthy()
      expect(t.type).toBeTruthy()
      expect(t.image).toMatch(/^\//)
    }
  })

  test("document types are unique", () => {
    expect(new Set(types).size).toBe(types.length)
  })

  test("ready flag is always a boolean", () => {
    for (const t of templates) expect(typeof t.ready).toBe("boolean")
  })
})

describe("features", () => {
  const ids = features.map((f) => f.id)

  test("every feature has all required fields", () => {
    for (const f of features) {
      expect(f.title).toBeTruthy()
      expect(f.subtitle).toBeTruthy()
      expect(f.description).toBeTruthy()
      expect(f.url).toBeTruthy()
      expect(f.imageUrl).toMatch(/^\//)
    }
  })

  test("feature ids are unique", () => {
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe("items", () => {
  test("every item has a label and a non-empty links array", () => {
    for (const item of items) {
      expect(item.label).toBeTruthy()
      expect(item.links.length).toBeGreaterThan(0)
    }
  })

  test("every link has a label and href", () => {
    for (const item of items) {
      for (const link of item.links) {
        expect(link.label).toBeTruthy()
        expect(link.href).toBeTruthy()
      }
    }
  })
})

describe("flipper_words", () => {
  test("contains the expected words in order", () => {
    expect(flipper_words).toEqual(["Coursework", "Dissertation", "Research", "Papers"])
  })

  test("all words are non-empty strings", () => {
    for (const word of flipper_words) {
      expect(typeof word).toBe("string")
      expect(word.length).toBeGreaterThan(0)
    }
  })
})

describe("rules", () => {
  test("is a non-empty string", () => {
    expect(typeof rules).toBe("string")
    expect(rules.length).toBeGreaterThan(0)
  })

  test("calls out the explicitly banned AI output phrases", () => {
    for (const phrase of ["This response", "This answer", "This output"]) {
      expect(rules).toContain(phrase)
    }
  })

  test("mentions avoiding em dashes, asterisks, and hyphens", () => {
    expect(rules).toMatch(/[Ee]m dashes/)
    expect(rules).toMatch(/[Aa]sterisks/)
    expect(rules).toMatch(/[Hh]yphens/)
  })
})
