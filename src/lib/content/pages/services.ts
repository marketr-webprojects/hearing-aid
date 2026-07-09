import type { BaseContent, Card, IconCard, ImageCard, PageDef } from "@/lib/content/types";

export type ServicesContent = BaseContent & {
  serviceCards: IconCard[];
};

export const SERVICES: PageDef<ServicesContent> = {
  key: "services",
  path: "/services",
  label: "Services (overview)",
  group: "Services",
  groups: [
    { label: "Service cards", fields: [{ key: "serviceCards", type: "iconCards", label: "Cards" }] },
  ],
  defaults: {
    eyebrow: "Services",
    title: "Care for every step of your hearing journey",
    subtitle: "From your first test to lifetime aftercare — we've got every step covered.",
    seoTitle: "Our Core Services — Hearing Care for Every Age | Linaw Dinig",
    seoDescription:
      "Comprehensive hearing evaluation for adults & children, hearing aid fitting & customization, repair & maintenance, follow-up care, and assistive listening devices in Tanay, Rizal.",

    serviceCards: [
      { icon: "Ear", title: "Hearing Evaluation", desc: "Comprehensive assessments for adults & children.", href: "/services/hearing-evaluation" },
      { icon: "Headphones", title: "Hearing Aid Counseling & Fitting", desc: "Matched to your lifestyle, hearing loss and budget.", href: "/services/hearing-aid-fittings" },
      { icon: "Wrench", title: "Hearing Aid Repair & Maintenance", desc: "Reliable repair and maintenance for your hearing devices.", href: "/services/hearing-aid-repairs" },
      { icon: "HeartHandshake", title: "Follow-up Care & Counseling", desc: "Ongoing support to maximize your hearing.", href: "/services/follow-up-care" },
      { icon: "Volume2", title: "Assistive Listening Devices & Accessories", desc: "Enhanced hearing in challenging environments.", href: "/services/assistive-listening-devices" },
    ],
  },
};

export type HearingEvaluationContent = BaseContent & {
  intro: string[];
  adultHeading: string;
  adultTests: ImageCard[];
  pediatricHeading: string;
  pediatricTests: ImageCard[];
  note: string;
  occupationalHeading: string;
  occupationalIntro: string;
  occupationalTests: ImageCard[];
};

