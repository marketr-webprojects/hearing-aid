import type { BaseContent, Card, PageDef } from "@/lib/content/types";

export type AboutContent = BaseContent & {
  storyImage: string;
  storyImageAlt: string;
  storyHeading: string;
  storyParagraphs: string[];
  missionVision: Card[];
  clinicsHeading: string;
  clinicsBody: string;
  clinicsCta: string;
  clinicsImage: string;
  clinicsImageAlt: string;
};

export const ABOUT: PageDef<AboutContent> = {
  key: "about",
  path: "/about",
  label: "About Us",
  group: "About",
  groups: [
    {
      label: "Our story",
      fields: [
        { key: "storyImage", type: "image", label: "Photo" },
        { key: "storyImageAlt", type: "text", label: "Photo description" },
        { key: "storyHeading", type: "text", label: "Heading" },
        { key: "storyParagraphs", type: "strings", label: "Paragraphs", multiline: true },
      ],
    },
    {
      label: "Mission & vision",
      fields: [{ key: "missionVision", type: "cards", label: "Panels" }],
    },
    {
      label: "Our clinics",
      fields: [
        { key: "clinicsHeading", type: "text", label: "Heading" },
        { key: "clinicsBody", type: "textarea", label: "Body" },
        { key: "clinicsCta", type: "text", label: "Button label" },
        { key: "clinicsImage", type: "image", label: "Photo" },
        { key: "clinicsImageAlt", type: "text", label: "Photo description" },
      ],
    },
  ],
  defaults: {
    eyebrow: "About",
    title: "Clear Hearing — that's what our name means",
    subtitle:
      "Linaw Dinig is a trusted provider of hearing healthcare solutions, committed to improving the quality of life for individuals experiencing hearing loss — with compassion and a patient-centered approach.",
    seoTitle: "About Us — Trusted Hearing Care in the Philippines",
    seoDescription:
      "Meet Linaw Dinig Hearing Aid Center — a trusted provider of hearing healthcare committed to improving quality of life for people with hearing loss since 2021.",

    storyImage: "/assets/about-us.webp",
    storyImageAlt: "Three generations of a family laughing together over a shared meal",
    storyHeading: "About us",
    storyParagraphs: [
      "We offer advanced hearing aid technologies, professional hearing assessments, and personalized fitting services to ensure optimal hearing experiences for every client.",
      "Our name, Linaw Dinig — which translates to “Clear Hearing” — reflects our mission to help clients reconnect with the world through improved hearing wellness.",
    ],
    missionVision: [
      {
        title: "Our mission",
        body: "To serve and support individuals with hearing needs, advocate for inclusive access to hearing care, collaborate with partners and communities, and educate families to build a future where better hearing leads to better lives.",
      },
      {
        title: "Our vision",
        body: "To be the leading hearing aid center in the region — known for integrity, innovation, and exceptional client care. We envision a future where no child is left unheard: championing early intervention, delivering trusted hearing solutions, and empowering families to support every child’s journey toward fuller connection and communication.",
      },
    ],
    clinicsHeading: "Our clinics",
    clinicsBody:
      "Calm, warmly lit spaces designed to put you at ease — with branches in Tanay, Cebu, Dasmariñas and La Union so quality hearing care is always within reach.",
    clinicsCta: "Tour the clinic",
    clinicsImage: "/assets/tanay-front-desk.webp",
    clinicsImageAlt: "Front desk of the Linaw Dinig Hearing Aid Center Tanay main office",
  },
};

export type AboutAudiologistsContent = BaseContent & {
  intro: string[];
};

export const ABOUT_AUDIOLOGISTS: PageDef<AboutAudiologistsContent> = {
  key: "about-audiologists",
  path: "/about/audiologists",
  label: "Our Audiologists",
  group: "About",
  groups: [
    {
      label: "Introduction",
      fields: [{ key: "intro", type: "strings", label: "Paragraphs", multiline: true }],
    },
  ],
  defaults: {
    eyebrow: "About",
    title: "Our Audiologists",
    subtitle:
      "Friendly, qualified clinicians who genuinely care about you hearing well — for the long run.",
    seoTitle: "Our Audiologists — Linaw Dinig Hearing Aid Center",
    seoDescription:
      "Meet the qualified, registered audiologists and hearing instrument specialists at Linaw Dinig Hearing Aid Center.",

    intro: [
      "Hearing care is personal — the same test result can mean very different things for a tricycle driver, a teacher and a toddler. That’s why every Linaw Dinig branch is run by clinicians who take time to understand your daily life before recommending anything.",
      "Our team is led by an audiologist with a Master in Clinical Audiology from the University of Santo Tomas and specialized training in pediatric audiology, supported by audiometrists in Tanay, Cebu and La Union with certifications in newborn hearing screening and dedicated training for working with children with special needs. Between them, they care for patients at every stage of life — from a baby’s first hearing screening to fine-tuning a grandparent’s hearing aids.",
      "Whichever branch you visit, the approach is the same: unhurried appointments, plain-language explanations, and honest recommendations based on your hearing, lifestyle and budget.",
    ],
  },
};

