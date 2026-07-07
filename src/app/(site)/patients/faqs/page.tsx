import type { Metadata } from "next";
import { pageMetadata } from "@/lib/content/page-content.server";

import { CmsPageHero } from "@/components/site/CmsSubPage";
import { FAQ } from "@/components/site/FAQ";
import { CtaStrip } from "@/components/site/CtaStrip";
import { FAQS } from "@/lib/faqs";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const staticMetadata: Metadata = {
  title: "FAQs — Hearing Tests, Hearing Aids & More",
  description: "Frequently asked questions about hearing tests, hearing aids, costs, trials and more.",
  openGraph: {
    title: "FAQs",
    description: "Answers to the questions we're asked most.",
  },
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("patients-faqs", staticMetadata);
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CmsPageHero pageKey="patients-faqs" />
      <FAQ />
      <CtaStrip />
    </>
  );
}
