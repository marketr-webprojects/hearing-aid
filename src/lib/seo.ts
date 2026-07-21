// Shared SEO constants. Safe to import from both server and client components.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Linaw Dinig Hearing Aid Center";

/** Default social-share image (generated 1200×630, lives in /public). */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Linaw Dinig Hearing Aid Center — Clear Hearing. Better Living.",
} as const;
