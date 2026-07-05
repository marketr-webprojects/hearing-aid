import type { Metadata } from "next";
import Link from "next/link";

import { Ear, Headphones, Wrench, HeartHandshake, Volume2 } from "lucide-react";
const heroImg = "/assets/hero-audiologist.webp";
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

export const metadata: Metadata = {
  title: "Linaw Dinig Hearing Aid Center — Hearing Tests & Hearing Aids in Tanay, Rizal",
  description: "Trusted hearing care offering comprehensive hearing evaluation for adults & children, hearing aid counseling & fitting, repair & maintenance, follow-up care and assistive listening devices. Book your consultation today.",
  openGraph: {
    title: "Linaw Dinig Hearing Aid Center — Clear Hearing. Better Living.",
    description: "Independent audiology clinic in Tanay, Rizal. Expert hearing tests, fittings and ongoing care.",
    images: ["/og-home.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal><HearingQuiz /></Reveal>
      <Reveal><TrustBar /></Reveal>
      <Reveal><ServicesOverview /></Reveal>
      <Reveal><BrandStrip /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><Team /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal><CtaStrip /></Reveal>
    </>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:gap-12 md:px-6 md:py-20 lg:py-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">
            Trusted Hearing Care · 4 Branches Nationwide
          </p>
          <h1 className="mt-3 text-4xl text-foreground md:text-5xl lg:text-6xl">
            Hear More of Who Matters
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground md:text-xl">
            Expert hearing tests, hearing aid fittings and after care with our main office in Tanay, Rizal and branches in Cebu City, Dasmariñas City, Cavite and Rosario, La Union.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-cta px-7 py-4 text-base font-bold text-cta-foreground shadow-soft hover:bg-cta-hover">
              Book a Hearing Test
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center rounded-full border-2 border-primary px-7 py-4 text-base font-bold text-primary hover:bg-primary-soft">
              Explore Our Services
            </Link>
          </div>
          <p className="mt-5 text-sm font-semibold text-muted-foreground">
            Trusted by 5,000+ patients · Qualified Audiologists · Independent Private Practice
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
            <img
              src={heroImg}
              alt="Audiologist smiling with an elderly patient in a warmly lit clinic room"
              width={1536}
              height={1024}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <a
            href="https://tinyurl.com/Tanay-Reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:border-primary/40 md:block"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-primary/80">Google Reviews</p>
            <p className="mt-1 text-2xl font-extrabold text-foreground">4.9 ★★★★★</p>
            <p className="text-xs text-muted-foreground">across our branches</p>
          </a>
        </div>
      </div>
    </section>
  );
}

function ServicesOverview() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">What we do</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Care for every stage of your hearing journey</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard icon={<Ear className="size-6" />} title="Hearing Evaluation" desc="Comprehensive assessments for adults & children." to="/services/hearing-evaluation" />
          <ServiceCard icon={<Headphones className="size-6" />} title="Hearing Aid Counseling & Fitting" desc="Matched to your lifestyle, hearing loss and budget." to="/services/hearing-aid-fittings" />
          <ServiceCard icon={<Wrench className="size-6" />} title="Hearing Aid Repair & Maintenance" desc="Reliable repair and maintenance for your hearing devices." to="/services/hearing-aid-repairs" />
          <ServiceCard icon={<HeartHandshake className="size-6" />} title="Follow-up Care & Counseling" desc="Ongoing support to maximize your hearing." to="/services/follow-up-care" />
          <ServiceCard icon={<Volume2 className="size-6" />} title="Assistive Listening Devices & Accessories" desc="Enhanced hearing in challenging environments." to="/services/assistive-listening-devices" />
        </div>
      </div>
    </section>
  );
}
