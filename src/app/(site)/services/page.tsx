import type { Metadata } from "next";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { ServicesContent } from "@/lib/content/registry";
import { getIcon } from "@/lib/icons";

import { CmsPageHero } from "@/components/site/CmsSubPage";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Reveal } from "@/components/site/Reveal";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("services");
}

export default async function Page() {
  const content = await getPageContent<ServicesContent>("services");

  return (
    <>
      <CmsPageHero pageKey="services" />
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.serviceCards.map((c, i) => {
              const Icon = getIcon(c.icon);
              return (
                <Reveal key={c.title} delay={i * 80}>
                  <ServiceCard icon={<Icon className="size-6" />} title={c.title} desc={c.desc} to={c.href} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
