import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { PatientsContent } from "@/lib/content/registry";

import { CmsPageHero } from "@/components/site/CmsSubPage";
import { CtaStrip } from "@/components/site/CtaStrip";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("patients");
}

export default async function Page() {
  const c = await getPageContent<PatientsContent>("patients");

  return (
    <>
      <CmsPageHero pageKey="patients" />
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-5 px-4 sm:grid-cols-2 md:px-6">
          {c.cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-3xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
            >
              <h3 className="text-xl">{card.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{card.body}</p>
              <span className="mt-4 inline-block text-sm font-bold text-primary">Read more →</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
