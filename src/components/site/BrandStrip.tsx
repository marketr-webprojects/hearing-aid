import { getSharedContent } from "@/lib/content/page-content.server";

export async function BrandStrip() {
  const c = await getSharedContent();

  return (
    <section className="bg-muted py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">{c.brandsTitle}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{c.brandsSubtitle}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {c.brands.map((b) => (
            <div
              key={b}
              className="grid h-20 place-items-center rounded-xl border border-border bg-card text-base font-bold tracking-tight text-primary shadow-card"
            >
              {b}
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <h3 className="text-2xl md:text-3xl">{c.otherDevicesTitle}</h3>
          <p className="mt-3 text-lg text-muted-foreground">{c.otherDevicesSubtitle}</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
          {c.otherDevices.map((d) => (
            <div
              key={d}
              className="grid h-20 place-items-center rounded-xl border border-border bg-card px-4 text-center text-base font-bold tracking-tight text-primary shadow-card"
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
