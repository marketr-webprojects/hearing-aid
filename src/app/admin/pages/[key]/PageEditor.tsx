"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { savePageContent, resetPageContent } from "../actions";
import { fieldGroupsFor, type AnyPageDef } from "@/lib/content/registry";
import { SchemaField } from "@/components/admin/SchemaFields";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, ExternalLink, RotateCcw } from "lucide-react";

type Content = Record<string, unknown>;

export default function PageEditor({
  def,
  initial,
  customised,
}: {
  def: AnyPageDef;
  initial: Content;
  customised: boolean;
}) {
  const router = useRouter();
  const [form, setForm] = useState<Content>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const groups = fieldGroupsFor(def);
  /** Pseudo-pages like Shared sections have no public route of their own. */
  const isRoute = def.path.startsWith("/");

  function set(key: string, value: unknown) {
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
          {isRoute ? (
            <Link
              href={def.path}
              target="_blank"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              {def.path} <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <span className="text-sm text-muted-foreground">Appears on several pages</span>
          )}
        </div>
      </div>

      {groups.map((group, i) => (
        <Section key={`${i}-${group.label}`} title={group.label}>
          <div className="space-y-5">
            {group.fields.map((field) => (
              <SchemaField
                key={field.key}
                field={field}
                value={form[field.key]}
                onChange={(v) => set(field.key, v)}
              />
            ))}
          </div>
        </Section>
      ))}

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
              <Button type="button" size="sm" variant="ghost" onClick={() => setConfirmReset(false)}>
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
              <Button type="button" size="sm" variant="outline" onClick={() => setConfirmReset(true)}>
                <RotateCcw className="h-3.5 w-3.5" /> Reset to defaults
              </Button>
            )
          )}
        </div>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}
