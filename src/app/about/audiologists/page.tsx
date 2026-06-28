import type { Metadata } from "next";

import { PageHero } from "@/components/site/PageHero";
import { Team } from "@/components/site/Team";
import { CtaStrip } from "@/components/site/CtaStrip";

export const metadata: Metadata = {
  title: "Our Audiologists — Linaw Dinig Hearing Aid Center",
  description: "Meet the qualified, registered audiologists and hearing instrument specialists at Linaw Dinig Hearing Aid Center.",
  openGraph: {
    title: "Our Audiologists",
    description: "Meet our qualified, friendly clinicians.",
  },
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="About" title="Our Audiologists" subtitle="Friendly, qualified clinicians who genuinely care about you hearing well — for the long run." />
      <Team />
      <CtaStrip />
    </>
  );
}
