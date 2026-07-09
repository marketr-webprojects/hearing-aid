"use client";

import type { TeamMember } from "@/lib/team";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((m) => (
        <article key={m.name} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="relative aspect-square overflow-hidden bg-primary-soft">
            <span aria-hidden className="absolute inset-0 grid place-items-center text-5xl font-extrabold text-primary/40">
              {initials(m.name)}
            </span>
            {m.img && (
              <img
                src={m.img}
                alt={`Portrait of ${m.name}`}
                loading="lazy"
                width={400}
                height={400}
                className="relative size-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl">{m.name}</h3>
            <p className="text-sm font-bold uppercase tracking-wider text-primary/80">{m.title}</p>
            <ul className="mt-3 flex-1 list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
              {m.creds.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            {m.funFact && (
              <p className="mt-4 rounded-full bg-primary-soft px-3 py-1.5 text-center text-xs font-semibold text-primary">
                Fun fact: {m.funFact}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
