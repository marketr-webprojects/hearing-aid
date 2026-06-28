"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { PHONE, PHONE_HREF } from "./SiteHeader";

export function CtaStrip({
  title = "Ready to Hear Better?",
  subtitle = "Book a free, no-obligation hearing assessment with our qualified audiologists.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-cta text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1fr_auto] md:items-center md:px-6 md:py-20">
        <div>
          <h2 className="text-3xl text-primary-foreground md:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-4 max-w-xl text-lg text-primary-foreground/90 md:text-xl">{subtitle}</p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-full bg-cta px-7 py-4 text-base font-bold text-cta-foreground shadow-soft hover:bg-cta-hover"
          >
            Book My Free Hearing Test
          </Link>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-lg font-bold text-primary-foreground hover:text-accent">
            <Phone className="size-5" aria-hidden /> {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}