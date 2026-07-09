import type { BaseContent, PageDef } from "@/lib/content/types";

export type BookContent = BaseContent & {
  appointmentTypes: string[];
  preferredTimes: string[];
  hearAboutOptions: string[];
  submitLabel: string;
  callPrompt: string;
  successTitle: string;
  successBody: string;
};

export const BOOK: PageDef<BookContent> = {
  key: "book",
  path: "/book",
  label: "Book an Appointment",
  group: "Book",
  groups: [
    {
      label: "Form options",
      fields: [
        {
          key: "appointmentTypes",
          type: "strings",
          label: "Appointment types (the “Preferred Clinic” list comes from Branches)",
          placeholder: "e.g. Hearing Evaluation (Adult)",
        },
        { key: "preferredTimes", type: "strings", label: "Preferred times", placeholder: "e.g. Morning" },
        { key: "hearAboutOptions", type: "strings", label: "“How did you hear about us?” options", placeholder: "e.g. Google" },
      ],
    },
    {
      label: "Labels & confirmation",
      fields: [
        { key: "submitLabel", type: "text", label: "Submit button label" },
        { key: "callPrompt", type: "text", label: "Text above the branch phone list" },
        { key: "successTitle", type: "text", label: "Confirmation heading" },
        { key: "successBody", type: "textarea", label: "Confirmation message (“{phone}” is replaced by the main phone number)" },
      ],
    },
  ],
  defaults: {
    eyebrow: "Book Online · Under 2 minutes",
    title: "Book Your Appointment",
    subtitle: "Choose your preferred clinic and time — we'll confirm within one business day.",
    seoTitle: "Book a Hearing Test — Linaw Dinig Hearing Aid Center",
    seoDescription:
      "Book a hearing assessment with our qualified audiologists. Online booking takes under two minutes.",

    appointmentTypes: [
      "Hearing Evaluation (Adult)",
      "Hearing Evaluation (Pediatric)",
      "Hearing Aid Counseling & Fitting",
      "Hearing Aid Repair & Maintenance",
      "Follow-up Care",
      "Assistive Listening Devices & Accessories",
      "Other",
    ],
    preferredTimes: ["Morning", "Afternoon"],
    hearAboutOptions: [
      "Google",
      "Friend or family",
      "Doctor referral",
      "Social media (Facebook, Tiktok)",
      "Existing patient",
      "Other",
    ],
    submitLabel: "Request My Appointment",
    callPrompt: "Prefer to talk? Call the branch nearest you:",
    successTitle: "Thanks — your request is in!",
    successBody:
      "We'll be in touch within one business day to confirm your appointment. If you'd like to chat sooner, call us on {phone}.",
  },
};
