"use client";

const audio1 = "/assets/audiologist-1.webp";
const audio2 = "/assets/audiologist-2.webp";
const audio3 = "/assets/audiologist-3.webp";

const TEAM = [
  { img: audio1, name: "Our Lead Audiologist", title: "Principal Audiologist", bio: "Years of experience helping adults and children hear life clearly, with a special interest in pediatric assessment and family-centered care.", quals: ["Audiologist", "PRC Licensed"] },
  { img: audio2, name: "Our Senior Audiologist", title: "Senior Audiologist", bio: "Calm, patient, and never in a hurry — exactly who you want guiding your first hearing journey.", quals: ["Audiologist", "PRC Licensed"] },
  { img: audio3, name: "Our Hearing Specialist", title: "Hearing Aid Technician", bio: "Loves the fine-tuning detail — the small adjustments and repairs that make a real difference in your day.", quals: ["Hearing Aid Fitting", "Repairs & Maintenance"] },
];

export function Team() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">Meet the Team</h2>
          <p className="mt-3 text-lg text-muted-foreground">Friendly, qualified clinicians who genuinely care.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TEAM.map((m) => (
            <article key={m.name} className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img src={m.img} alt={`Portrait of ${m.name}`} loading="lazy" className="size-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl">{m.name}</h3>
                <p className="text-sm font-bold uppercase tracking-wider text-primary/80">{m.title}</p>
                <p className="mt-3 text-base text-muted-foreground">{m.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.quals.map((q) => (
                    <span key={q} className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{q}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}