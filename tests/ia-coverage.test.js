// Checks the prototype against the information architecture submitted in D4 Part A.
import { describe, expect, it } from "vitest";
import { SERVICE_DATA } from "../src/content/service-data.js";
import { screenForHash } from "../src/router.js";

const context = { data: SERVICE_DATA, state: { selected: [], custom: "", message: "" } };
const html = (hash) => screenForHash(hash, context).html;

const CARDS_BY_SCREEN = {
  "#journey/reply": [
    "What happens after making contact?",
    "Waiting for a response"
  ],
  "#journey/first-appointment": [
    "What happens during the first appointment?",
    "What questions might the counsellor ask?",
    "What should I prepare before the appointment?",
    "How long does the first appointment take?"
  ],
  "#getting-started": [
    "Understanding counselling",
    "Who can use counselling services?",
    "How to contact the counselling service",
    "What information is needed when contacting the service?"
  ],
  "#costs": [
    "Cost of the first appointment",
    "Cost of additional appointments",
    "Are free support options available?",
    "Is attending more than one appointment compulsory?",
    "Can I pause or stop counselling?"
  ],
  "#privacy": [
    "Who can access my counselling information?",
    "How is my information kept confidential?",
    "When might confidentiality have limits?"
  ],
  "#decision": [
    "What are my possible next steps?",
    "Can I decide not to continue?",
    "Where can I find further support?"
  ],
  "#questions": [
    "Questions to ask before contacting the service",
    "Questions to ask about costs",
    "Questions to ask about privacy"
  ]
};

describe("information architecture", () => {
  it("accounts for all 24 cards", () => {
    expect(Object.values(CARDS_BY_SCREEN).flat()).toHaveLength(24);
  });

  for (const [hash, cards] of Object.entries(CARDS_BY_SCREEN)) {
    for (const card of cards) {
      it(`shows "${card}" on ${hash}`, () => {
        expect(html(hash)).toContain(card);
      });
    }
  }

  it("links the hub to all four sections", () => {
    const hub = html("#journey");
    for (const href of ["#getting-started", "#costs", "#privacy", "#decision"]) {
      expect(hub).toContain(`href="${href}"`);
    }
  });

  it("links every section and stage back to the hub", () => {
    for (const hash of ["#journey/reply", "#journey/first-appointment", "#getting-started", "#costs", "#privacy", "#decision", "#not-yet"]) {
      expect(html(hash)).toContain('href="#journey"');
    }
  });

  it("sends the Cost and Decide stages to their sections", () => {
    const hub = html("#journey");
    expect(hub).toMatch(/href="#costs"[^>]*>Cost</);
    expect(hub).toMatch(/href="#decision"[^>]*>Decide</);
  });

  it("labels every piece of placeholder text as a sample", () => {
    for (const fact of Object.values(SERVICE_DATA.facts).filter((item) => item.sample)) {
      expect(fact.value).toBeTruthy();
    }
    const privacy = html("#privacy");
    expect(privacy.match(/class="sample-tag">Sample</g)).toHaveLength(3);
  });

  it("keeps Not confirmed for facts with no value", () => {
    expect(html("#journey/reply")).toContain("Not confirmed");
    expect(html("#costs")).toContain("Not confirmed");
  });

  it("never uses sample text for the urgent contact", () => {
    expect(SERVICE_DATA.urgentContact).toBeNull();
    expect(html("#journey")).toContain("Urgent contact: Not confirmed");
  });

  it("falls back to the hub for an unknown address", () => {
    expect(html("#nowhere")).toContain("What happens after you get in touch?");
    expect(html("#journey/nowhere")).toContain("What happens after you get in touch?");
    expect(html("#constructor")).toContain("What happens after you get in touch?");
  });
});