export const SERVICES_HEARING_EVALUATION: PageDef<HearingEvaluationContent> = {
  key: "services-hearing-evaluation",
  path: "/services/hearing-evaluation",
  label: "Hearing Evaluation",
  group: "Services",
  groups: [
    { label: "Introduction", fields: [{ key: "intro", type: "strings", label: "Paragraphs", multiline: true }] },
    {
      label: "Adult hearing tests",
      fields: [
        { key: "adultHeading", type: "text", label: "Heading" },
        { key: "adultTests", type: "imageCards", label: "Tests" },
      ],
    },
    {
      label: "Pediatric hearing tests",
      fields: [
        { key: "pediatricHeading", type: "text", label: "Heading" },
        { key: "pediatricTests", type: "imageCards", label: "Tests" },
        { key: "note", type: "textarea", label: "Highlighted note below the cards" },
      ],
    },
    {
      label: "Occupational & specialized screening",
      fields: [
        { key: "occupationalHeading", type: "text", label: "Heading" },
        { key: "occupationalIntro", type: "textarea", label: "Intro paragraph" },
        { key: "occupationalTests", type: "imageCards", label: "Tests" },
      ],
    },
  ],
  defaults: {
    eyebrow: "Services",
    title: "Comprehensive Hearing Evaluation",
    subtitle:
      "We provide accurate hearing assessments for adults and children using the latest audiometric tools.",
    seoTitle: "Comprehensive Hearing Evaluation (Adult & Pediatric) | Linaw Dinig",
    seoDescription:
      "Accurate adult and pediatric hearing tests in Tanay, Cebu, Dasmariñas and La Union — pure tone & speech audiometry, tympanometry, newborn hearing screening, play audiometry, ABR/BAER and ASSR, plus occupational, seafarer and pilot hearing screening from qualified audiologists.",

    intro: [
      "A proper diagnosis is the foundation of good hearing care. Whether you’re an adult noticing changes in your hearing or a parent concerned about your child, our qualified audiologists choose the right combination of tests for the age and needs of each patient — then explain the results in plain, jargon-free language.",
      "Every evaluation is carried out in a sound-treated environment with calibrated equipment, so you receive an accurate picture of your hearing and clear, honest recommendations on the next steps. Hearing evaluations are available across all four Linaw Dinig branches in Tanay, Rizal, Cebu City, Cebu, Dasmariñas City, Cavite, and Rosario, La Union.",
    ],
    adultHeading: "Adult Hearing Tests",
    adultTests: [
      {
        title: "Pure Tone Audiometry & Speech Audiometry",
        img: "/assets/pure-tone-audiometry.webp",
        alt: "Patient wearing audiometric headphones in a sound-treated booth during a pure tone hearing test",
        body: "Measures the softest sounds you can hear across a range of pitches to map the degree and type of your hearing loss, and assesses how clearly you understand speech at different volumes — a key measure for planning the right hearing aid fitting.",
      },
      {
        title: "Tympanometry",
        img: "/assets/tympanometry.webp",
        alt: "Audiologist performing a tympanometry middle-ear test on a patient",
        body: "It is a quick, non-invasive test that evaluates how well the eardrum and middle ear are functioning. This test checks the movement of the eardrum and helps identify middle ear conditions such as ear infections.",
      },
    ],
    pediatricHeading: "Pediatric Hearing Tests",
    pediatricTests: [
      {
        title: "Newborn Hearing Screening",
        img: "/assets/newborn-hearing-screening.webp",
        alt: "Newborn baby undergoing a gentle hearing screening",
        body: "A safe, quick, and painless hearing test that may be performed shortly after birth to check a baby’s hearing. Early detection of hearing loss allows timely intervention and support, which are essential for normal speech, language, and cognitive development.",
      },
      {
        title: "Play Audiometry",
        img: "/assets/play-audiometry.webp",
        alt: "Young child taking a play-based hearing test with an audiologist",
        body: "A hearing test designed for young children, typically ages 2 to 5 years, that uses games or playful activities to measure hearing ability. This fun and engaging approach helps audiologists accurately assess a child’s hearing levels in a comfortable and child-friendly manner.",
      },
      {
        title: "ABR / BAER & ASSR",
        img: "/assets/abr-baer-assr.webp",
        alt: "Infant undergoing an ABR/BAER and ASSR objective hearing test with electrodes",
        body: "These are objective hearing tests that measure how the hearing nerve and brain respond to sound which are commonly used for newborns, younger children, and individuals who cannot participate in conventional hearing tests. ABR / BAER helps assess the integrity of the hearing pathway, while ASSR provides frequency-specific information that can estimate the degree of hearing loss and assist in hearing aid fitting.",
      },
    ],
    note: "Early detection matters — championing early intervention gives every child the best chance at fuller connection and communication.",
    occupationalHeading: "Occupational & Specialized Hearing Screening",
    occupationalIntro:
      "Many workplaces and licensing bodies require documented hearing screening. Our audiologists provide certified assessments for employees, seafarers and aviation personnel, with clear reports suitable for pre-employment and annual medical requirements.",
    occupationalTests: [
      {
        title: "Industrial & Occupational Hearing Screening",
        img: "/assets/industrial-hearing-screening.webp",
        alt: "Industrial worker in a high-noise environment wearing hearing protection",
        body: "Baseline and annual hearing tests for workers exposed to noise — supporting workplace safety and occupational health compliance with accurate, well-documented audiograms.",
      },
      {
        title: "Maritime & Aviation Hearing Tests",
        img: "/assets/maritime-aviation.webp",
        alt: "Seafarer and pilot representing maritime and aviation medical hearing assessments",
        body: "Hearing assessments for seafarers (PEME) and aviation personnel, helping you meet maritime and aviation medical certification requirements.",
      },
    ],
  },
};

