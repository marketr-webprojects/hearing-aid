"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function ServiceCard({ icon, title, desc, to }: { icon: ReactNode; title: string; desc: string; to: string }) {
  return (
    <a href={to} className="group flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft">
      <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">{icon}</span>
      <h3 className="mt-5 text-xl">{title}</h3>
      <p className="mt-2 text-base text-muted-foreground">{desc}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5">
        Learn more <ArrowRight className="size-4" aria-hidden />
      </span>
    </a>
  );
}