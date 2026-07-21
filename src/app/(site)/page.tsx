import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, getPageContent, getSharedContent } from "@/lib/content/page-content.server";
import type { HomeContent } from "@/lib/content/registry";
import { getBranches } from "@/lib/branches.server";
import { getIcon } from "@/lib/icons";

import { TrustBar } from "@/components/site/TrustBar";
import { ServiceCard } from "@/components/site/ServiceCard";
import { BrandStrip } from "@/components/site/BrandStrip";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Testimonials } from "@/components/site/Testimonials";
import { Team } from "@/components/site/Team";
import { FAQ } from "@/components/site/FAQ";
import { HearingQuiz } from "@/components/site/HearingQuiz";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Reveal } from "@/components/site/Reveal";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("home");
}

export default async function HomePage() {
  const [content, shared, branches] = await Promise.all([
    getPageContent<HomeContent>("home"),
    getSharedContent(),
    getBranches(),
  ]);

  // The badge links to the main branch's Google reviews (falling back to any
  // branch that has a reviews link), so it can't drift from the Branches table.
  const reviewsHref =
    branches.find((b) => b.main && b.reviewsHref)?.reviewsHref ??
    branches.find((b) => b.reviewsHref)?.reviewsHref;

  return (
    <>
      <Hero content={content} reviewsHref={reviewsHref} />
      <Reveal><HearingQuiz questions={shared.quizQuestions} /></Reveal>
      <Reveal><TrustBar /></Reveal>
      <Reveal><ServicesOverview content={content} /></Reveal>
      <Reveal><BrandStrip /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><Team /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal><CtaStrip /></Reveal>
    </>
  );
}

function Hero({ content, reviewsHref }: { content: HomeContent; reviewsHref?: string }) {
  return (
    <section className="bg-gradient-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:gap-12 md:px-6 md:py-20 lg:py-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">
            {content.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl text-foreground md:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground md:text-xl">
            {content.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-cta px-7 py-4 text-base font-bold text-cta-foreground shadow-soft hover:bg-cta-hover">
              {content.heroPrimaryCta}
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center rounded-full border-2 border-primary px-7 py-4 text-base font-bold text-primary hover:bg-primary-soft">
              {content.heroSecondaryCta}
            </Link>
          </div>
          <p className="mt-5 text-sm font-semibold text-muted-foreground">
            {content.trustLine}
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
            <img
              src={content.heroImage}
              alt={content.heroImageAlt}
              width={1536}
              height={1024}
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          {reviewsHref && (
            <a
              href={reviewsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:border-primary/40 md:block"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-primary/80">{content.reviewsLabel}</p>
              <p className="mt-1 text-2xl font-extrabold text-foreground">{content.reviewsRating} ★★★★★</p>
              <p className="text-xs text-muted-foreground">{content.reviewsCaption}</p>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function ServicesOverview({ content }: { content: HomeContent }) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">{content.servicesEyebrow}</p>
          <h2 className="mt-2 text-3xl md:text-4xl">{content.servicesTitle}</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.serviceCards.map((c) => {
            const Icon = getIcon(c.icon);
            return (
              <ServiceCard
                key={c.title}
                icon={<Icon className="size-6" />}
                title={c.title}
                desc={c.desc}
                to={c.href}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
