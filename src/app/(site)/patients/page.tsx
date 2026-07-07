import type { Metadata } from "next";
import { pageMetadata } from "@/lib/content/page-content.server";
import Link from "next/link";

import { CmsPageHero } from "@/components/site/CmsSubPage";
import { CtaStrip } from "@/components/site/CtaStrip";

const staticMetadata: Metadata = {
  title: "For Patients — New Patient Info, What to Expect & FAQs",
  description: "Everything you need to know before your first visit — what to expect, FAQs and forms.",
  openGraph: {
    title: "For Patients",
    description: "What to expect, FAQs and resources for new and existing patients.",
  },
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("patients", staticMetadata);
}

export default function Page() {
  return (
    <>
      <CmsPageHero pageKey="patients" />
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-5 px-4 sm:grid-cols-2 md:px-6">
          {[
            { to: "/patients/new-patient-info", title: "New Patient Info", desc: "Forms, what to bring and how to prepare." },
            { to: "/patients/what-to-expect", title: "What to Expect", desc: "A friendly walk-through of your first visit." },
            { to: "/patients/faqs", title: "FAQs", desc: "Quick answers to common questions." },
          ].map((c) => (
            <Link key={c.to} href={c.to} className="rounded-3xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft">
              <h3 className="text-xl">{c.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{c.desc}</p>
              <span className="mt-4 inline-block text-sm font-bold text-primary">Read more →</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
