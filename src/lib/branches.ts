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
};

const OPENING_HOURS: Record<string, string> = {
  tanay: "Mo-Fr 09:00-17:00",
  cebu: "Mo-Fr 09:00-17:00",
  "la-union": "Mo-Fr 09:00-16:00",
};

export const DEFAULT_BRANCHES: Branch[] = COMPANY_BRANCHES.map((b) => ({
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
}));
