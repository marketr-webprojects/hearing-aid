"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  reorderTestimonials,
} from "./actions";
import type { Testimonial } from "./page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Modal, Toggle } from "@/components/ui/modal";
import {
  Plus,
  Pencil,
  Trash2,
  Quote,
  GripVertical,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";

export default function TestimonialsClient({
  initialItems,
}: {
  initialItems: Testimonial[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [dialog, setDialog] = useState<{ open: boolean; item?: Testimonial }>({
    open: false,
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setLoadingId(id);
    await deleteTestimonial(id);
    setItems((prev) => prev.filter((t) => t.id !== id));
    setConfirmDeleteId(null);
    setLoadingId(null);
    router.refresh();
  }

  async function handleTogglePublished(item: Testimonial) {
    setLoadingId(item.id);
    const next = !item.is_published;
    setItems((prev) =>
      prev.map((t) => (t.id === item.id ? { ...t, is_published: next } : t))
    );
    await updateTestimonial(item.id, { is_published: next });
    setLoadingId(null);
    router.refresh();
  }

  async function handleDrop(targetId: string) {
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      setDragOverId(null);
      return;
    }
    const from = items.findIndex((t) => t.id === draggingId);
    const to = items.findIndex((t) => t.id === targetId);
    const reordered = [...items];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setItems(reordered);
    setDraggingId(null);
    setDragOverId(null);
    await reorderTestimonials(reordered.map((t) => t.id));
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Patient reviews shown on the home page. Drag to reorder.
          </p>
        </div>
        <Button size="sm" onClick={() => setDialog({ open: true })}>
          <Plus className="h-4 w-4" /> New testimonial
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <Quote className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p className="text-sm">
            No testimonials yet. Until you add one, the site shows the built-in
            reviews.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const isConfirming = confirmDeleteId === item.id;
            const isLoading = loadingId === item.id;
            return (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDraggingId(item.id)}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (item.id !== draggingId) setDragOverId(item.id);
                }}
                onDrop={() => handleDrop(item.id)}
                onDragEnd={() => {
                  setDraggingId(null);
                  setDragOverId(null);
                }}
                className={`flex items-center gap-4 rounded-xl border bg-card px-5 py-4 transition-all ${
                  draggingId === item.id ? "opacity-40" : "opacity-100"
                } ${dragOverId === item.id ? "border-primary" : "border-border"}`}
              >
                <div className="shrink-0 cursor-grab text-muted-foreground active:cursor-grabbing">
                  <GripVertical className="h-4 w-4" />
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Quote className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={`truncate text-sm font-semibold ${
                        item.is_published ? "" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </p>
                    <span className="inline-flex shrink-0 items-center gap-0.5 text-amber-500">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </span>
                    {!item.is_published && (
                      <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {item.source ? `${item.source} — ` : ""}
                    {item.quote}
                  </p>
                </div>
                <div className="ml-2 flex shrink-0 items-center gap-1">
                  {isConfirming ? (
                    <>
                      <span className="mr-1 hidden text-xs text-muted-foreground sm:block">
                        Delete?
                      </span>
                      <Button size="sm" variant="ghost" onClick={() => setConfirmDeleteId(null)}>
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? "…" : "Confirm"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleTogglePublished(item)}
                        disabled={isLoading}
                        title={item.is_published ? "Unpublish" : "Publish"}
                      >
                        {item.is_published ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDialog({ open: true, item })}
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setConfirmDeleteId(item.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <TestimonialDialog
        key={dialog.item?.id ?? "new"}
        open={dialog.open}
        item={dialog.item}
        onClose={() => setDialog({ open: false })}
        onSaved={(created) => {
          if (created) setItems((prev) => [...prev, created]);
          setDialog({ open: false });
          router.refresh();
        }}
      />
    </div>
  );
}

function TestimonialDialog({
  open,
  item,
  onClose,
  onSaved,
}: {
  open: boolean;
  item?: Testimonial;
  onClose: () => void;
  onSaved: (created?: Testimonial) => void;
}) {
  const isEdit = !!item;
  const [name, setName] = useState(item?.name ?? "");
  const [source, setSource] = useState(item?.source ?? "");
  const [quote, setQuote] = useState(item?.quote ?? "");
  const [rating, setRating] = useState(item?.rating ?? 5);
  const [isPublished, setIsPublished] = useState(item?.is_published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;
    setSaving(true);
    setError(null);

    const fields = {
      name: name.trim(),
      source: source.trim(),
      quote: quote.trim(),
      rating,
      is_published: isPublished,
    };

    if (isEdit) {
      const result = await updateTestimonial(item.id, fields);
      setSaving(false);
      if (result?.error) return setError(result.error);
      onSaved();
    } else {
      const result = await createTestimonial(fields);
      setSaving(false);
      if (result?.error) return setError(result.error);
      onSaved(result.item as Testimonial);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit testimonial" : "New testimonial"}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maria Santos"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Source</Label>
            <Input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g. Google Review · Tanay"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Quote</Label>
          <Textarea
            rows={4}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="What did the patient say?"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Rating</Label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                title={`${n} star${n > 1 ? "s" : ""}`}
                className="p-0.5"
              >
                <Star
                  className={`h-6 w-6 ${
                    n <= rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <Toggle
          checked={isPublished}
          onChange={setIsPublished}
          label={isPublished ? "Published" : "Draft (hidden from site)"}
        />
        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving || !name.trim() || !quote.trim()}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
