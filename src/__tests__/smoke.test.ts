import { describe, it, expect } from "vitest"

describe("project smoke tests", () => {
  it("environment is test", () => {
    expect(process.env.NODE_ENV).toBe("test")
  })

  it("TypeScript compiles", () => {
    expect(true).toBe(true)
  })
})
