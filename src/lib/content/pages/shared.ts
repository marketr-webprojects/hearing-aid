import type { Card, IconItem, PageDef, TextImage } from "@/lib/content/types";

/**
 * Content shared across several pages (the home-page section bands, plus the
 * headings that sit above the DB-driven Team / Testimonials / FAQ lists, which
 * render on more than one route). Stored in page_content under the reserved
 * "_shared" path, which is never a route.
 */
export type SharedContent = {
  trustBarItems: IconItem[];

  brandsTitle: string;
  brandsSubtitle: string;
  brands: string[];
  otherDevicesTitle: string;
  otherDevicesSubtitle: string;
  otherDevices: string[];

  howItWorksEyebrow: string;
  howItWorksTitle: string;
  howItWorksSteps: Card[];
  howItWorksCta: string;

  quizQuestions: TextImage[];

  testimonialsTitle: string;
  testimonialsSubtitle: string;
  teamTitle: string;
  teamSubtitle: string;
  faqTitle: string;
  faqSubtitle: string;
};

export const SHARED: PageDef<SharedContent> = {
  key: "shared",
  path: "_shared",
  label: "Shared sections",
  group: "Home",
  hero: false,
  seo: false,
  groups: [
    {
      label: "Trust bar",
      fields: [{ key: "trustBarItems", type: "iconItems", label: "Trust bar items" }],
    },
    {
      label: "Hearing aids / brands",
      fields: [
        { key: "brandsTitle", type: "text", label: "Heading" },
        { key: "brandsSubtitle", type: "textarea", label: "Subheading" },
        { key: "brands", type: "strings", label: "Brands", placeholder: "e.g. Unitron" },
        { key: "otherDevicesTitle", type: "text", label: "Other devices heading" },
        { key: "otherDevicesSubtitle", type: "textarea", label: "Other devices subheading" },
        { key: "otherDevices", type: "strings", label: "Other devices", placeholder: "e.g. Cochlear Implants" },
      ],
    },
    {
      label: "How it works",
      fields: [
        { key: "howItWorksEyebrow", type: "text", label: "Eyebrow" },
        { key: "howItWorksTitle", type: "text", label: "Heading" },
        { key: "howItWorksSteps", type: "cards", label: "Steps (numbered automatically)" },
        { key: "howItWorksCta", type: "text", label: "Button label" },
      ],
    },
    {
      label: "Hearing quiz",
      fields: [{ key: "quizQuestions", type: "textImages", label: "Questions" }],
    },
    {
      label: "Section headings",
      fields: [
        { key: "testimonialsTitle", type: "text", label: "Testimonials heading" },
        { key: "testimonialsSubtitle", type: "textarea", label: "Testimonials subheading" },
        { key: "teamTitle", type: "text", label: "Team heading" },
        { key: "teamSubtitle", type: "textarea", label: "Team subheading" },
        { key: "faqTitle", type: "text", label: "FAQ heading" },
        { key: "faqSubtitle", type: "textarea", label: "FAQ subheading" },
      ],
    },
  ],
  defaults: {
    trustBarItems: [
      { icon: "BadgeCheck", label: "Qualified & Registered Audiologists" },
      { icon: "Headphones", label: "Trusted Hearing Aid Brands" },
      { icon: "ShieldCheck", label: "Comprehensive Hearing Assessments" },
      { icon: "HandHeart", label: "Aftercare & Ongoing Support" },
      { icon: "Wallet", label: "Flexible Payment Options" },
    ],

    brandsTitle: "ZZMARK_SHARED_DEFAULT",
    brandsSubtitle:
      "We are an independent, private practice — we recommend the right aid for you, not necessarily the most expensive one.",
    brands: ["Unitron", "Bernafon", "Beltone"],
    otherDevicesTitle: "Other Hearing Devices",
    otherDevicesSubtitle:
      "Beyond conventional hearing aids, we also assist with specialized hearing solutions.",
    otherDevices: [
      "Cochlear Implants",
      "Bone-anchored Hearing Aids (BAHA)",
      "CROS / Bi-CROS Aids",
    ],

    howItWorksEyebrow: "A simple, calm process",
    howItWorksTitle: "How it works",
    howItWorksSteps: [
      { title: "Book a Hearing Test", body: "A relaxed 45-minute comprehensive assessment." },
      {
        title: "Get Your Results & Recommendation",
        body: "Your audiologist explains your results clearly and recommends options to suit your lifestyle and budget.",
      },
      {
        title: "Fitted & Supported",
        body: "Your hearing aids are fitted, fine-tuned, and backed by ongoing aftercare.",
      },
    ],
    howItWorksCta: "Book Your Hearing Test",

    quizQuestions: [
      { text: "Do you often feel that people are mumbling?", img: "/assets/quiz-images/Mumbling.webp" },
      { text: "Do you have trouble following conversations in restaurants?", img: "/assets/quiz-images/Resto.webp" },
      { text: "Do family members complain the TV is too loud?", img: "/assets/quiz-images/LoudTV.webp" },
      { text: "Do you avoid social events because hearing is tiring?", img: "/assets/quiz-images/SocialIsolation.webp" },
      { text: "Have you noticed ringing or buzzing in your ears?", img: "/assets/quiz-images/RingingEars.webp" },
    ],

    testimonialsTitle: "What Our Patients Say",
    testimonialsSubtitle: "Real stories from people we've helped.",
    teamTitle: "Meet the Team",
    teamSubtitle: "Friendly, qualified clinicians who genuinely care.",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Quick answers to the things people ask us most.",
  },
};
