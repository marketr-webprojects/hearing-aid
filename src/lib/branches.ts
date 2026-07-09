// Client-safe branch types + defaults. The server reader lives in
// branches.server.ts (do not import that from "use client" components).
import { BRANCHES as COMPANY_BRANCHES } from "@/lib/company";

export type Branch = {
  slug: string;
  name: string;
  shortName: string;
  main?: boolean;
  address: string;
  phone: string;
  phoneHref: string;
  hours: string;
  /** Machine-readable hours for JSON-LD, e.g. "Mo-Fr 09:00-17:00". Empty = by appointment. */
  openingHours?: string;
  access: string;
  facebookLabel: string;
  facebookHref: string;
  reviewsHref?: string;
  image: string;
  /** Copy for the branch's own /branches/[slug] page. */
  place: string;
  heroSubtitle: string;
  about: string[];
  seoTitle: string;
  seoDescription: string;
};

const OPENING_HOURS: Record<string, string> = {
  tanay: "Mo-Fr 09:00-17:00",
  cebu: "Mo-Fr 09:00-17:00",
  "la-union": "Mo-Fr 09:00-16:00",
};

type BranchPageCopy = {
  place: string;
  heroSubtitle: string;
  about: string[];
  seoDescription: string;
};

/**
 * In-code fallback for the branch-page copy now stored on the branches table.
 * Used when a row has no copy of its own — i.e. before supabase/all.sql has
 * been re-run to add and backfill the columns. Same rule as the other tables:
 * blank in the DB means "use the built-in copy".
 */
