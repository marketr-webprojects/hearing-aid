import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Clock, Accessibility, Facebook, Star } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Reveal } from "@/components/site/Reveal";
import { getBranch } from "@/lib/branches.server";
import { DEFAULT_BRANCHES, placeOf } from "@/lib/branches";
import { getPageContent } from "@/lib/content/page-content.server";
import type { ServicesContent } from "@/lib/content/registry";
import { getIcon } from "@/lib/icons";
import { OG_IMAGE } from "@/lib/seo";

// Build-time slugs only — generateStaticParams cannot read cookies, so it can't
// hit the DB. Branches added later still render on demand (dynamicParams).
export function generateStaticParams() {
  return DEFAULT_BRANCHES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const branch = await getBranch(slug);
  if (!branch) return {};

  const place = placeOf(branch);
  const title = branch.seoTitle || `Hearing Tests & Hearing Aids in ${place} | Linaw Dinig`;
  const description =
    branch.seoDescription ||
    `Visit Linaw Dinig Hearing Aid Center in ${place} — hearing tests for adults and children, hearing aid counseling & fitting, repairs and follow-up care. ${branch.address}`;

  return {
    title,
    description,
    alternates: { canonical: `/branches/${branch.slug}` },
    openGraph: {
      title: `Linaw Dinig Hearing Aid Center — ${place}`,
      description,
      type: "website",
      url: `/branches/${branch.slug}`,
      images: [OG_IMAGE],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [branch, services] = await Promise.all([
    getBranch(slug),
    getPageContent<ServicesContent>("services"),
  ]);
  if (!branch) notFound();

  const place = placeOf(branch);

  return (
    <>
      <PageHero
        eyebrow="Our Clinics"
        title={`Hearing Tests & Hearing Aids in ${place}`}
        subtitle={branch.heroSubtitle || branch.hours}
      />

      <Reveal>
        <section className="bg-background py-14 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-start md:px-6">
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <img
                src={branch.image}
                alt={`Map showing the location of Linaw Dinig Hearing Aid Center in ${place}`}
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

      {branch.about.length > 0 && (
        <Reveal>
          <section className="bg-muted py-14 md:py-20">
            <div className="mx-auto max-w-4xl space-y-6 px-4 text-lg leading-relaxed text-foreground md:px-6">
              <h2 className="text-2xl md:text-3xl">About this branch</h2>
              {branch.about.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className="bg-background py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-center text-2xl md:text-3xl">Services available in {place}</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.serviceCards.map((c) => {
                const Icon = getIcon(c.icon);
                return (
                  <ServiceCard key={c.title} icon={<Icon className="size-6" />} title={c.title} desc={c.desc} to={c.href} />
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      <CtaStrip />
    </>
  );
}