export type HearingAidFittingsContent = BaseContent & {
  intro: string[];
  stages: ImageCard[];
  highlights: Card[];
};

export const SERVICES_HEARING_AID_FITTINGS: PageDef<HearingAidFittingsContent> = {
  key: "services-hearing-aid-fittings",
  path: "/services/hearing-aid-fittings",
  label: "Hearing Aid Fittings",
  group: "Services",
  groups: [
    { label: "Introduction", fields: [{ key: "intro", type: "strings", label: "Paragraphs", multiline: true }] },
    { label: "Counseling & fitting", fields: [{ key: "stages", type: "imageCards", label: "Cards" }] },
    { label: "Highlights", fields: [{ key: "highlights", type: "cards", label: "Cards" }] },
  ],
  defaults: {
    eyebrow: "Services",
    title: "Hearing Aid Counseling & Fitting",
    subtitle: "Tailored solutions matched to your lifestyle, degree of hearing loss, and budget.",
    seoTitle: "Hearing Aid Counseling & Fitting | Linaw Dinig",
    seoDescription:
      "Tailored hearing aid solutions in the Philippines — matched to your lifestyle, degree of hearing loss and budget. Includes hearing aid counseling, precise fitting and ongoing customization at our Tanay, Cebu, Dasmariñas and La Union branches.",

    intro: [
      "A great hearing aid is only as good as its fitting. At Linaw Dinig, fitting is a guided, unhurried process: we start by understanding how and where you struggle to hear, recommend the right technology for your needs and budget, then fit and fine-tune every device so each sound reaches you exactly as it should.",
      "From the first counseling session to long-term adjustments, our qualified audiologist makes sure your hearing aids feel natural, comfortable and genuinely helpful in everyday life — may it be at home, at work, or in noisy places.",
    ],
    stages: [
      {
        title: "Hearing Aid Counseling",
        img: "/assets/hearing-aid-counseling.webp",
        alt: "Audiologist counseling a patient about hearing aid options",
        body: "We help you choose the right technology and style for your lifestyle, degree of hearing loss and budget — with honest advice and no pressure to buy.",
      },
      {
        title: "Hearing Aid Fitting",
        img: "/assets/hearing-aid-fitting.webp",
        alt: "Audiologist fitting a hearing aid to a patient's ear",
        body: "Precise fitting, programming and a hands-on demonstration of features, so you leave confident in how to use and care for your devices.",
      },
    ],
    highlights: [
      { title: "Personalized customization", body: "Fine-tuning tailored to how and where you listen, day to day." },
      { title: "Flexible & affordable", body: "Options across budgets, with affordable and flexible payment plans." },
      { title: "Ongoing support", body: "Follow-up adjustments and care to keep you hearing your best over time." },
    ],
  },
};

export type HearingAidRepairsContent = BaseContent & {
  intro: string;
  quickFacts: Card[];
  problemsHeading: string;
  problemsIntro: string;
  problems: Card[];
  careHeading: string;
  careIntro: string;
  careTips: string[];
  closing: string;
};

