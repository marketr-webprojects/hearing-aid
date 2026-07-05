"use client";

import { Children, type ReactNode } from "react";
import { PageHero } from "./PageHero";
import { CtaStrip } from "./CtaStrip";
import { Reveal } from "./Reveal";

export function SubPage({
  eyebrow,
  title,
  subtitle,
  children,
  cta = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  cta?: boolean;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <section className="bg-background py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="space-y-6 text-lg leading-relaxed text-foreground">
            {Children.map(children, (child) => (child == null || child === false ? child : <Reveal>{child}</Reveal>))}
          </div>
        </div>
      </section>
      {cta && <CtaStrip />}
    </>
  );
}

export function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <h3 className="text-xl">{title}</h3>
      <div className="mt-3 text-base text-muted-foreground">{children}</div>
    </div>
  );
}

export function ImageCard({
  title,
  img,
  alt,
  ratio = "aspect-[16/10]",
  children,
}: {
  title: string;
  img: string;
  alt: string;
  ratio?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="overflow-hidden bg-muted">
        <img src={img} alt={alt} loading="lazy" width={1280} height={800} className={`${ratio} w-full object-cover`} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl">{title}</h3>
        <div className="mt-2 text-base text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}