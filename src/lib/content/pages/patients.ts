import type { BaseContent, Card, LinkCard, PageDef } from "@/lib/content/types";

export type PatientsContent = BaseContent & {
  cards: LinkCard[];
};

export const PATIENTS: PageDef<PatientsContent> = {
  key: "patients",
  path: "/patients",
  label: "For Patients (overview)",
  group: "Patients",
  groups: [{ label: "Cards", fields: [{ key: "cards", type: "linkCards", label: "Cards" }] }],
  defaults: {
    eyebrow: "For Patients",
    title: "A warm welcome — before you even arrive",
    subtitle:
      "We've put everything you need in one place. Here's what to expect and how to get the most out of your visit.",
    seoTitle: "For Patients — New Patient Info, What to Expect & FAQs",
    seoDescription:
      "Everything you need to know before your first visit — what to expect, FAQs and forms.",

    cards: [
      { title: "New Patient Info", body: "Forms, what to bring and how to prepare.", href: "/patients/new-patient-info" },
      { title: "What to Expect", body: "A friendly walk-through of your first visit.", href: "/patients/what-to-expect" },
      { title: "FAQs", body: "Quick answers to common questions.", href: "/patients/faqs" },
    ],
  },
};

export type NewPatientInfoContent = BaseContent & {
  quickFacts: Card[];
  accessCardTitle: string;
  beforeHeading: string;
  beforeIntro: string;
  beforeBullets: Card[];
  paymentsHeading: string;
  paymentsBody: string;
  bookingHeading: string;
  bookingBody: string;
};

export const PATIENTS_NEW_PATIENT_INFO: PageDef<NewPatientInfoContent> = {
  key: "patients-new-patient-info",
  path: "/patients/new-patient-info",
  label: "New Patient Info",
  group: "Patients",
  groups: [
    {
      label: "Quick facts",
      fields: [
        { key: "quickFacts", type: "cards", label: "Cards" },
        {
          key: "accessCardTitle",
          type: "text",
          label: "Parking & access card title (the card's contents come from each branch's access notes)",
        },
      ],
    },
    {
      label: "Before your visit",
      fields: [
        { key: "beforeHeading", type: "text", label: "Heading" },
        { key: "beforeIntro", type: "textarea", label: "Intro paragraph" },
        { key: "beforeBullets", type: "cards", label: "Bullets (title shows in bold)" },
      ],
    },
    {
      label: "Payments & booking",
      fields: [
        { key: "paymentsHeading", type: "text", label: "Payments heading" },
        { key: "paymentsBody", type: "textarea", label: "Payments paragraph" },
        { key: "bookingHeading", type: "text", label: "Booking heading" },
        { key: "bookingBody", type: "textarea", label: "Booking paragraph" },
      ],
    },
  ],
  defaults: {
    eyebrow: "For Patients",
    title: "New Patient Information",
    subtitle: "A few small things that make your first visit smooth and stress-free.",
    seoTitle: "New Patient Information — Linaw Dinig Hearing Aid Center",
    seoDescription:
      "What to bring, how long to allow, and what to expect at your first appointment with Linaw Dinig Hearing Aid Center.",

    quickFacts: [
      {
        title: "What to bring",
        body: "Doctor’s referral for hearing test (if available) and Senior Citizen or PWD ID. It also helps if you tag along a family member or friend.",
      },
      { title: "Time to allow", body: "Around 60 minutes for a full hearing assessment and chat." },
      {
        title: "Fees",
        body: "Each hearing assessment has its corresponding rate. Please call us to know the exact amount.",
      },
    ],
    accessCardTitle: "Parking & access",
    beforeHeading: "Before your visit",
    beforeIntro:
      "There’s nothing to study and nothing to prepare — but a couple of small things help us get the most accurate picture of your hearing:",
    beforeBullets: [
      {
        title: "Think about where you struggle.",
        body: "Noisy restaurants? The TV? Phone calls? Specific voices? Real examples help your audiologist choose the right tests and, later, the right settings.",
      },
      {
        title: "Note any ear history.",
        body: "Past ear infections, surgery, ringing (tinnitus), dizziness or noisy work environments are all useful to mention.",
      },
      {
        title: "Feeling unwell?",
        body: "A heavy cold or an active ear infection can temporarily affect results — let us know when booking and we’ll advise whether to reschedule.",
      },
    ],
    paymentsHeading: "Payments",
    paymentsBody:
      "We accept cash, GCash, bank transfer or deposit, debit card, and credit card — including Mastercard and Visa. Every assessment has its corresponding rate, and hearing aid quotations are provided before anything is charged, so there are no surprises.",
    bookingHeading: "Booking your first appointment",
    bookingBody:
      "No referral is needed — you’re welcome to book directly online or call the branch nearest you in Tanay, Rizal; Cebu City; Dasmariñas City, Cavite; or Rosario, La Union. If you’d like to know exactly what happens during the appointment itself, see our step-by-step guide on the What to Expect page.",
  },
};

