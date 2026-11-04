// The hub-and-spoke structure from the information architecture.

// Stages on the timeline. Reply and First appointment open details in the journey.
// Cost and Decide open the sections the card sort assigned them to.
export const STAGES = [
  { id: "reply", name: "Reply", href: "#journey/reply" },
  { id: "first-appointment", name: "First appointment", href: "#journey/first-appointment" },
  { id: "cost", name: "Cost", href: "#costs" },
  { id: "decide", name: "Decide", href: "#decision" }
];

export const STAGE_DETAILS = {
  reply: { name: "Reply", facts: ["afterContact", "waiting"], decision: "stopAfterContact" },
  "first-appointment": {
    name: "First appointment",
    facts: ["firstAppointment", "counsellorQuestions", "prepare", "appointmentLength"],
    decision: "stopAfterAppointment"
  }
};

// The four sections around the hub, with the team's group descriptions.
export const SECTIONS = [
  { name: "Getting started", href: "#getting-started", summary: "Understanding the service and beginning the process" },
  { name: "Costs and commitment", href: "#costs", summary: "Understanding financial and ongoing commitments" },
  { name: "Privacy and confidentiality", href: "#privacy", summary: "Understanding how personal information is handled" },
  { name: "Making my decision", href: "#decision", summary: "Helping students decide what to do next" }
];

export const QUESTION_GROUPS = [
  {
    legend: "Questions to ask before contacting the service",
    questions: [
      { id: "after-contact", text: "What happens after I get in touch?" },
      { id: "reply-time", text: "How long does a reply usually take?" }
    ]
  },
  {
    legend: "Questions to ask about costs",
    questions: [
      { id: "first-cost", text: "What does the first appointment cost?" },
      { id: "commitment", text: "Does one appointment commit me to more?" }
    ]
  },
  {
    legend: "Questions to ask about privacy",
    questions: [
      { id: "who-sees", text: "Who can see my details?" },
      { id: "parents", text: "Are parents ever told?" }
    ]
  }
];
