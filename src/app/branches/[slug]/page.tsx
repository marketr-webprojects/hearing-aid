import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Clock, Accessibility, Facebook, Star, Ear, Headphones, Wrench, HeartHandshake, Volume2 } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Reveal } from "@/components/site/Reveal";
import { BRANCHES } from "@/lib/company";

// Unique, branch-specific copy — one entry per BRANCHES slug. Facts only:
// locations, co-located facilities, staff assignments and ratings all come
// from the company profile, client notes and the branches' Google listings.
const CONTENT: Record<
  string,
  { place: string; metaDescription: string; heroSubtitle: string; about: string[] }
> = {
  tanay: {
    place: "Tanay, Rizal",
    metaDescription:
      "Visit the Linaw Dinig Hearing Aid Center main office in Tanay, Rizal — hearing tests for adults and children, hearing aid counseling & fitting, repairs and follow-up care. Rated 4.9 on Google.",
    heroSubtitle:
      "Our main office — serving Tanay, Baras, Pililla, Morong, Antipolo and the wider Rizal province since June 2021.",
    about: [
      "The Tanay branch is where Linaw Dinig began in June 2021, and it remains our main office today. You'll find us at the G-Complex along Sampaloc Road in Brgy. Plaza Aldea — with ample parking and a wheelchair-accessible entrance, so getting to your appointment is the easy part.",
      "As the main office, Tanay offers our complete range of services: comprehensive hearing evaluations for adults and children, newborn hearing screening, hearing aid counseling and fitting, in-clinic repairs and maintenance, and ongoing follow-up care. Our lead audiologist and Tanay-based audiometrist Rica Roxas — a certified newborn hearing screening personnel — see patients here Monday to Friday.",
      "Patients have rated the Tanay branch 4.9 out of 5 on Google. If you're anywhere in Rizal province and searching for a hearing test or hearing aids near you, this is your branch.",
    ],
  },
  cebu: {
    place: "Cebu City",
    metaDescription:
      "Linaw Dinig Hearing Aid Center Cebu — hearing tests, hearing aid counseling & fitting, repairs and follow-up care inside Anchor Lab Medical Center on N. Bacalso Avenue, Cebu City. Rated 5.0 on Google.",
    heroSubtitle:
      "Our home in the Visayas — quality hearing care for Cebu City and neighboring communities.",
    about: [
      "Our Cebu branch brings Linaw Dinig's hearing care to the Visayas. We're located on the 3rd floor of Anchor Lab Medical Center in the Aspac Building along N. Bacalso Avenue, Sambag I — a familiar medical hub that's easy to reach from most of Cebu City. Parking nearby is limited, so commuting or being dropped off is often the easier option; note that the clinic is not wheelchair accessible.",
      "The branch is home to audiometrist Hannah Pason, trained in supporting children with special needs and in spotting red flags of developmental delay — so both adult and pediatric patients are in good hands. Hearing evaluations, hearing aid counseling and fitting, repairs and follow-up care are all available here Monday to Friday.",
      "Cebu patients have given the branch a 5.0 rating on Google. If you're searching for a hearing test or hearing aid center in Cebu City, come visit — no referral needed.",
    ],
  },
  dasmarinas: {
    place: "Dasmariñas City, Cavite",
    metaDescription:
      "Linaw Dinig Hearing Aid Center Dasma — hearing tests, hearing aid counseling & fitting, repairs and follow-up care inside JaroMed & Diagnostic Center on Aguinaldo Highway, Dasmariñas, Cavite. By appointment.",
    heroSubtitle:
      "Hearing care for Cavite — so patients from Dasmariñas, Imus, Bacoor and beyond don't have to travel far.",
    about: [
      "Our Dasmariñas branch serves the whole of Cavite, located on the 2nd floor of JaroMed and Diagnostic Center in the GRJ Jaro Building along Aguinaldo Highway, Salitran I. The clinic is wheelchair accessible; parking space is limited, so allow a few extra minutes if you're driving.",
      "This branch operates by appointment between 9AM and 5PM — which means no long waits: your time slot is yours. Booking ahead by phone or through our online form guarantees you're seen at the Dasma clinic, not mistakenly listed at another branch.",
      "Patients here have rated the branch 5.0 on Google, praising the gentle, clearly explained testing. Hearing evaluations, hearing aid counseling and fitting, repairs and follow-up care are all available — if you're in Cavite and searching for a hearing center near you, this is the one.",
    ],
  },
  "la-union": {
    place: "Rosario, La Union",
    metaDescription:
      "Linaw Dinig Hearing Aid Center La Union — hearing tests, hearing aid counseling & fitting, repairs and follow-up care inside Rosario Diagnostic Center on MacArthur Highway, Rosario, La Union.",
    heroSubtitle:
      "Bringing quality hearing care to North Luzon — Rosario, the rest of La Union, and neighboring Pangasinan and Baguio.",
    about: [
      "Our newest branch brings Linaw Dinig to North Luzon. We hold clinic inside Rosario Diagnostic Center along MacArthur Highway in Rosario, La Union — right on the main route, easy to find whether you're coming from the coast or down from Baguio. Parking is limited and wheelchair mobility within the facility is limited, so let us know when booking if you need assistance.",
      "The branch is run by audiometrist Jah Estoque — a Registered Midwife with special training in supporting children with special needs, which makes her especially well-suited to newborn hearing screening and pediatric visits. Clinic hours are Monday to Friday, 9AM to 4PM.",
      "Hearing evaluations, hearing aid counseling and fitting, repairs and follow-up care are all available here, with the full support of our main office behind every visit. If you're in La Union or nearby provinces searching for a hearing test, we'd love to welcome you.",
    ],
  },
};