export const SERVICES_HEARING_AID_REPAIRS: PageDef<HearingAidRepairsContent> = {
  key: "services-hearing-aid-repairs",
  path: "/services/hearing-aid-repairs",
  label: "Hearing Aid Repairs",
  group: "Services",
  groups: [
    {
      label: "Introduction",
      fields: [
        { key: "intro", type: "textarea", label: "Opening paragraph" },
        { key: "quickFacts", type: "cards", label: "Quick facts" },
      ],
    },
    {
      label: "Common problems",
      fields: [
        { key: "problemsHeading", type: "text", label: "Heading" },
        { key: "problemsIntro", type: "textarea", label: "Intro paragraph" },
        { key: "problems", type: "cards", label: "Problem cards" },
      ],
    },
    {
      label: "Home care",
      fields: [
        { key: "careHeading", type: "text", label: "Heading" },
        { key: "careIntro", type: "textarea", label: "Intro paragraph" },
        { key: "careTips", type: "strings", label: "Bullet points", multiline: true },
        { key: "closing", type: "textarea", label: "Closing paragraph" },
      ],
    },
  ],
  defaults: {
    eyebrow: "Services",
    title: "Hearing Aid Repair & Maintenance",
    subtitle: "Reliable repair and maintenance for your hearing devices.",
    seoTitle: "Hearing Aid Repair & Maintenance | Linaw Dinig",
    seoDescription:
      "Reliable repair and maintenance for your hearing devices in the Philippines. In-clinic servicing at our Tanay, Cebu, Dasmariñas and La Union branches.",

    intro:
      "Routine maintenance and minor cleaning can be done in-clinic the same day. For more complex issues, we send to the manufacturer and keep you updated every step of the way.",
    quickFacts: [
      { title: "Who it's for", body: "For clients using hearing aid brands we offer." },
      { title: "Turnaround", body: "Often same-day for cleaning and minor fixes. 2 weeks to 1 month for manufacturer repairs." },
      { title: "Cost", body: "A quote is provided before any chargeable work begins — no surprises." },
    ],
    problemsHeading: "Common problems we can help with",
    problemsIntro:
      "A hearing aid that suddenly seems “broken” often just needs a professional clean or a small part replaced. These are the issues we see most:",
    problems: [
      { title: "No sound or weak sound", body: "Often caused by a blocked wax guard, clogged dome or a flat battery. Many of these are fixed in minutes at the clinic — before assuming the worst, have it checked." },
      { title: "Whistling or feedback", body: "Persistent whistling can point to earwax build-up, a loose fit or a damaged tube or dome. We identify the cause and correct it, so wearing your aids is comfortable again." },
      { title: "Distorted or crackling sound", body: "Moisture, debris or an ageing receiver can make speech sound rough or intermittent. In-clinic cleaning and drying resolves many cases; otherwise we coordinate a manufacturer repair." },
      { title: "Charging & battery issues", body: "Devices that won’t charge, drain quickly or switch off unexpectedly. We test the battery and charging contacts and advise whether a repair or replacement part is needed." },
    ],
    careHeading: "Caring for your hearing aids at home",
    careIntro:
      "A few simple habits between visits go a long way toward reaching the typical 3–5 year lifespan of a modern hearing aid:",
    careTips: [
      "Wipe your devices daily with a soft, dry cloth and check the microphone openings for debris.",
      "Store them overnight in a dry, cool place — ideally in a drying kit or dehumidifier, never the bathroom.",
      "Change wax guards and domes regularly, and keep devices away from water, hairspray and direct heat.",
      "If you won’t use battery-powered aids for a while, remove the batteries to prevent corrosion.",
    ],
    closing:
      "Not sure how to do any of the above? Bring your hearing aids to any of our branches in Tanay, Cebu City, Dasmariñas or Rosario, La Union — we’ll walk you through it and give your devices a professional check while you’re there.",
  },
};

export type FollowUpCareContent = BaseContent & {
  intro: string;
  quickFacts: Card[];
  firstWeeksHeading: string;
  firstWeeksParagraphs: string[];
  visitHeading: string;
  visitCards: Card[];
  whenHeading: string;
  whenBullets: string[];
  closing: string;
};

