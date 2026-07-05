import type { Metadata } from "next";

import { Ear, Headphones, Wrench, HeartHandshake, Volume2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Our Core Services — Hearing Care for Every Age | Linaw Dinig",
  description: "Comprehensive hearing evaluation for adults & children, hearing aid fitting & customization, repair & maintenance, follow-up care, and assistive listening devices in Tanay, Rizal.",
  openGraph: {
    title: "Our Core Services",
    description: "Every service you need under one roof, from qualified clinicians.",
  },
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Services" title="Care for every step of your hearing journey" subtitle="From your first test to lifetime aftercare — we've got every step covered." />
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal><ServiceCard icon={<Ear className="size-6" />} title="Hearing Evaluation" desc="Comprehensive assessments for adults & children." to="/services/hearing-evaluation" /></Reveal>
            <Reveal delay={80}><ServiceCard icon={<Headphones className="size-6" />} title="Hearing Aid Counseling & Fitting" desc="Matched to your lifestyle, hearing loss and budget." to="/services/hearing-aid-fittings" /></Reveal>
            <Reveal delay={160}><ServiceCard icon={<Wrench className="size-6" />} title="Hearing Aid Repair & Maintenance" desc="Reliable repair and maintenance for your hearing devices." to="/services/hearing-aid-repairs" /></Reveal>
            <Reveal delay={240}><ServiceCard icon={<HeartHandshake className="size-6" />} title="Follow-up Care & Counseling" desc="Ongoing support to maximize your hearing." to="/services/follow-up-care" /></Reveal>
            <Reveal delay={320}><ServiceCard icon={<Volume2 className="size-6" />} title="Assistive Listening Devices & Accessories" desc="Enhanced hearing in challenging environments." to="/services/assistive-listening-devices" /></Reveal>
          </div>
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
