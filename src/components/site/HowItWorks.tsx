"use client";

import Link from "next/link";

const STEPS = [
  { n: "1", title: "Book a Free Hearing Test", body: "No cost, no obligation. A relaxed 45-minute comprehensive assessment." },
  { n: "2", title: "Get Your Results & Recommendation", body: "Your audiologist explains your results clearly and recommends options to suit your lifestyle and budget." },
  { n: "3", title: "Fitted & Supported", body: "Your hearing aids are fitted, fine-tuned, and backed by ongoing aftercare." },
];

export function HowItWorks() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">A simple, calm process</p>
          <h2 className="mt-2 text-3xl md:text-4xl">How it works</h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-3xl border border-border bg-card p-8 shadow-card">
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-cta text-2xl font-extrabold text-primary-foreground shadow-soft">{s.n}</span>
              <h3 className="mt-5 text-xl">{s.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-cta px-7 py-4 text-base font-bold text-cta-foreground shadow-soft hover:bg-cta-hover">
            Start with a Free Hearing Test
          </Link>
        </div>
      </div>
    </section>
  );
}