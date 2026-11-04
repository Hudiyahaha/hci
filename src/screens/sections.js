// The information sections around the hub.
import { actions, backToTimeline, fact, heading } from "../components.js";
import { esc } from "../lib/escape.js";

export function gettingStartedScreen({ data }) {
  return {
    title: "Getting started",
    html: heading("Getting started") +
      '<p class="muted">Understanding the service and beginning the process.</p>' +
      ["understanding", "whoCanUse", "howToContact", "infoNeeded"].map((key) => fact(data, key)).join("") +
      actions(backToTimeline())
  };
}

export function costsScreen({ data }) {
  return {
    title: "Costs and commitment",
    html: heading("Costs and commitment") +
      `<p class="muted">${esc(data.serviceName)}. Last checked: ${esc(data.lastChecked || "Not yet verified")}.</p>` +
      ["firstCost", "additionalCost", "freeOptions", "moreThanOne", "pauseOrStop"].map((key) => fact(data, key)).join("") +
      actions(backToTimeline())
  };
}

export function privacyScreen({ data }) {
  return {
    title: "Privacy and confidentiality",
    html: heading("Privacy and confidentiality") +
      `<p class="muted">${esc(data.serviceName)}. Last checked: ${esc(data.lastChecked || "Not yet verified")}.</p>` +
      ["whoCanAccess", "howConfidential", "confidentialityLimits"].map((key) => fact(data, key)).join("") +
      actions(backToTimeline())
  };
}
