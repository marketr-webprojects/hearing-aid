"use client";

import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-gradient-hero">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center md:px-6 md:py-24">
        {eyebrow && (
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary/80">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl text-foreground md:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}