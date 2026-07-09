import type { BaseContent, IconCard, PageDef } from "@/lib/content/types";

export type HomeContent = BaseContent & {
  heroImage: string;
  heroImageAlt: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  trustLine: string;

  reviewsLabel: string;
  reviewsRating: string;
  reviewsCaption: string;

  servicesEyebrow: string;
  servicesTitle: string;
  serviceCards: IconCard[];
};

export const HOME: PageDef<HomeContent> = {
  key: "home",
  path: "/",
  label: "Home",
  group: "Home",
  groups: [
    {
      label: "Hero",
      fields: [
        { key: "heroImage", type: "image", label: "Hero image" },
        { key: "heroImageAlt", type: "text", label: "Hero image description (for screen readers)" },
        { key: "heroPrimaryCta", type: "text", label: "Primary button label" },
        { key: "heroSecondaryCta", type: "text", label: "Secondary button label" },
        { key: "trustLine", type: "text", label: "Trust line under the buttons" },
      ],
    },
    {
      label: "Google reviews badge",
      fields: [
        { key: "reviewsLabel", type: "text", label: "Badge label" },
        { key: "reviewsRating", type: "text", label: "Rating (e.g. 4.9)" },
        { key: "reviewsCaption", type: "text", label: "Caption under the rating" },
      ],
    },
    {
      label: "Services overview",
      fields: [
        { key: "servicesEyebrow", type: "text", label: "Eyebrow" },
        { key: "servicesTitle", type: "text", label: "Heading" },
        { key: "serviceCards", type: "iconCards", label: "Service cards" },
      ],
    },
  ],
  defaults: {
    eyebrow: "Trusted Hearing Care · 4 Branches Nationwide",
    title: "Hear More of Who Matters",
    subtitle:
      "Expert hearing tests, hearing aid fittings and after care with our main office in Tanay, Rizal and branches in Cebu City, Dasmariñas City, Cavite and Rosario, La Union.",
    seoTitle:
      "Linaw Dinig Hearing Aid Center — Hearing Tests & Hearing Aids in Tanay, Rizal",
    seoDescription:
      "Trusted hearing care offering comprehensive hearing evaluation for adults & children, hearing aid counseling & fitting, repair & maintenance, follow-up care and assistive listening devices. Book your consultation today.",

    heroImage: "/assets/hero-audiologist.webp",
    heroImageAlt: "Audiologist smiling with an elderly patient in a warmly lit clinic room",
    heroPrimaryCta: "Book a Hearing Test",
    heroSecondaryCta: "Explore Our Services",
    trustLine: "ZZMARK_HOME_DEFAULT Trusted by 5,000+ patients · Qualified Audiologists · Independent Private Practice",

    reviewsLabel: "Google Reviews",
    reviewsRating: "4.9",
    reviewsCaption: "across our branches",

    servicesEyebrow: "What we do",
    servicesTitle: "Care for every stage of your hearing journey",
    serviceCards: [
      {
        icon: "Ear",
        title: "Hearing Evaluation",
        desc: "Comprehensive assessments for adults & children.",
        href: "/services/hearing-evaluation",
      },
      {
        icon: "Headphones",
        title: "Hearing Aid Counseling & Fitting",
        desc: "Matched to your lifestyle, hearing loss and budget.",
        href: "/services/hearing-aid-fittings",
      },
      {
        icon: "Wrench",
        title: "Hearing Aid Repair & Maintenance",
        desc: "Reliable repair and maintenance for your hearing devices.",
        href: "/services/hearing-aid-repairs",
      },
      {
        icon: "HeartHandshake",
        title: "Follow-up Care & Counseling",
        desc: "Ongoing support to maximize your hearing.",
        href: "/services/follow-up-care",
      },
      {
        icon: "Volume2",
        title: "Assistive Listening Devices & Accessories",
        desc: "Enhanced hearing in challenging environments.",
        href: "/services/assistive-listening-devices",
      },
    ],
  },
};
