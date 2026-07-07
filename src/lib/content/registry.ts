// Registry of every editable page: route, admin label and the in-code default
// copy (hero + SEO). The admin Pages section edits overrides stored in the
// page_content table; getPageData() merges them over these defaults.
import { COMPANY } from "@/lib/company";

export type PageContentData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
};

export type PageDef = {
  key: string;
  path: string;
  label: string;
  group: string;
  defaults: PageContentData;
};

export const PAGES: PageDef[] = [
  {
    key: "home",
    path: "/",
    label: "Home",
    group: "Home",
    defaults: {
      eyebrow: "Trusted Hearing Care · 4 Branches Nationwide",
      title: "Hear More of Who Matters",
      subtitle:
        "Expert hearing tests, hearing aid fittings and after care with our main office in Tanay, Rizal and branches in Cebu City, Dasmariñas City, Cavite and Rosario, La Union.",
      seoTitle:
        "Linaw Dinig Hearing Aid Center — Hearing Tests & Hearing Aids in Tanay, Rizal",
      seoDescription:
        "Trusted hearing care offering comprehensive hearing evaluation for adults & children, hearing aid counseling & fitting, repair & maintenance, follow-up care and assistive listening devices. Book your consultation today.",
    },
  },
  {
    key: "about",
    path: "/about",
    label: "About Us",
    group: "About",
    defaults: {
      eyebrow: "About",
      title: `${COMPANY.nameMeaning} — that's what our name means`,
      subtitle:
        "Linaw Dinig is a trusted provider of hearing healthcare solutions, committed to improving the quality of life for individuals experiencing hearing loss — with compassion and a patient-centered approach.",
      seoTitle: "About Us — Trusted Hearing Care in the Philippines",
      seoDescription:
        "Meet Linaw Dinig Hearing Aid Center — a trusted provider of hearing healthcare committed to improving quality of life for people with hearing loss since 2021.",
    },
  },
  {
    key: "about-clinic",
    path: "/about/clinic",
    label: "Our Clinics",
    group: "About",
    defaults: {
      eyebrow: "About",
      title: "Our Clinics",
      subtitle:
        "Calm, modern, sound-treated spaces designed to feel a world away from the typical clinic — now in four convenient locations.",
      seoTitle: "Our Clinics — Tanay, Cebu, Dasmariñas, La Union | Linaw Dinig",
      seoDescription:
        "Visit Linaw Dinig Hearing Aid Center at any of our four clinics — Tanay (Rizal), Cebu City, Dasmariñas (Cavite) and Rosario (La Union). Calm, modern, sound-treated clinics designed to put you at ease.",
    },
  },
  {
    key: "about-audiologists",
    path: "/about/audiologists",
    label: "Our Audiologists",
    group: "About",
    defaults: {
      eyebrow: "About",
      title: "Our Audiologists",
      subtitle:
        "Friendly, qualified clinicians who genuinely care about you hearing well — for the long run.",
      seoTitle: "Our Audiologists — Linaw Dinig Hearing Aid Center",
      seoDescription:
        "Meet the qualified, registered audiologists and hearing instrument specialists at Linaw Dinig Hearing Aid Center.",
    },
  },
  {
    key: "about-why-choose-us",
    path: "/about/why-choose-us",
    label: "Why Choose Us",
    group: "About",
    defaults: {
      eyebrow: "About",
      title: "Why Choose Linaw Dinig?",
      subtitle:
        "A few reasons our patients keep coming back — and bringing their families.",
      seoTitle: "Why Choose Linaw Dinig Hearing Aid Center | Philippine Audiology",
      seoDescription:
        "Experienced audiologists, the latest hearing technology, affordable and flexible payment plans, and friendly patient-focused service. Here's why patients across the Philippines choose Linaw Dinig.",
    },
  },
  {
    key: "services",
    path: "/services",
    label: "Services (overview)",
    group: "Services",
    defaults: {
      eyebrow: "Services",
      title: "Care for every step of your hearing journey",
      subtitle:
        "From your first test to lifetime aftercare — we've got every step covered.",
      seoTitle: "Our Core Services — Hearing Care for Every Age | Linaw Dinig",
      seoDescription:
        "Comprehensive hearing evaluation for adults & children, hearing aid fitting & customization, repair & maintenance, follow-up care, and assistive listening devices in Tanay, Rizal.",
    },
  },
  {
    key: "services-hearing-evaluation",
    path: "/services/hearing-evaluation",
    label: "Hearing Evaluation",
    group: "Services",
    defaults: {
      eyebrow: "Services",
      title: "Comprehensive Hearing Evaluation",
      subtitle:
        "We provide accurate hearing assessments for adults and children using the latest audiometric tools.",
      seoTitle:
        "Comprehensive Hearing Evaluation (Adult & Pediatric) | Linaw Dinig",
      seoDescription:
        "Accurate adult and pediatric hearing tests in Tanay, Cebu, Dasmariñas and La Union — pure tone & speech audiometry, tympanometry, newborn hearing screening, play audiometry, ABR/BAER and ASSR, plus occupational, seafarer and pilot hearing screening from qualified audiologists.",
    },
  },
  {
    key: "services-hearing-aid-fittings",
    path: "/services/hearing-aid-fittings",
    label: "Hearing Aid Fittings",
    group: "Services",
    defaults: {
      eyebrow: "Services",
      title: "Hearing Aid Counseling & Fitting",
      subtitle:
        "Tailored solutions matched to your lifestyle, degree of hearing loss, and budget.",
      seoTitle: "Hearing Aid Counseling & Fitting | Linaw Dinig",
      seoDescription:
        "Tailored hearing aid solutions in the Philippines — matched to your lifestyle, degree of hearing loss and budget. Includes hearing aid counseling, precise fitting and ongoing customization at our Tanay, Cebu, Dasmariñas and La Union branches.",
    },
  },
  {
    key: "services-hearing-aid-repairs",
    path: "/services/hearing-aid-repairs",
    label: "Hearing Aid Repairs",
    group: "Services",
    defaults: {
      eyebrow: "Services",
      title: "Hearing Aid Repair & Maintenance",
      subtitle: "Reliable repair and maintenance for your hearing devices.",
      seoTitle: "Hearing Aid Repair & Maintenance | Linaw Dinig",
      seoDescription:
        "Reliable repair and maintenance for your hearing devices in the Philippines. In-clinic servicing at our Tanay, Cebu, Dasmariñas and La Union branches.",
    },
  },
  {
    key: "services-follow-up-care",
    path: "/services/follow-up-care",
    label: "Follow-up Care",
    group: "Services",
    defaults: {
      eyebrow: "Services",
      title: "Follow-up Care & Counseling",
      subtitle:
        "Hearing well is a journey, not a one-time visit. We stay with you every step of the way.",
      seoTitle: "Follow-up Care & Counseling | Linaw Dinig Hearing Aid Center",
      seoDescription:
        "Ongoing support, counseling and fine-tuning to help you adapt to your hearing aids and get the most from your hearing every day — available across our Tanay, Cebu, Dasmariñas and La Union branches.",
    },
  },
  {
    key: "services-assistive-listening-devices",
    path: "/services/assistive-listening-devices",
    label: "Assistive Devices",
    group: "Services",
    defaults: {
      eyebrow: "Services",
      title: "Assistive Listening Devices & Accessories",
      subtitle:
        "Extra help for the toughest listening situations — and the accessories that keep your hearing aids at their best.",
      seoTitle: "Assistive Listening Devices & Accessories | Linaw Dinig",
      seoDescription:
        "Assistive listening devices and hearing aid accessories in the Philippines that enhance hearing in challenging environments — TV streamers, remote microphones, chargers, batteries and more.",
    },
  },
  {
    key: "patients",
    path: "/patients",
    label: "For Patients (overview)",
    group: "Patients",
    defaults: {
      eyebrow: "For Patients",
      title: "A warm welcome — before you even arrive",
      subtitle:
        "We've put everything you need in one place. Here's what to expect and how to get the most out of your visit.",
      seoTitle: "For Patients — New Patient Info, What to Expect & FAQs",
      seoDescription:
        "Everything you need to know before your first visit — what to expect, FAQs and forms.",
    },
  },
  {
    key: "patients-what-to-expect",
    path: "/patients/what-to-expect",
    label: "What to Expect",
    group: "Patients",
    defaults: {
      eyebrow: "For Patients",
      title: "What to Expect",
      subtitle:
        "Most people are pleasantly surprised by how relaxed a hearing appointment really is.",
      seoTitle: "What to Expect at Your Hearing Test | Linaw Dinig",
      seoDescription:
        "A friendly walk-through of your first hearing appointment — what happens, how long it takes, and what you'll learn.",
    },
  },
  {
    key: "patients-new-patient-info",
    path: "/patients/new-patient-info",
    label: "New Patient Info",
    group: "Patients",
    defaults: {
      eyebrow: "For Patients",
      title: "New Patient Information",
      subtitle:
        "A few small things that make your first visit smooth and stress-free.",
      seoTitle: "New Patient Information — Linaw Dinig Hearing Aid Center",
      seoDescription:
        "What to bring, how long to allow, and what to expect at your first appointment with Linaw Dinig Hearing Aid Center.",
    },
  },
  {
    key: "patients-faqs",
    path: "/patients/faqs",
    label: "FAQs page",
    group: "Patients",
    defaults: {
      eyebrow: "For Patients",
      title: "Frequently Asked Questions",
      subtitle: "Quick, honest answers to the things people ask us most.",
      seoTitle: "FAQs — Hearing Tests, Hearing Aids & More",
      seoDescription:
        "Frequently asked questions about hearing tests, hearing aids, costs, trials and more.",
    },
  },
  {
    key: "book",
    path: "/book",
    label: "Book an Appointment",
    group: "Book",
    defaults: {
      eyebrow: "Book Online · Under 2 minutes",
      title: "Book Your Appointment",
      subtitle:
        "Choose your preferred clinic and time — we'll confirm within one business day.",
      seoTitle: "Book a Hearing Test — Linaw Dinig Hearing Aid Center",
      seoDescription:
        "Book a hearing assessment with our qualified audiologists. Online booking takes under two minutes.",
    },
  },
];

export function getPageDef(key: string): PageDef | undefined {
  return PAGES.find((p) => p.key === key);
}
