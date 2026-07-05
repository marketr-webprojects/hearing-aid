"use client";

import { Star } from "lucide-react";
import { BRANCHES } from "@/lib/company";

// Verbatim 5-star Google reviews, one per branch (M. WR's is excerpted at a
// sentence boundary from a longer review).
const QUOTES = [
  { name: "Edmund Cuntapay", suburb: "Google Review · Tanay", text: "Communication was clear and timely, expectations were well-defined, and their professionalism made the process smooth and efficient." },
  { name: "M. WR", suburb: "Google Review · Dasma", text: "Highly recommended. Dr. Jelo Gibas is very professional and kind Clinical Audiologist. He is very gentle with his patients and clearly explained things you need to know in doing the hearing test." },
  { name: "Ferniepe Layon", suburb: "Google Review · Cebu", text: "Very approachable, and accomodated. Thank you Linaw Dinig Hearing" },
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
              <div className="flex gap-0.5 text-accent" role="img" aria-label="5 out of 5 stars">
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
          <p className="text-base font-bold text-foreground">Read more of our Google Reviews:</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            {BRANCHES.filter((b) => b.reviewsHref).map((b) => (
              <a
                key={b.shortName}
                href={b.reviewsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-primary px-5 py-2 text-sm font-bold text-primary hover:bg-primary-soft"
              >
                <Star className="size-4 fill-current text-accent" aria-hidden /> {b.shortName} Reviews
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}