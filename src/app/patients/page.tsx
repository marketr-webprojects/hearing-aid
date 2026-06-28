import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/site/PageHero";
import { CtaStrip } from "@/components/site/CtaStrip";

export const metadata: Metadata = {
  title: "For Patients — New Patient Info, What to Expect & FAQs",
  description: "Everything you need to know before your first visit — what to expect, FAQs and forms.",
  openGraph: {
    title: "For Patients",
    description: "What to expect, FAQs and resources for new and existing patients.",
  },
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="For Patients" title="A warm welcome — before you even arrive" subtitle="We've put everything you need in one place. Here's what to expect and how to get the most out of your visit." />
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