export function generateStaticParams() {
  return BRANCHES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = CONTENT[slug];
  if (!content) return {};
  return {
    title: `Hearing Tests & Hearing Aids in ${content.place} | Linaw Dinig`,
    description: content.metaDescription,
    openGraph: {
      title: `Linaw Dinig Hearing Aid Center — ${content.place}`,
      description: content.metaDescription,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branch = BRANCHES.find((b) => b.slug === slug);
  const content = CONTENT[slug];
  if (!branch || !content) notFound();

  return (
    <>
      <PageHero
        eyebrow="Our Clinics"
        title={`Hearing Tests & Hearing Aids in ${content.place}`}
        subtitle={content.heroSubtitle}
      />

      <Reveal>
        <section className="bg-background py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-start md:px-6">
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <img
                src={branch.image}
                alt={`Map showing the location of Linaw Dinig Hearing Aid Center in ${content.place}`}
                loading="lazy"
                width={900}
                height={900}
                className="w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl">Visit us</h2>
              <ul className="mt-5 space-y-4 text-lg text-muted-foreground">
                <li className="flex gap-3">
                  <MapPin className="mt-1 size-5 shrink-0 text-primary" />
                  <span>{branch.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-1 size-5 shrink-0 text-primary" />
                  <a href={branch.phoneHref} className="font-semibold text-foreground hover:text-primary">{branch.phone}</a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-1 size-5 shrink-0 text-primary" />
                  <span>{branch.hours}</span>
                </li>
                <li className="flex gap-3">
                  <Accessibility className="mt-1 size-5 shrink-0 text-primary" />
                  <span>{branch.access}</span>
                </li>
                <li className="flex gap-3">
                  <Facebook className="mt-1 size-5 shrink-0 text-primary" />
                  <a href={branch.facebookHref} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    {branch.facebookLabel}
                  </a>
                </li>
                {branch.reviewsHref && (
                  <li className="flex gap-3">
                    <Star className="mt-1 size-5 shrink-0 text-primary" />
                    <a href={branch.reviewsHref} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      Read our Google Reviews
                    </a>
                  </li>
                )}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-cta px-6 py-3.5 text-base font-bold text-cta-foreground shadow-soft hover:bg-cta-hover">
                  Book at this Branch
                </Link>
                <a href={branch.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3.5 text-base font-bold text-primary hover:bg-primary-soft">
                  <Phone className="size-4" aria-hidden /> Call {branch.shortName}
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-muted py-14 md:py-20">
          <div className="mx-auto max-w-4xl space-y-6 px-4 text-lg leading-relaxed text-foreground md:px-6">
            <h2 className="text-2xl md:text-3xl">About this branch</h2>
            {content.about.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bg-background py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-center text-2xl md:text-3xl">Services available in {content.place}</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <ServiceCard icon={<Ear className="size-6" />} title="Hearing Evaluation" desc="Comprehensive assessments for adults & children." to="/services/hearing-evaluation" />
              <ServiceCard icon={<Headphones className="size-6" />} title="Hearing Aid Counseling & Fitting" desc="Matched to your lifestyle, hearing loss and budget." to="/services/hearing-aid-fittings" />
              <ServiceCard icon={<Wrench className="size-6" />} title="Hearing Aid Repair & Maintenance" desc="Reliable repair and maintenance for your hearing devices." to="/services/hearing-aid-repairs" />
              <ServiceCard icon={<HeartHandshake className="size-6" />} title="Follow-up Care & Counseling" desc="Ongoing support to maximize your hearing." to="/services/follow-up-care" />
              <ServiceCard icon={<Volume2 className="size-6" />} title="Assistive Listening Devices & Accessories" desc="Enhanced hearing in challenging environments." to="/services/assistive-listening-devices" />
            </div>
          </div>
        </section>
      </Reveal>

      <CtaStrip />
    </>
  );
}
