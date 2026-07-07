import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-nunito",
});

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
    <html lang="en" className={nunito.variable}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
