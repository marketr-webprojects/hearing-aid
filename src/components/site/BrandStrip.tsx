"use client";

const BRANDS = ["Phonak", "Oticon", "ReSound", "Signia", "Starkey", "Widex", "Unitron"];

export function BrandStrip() {
  return (
    <section className="bg-muted py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">Hearing Aids from All Major Brands</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            We're independent — we recommend the right aid for you, not the most expensive one.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {BRANDS.map((b) => (
            <div key={b} className="grid h-20 place-items-center rounded-xl border border-border bg-card text-base font-bold tracking-tight text-primary shadow-card">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}