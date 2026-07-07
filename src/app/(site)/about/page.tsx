import type { Metadata } from "next";
import { pageMetadata } from "@/lib/content/page-content.server";
import Link from "next/link";
import { Target, Eye } from "lucide-react";

import { CmsPageHero } from "@/components/site/CmsSubPage";
import { Team } from "@/components/site/Team";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Reveal } from "@/components/site/Reveal";
import { COMPANY } from "@/lib/company";
const family = "/assets/about-us.webp";
const clinic = "/assets/tanay-front-desk.webp";

const staticMetadata: Metadata = {
  title: "About Us — Trusted Hearing Care in the Philippines",
  description:
    "Meet Linaw Dinig Hearing Aid Center — a trusted provider of hearing healthcare committed to improving quality of life for people with hearing loss since 2021.",
  openGraph: {
    title: "About Linaw Dinig Hearing Aid Center",
    description: "A trusted provider of hearing healthcare solutions in the Philippines.",
  },
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about", staticMetadata);
}

export default function Page() {
  return (
    <>
      <CmsPageHero pageKey="about" />

      <Reveal>
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center md:px-6">
          <div className="overflow-hidden rounded-3xl border border-border shadow-card">
            <img src={family} alt="Three generations of a family laughing together over a shared meal" loading="lazy" width={1408} height={700} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">Established {COMPANY.established}</p>
            <h2 className="mt-2 text-3xl md:text-4xl">About us</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We offer advanced hearing aid technologies, professional hearing assessments, and personalized fitting services to ensure optimal hearing experiences for every client.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Our name, <strong>Linaw Dinig</strong> — which translates to &ldquo;Clear Hearing&rdquo; — reflects our mission to help clients reconnect with the world through improved hearing wellness.
            </p>
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
          <article className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <span aria-hidden className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Target className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl md:text-3xl">Our mission</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              To serve and support individuals with hearing needs, advocate for inclusive access to hearing care, collaborate with partners and communities, and educate families to build a future where better hearing leads to better lives.
            </p>
          </article>
          <article className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <span aria-hidden className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Eye className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl md:text-3xl">Our vision</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              To be the leading hearing aid center in the region — known for integrity, innovation, and exceptional client care. We envision a future where no child is left unheard: championing early intervention, delivering trusted hearing solutions, and empowering families to support every child&rsquo;s journey toward fuller connection and communication.
            </p>
          </article>
        </div>
      </section>
      </Reveal>

      <Reveal><Team /></Reveal>

      <Reveal>
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center md:px-6">
          <div>
            <h2 className="text-3xl md:text-4xl">Our clinics</h2>
            <p className="mt-4 text-lg text-muted-foreground">Calm, warmly lit spaces designed to put you at ease — with branches in Tanay, Cebu, Dasmariñas and La Union so quality hearing care is always within reach.</p>
            <Link href="/about/clinic" className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90">Tour the clinic</Link>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-card">
            <img src={clinic} alt="Front desk of the Linaw Dinig Hearing Aid Center Tanay main office" loading="lazy" width={1000} height={1333} className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>
      </Reveal>
      <Reveal><CtaStrip /></Reveal>
    </>
  );
}
