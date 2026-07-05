import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

import { SubPage } from "@/components/site/SubPage";
import { BRANCHES } from "@/lib/company";

export const metadata: Metadata = {
  title: "Our Clinics — Tanay, Cebu, Dasmariñas, La Union | Linaw Dinig",
  description:
    "Visit Linaw Dinig Hearing Aid Center at any of our four clinics — Tanay (Rizal), Cebu City, Dasmariñas (Cavite) and Rosario (La Union). Calm, modern, sound-treated clinics designed to put you at ease.",
  keywords: [
    "hearing aid center Tanay",
    "hearing aid center Cebu",
    "hearing aid center Dasmariñas",
    "hearing aid center La Union",
    "hearing clinic Philippines",
  ],
  openGraph: {
    title: "Our Clinics",
    description: "Four welcoming hearing clinics across the Philippines — designed to put you at ease.",
  },
};

export default function Page() {
  return (
    <SubPage
      eyebrow="About"
      title="Our Clinics"
      subtitle="Calm, modern, sound-treated spaces designed to feel a world away from the typical clinic — now in four convenient locations."
    >
      <div className="overflow-hidden rounded-3xl border border-border shadow-card">
        <img
          src="/assets/tanay-front-desk.webp"
          alt="Front desk of the Linaw Dinig Hearing Aid Center Tanay main office"
          loading="lazy"
          width={1000}
          height={1333}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      <h2 className="text-2xl md:text-3xl">Find a branch near you</h2>
      <p>
        Linaw Dinig Hearing Aid Center serves communities across the Philippines from four clinics. Walk in or book
        ahead — our team is ready to welcome you for a hearing consultation.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {BRANCHES.map((b) => (
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
    </SubPage>
  );
}
