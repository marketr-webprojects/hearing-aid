import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { TopProgressBar } from "@/components/TopProgressBar";
import { SITE_NAME, OG_IMAGE } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-nunito",
});

const DEFAULT_TITLE =
  "Linaw Dinig Hearing Aid Center — Clear Hearing. Better Living.";
const DEFAULT_DESCRIPTION =
  "Trusted hearing healthcare in the Philippines. Comprehensive hearing tests for adults & children, hearing aid fitting, repairs and follow-up care. Branches in Tanay, Cebu, Dasmariñas & La Union.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  // App icons are provided by src/app/icon.png and src/app/apple-icon.png.
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_PH",
    url: "/",
    images: [OG_IMAGE],
  },
  // No title/description here so per-page cards fall back to each page's
  // og:title / og:description instead of repeating the site default.
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <TopProgressBar />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