export type AboutClinicContent = BaseContent & {
  heroImage: string;
  heroImageAlt: string;
  branchesHeading: string;
  branchesIntro: string;
};

export const ABOUT_CLINIC: PageDef<AboutClinicContent> = {
  key: "about-clinic",
  path: "/about/clinic",
  label: "Our Clinics",
  group: "About",
  groups: [
    {
      label: "Photo",
      fields: [
        { key: "heroImage", type: "image", label: "Photo" },
        { key: "heroImageAlt", type: "text", label: "Photo description" },
      ],
    },
    {
      label: "Branch list",
      fields: [
        { key: "branchesHeading", type: "text", label: "Heading" },
        { key: "branchesIntro", type: "textarea", label: "Intro paragraph" },
      ],
    },
  ],
  defaults: {
    eyebrow: "About",
    title: "Our Clinics",
    subtitle:
      "Calm, modern, sound-treated spaces designed to feel a world away from the typical clinic — now in four convenient locations.",
    seoTitle: "Our Clinics — Tanay, Cebu, Dasmariñas, La Union | Linaw Dinig",
    seoDescription:
      "Visit Linaw Dinig Hearing Aid Center at any of our four clinics — Tanay (Rizal), Cebu City, Dasmariñas (Cavite) and Rosario (La Union). Calm, modern, sound-treated clinics designed to put you at ease.",

    heroImage: "/assets/tanay-front-desk.webp",
    heroImageAlt: "Front desk of the Linaw Dinig Hearing Aid Center Tanay main office",
    branchesHeading: "Find a branch near you",
    branchesIntro:
      "Linaw Dinig Hearing Aid Center serves communities across the Philippines from four clinics. Walk in or book ahead — our team is ready to welcome you for a hearing consultation.",
  },
};

export type AboutWhyChooseUsContent = BaseContent & {
  intro: string;
  reasons: Card[];
  closing: string;
};

export const ABOUT_WHY_CHOOSE_US: PageDef<AboutWhyChooseUsContent> = {
  key: "about-why-choose-us",
  path: "/about/why-choose-us",
  label: "Why Choose Us",
  group: "About",
  groups: [
    {
      label: "Body",
      fields: [
        { key: "intro", type: "textarea", label: "Opening paragraph" },
        { key: "reasons", type: "cards", label: "Reason cards" },
        { key: "closing", type: "textarea", label: "Closing paragraph" },
      ],
    },
  ],
  defaults: {
    eyebrow: "About",
    title: "Why Choose Linaw Dinig?",
    subtitle: "A few reasons our patients keep coming back — and bringing their families.",
    seoTitle: "Why Choose Linaw Dinig Hearing Aid Center | Philippine Audiology",
    seoDescription:
      "Experienced audiologists, the latest hearing technology, affordable and flexible payment plans, and friendly patient-focused service. Here's why patients across the Philippines choose Linaw Dinig.",

    intro:
      "Choosing where to have your hearing tested — or where to invest in hearing aids — is a decision you’ll live with every day. As an independent, private practice established in June 2021, we’re free to recommend what genuinely suits you rather than what a supplier wants us to sell. That independence, combined with qualified clinicians and four branches across Luzon and the Visayas, is what our patients tell us they value most.",
    reasons: [
      {
        title: "Experienced audiologists & technicians",
        body: "Qualified professionals who assess, fit and care for your hearing with genuine expertise.",
      },
      {
        title: "Latest hearing technology & brands",
        body: "Advanced hearing aids and audiometric tools matched to your needs.",
      },
      {
        title: "Affordable & flexible payment plans",
        body: "Quality hearing care that fits your lifestyle, degree of hearing loss and budget.",
      },
      {
        title: "Friendly, patient-focused service",
        body: "We never rush. Your questions and your comfort always come first.",
      },
      {
        title: "In-clinic trial options",
        body: "Experience the difference with a no-pressure, in-clinic trial session before you commit.",
      },
      {
        title: "Care for every age",
        body: "Comprehensive evaluation and support for both adults and children.",
      },
    ],
    closing:
      "Most of all, we’re local. Our patients see the same faces visit after visit, and our name — Linaw Dinig, “Clear Hearing” — is a promise we get to keep in person, whether you visit us in Tanay, Cebu City, Dasmariñas or Rosario, La Union.",
  },
};
