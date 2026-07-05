"use client";

import { BadgeCheck, Headphones, HandHeart, ShieldCheck, Wallet } from "lucide-react";

const ITEMS = [
  { icon: BadgeCheck, label: "Qualified & Registered Audiologists" },
  { icon: Headphones, label: "Trusted Hearing Aid Brands" },
  { icon: ShieldCheck, label: "Comprehensive Hearing Assessments" },
  { icon: HandHeart, label: "Aftercare & Ongoing Support" },
  { icon: Wallet, label: "Flexible Payment Options" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 md:px-6 lg:grid-cols-5">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="text-sm font-semibold text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}