import type { Metadata } from "next";
import "./globals.css";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MusicPlayer } from "@/components/site/MusicPlayer";
import { Providers } from "./providers";
import { COMPANY, BRANCHES } from "@/lib/company";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Machine-readable hours per branch (Dasma is by appointment, so omitted).
const OPENING_HOURS: Record<string, string | undefined> = {
  Tanay: "Mo-Fr 09:00-17:00",
  Cebu: "Mo-Fr 09:00-17:00",
  "La Union": "Mo-Fr 09:00-16:00",
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@graph": BRANCHES.map((b) => ({
    "@type": "MedicalBusiness",
    name: `${COMPANY.name} — ${b.shortName}`,
    parentOrganization: { "@type": "Organization", name: COMPANY.name, url: SITE_URL },
    url: SITE_URL,
    logo: `${SITE_URL}/linawdinig-logo.webp`,
    telephone: b.phone,
    email: COMPANY.email,
    address: { "@type": "PostalAddress", streetAddress: b.address, addressCountry: "PH" },
    ...(OPENING_HOURS[b.shortName] ? { openingHours: OPENING_HOURS[b.shortName] } : {}),
    sameAs: [b.facebookHref, COMPANY.social.tiktokHref],
  })),
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  icons: {
    icon: [{ url: "/LDregistered.webp", type: "image/webp" }],
    shortcut: ["/LDregistered.webp"],
    apple: [{ url: "/LDregistered.webp" }],
  },
  title: "Linaw Dinig Hearing Aid Center — Clear Hearing. Better Living.",
  description:
    "Trusted hearing healthcare in the Philippines. Comprehensive hearing tests for adults & children, hearing aid fitting, repairs and follow-up care. Branches in Tanay, Cebu, Dasmariñas & La Union.",
  openGraph: {
    title: "Linaw Dinig Hearing Aid Center — Clear Hearing. Better Living.",
    description:
      "Expert hearing tests, fittings and ongoing hearing care from qualified audiologists across the Philippines.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
        />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
      </head>
      <body>
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <MusicPlayer />
        </Providers>
      </body>
    </html>
  );
}
