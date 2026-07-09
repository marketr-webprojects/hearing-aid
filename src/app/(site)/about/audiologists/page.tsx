import type { Metadata } from "next";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { AboutAudiologistsContent } from "@/lib/content/registry";

import { CmsPageHero } from "@/components/site/CmsSubPage";
import { Team } from "@/components/site/Team";
import { CtaStrip } from "@/components/site/CtaStrip";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about-audiologists");
}

export default async function Page() {
  const c = await getPageContent<AboutAudiologistsContent>("about-audiologists");

  return (
    <>
      <CmsPageHero pageKey="about-audiologists" />
      <section className="bg-background pt-14 md:pt-20">
        <div className="mx-auto max-w-4xl space-y-6 px-4 text-lg leading-relaxed text-foreground md:px-6">
          {c.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
      <Team />
      <CtaStrip />
    </>
  );
}