export const SERVICES_FOLLOW_UP_CARE: PageDef<FollowUpCareContent> = {
  key: "services-follow-up-care",
  path: "/services/follow-up-care",
  label: "Follow-up Care",
  group: "Services",
  groups: [
    {
      label: "Introduction",
      fields: [
        { key: "intro", type: "textarea", label: "Opening paragraph" },
        { key: "quickFacts", type: "cards", label: "Quick facts" },
      ],
    },
    {
      label: "First weeks",
      fields: [
        { key: "firstWeeksHeading", type: "text", label: "Heading" },
        { key: "firstWeeksParagraphs", type: "strings", label: "Paragraphs", multiline: true },
      ],
    },
    {
      label: "What a visit includes",
      fields: [
        { key: "visitHeading", type: "text", label: "Heading" },
        { key: "visitCards", type: "cards", label: "Cards" },
      ],
    },
    {
      label: "When to book",
      fields: [
        { key: "whenHeading", type: "text", label: "Heading" },
        { key: "whenBullets", type: "strings", label: "Bullet points", multiline: true },
        { key: "closing", type: "textarea", label: "Closing paragraph" },
      ],
    },
  ],
  defaults: {
    eyebrow: "Services",
    title: "Follow-up Care & Counseling",
    subtitle: "Hearing well is a journey, not a one-time visit. We stay with you every step of the way.",
    seoTitle: "Follow-up Care & Counseling | Linaw Dinig Hearing Aid Center",
    seoDescription:
      "Ongoing support, counseling and fine-tuning to help you adapt to your hearing aids and get the most from your hearing every day — available across our Tanay, Cebu, Dasmariñas and La Union branches.",

    intro:
      "Adjusting to better hearing takes time and support. Our follow-up care helps you adapt to your devices, build confidence in everyday situations, and maximize your hearing potential — with your family supported alongside you.",
    quickFacts: [
      { title: "Who it's for", body: "Anyone adapting to new hearing aids, or returning for regular check-ups and adjustments." },
      { title: "What to expect", body: "Fine-tuning sessions, listening practice, cleaning and friendly guidance whenever you need it." },
      { title: "Family counseling", body: "We educate and support families so everyone can help on the journey to better hearing." },
    ],
    firstWeeksHeading: "The first weeks with new hearing aids",
    firstWeeksParagraphs: [
      "Hearing aids don’t just make sound louder — they reintroduce your brain to sounds it may not have heard clearly for years. In the first weeks, everyday noises like footsteps, running water or rustling paper can seem surprisingly loud. That’s normal, and it settles as your brain re-learns which sounds to focus on and which to tune out.",
      "Follow-up visits are where this adjustment gets easier. Based on your real-world experience — which situations feel great, which still feel hard — your audiologist fine-tunes the programming step by step, so your devices keep matching your life rather than the other way around.",
    ],
    visitHeading: "What a follow-up visit includes",
    visitCards: [
      { title: "Fine-tuning & re-programming", body: "Adjustments based on how your hearing aids perform at home, at work and in noisy places — including updates when your hearing changes over time." },
      { title: "Device check & cleaning", body: "Professional cleaning, wax guard and dome replacement, and a physical check so small issues are caught before they become repairs." },
      { title: "Listening strategies", body: "Practical coaching for the situations that stay difficult — group conversations, restaurants, phone calls and the TV." },
      { title: "Counseling for you & your family", body: "Communication tips for the whole household: getting attention before speaking, facing the listener, and reducing background noise." },
    ],
    whenHeading: "When to book a follow-up",
    whenBullets: [
      "Sounds seem too loud, too soft or different from your last visit.",
      "Your own voice sounds hollow or boomy, or your devices whistle.",
      "You’ve started struggling in situations that used to be fine.",
      "It’s been a year or more since your last hearing check — an annual re-test keeps your programming matched to your current hearing.",
    ],
    closing:
      "Follow-up care is available at all four Linaw Dinig branches in Tanay, Rizal, Cebu City, Dasmariñas City and Rosario, La Union — book online or call the branch nearest you.",
  },
};

export type AssistiveDevicesContent = BaseContent & {
  intro: string;
  quickFacts: Card[];
  whyHeading: string;
  whyBody: string;
  situationsHeading: string;
  situations: Card[];
  matchedHeading: string;
  matchedBody: string;
};