export const BRANCH_PAGE_COPY: Record<string, BranchPageCopy> = {
  tanay: {
    place: "Tanay, Rizal",
    heroSubtitle:
      "Our main office — serving Tanay, Baras, Pililla, Morong, Antipolo and the wider Rizal province since June 2021.",
    about: [
      "The Tanay branch is where Linaw Dinig began in June 2021, and it remains our main office today. You'll find us at the G-Complex along Sampaloc Road in Brgy. Plaza Aldea — with ample parking and a wheelchair-accessible entrance, so getting to your appointment is the easy part.",
      "As the main office, Tanay offers our complete range of services: comprehensive hearing evaluations for adults and children, newborn hearing screening, hearing aid counseling and fitting, in-clinic repairs and maintenance, and ongoing follow-up care. Our lead audiologist and Tanay-based audiometrist Rica Roxas — a certified newborn hearing screening personnel — see patients here Monday to Friday.",
      "Patients have rated the Tanay branch 4.9 out of 5 on Google. If you're anywhere in Rizal province and searching for a hearing test or hearing aids near you, this is your branch.",
    ],
    seoDescription:
      "Visit the Linaw Dinig Hearing Aid Center main office in Tanay, Rizal — hearing tests for adults and children, hearing aid counseling & fitting, repairs and follow-up care. Rated 4.9 on Google.",
  },
  cebu: {
    place: "Cebu City",
    heroSubtitle:
      "Our home in the Visayas — quality hearing care for Cebu City and neighboring communities.",
    about: [
      "Our Cebu branch brings Linaw Dinig's hearing care to the Visayas. We're located on the 3rd floor of Anchor Lab Medical Center in the Aspac Building along N. Bacalso Avenue, Sambag I — a familiar medical hub that's easy to reach from most of Cebu City. Parking nearby is limited, so commuting or being dropped off is often the easier option; note that the clinic is not wheelchair accessible.",
      "The branch is home to audiometrist Hannah Pason, trained in supporting children with special needs and in spotting red flags of developmental delay — so both adult and pediatric patients are in good hands. Hearing evaluations, hearing aid counseling and fitting, repairs and follow-up care are all available here Monday to Friday.",
      "Cebu patients have given the branch a 5.0 rating on Google. If you're searching for a hearing test or hearing aid center in Cebu City, come visit — no referral needed.",
    ],
    seoDescription:
      "Linaw Dinig Hearing Aid Center Cebu — hearing tests, hearing aid counseling & fitting, repairs and follow-up care inside Anchor Lab Medical Center on N. Bacalso Avenue, Cebu City. Rated 5.0 on Google.",
  },
  dasmarinas: {
    place: "Dasmariñas City, Cavite",
    heroSubtitle:
      "Hearing care for Cavite — so patients from Dasmariñas, Imus, Bacoor and beyond don't have to travel far.",
    about: [
      "Our Dasmariñas branch serves the whole of Cavite, located on the 2nd floor of JaroMed and Diagnostic Center in the GRJ Jaro Building along Aguinaldo Highway, Salitran I. The clinic is wheelchair accessible; parking space is limited, so allow a few extra minutes if you're driving.",
      "This branch operates by appointment between 9AM and 5PM — which means no long waits: your time slot is yours. Booking ahead by phone or through our online form guarantees you're seen at the Dasma clinic, not mistakenly listed at another branch.",
      "Patients here have rated the branch 5.0 on Google, praising the gentle, clearly explained testing. Hearing evaluations, hearing aid counseling and fitting, repairs and follow-up care are all available — if you're in Cavite and searching for a hearing center near you, this is the one.",
    ],
    seoDescription:
      "Linaw Dinig Hearing Aid Center Dasma — hearing tests, hearing aid counseling & fitting, repairs and follow-up care inside JaroMed & Diagnostic Center on Aguinaldo Highway, Dasmariñas, Cavite. By appointment.",
  },
  "la-union": {
    place: "Rosario, La Union",
    heroSubtitle:
      "Bringing quality hearing care to North Luzon — Rosario, the rest of La Union, and neighboring Pangasinan and Baguio.",
    about: [
      "Our newest branch brings Linaw Dinig to North Luzon. We hold clinic inside Rosario Diagnostic Center along MacArthur Highway in Rosario, La Union — right on the main route, easy to find whether you're coming from the coast or down from Baguio. Parking is limited and wheelchair mobility within the facility is limited, so let us know when booking if you need assistance.",
      "The branch is run by audiometrist Jah Estoque — a Registered Midwife with special training in supporting children with special needs, which makes her especially well-suited to newborn hearing screening and pediatric visits. Clinic hours are Monday to Friday, 9AM to 4PM.",
      "Hearing evaluations, hearing aid counseling and fitting, repairs and follow-up care are all available here, with the full support of our main office behind every visit. If you're in La Union or nearby provinces searching for a hearing test, we'd love to welcome you.",
    ],
    seoDescription:
      "Linaw Dinig Hearing Aid Center La Union — hearing tests, hearing aid counseling & fitting, repairs and follow-up care inside Rosario Diagnostic Center on MacArthur Highway, Rosario, La Union.",
  },
};

/** Display name without the "(Main Office)" suffix, e.g. "Tanay, Rizal". */
export function placeOf(branch: Pick<Branch, "name" | "place">): string {
  return branch.place || branch.name.replace(" (Main Office)", "");
}

export const DEFAULT_BRANCHES: Branch[] = COMPANY_BRANCHES.map((b) => {
  const copy = BRANCH_PAGE_COPY[b.slug];
  return {
    slug: b.slug,
    name: b.name,
    shortName: b.shortName,
    main: b.main,
    address: b.address,
    phone: b.phone,
    phoneHref: b.phoneHref,
    hours: b.hours,
    openingHours: OPENING_HOURS[b.slug],
    access: b.access,
    facebookLabel: b.facebookLabel,
    facebookHref: b.facebookHref,
    reviewsHref: b.reviewsHref,
    image: b.image,
    place: copy?.place ?? "",
    heroSubtitle: copy?.heroSubtitle ?? "",
    about: copy?.about ?? [],
    seoTitle: "",
    seoDescription: copy?.seoDescription ?? "",
  };
});
