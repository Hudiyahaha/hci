// The hub: The Counselling Journey timeline and its stage details.
import { actions, backToTimeline, buttonLink, fact, heading, timeline } from "../components.js";
import { SECTIONS, STAGE_DETAILS } from "../content/structure.js";
import { esc } from "../lib/escape.js";

export function journeyScreen({ data }) {
  const urgent = data.urgentContact
    ? `Need help right now? ${esc(data.urgentContact)}`
    : "Need help right now? Urgent contact: Not confirmed. If you're in immediate danger, call your local emergency number.";

  const topics = SECTIONS.map((section) =>
    `<li><a class="choice" href="${section.href}"><strong>${esc(section.name)}</strong>${esc(section.summary)}</a></li>`
  ).join("");

  return {
    title: "Timeline",
    html: heading("What happens after you get in touch?") +
      '<p class="muted">Private page. No account needed.</p>' +
      timeline() +
      '<p class="muted">Select any stage to see details.</p>' +
      '<section aria-labelledby="topics-heading">' +
      '<h2 id="topics-heading" class="section-heading">Explore by topic</h2>' +
      `<ul class="plain-list" role="list">${topics}</ul></section>` +
      `<p class="muted">${urgent}</p>`
  };
}

export function stageScreen({ data }, stageId) {
  const stage = STAGE_DETAILS[stageId];
  if (!stage) return journeyScreen({ data });

  const stageNav = stageId === "reply"
    ? buttonLink("#journey/first-appointment", "Next stage", true)
    : buttonLink("#journey/reply", "Previous stage");

  return {
    title: stage.name,
    html: heading(stage.name) +
      timeline(stageId) +
      stage.facts.map((key) => fact(data, key)).join("") +
      fact(data, stage.decision, { strong: true }) +
      actions(stageNav, backToTimeline())
  };
}