export const SERVICES_ASSISTIVE_LISTENING_DEVICES: PageDef<AssistiveDevicesContent> = {
  key: "services-assistive-listening-devices",
  path: "/services/assistive-listening-devices",
  label: "Assistive Devices",
  group: "Services",
  groups: [
    {
      label: "Introduction",
      fields: [
        { key: "intro", type: "textarea", label: "Opening paragraph" },
        { key: "quickFacts", type: "cards", label: "Quick facts" },
      ],
    },
    {
      label: "Why an accessory helps",
      fields: [
        { key: "whyHeading", type: "text", label: "Heading" },
        { key: "whyBody", type: "textarea", label: "Paragraph" },
      ],
    },
    {
      label: "Situations",
      fields: [
        { key: "situationsHeading", type: "text", label: "Heading" },
        { key: "situations", type: "cards", label: "Cards" },
      ],
    },
    {
      label: "Matched to your hearing aids",
      fields: [
        { key: "matchedHeading", type: "text", label: "Heading" },
        { key: "matchedBody", type: "textarea", label: "Paragraph" },
      ],
    },
  ],
  defaults: {
    eyebrow: "Services",
    title: "Assistive Listening Devices & Accessories",
    subtitle:
      "Extra help for the toughest listening situations — and the accessories that keep your hearing aids at their best.",
    seoTitle: "Assistive Listening Devices & Accessories | Linaw Dinig",
    seoDescription:
      "Assistive listening devices and hearing aid accessories in the Philippines that enhance hearing in challenging environments — TV streamers, remote microphones, chargers, batteries and more.",

    intro:
      "Even the best hearing aids can be supported by the right accessories. We offer assistive listening devices that enhance hearing in noisy rooms, over distance, on the phone and in front of the TV — plus the everyday accessories that keep your devices running reliably.",
    quickFacts: [
      { title: "Streaming & connectivity", body: "TV streamers and phone accessories that send sound straight to your hearing aids." },
      { title: "Remote microphones", body: "Bring distant or noisy conversations closer — ideal for classrooms, meetings and restaurants." },
      { title: "Care & maintenance", body: "Chargers, batteries, domes, wax guards and cleaning kits to keep your devices in top shape." },
    ],
    whyHeading: "Why hearing aids sometimes need a helping hand",
    whyBody:
      "Hearing aids are built to handle conversation at close range, but physics gets in the way in certain situations: the further you are from a sound source, the more room echo and background noise reach your ears before the speech does. Assistive listening devices solve this by picking up sound at its source — the TV, the speaker’s voice, the phone — and delivering it directly to your hearing aids.",
    situationsHeading: "Situations where an accessory makes the difference",
    situations: [
      { title: "Watching TV with the family", body: "A TV streamer sends the audio straight into your hearing aids at your own volume, while everyone else listens at theirs — no more volume-level negotiations." },
      { title: "Meetings, classrooms & church", body: "A remote microphone clipped to the speaker or placed on the table carries their voice across the room, cutting through distance and echo." },
      { title: "Phone & video calls", body: "Direct streaming from a smartphone puts the caller’s voice in both ears at once — usually much clearer than holding the phone to one ear." },
      { title: "Restaurants & gatherings", body: "A table microphone focuses on the voices around it and reduces the clatter, helping you stay in the conversation instead of guessing at it." },
    ],
    matchedHeading: "Matched to your hearing aids",
    matchedBody:
      "Accessories are brand- and model-specific, so the right choice depends on the devices you wear. Bring your hearing aids to any Linaw Dinig branch — in Tanay, Cebu City, Dasmariñas or Rosario, La Union — and we’ll demonstrate the compatible options, help you weigh whether an accessory or a programming adjustment is the better fix, and keep you stocked with the everyday consumables your devices need.",
  },
};
