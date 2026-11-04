// Shared pieces of markup. One styled version of each recurring component.
import { esc } from "./lib/escape.js";
import { STAGES } from "./content/structure.js";

export const heading = (text) => `<h1 tabindex="-1">${esc(text)}</h1>`;

export const buttonLink = (href, label, primary = false) =>
  `<a class="btn${primary ? " btn-primary" : ""}" href="${href}">${esc(label)}</a>`;

export const backToTimeline = () => buttonLink("#journey", "Back to timeline");

export const actions = (...items) => `<div class="actions">${items.join("")}</div>`;

// One fact from the service. Placeholder text carries a "Sample" label.
// Facts with no value show "Not confirmed" in a dashed box.
export function fact(data, key, { strong = false, label, extra = "" } = {}) {
  const item = data.facts[key];
  const known = item.value !== null;
  const kind = strong ? "box-strong" : known ? "" : "box-dashed";
  const tag = item.sample ? '<p class="sample-tag">Sample</p>' : "";
  return `<section class="box ${kind}"><h2>${esc(label || item.label)}</h2>${tag}` +
    `<p${known ? "" : ' class="not-confirmed"'}>${esc(known ? item.value : "Not confirmed")}</p>${extra}</section>`;
}

export function timeline(activeId) {
  const items = STAGES.map((stage, index) => {
    const current = stage.id === activeId ? ' aria-current="step"' : "";
    const arrow = index < STAGES.length - 1 ? '<span aria-hidden="true">&rarr;</span>' : "";
    return `<li><a href="${stage.href}"${current}>${esc(stage.name)}</a>${arrow}</li>`;
  }).join("");
  return `<nav aria-label="Stages after you get in touch"><ol class="timeline" role="list">${items}</ol></nav>`;
}
