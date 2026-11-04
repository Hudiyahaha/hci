// Making My Decision: next steps, the message builder and the "Not yet" option.
import { actions, backToTimeline, buttonLink, fact, heading } from "../components.js";
import { QUESTION_GROUPS } from "../content/structure.js";
import { esc } from "../lib/escape.js";

export function decisionScreen({ data }) {
  return {
    title: "Making my decision",
    html: heading("Making my decision") +
      '<p class="muted">Either choice is fine. You can change your mind.</p>' +
      '<section aria-labelledby="next-steps"><h2 id="next-steps" class="section-heading">What are my possible next steps?</h2>' +
      '<a class="choice choice-strong" href="#questions"><strong>Ask the service a few questions</strong>Not a booking</a>' +
      '<a class="choice" href="#not-yet"><strong>Not yet, come back later</strong></a></section>' +
      // Card 23 shows the same fact as card 15, so the two answers cannot disagree.
      fact(data, "pauseOrStop", {
        label: "Can I decide not to continue?",
        extra: '<p><a href="#costs">Read more in costs and commitment</a></p>'
      }) +
      fact(data, "furtherSupport") +
      actions(backToTimeline())
  };
}

export function questionsScreen({ state }) {
  const groups = QUESTION_GROUPS.map((group) => {
    const boxes = group.questions.map((question) => {
      const checked = state.selected.includes(question.id) ? " checked" : "";
      return `<div class="check"><input type="checkbox" id="q-${question.id}" data-question="${question.id}"${checked}>` +
        `<label for="q-${question.id}">${esc(question.text)}</label></div>`;
    }).join("");
    return `<fieldset aria-describedby="form-error"><legend>${esc(group.legend)}</legend>${boxes}</fieldset>`;
  }).join("");

  return {
    title: "Question prompts",
    html: heading("What do you want to ask?") +
      '<form id="question-form" novalidate>' +
      '<div id="form-error" class="form-error" role="alert"></div>' +
      groups +
      '<div class="field"><label for="custom">Write your own question (optional)</label>' +
      `<textarea id="custom" rows="3">${esc(state.custom)}</textarea></div>` +
      '<div class="actions"><button class="btn btn-primary" type="submit">Build my message</button>' +
      buttonLink("#decision", "Back") + "</div></form>"
  };
}

export function messageScreen({ state }) {
  if (!state.message) {
    return {
      title: "Your message",
      html: heading("Your message") +
        '<p class="box box-dashed">Your message will appear here.</p>' +
        '<div class="actions"><button class="btn" type="button" disabled>Copy message</button>' +
        buttonLink("#questions", "Choose your questions", true) + "</div>"
    };
  }
  return {
    title: "Your message",
    html: heading("Your message") +
      '<div class="field"><label for="message">Message to copy into your own email</label>' +
      `<textarea id="message" rows="12" readonly>${esc(state.message)}</textarea></div>` +
      '<div class="actions"><button class="btn btn-primary" type="button" data-action="copy">Copy message</button>' +
      buttonLink("#questions", "Edit questions") + "</div>" +
      '<p id="copy-status" class="status" role="status"></p>' +
      '<p class="muted">Paste it into your own email when you\'re ready, or don\'t. This page never sends anything.</p>' +
      actions(backToTimeline())
  };
}

export function notYetScreen() {
  return {
    title: "Not yet",
    html: heading("That's fine. This page will still be here.") +
      '<p class="box">Bookmark this page to come back later.</p>' +
      '<p class="box">Nothing you did here was saved.</p>' +
      actions(backToTimeline())
  };
}

export function loadFailedScreen() {
  return {
    title: "Details didn't load",
    html: heading("Couldn't load the service details") +
      '<p class="status status-error">Check your connection, then try again.</p>' +
      '<div class="actions"><button class="btn btn-primary" type="button" data-action="retry">Try again</button></div>'
  };
}
