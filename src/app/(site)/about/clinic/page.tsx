import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { pageMetadata, getPageContent } from "@/lib/content/page-content.server";
import type { AboutClinicContent } from "@/lib/content/registry";
import { getBranches } from "@/lib/branches.server";

import { CmsSubPage } from "@/components/site/CmsSubPage";

const staticMetadata: Metadata = {
  keywords: [
    "hearing aid center Tanay",
    "hearing aid center Cebu",
    "hearing aid center Dasmariñas",
    "hearing aid center La Union",
    "hearing clinic Philippines",
  ],
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about-clinic", staticMetadata);
}

export default async function Page() {
  const [c, branches] = await Promise.all([
    getPageContent<AboutClinicContent>("about-clinic"),
    getBranches(),
  ]);

  return (
    <CmsSubPage pageKey="about-clinic">
      <div className="overflow-hidden rounded-3xl border border-border shadow-card">
        <img
          src={c.heroImage}
          alt={c.heroImageAlt}
          loading="lazy"
          width={1000}
          height={1333}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      <h2 className="text-2xl md:text-3xl">{c.branchesHeading}</h2>
      <p>{c.branchesIntro}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {branches.map((b) => (
          <div key={b.name} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img
              src={b.image}
              alt={`Map of ${b.name.replace(" (Main Office)", "")}, location of Linaw Dinig Hearing Aid Center`}
              loading="lazy"
              width={900}
              height={900}
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl">
                {b.name}
                {b.main && (
                  <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
                    Main
                  </span>
                )}
              </h3>
              <ul className="mt-3 space-y-2 text-base text-muted-foreground">
                <li className="flex gap-2"><MapPin className="mt-0.5 size-5 shrink-0 text-primary" /><span>{b.address}</span></li>
                <li className="flex gap-2"><Phone className="mt-0.5 size-5 shrink-0 text-primary" /><a href={b.phoneHref} className="hover:text-primary">{b.phone}</a></li>
                <li className="flex gap-2"><Clock className="mt-0.5 size-5 shrink-0 text-primary" /><span>{b.hours}</span></li>
              </ul>
              <Link href={`/branches/${b.slug}`} className="mt-4 inline-block text-sm font-bold text-primary underline-offset-4 hover:underline">
                View branch page →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </CmsSubPage>
  );
}
