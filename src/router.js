import { journeyScreen, stageScreen } from "./screens/journey.js";
import { costsScreen, gettingStartedScreen, privacyScreen } from "./screens/sections.js";
import { decisionScreen, messageScreen, notYetScreen, questionsScreen } from "./screens/decision.js";

const ROUTES = {
  journey: journeyScreen,
  "getting-started": gettingStartedScreen,
  costs: costsScreen,
  privacy: privacyScreen,
  decision: decisionScreen,
  questions: questionsScreen,
  message: messageScreen,
  "not-yet": notYetScreen
};

// Unknown addresses fall back to the hub.
export function screenForHash(hash, context) {
  const route = hash.replace(/^#/, "") || "journey";
  if (route.startsWith("journey/")) return stageScreen(context, route.slice("journey/".length));
  const screen = Object.hasOwn(ROUTES, route) ? ROUTES[route] : journeyScreen;
  return screen(context);
}
