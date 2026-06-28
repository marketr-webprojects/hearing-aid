"use client";


import { useEffect, useState } from "react";
import { PageHero } from "@/components/site/PageHero";

type Tab = "testimonials" | "team";

type Testimonial = { id: string; name: string; location: string; quote: string; rating: number };
type Member = { id: string; name: string; role: string; bio: string };

const SEED_TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Maria W.", location: "Tanay, Rizal", quote: "I can hear my grandchildren again — it changed everything.", rating: 5 },
  { id: "t2", name: "Brian K.", location: "Cebu City", quote: "No pressure, no jargon. Just kind, honest advice.", rating: 5 },
];
const SEED_TEAM: Member[] = [
  { id: "m1", name: "Dr. Sarah Chen", role: "Principal Audiologist", bio: "12 years of clinical experience, with a special interest in pediatric assessment." },
  { id: "m2", name: "James Patel", role: "Audiologist", bio: "Loves matching first-time wearers with the right device." },
];

function useStored<T>(key: string, seed: T): [T, (v: T) => void] {
  const [val, setVal] = useState<T>(seed);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setVal(JSON.parse(raw));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, [key, val]);
  return [val, setVal];
}

const uid = () => Math.random().toString(36).slice(2, 10);

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("testimonials");
  const [tests, setTests] = useStored<Testimonial[]>("cw_cms_testimonials", SEED_TESTIMONIALS);
  const [team, setTeam] = useStored<Member[]>("cw_cms_team", SEED_TEAM);

  return (
    <>
      <PageHero eyebrow="Staff Only" title="Content Manager" subtitle="Add, edit and publish content across the Linaw Dinig website." />
      <section className="bg-background py-10 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-wrap gap-2 border-b border-border pb-3">
            {([
              ["testimonials", `Testimonials (${tests.length})`],
              ["team", `Team (${team.length})`],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                aria-pressed={tab === key}
                className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                  tab === key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >{label}</button>
            ))}
          </div>

          <div className="mt-8">
            {tab === "testimonials" && <TestimonialsManager items={tests} setItems={setTests} />}
            {tab === "team" && <TeamManager items={team} setItems={setTeam} />}
          </div>

          <p className="mt-10 rounded-2xl border border-border bg-muted p-4 text-sm text-muted-foreground">
            Demo CMS — content is stored in your browser only. To go live with multi-user editing, connect a database and add staff sign-in.
          </p>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputCls = "w-full rounded-xl border-2 border-border bg-card px-4 py-2.5 text-base focus:border-primary focus:outline-none";

function TestimonialsManager({ items, setItems }: { items: Testimonial[]; setItems: (t: Testimonial[]) => void }) {
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const blank = (): Testimonial => ({ id: uid(), name: "", location: "", quote: "", rating: 5 });
  const save = (t: Testimonial) => {
    if (!t.name.trim() || !t.quote.trim()) return;
    const exists = items.find((x) => x.id === t.id);
    setItems(exists ? items.map((x) => (x.id === t.id ? t : x)) : [t, ...items]);
    setEditing(null);
  };
  const remove = (id: string) => { if (confirm("Delete testimonial?")) setItems(items.filter((t) => t.id !== id)); };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">Testimonials</h2>
          <button onClick={() => setEditing(blank())} className="rounded-full bg-cta px-4 py-2 text-sm font-bold text-cta-foreground shadow-soft hover:bg-cta-hover">+ New testimonial</button>
        </div>
        {items.map((t) => (
          <article key={t.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary/80">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</p>
                <p className="mt-1 text-base italic">"{t.quote}"</p>
                <p className="mt-1 text-sm font-bold">{t.name} <span className="font-normal text-muted-foreground">— {t.location}</span></p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setEditing(t)} className="rounded-full border-2 border-primary px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary-soft">Edit</button>
                <button onClick={() => remove(t.id)} className="rounded-full border-2 border-border px-3 py-1.5 text-xs font-bold text-foreground hover:border-destructive hover:text-destructive">Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {editing && (
        <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h3 className="text-xl">{items.find((x) => x.id === editing.id) ? "Edit testimonial" : "New testimonial"}</h3>
          <div className="mt-4 space-y-4">
            <Field label="Name"><input className={inputCls} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Location"><input className={inputCls} value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></Field>
            <Field label="Quote"><textarea rows={4} className={inputCls} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} /></Field>
            <Field label="Rating (1–5)"><input type="number" min={1} max={5} className={inputCls} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Math.max(1, Math.min(5, Number(e.target.value) || 5)) })} /></Field>
            <div className="flex gap-2 pt-2">
              <button onClick={() => save(editing)} className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90">Save</button>
              <button onClick={() => setEditing(null)} className="rounded-full border-2 border-border px-4 py-2 text-sm font-bold text-foreground hover:border-primary/40">Cancel</button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function TeamManager({ items, setItems }: { items: Member[]; setItems: (t: Member[]) => void }) {
  const [editing, setEditing] = useState<Member | null>(null);
  const blank = (): Member => ({ id: uid(), name: "", role: "", bio: "" });
  const save = (m: Member) => {
    if (!m.name.trim()) return;
    const exists = items.find((x) => x.id === m.id);
    setItems(exists ? items.map((x) => (x.id === m.id ? m : x)) : [m, ...items]);
    setEditing(null);
  };
  const remove = (id: string) => { if (confirm("Delete team member?")) setItems(items.filter((m) => m.id !== id)); };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">Team</h2>
          <button onClick={() => setEditing(blank())} className="rounded-full bg-cta px-4 py-2 text-sm font-bold text-cta-foreground shadow-soft hover:bg-cta-hover">+ New member</button>
        </div>
        {items.map((m) => (
          <article key={m.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary/80">{m.role}</p>
                <h3 className="mt-1 text-lg">{m.name}</h3>
                <p className="mt-1 text-base text-muted-foreground">{m.bio}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setEditing(m)} className="rounded-full border-2 border-primary px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary-soft">Edit</button>
                <button onClick={() => remove(m.id)} className="rounded-full border-2 border-border px-3 py-1.5 text-xs font-bold text-foreground hover:border-destructive hover:text-destructive">Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {editing && (
        <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h3 className="text-xl">{items.find((x) => x.id === editing.id) ? "Edit member" : "New member"}</h3>
          <div className="mt-4 space-y-4">
            <Field label="Name"><input className={inputCls} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Role"><input className={inputCls} value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} /></Field>
            <Field label="Bio"><textarea rows={5} className={inputCls} value={editing.bio} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} /></Field>
            <div className="flex gap-2 pt-2">
              <button onClick={() => save(editing)} className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90">Save</button>
              <button onClick={() => setEditing(null)} className="rounded-full border-2 border-border px-4 py-2 text-sm font-bold text-foreground hover:border-primary/40">Cancel</button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