export type WhatToExpectContent = BaseContent & {
  steps: Card[];
  resultsHeading: string;
  resultsParagraphs: string[];
  goodToKnowHeading: string;
  goodToKnow: Card[];
};

export const PATIENTS_WHAT_TO_EXPECT: PageDef<WhatToExpectContent> = {
  key: "patients-what-to-expect",
  path: "/patients/what-to-expect",
  label: "What to Expect",
  group: "Patients",
  groups: [
    { label: "Appointment steps", fields: [{ key: "steps", type: "cards", label: "Steps (numbered automatically)" }] },
    {
      label: "Understanding your results",
      fields: [
        { key: "resultsHeading", type: "text", label: "Heading" },
        { key: "resultsParagraphs", type: "strings", label: "Paragraphs", multiline: true },
      ],
    },
    {
      label: "Good to know",
      fields: [
        { key: "goodToKnowHeading", type: "text", label: "Heading" },
        { key: "goodToKnow", type: "cards", label: "Cards" },
      ],
    },
  ],
  defaults: {
    eyebrow: "For Patients",
    title: "What to Expect",
    subtitle: "Most people are pleasantly surprised by how relaxed a hearing appointment really is.",
    seoTitle: "What to Expect at Your Hearing Test | Linaw Dinig",
    seoDescription:
      "A friendly walk-through of your first hearing appointment — what happens, how long it takes, and what you'll learn.",

    steps: [
      { title: "A welcome and chat.", body: "We'll ask about your hearing concerns, lifestyle and goals." },
      { title: "A quick look in your ears.", body: "Using an otoscope to check for wax, ear infection, or anything unusual in your external ears." },
      { title: "Comfortable listening tests.", body: "In a sound-treated booth — no needles, nothing scary." },
      { title: "Jargon-free explanation of results.", body: "Your audiologist explains what we found and your options, with no pressure." },
      { title: "Next steps — if any.", body: "If hearing aids would help, we'll talk through options and budgets. If not, you'll leave reassured." },
    ],
    resultsHeading: "Understanding your results",
    resultsParagraphs: [
      "Your test results are plotted on an audiogram — a simple chart showing the softest sounds you can hear at each pitch, for each ear. From it, your audiologist identifies the degree of any hearing loss (from mild to profound) and the type — whether the issue sits in the outer or middle ear, the inner ear, or a combination. Together these determine what will actually help, whether that’s medical referral, hearing aids, or simply monitoring over time.",
      "You won’t be left decoding a chart on your own: we explain what your audiogram means for real life — why speech might sound muffled in a crowd but fine at home, or why some voices are harder to follow than others.",
    ],
    goodToKnowHeading: "Good to know before you come",
    goodToKnow: [
      { title: "It doesn't hurt", body: "Every test is comfortable and non-invasive — you’ll mostly listen to tones and repeat words. Children are tested through play." },
      { title: "Colds & ear infections", body: "A congested ear can temporarily affect results. If you have an active ear infection or a heavy cold, mention it when booking — it may be worth rescheduling for an accurate picture." },
      { title: "Bring a companion", body: "A family member or friend is welcome in the room. Two sets of ears help when discussing results, and a familiar voice is useful during testing." },
    ],
  },
};

/** The FAQ list itself is a DB table; the headings live in Shared sections. */
export type PatientsFaqsContent = BaseContent;

export const PATIENTS_FAQS: PageDef<PatientsFaqsContent> = {
  key: "patients-faqs",
  path: "/patients/faqs",
  label: "FAQs page",
  group: "Patients",
  groups: [],
  defaults: {
    eyebrow: "For Patients",
    title: "Frequently Asked Questions",
    subtitle: "Quick, honest answers to the things people ask us most.",
    seoTitle: "FAQs — Hearing Tests, Hearing Aids & More",
    seoDescription:
      "Frequently asked questions about hearing tests, hearing aids, costs, trials and more.",
  },
};
