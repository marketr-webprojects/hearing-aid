import { getBranches } from "@/lib/branches.server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

const LEADING_PATHS = ["/", "/book"];

const TRAILING_PATHS = [
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

export async function GET() {
  const branches = await getBranches();
  const paths = [
    ...LEADING_PATHS,
    ...branches.map((b) => `/branches/${b.slug}`),
    ...TRAILING_PATHS,
  ];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...paths.map(
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
