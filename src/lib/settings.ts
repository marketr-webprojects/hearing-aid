// Client-safe settings types + defaults. The server reader lives in
// settings.server.ts (do not import that from "use client" components).
import { COMPANY } from "@/lib/company";

export type SiteSettings = {
  name: string;
  shortName: string;
  tagline: string;
  nameMeaning: string;
  established: string;
  email: string;
  phone: string;
  social: {
    tiktok: string;
    tiktokHref: string;
  };
  disclaimer: string;
};

export const SETTINGS_DEFAULTS: SiteSettings = {
  name: COMPANY.name,
  shortName: COMPANY.shortName,
  tagline: COMPANY.tagline,
  nameMeaning: COMPANY.nameMeaning,
  established: COMPANY.established,
  email: COMPANY.email,
  phone: COMPANY.phone,
  social: {
    tiktok: COMPANY.social.tiktok,
    tiktokHref: COMPANY.social.tiktokHref,
  },
  disclaimer:
    "Linaw Dinig Hearing Aid Center audiologists are qualified practitioners. All information on this site is general in nature and not a substitute for professional advice.",
};

/** "0917 553 2999" → "tel:+639175532999" (Philippine numbers). */
export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return `tel:${digits}`;
  if (digits.startsWith("0")) return `tel:+63${digits.slice(1)}`;
  return `tel:${digits}`;
}
