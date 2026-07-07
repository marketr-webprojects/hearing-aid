"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettings } from "./actions";
import type { SiteSettings } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

export default function SettingsClient({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [form, setForm] = useState<SiteSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }
  function setSocial(key: keyof SiteSettings["social"], value: string) {
    setForm((prev) => ({ ...prev, social: { ...prev.social, [key]: value } }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await updateSettings(form);
    setSaving(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Company details &amp; shared copy used across the site (header,
          footer and structured data).
        </p>
      </div>

      <Section title="Company">
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrap label="Company name" full>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
          </FieldWrap>
          <FieldWrap label="Short name">
            <Input
              value={form.shortName}
              onChange={(e) => set("shortName", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Established">
            <Input
              value={form.established}
              onChange={(e) => set("established", e.target.value)}
              placeholder="e.g. June 2021"
            />
          </FieldWrap>
          <FieldWrap label="Tagline">
            <Input
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Name meaning">
            <Input
              value={form.nameMeaning}
              onChange={(e) => set("nameMeaning", e.target.value)}
              placeholder="e.g. Clear Hearing"
            />
          </FieldWrap>
        </div>
      </Section>

      <Section title="Contact">
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrap label="Email">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Phone (main office)">
            <Input
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="e.g. 0917 553 2999"
            />
          </FieldWrap>
        </div>
      </Section>

      <Section title="Social">
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrap label="TikTok handle">
            <Input
              value={form.social.tiktok}
              onChange={(e) => setSocial("tiktok", e.target.value)}
              placeholder="@linawdinighearing"
            />
          </FieldWrap>
          <FieldWrap label="TikTok link">
            <Input
              value={form.social.tiktokHref}
              onChange={(e) => setSocial("tiktokHref", e.target.value)}
              placeholder="https://www.tiktok.com/@…"
            />
          </FieldWrap>
        </div>
      </Section>

      <Section title="Legal">
        <FieldWrap label="Site disclaimer" full>
          <Textarea
            rows={3}
            value={form.disclaimer}
            onChange={(e) => set("disclaimer", e.target.value)}
          />
        </FieldWrap>
      </Section>

      {error && (
        <p className="mt-4 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-green-600">
            <Check className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function FieldWrap({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
