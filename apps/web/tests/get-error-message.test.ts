import { describe, expect, test } from "bun:test"
import { z } from "zod"
import { getErrorMessage } from "@/hooks/use-upload-file"

describe("getErrorMessage", () => {
  const fallback = "Something went wrong, please try again later."

  test("returns the message of a plain Error", () => {
    expect(getErrorMessage(new Error("boom"))).toBe("boom")
  })

  test("returns a single ZodError issue message", () => {
    const result = z.string().min(5, "Too short").safeParse("abc")
    if (result.success) throw new Error("expected parse to fail")
    expect(getErrorMessage(result.error)).toBe("Too short")
  })

  test("joins multiple ZodError issue messages with newlines", () => {
    const schema = z.object({
      a: z.string().min(2, "Name too short"),
      b: z.number().min(3, "Age too small"),
    })
    const result = schema.safeParse({ a: "x", b: 1 })
    if (result.success) throw new Error("expected parse to fail")
    expect(getErrorMessage(result.error)).toBe("Name too short\nAge too small")
  })

  test("returns fallback for an unknown/primitive value", () => {
    expect(getErrorMessage(undefined)).toBe(fallback)
    expect(getErrorMessage("just a string")).toBe(fallback)
    expect(getErrorMessage(42)).toBe(fallback)
  })
})
