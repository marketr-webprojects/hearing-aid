"use client";

const TEAM = [
  {
    img: "/assets/team/JeloGibas.webp",
    name: "Jelo Gibas",
    title: "Lead Audiologist",
    creds: [
      "Registered Nurse",
      "Certified Newborn Hearing Screening Personnel",
      "Graduate of Master in Clinical Audiology from University of Santo Tomas, Manila",
      "Holder of Diploma in Pediatric Audiology from School of Advanced Education, Research and Accreditation, Spain",
      "Graduate of Bachelor of Science in Nursing from Far Eastern University, Manila",
    ],
    funFact: "Unflappable",
  },
  {
    img: "/assets/team/RicaRoxas.webp",
    name: "Rica Roxas",
    title: "Audiometrist (Tanay)",
    creds: [
      "Certified Newborn Hearing Screening Personnel",
      "With special training in Practical Home Behavior Management for Children with Special Needs and Identifying Red Flags of Developmental Delay",
      "Certificate in Medical Office Administration",
      "Certificate in Occupational First Aid Training and BLS CPR w/ AED",
    ],
    funFact: "Animal Lover",
  },
  {
    img: "/assets/team/HannahPason.webp",
    name: "Hannah Pason",
    title: "Audiometrist (Cebu)",
    creds: [
      "With special training in Practical Home Behavior Management for Children with Special Needs and Identifying Red Flags of Developmental Delay",
      "Certificate in Medical Office Administration",
      "Certificate in Occupational First Aid Training and BLS CPR w/ AED",
    ],
    funFact: "Jokester",
  },
  {
    img: "/assets/team/JahEstoque.webp",
    name: "Jah Estoque",
    title: "Audiometrist (La Union)",
    creds: [
      "Registered Midwife",
      "With special training in Practical Home Behavior Management for Children with Special Needs",
      "Certificate in Medical Office Administration",
    ],
    funFact: "Comical",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function Team() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">Meet the Team</h2>
          <p className="mt-3 text-lg text-muted-foreground">Friendly, qualified clinicians who genuinely care.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <article key={m.name} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <div className="relative aspect-square overflow-hidden bg-primary-soft">
                <span aria-hidden className="absolute inset-0 grid place-items-center text-5xl font-extrabold text-primary/40">
                  {initials(m.name)}
                </span>
                <img
                  src={m.img}
                  alt={`Portrait of ${m.name}`}
                  loading="lazy"
                  className="relative size-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl">{m.name}</h3>
                <p className="text-sm font-bold uppercase tracking-wider text-primary/80">{m.title}</p>
                <ul className="mt-3 flex-1 list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
                  {m.creds.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <p className="mt-4 rounded-full bg-primary-soft px-3 py-1.5 text-center text-xs font-semibold text-primary">
                  Fun fact: {m.funFact}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
