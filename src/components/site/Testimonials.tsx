"use client";

import { Star } from "lucide-react";

const QUOTES = [
  { name: "Maria", suburb: "Tanay, Rizal", text: "I'd been putting this off for years. The team were so patient and caring — I wish I'd done it sooner." },
  { name: "Roberto", suburb: "Cebu City", text: "The difference is incredible. I can hear my grandchildren clearly again." },
  { name: "Sandra", suburb: "Dasmariñas", text: "No pressure at all. They explained everything and helped me find something in my budget." },
];

export function Testimonials() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">What Our Patients Say</h2>
          <p className="mt-3 text-lg text-muted-foreground">Real stories from people we've helped.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.name} className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card">
              <div className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="size-5 fill-current" aria-hidden />))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-foreground">&ldquo;{q.text}&rdquo;</blockquote>
              <figcaption className="mt-5 text-base font-semibold text-foreground">
                {q.name} <span className="font-normal text-muted-foreground">· {q.suburb}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#" className="text-base font-bold text-primary underline-offset-4 hover:underline">Read More Reviews on Google →</a>
        </div>
      </div>
    </section>
  );
}