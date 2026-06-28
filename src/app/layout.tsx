import type { Metadata } from "next";
import "./globals.css";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MusicPlayer } from "@/components/site/MusicPlayer";
import { Providers } from "./providers";

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
      "Free consultations, expert fittings and ongoing hearing care from licensed audiologists across the Philippines.",
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
