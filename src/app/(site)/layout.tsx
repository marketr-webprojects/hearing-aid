import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MusicPlayer } from "@/components/site/MusicPlayer";
import { SettingsProvider } from "@/components/site/SettingsProvider";
import { getSettings } from "@/lib/settings.server";
import { getBranches } from "@/lib/branches.server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, branches] = await Promise.all([getSettings(), getBranches()]);

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@graph": branches.map((b) => ({
      "@type": "MedicalBusiness",
      name: `${settings.name} — ${b.shortName}`,
      parentOrganization: { "@type": "Organization", name: settings.name, url: SITE_URL },
      url: SITE_URL,
      logo: `${SITE_URL}/linawdinig-logo.webp`,
      telephone: b.phone,
      email: settings.email,
      address: { "@type": "PostalAddress", streetAddress: b.address, addressCountry: "PH" },
      ...(b.openingHours ? { openingHours: b.openingHours } : {}),
      sameAs: [b.facebookHref, settings.social.tiktokHref].filter(Boolean),
    })),
  };

  return (
    <SettingsProvider settings={settings} branches={branches}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
      <MusicPlayer />
    </SettingsProvider>
  );
}
