"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { savePageContent, resetPageContent } from "../actions";
import type { PageDef, PageContentData } from "@/lib/content/registry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, ExternalLink, RotateCcw } from "lucide-react";

export default function PageEditor({
  def,
  initial,
  customised,
}: {
  def: PageDef;
  initial: PageContentData;
  customised: boolean;
}) {
  const router = useRouter();
  const [form, setForm] = useState<PageContentData>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof PageContentData>(key: K, value: PageContentData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await savePageContent(def.path, form);
    setSaving(false);
    if (result?.error) return setError(result.error);
    setSaved(true);
    router.refresh();
  }

  async function onReset() {
    setResetting(true);
    setError(null);
    const result = await resetPageContent(def.path);
    setResetting(false);
    setConfirmReset(false);
    if (result?.error) return setError(result.error);
    setForm(def.defaults);
    setSaved(false);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl">
      <div className="mb-6">
        <Link
          href="/admin/pages"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All pages
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold">{def.label}</h1>
          {customised && (
            <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              Customised
            </span>
          )}
          <Link
            href={def.path}
            target="_blank"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            {def.path} <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <Section title="Page headline (hero)">
        <div className="space-y-4">
          <FieldWrap label="Eyebrow (small text above the title)">
            <Input
              value={form.eyebrow}
              onChange={(e) => set("eyebrow", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Title">
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Subtitle">
            <Textarea
              rows={3}
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
            />
          </FieldWrap>
        </div>
      </Section>

      <Section title="Search engines (SEO)">
        <div className="space-y-4">
          <FieldWrap label="SEO title (browser tab & Google result)">
            <Input
              value={form.seoTitle}
              onChange={(e) => set("seoTitle", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="SEO description (snippet under the Google result)">
            <Textarea
              rows={3}
              value={form.seoDescription}
              onChange={(e) => set("seoDescription", e.target.value)}
            />
          </FieldWrap>
        </div>
      </Section>

      {error && (
        <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save page"}
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-green-600">
            <Check className="h-4 w-4" /> Saved
          </span>
        )}
        <div className="ml-auto">
          {confirmReset ? (
            <span className="inline-flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Discard edits and use the built-in copy?
              </span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setConfirmReset(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                disabled={resetting}
                onClick={onReset}
              >
                {resetting ? "…" : "Confirm reset"}
              </Button>
            </span>
          ) : (
            customised && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setConfirmReset(true)}
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset to defaults
              </Button>
            )
          )}
        </div>
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
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
