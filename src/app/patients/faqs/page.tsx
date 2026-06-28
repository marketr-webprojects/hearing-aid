import type { Metadata } from "next";

import { PageHero } from "@/components/site/PageHero";
import { FAQ } from "@/components/site/FAQ";
import { CtaStrip } from "@/components/site/CtaStrip";

export const metadata: Metadata = {
  title: "FAQs — Hearing Tests, Hearing Aids & More",
  description: "Frequently asked questions about hearing tests, hearing aids, costs, rebates, trials and more.",
  openGraph: {
    title: "FAQs",
    description: "Answers to the questions we're asked most.",
  },
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="For Patients" title="Frequently Asked Questions" subtitle="Quick, honest answers to the things people ask us most." />
      <FAQ />
      <CtaStrip />
    </>
  );
}
