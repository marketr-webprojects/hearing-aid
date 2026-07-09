import Link from "next/link";
import { getSharedContent } from "@/lib/content/page-content.server";

export async function HowItWorks() {
  const c = await getSharedContent();

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">
            {c.howItWorksEyebrow}
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl">{c.howItWorksTitle}</h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {c.howItWorksSteps.map((s, i) => (
            <li key={s.title} className="rounded-3xl border border-border bg-card p-8 shadow-card">
              <span className="grid size-12 place-items-center rounded-2xl bg-gradient-cta text-2xl font-extrabold text-primary-foreground shadow-soft">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl">{s.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-full bg-cta px-7 py-4 text-base font-bold text-cta-foreground shadow-soft hover:bg-cta-hover"
          >
            {c.howItWorksCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
