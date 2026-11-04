import { describe, expect, it } from "vitest";
import { buildMessage } from "../src/lib/message.js";

describe("buildMessage", () => {
  it("returns nothing when no question is chosen", () => {
    expect(buildMessage([], "")).toBe("");
    expect(buildMessage([], "   ")).toBe("");
  });

  it("states that the student isn't booking", () => {
    expect(buildMessage(["parents"], "")).toContain("I'm not booking yet.");
  });

  it("keeps questions in screen order, whatever order they were ticked", () => {
    const message = buildMessage(["parents", "after-contact"], "");
    expect(message.indexOf("What happens after I get in touch?"))
      .toBeLessThan(message.indexOf("Are parents ever told?"));
  });

  it("adds the student's own question after the prompts", () => {
    const message = buildMessage(["first-cost"], "  Can I ask by email?  ");
    expect(message).toContain("- What does the first appointment cost?\n- Can I ask by email?\n");
  });

  it("works with only the student's own question", () => {
    expect(buildMessage([], "Can I ask by email?")).toContain("- Can I ask by email?");
  });
});
