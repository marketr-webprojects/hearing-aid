import type { Metadata } from "next";
import { pageMetadata } from "@/lib/content/page-content.server";

import { CmsPageHero } from "@/components/site/CmsSubPage";
import { Team } from "@/components/site/Team";
import { CtaStrip } from "@/components/site/CtaStrip";

const staticMetadata: Metadata = {
  title: "Our Audiologists — Linaw Dinig Hearing Aid Center",
  description: "Meet the qualified, registered audiologists and hearing instrument specialists at Linaw Dinig Hearing Aid Center.",
  openGraph: {
    title: "Our Audiologists",
    description: "Meet our qualified, friendly clinicians.",
  },
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about-audiologists", staticMetadata);
}

export default function Page() {
  return (
    <>
      <CmsPageHero pageKey="about-audiologists" />
      <section className="bg-background pt-14 md:pt-20">
        <div className="mx-auto max-w-4xl space-y-6 px-4 text-lg leading-relaxed text-foreground md:px-6">
          <p>
            Hearing care is personal — the same test result can mean very different things for a tricycle driver, a
            teacher and a toddler. That&rsquo;s why every Linaw Dinig branch is run by clinicians who take time to
            understand your daily life before recommending anything.
          </p>
          <p>
            Our team is led by an audiologist with a Master in Clinical Audiology from the University of Santo Tomas
            and specialized training in pediatric audiology, supported by audiometrists in Tanay, Cebu and La Union
            with certifications in newborn hearing screening and dedicated training for working with children with
            special needs. Between them, they care for patients at every stage of life — from a baby&rsquo;s first
            hearing screening to fine-tuning a grandparent&rsquo;s hearing aids.
          </p>
          <p>
            Whichever branch you visit, the approach is the same: unhurried appointments, plain-language explanations,
            and honest recommendations based on your hearing, lifestyle and budget.
          </p>
        </div>
      </section>
      <Team />
      <CtaStrip />
    </>
  );
}
