// Wizard-of-Oz data source: this file stands in for a real service feed.
// Each label is the team's card wording from the information architecture.
//
// sample(label, text)  Placeholder text. It appears with a "Sample" label.
// unconfirmed(label)   Appears as "Not confirmed".
// verified(label, text) Use this only for text checked with the counselling service.
const sample = (label, value) => ({ label, value, sample: true });
const unconfirmed = (label) => ({ label, value: null });
export const verified = (label, value) => ({ label, value });

const STOP_HERE = "Decision point: can you stop here?";

export const SERVICE_DATA = {
  serviceName: "University counselling",
  lastChecked: null, // Set this only after checking facts with the service, as in "4 November 2026"
  urgentContact: null, // Add only a verified urgent support contact, as text. Never use sample text here.
  facts: {
    // Getting Started (cards 1 to 4)
    understanding: sample("Understanding counselling", "Counselling is a private conversation with a trained professional about anything affecting your wellbeing or studies. You don't need a diagnosis to go."),
    whoCanUse: sample("Who can use counselling services?", "All currently enrolled students, at any level of study."),
    howToContact: sample("How to contact the counselling service", "Email the counselling office, or visit its reception during office hours."),
    infoNeeded: sample("What information is needed when contacting the service?", "Your name, student number and a way to reach you. You don't need to explain your reasons in your first message."),

    // The Counselling Journey (cards 5 to 10)
    afterContact: sample("What happens after making contact?", "A staff member replies to answer your questions or offer a first appointment. You can ask questions without booking."),
    waiting: unconfirmed("Waiting for a response"),
    firstAppointment: sample("What happens during the first appointment?", "You talk with a counsellor about what brought you in and what you'd like to change. Together, you discuss possible next steps."),
    counsellorQuestions: sample("What questions might the counsellor ask?", "What's been on your mind, how long it's been going on, how it affects daily life, and what you hope to get from counselling. You can choose not to answer."),
    prepare: sample("What should I prepare before the appointment?", "Nothing is required. Some students find it helpful to note a few things they'd like to talk about."),
    appointmentLength: sample("How long does the first appointment take?", "About 50 minutes."),

    // Costs and Commitment (cards 11 to 15)
    firstCost: sample("Cost of the first appointment", "Free for enrolled students."),
    additionalCost: sample("Cost of additional appointments", "Free for enrolled students, up to a set number of appointments each term."),
    freeOptions: unconfirmed("Are free support options available?"),
    moreThanOne: sample("Is attending more than one appointment compulsory?", "No. You can attend one appointment and decide from there."),
    pauseOrStop: sample("Can I pause or stop counselling?", "Yes. You can pause or stop at any time by telling the service, or by not booking again."),

    // Privacy and Confidentiality (cards 16 to 18)
    whoCanAccess: sample("Who can access my counselling information?", "Your counsellor and the office staff who manage appointments."),
    howConfidential: sample("How is my information kept confidential?", "Counselling records are kept separately from academic records. They aren't shared with teachers or family without your permission."),
    confidentialityLimits: sample("When might confidentiality have limits?", "A counsellor may need to share information if there's a serious risk of harm to you or someone else, or if the law requires it."),

    // Making My Decision (card 24; card 23 shows the pauseOrStop answer)
    furtherSupport: sample("Where can I find further support?", "The university's student support office, a doctor, or a local mental health service."),

    // Exit points on the timeline, from the selected D3 concept
    stopAfterContact: sample(STOP_HERE, "Yes. Contacting the service doesn't commit you to an appointment."),
    stopAfterAppointment: sample(STOP_HERE, "Yes. You can decide after the first appointment not to return.")
  }
};
