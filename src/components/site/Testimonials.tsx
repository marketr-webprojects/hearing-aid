import { Star } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/testimonials.server";
import { getBranches } from "@/lib/branches.server";
import { getSharedContent } from "@/lib/content/page-content.server";

export async function Testimonials() {
  const [testimonials, branches, shared] = await Promise.all([
    getPublishedTestimonials(),
    getBranches(),
    getSharedContent(),
  ]);
  const reviewLinks = branches.filter((b) => b.reviewsHref);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">{shared.testimonialsTitle}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{shared.testimonialsSubtitle}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card">
              <div
                className="flex gap-0.5 text-accent"
                role="img"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-base font-semibold text-foreground">
                {t.name} <span className="font-normal text-muted-foreground">· {t.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        {reviewLinks.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-base font-bold text-foreground">Read more of our Google Reviews:</p>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              {reviewLinks.map((b) => (
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
        )}
      </div>
    </section>
  );
}
