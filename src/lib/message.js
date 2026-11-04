import { QUESTION_GROUPS } from "../content/structure.js";

// Returns the message text, or "" when there is nothing to ask.
export function buildMessage(selectedIds, customQuestion) {
  const questions = QUESTION_GROUPS
    .flatMap((group) => group.questions)
    .filter((question) => selectedIds.includes(question.id))
    .map((question) => question.text);

  const custom = customQuestion.trim();
  if (custom) questions.push(custom);
  if (questions.length === 0) return "";

  return [
    "Hello,",
    "",
    "I'm not booking yet. I just have a few questions:",
    "",
    ...questions.map((question) => `- ${question}`),
    "",
    "Thank you."
  ].join("\n");
}
