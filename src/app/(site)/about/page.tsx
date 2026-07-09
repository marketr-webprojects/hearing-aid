import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { AboutContent } from "@/lib/content/registry";
import { getSettings } from "@/lib/settings.server";
import { getIcon } from "@/lib/icons";

import { CmsPageHero } from "@/components/site/CmsSubPage";
import { Team } from "@/components/site/Team";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Reveal } from "@/components/site/Reveal";

const MISSION_VISION_ICONS = ["Target", "Eye"];

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about");
}

export default async function Page() {
  const [c, settings] = await Promise.all([
    getPageContent<AboutContent>("about"),
    getSettings(),
  ]);

  return (
    <>
      <CmsPageHero pageKey="about" />

      <Reveal>
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center md:px-6">
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <img src={c.storyImage} alt={c.storyImageAlt} loading="lazy" width={1408} height={700} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">Established {settings.established}</p>
              <h2 className="mt-2 text-3xl md:text-4xl">{c.storyHeading}</h2>
              {c.storyParagraphs.map((p, i) => (
                <p key={i} className="mt-4 text-lg text-muted-foreground">{p}</p>
              ))}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/about/audiologists" className="rounded-full border-2 border-primary px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary-soft">Meet our audiologists</Link>
                <Link href="/about/why-choose-us" className="rounded-full border-2 border-primary px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary-soft">Why choose us</Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-muted py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2 md:px-6">
            {c.missionVision.map((panel, i) => {
              const Icon = getIcon(MISSION_VISION_ICONS[i]);
              return (
                <article key={panel.title} className="rounded-3xl border border-border bg-card p-8 shadow-card">
                  <span aria-hidden className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <Icon className="size-6" />
                  </span>
                  <h2 className="mt-5 text-2xl md:text-3xl">{panel.title}</h2>
                  <p className="mt-4 text-lg text-muted-foreground">{panel.body}</p>
                </article>
              );
            })}
          </div>
        </section>
      </Reveal>

      <Reveal><Team /></Reveal>

      <Reveal>
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center md:px-6">
            <div>
              <h2 className="text-3xl md:text-4xl">{c.clinicsHeading}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{c.clinicsBody}</p>
              <Link href="/about/clinic" className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90">{c.clinicsCta}</Link>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <img src={c.clinicsImage} alt={c.clinicsImageAlt} loading="lazy" width={1000} height={1333} className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal><CtaStrip /></Reveal>
    </>
  );
}
