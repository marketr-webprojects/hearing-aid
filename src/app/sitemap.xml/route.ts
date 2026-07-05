import { BRANCHES } from "@/lib/company";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

const PATHS = [
  "/",
  "/book",
  ...BRANCHES.map((b) => `/branches/${b.slug}`),
  "/services",
  "/services/hearing-evaluation",
  "/services/hearing-aid-fittings",
  "/services/hearing-aid-repairs",
  "/services/follow-up-care",
  "/services/assistive-listening-devices",
  "/patients",
  "/patients/new-patient-info",
  "/patients/what-to-expect",
  "/patients/faqs",
  "/about",
  "/about/audiologists",
  "/about/clinic",
  "/about/why-choose-us",
];

export function GET() {
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...PATHS.map(
      (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
    ),
    `</urlset>`,
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
