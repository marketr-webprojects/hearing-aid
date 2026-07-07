"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createBranch,
  updateBranch,
  deleteBranch,
  reorderBranches,
  type BranchFields,
} from "./actions";
import type { BranchRow } from "./page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Modal, Toggle } from "@/components/ui/modal";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  Plus,
  Pencil,
  Trash2,
  MapPin,
  GripVertical,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function BranchesClient({
  initialItems,
}: {
  initialItems: BranchRow[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [dialog, setDialog] = useState<{ open: boolean; item?: BranchRow }>({
    open: false,
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setLoadingId(id);
    await deleteBranch(id);
    setItems((prev) => prev.filter((b) => b.id !== id));
    setConfirmDeleteId(null);
    setLoadingId(null);
    router.refresh();
  }

  async function handleTogglePublished(item: BranchRow) {
    setLoadingId(item.id);
    const next = !item.is_published;
    setItems((prev) =>
      prev.map((b) => (b.id === item.id ? { ...b, is_published: next } : b))
    );
    await updateBranch(item.id, { is_published: next });
    setLoadingId(null);
    router.refresh();
  }

  async function handleDrop(targetId: string) {
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      setDragOverId(null);
      return;
    }
    const from = items.findIndex((b) => b.id === draggingId);
    const to = items.findIndex((b) => b.id === targetId);
    const reordered = [...items];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setItems(reordered);
    setDraggingId(null);
    setDragOverId(null);
    await reorderBranches(reordered.map((b) => b.id));
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Branches</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Clinic locations — shown in the footer, branch pages and booking
            form. Drag to reorder.
          </p>
        </div>
        <Button size="sm" onClick={() => setDialog({ open: true })}>
          <Plus className="h-4 w-4" /> New branch
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <MapPin className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p className="text-sm">
            No branches yet. Until you add one, the site shows the built-in
            branch list.
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
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={`truncate text-sm font-semibold ${
                        item.is_published ? "" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </p>
                    {item.is_main && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        <Star className="h-2.5 w-2.5 fill-current" /> Main
                      </span>
                    )}
                    {!item.is_published && (
                      <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    /branches/{item.slug} · {item.phone} · {item.address}
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

      <BranchDialog
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

function BranchDialog({
  open,
  item,
  onClose,
  onSaved,
}: {
  open: boolean;
  item?: BranchRow;
  onClose: () => void;
  onSaved: (created?: BranchRow) => void;
}) {
  const isEdit = !!item;
  const [form, setForm] = useState<BranchFields>({
    slug: item?.slug ?? "",
    name: item?.name ?? "",
    short_name: item?.short_name ?? "",
    is_main: item?.is_main ?? false,
    address: item?.address ?? "",
    phone: item?.phone ?? "",
    phone_href: item?.phone_href ?? "",
    hours: item?.hours ?? "",
    opening_hours: item?.opening_hours ?? "",
    access: item?.access ?? "",
    facebook_label: item?.facebook_label ?? "",
    facebook_href: item?.facebook_href ?? "",
    reviews_href: item?.reviews_href ?? "",
    image: item?.image ?? "",
    is_published: item?.is_published ?? true,
  });
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof BranchFields>(key: K, value: BranchFields[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setName(value: string) {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.slug.trim()) return;
    setSaving(true);
    setError(null);

    const fields: BranchFields = {
      ...form,
      slug: slugify(form.slug),
      name: form.name.trim(),
      short_name: form.short_name.trim() || form.name.trim(),
      opening_hours: form.opening_hours?.trim() ? form.opening_hours.trim() : null,
      reviews_href: form.reviews_href?.trim() ? form.reviews_href.trim() : null,
    };

    if (isEdit) {
      const result = await updateBranch(item.id, fields);
      setSaving(false);
      if (result?.error) return setError(result.error);
      onSaved();
    } else {
      const result = await createBranch(fields);
      setSaving(false);
      if (result?.error) return setError(result.error);
      onSaved(result.item as BranchRow);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit branch" : "New branch"}
      size="2xl"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tanay, Rizal (Main Office)"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Short name</Label>
            <Input
              value={form.short_name}
              onChange={(e) => set("short_name", e.target.value)}
              placeholder="e.g. Tanay"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Slug (URL: /branches/…)</Label>
            <Input
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value);
              }}
              placeholder="e.g. tanay"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="e.g. 0917 553 2999"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Address</Label>
          <Textarea
            rows={2}
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="Full street address"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Hours (display text)</Label>
            <Input
              value={form.hours}
              onChange={(e) => set("hours", e.target.value)}
              placeholder="e.g. Monday to Friday, 9AM – 5PM"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Hours (for Google, e.g. Mo-Fr 09:00-17:00)</Label>
            <Input
              value={form.opening_hours ?? ""}
              onChange={(e) => set("opening_hours", e.target.value)}
              placeholder="Leave blank for “by appointment”"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Parking / access notes</Label>
          <Input
            value={form.access}
            onChange={(e) => set("access", e.target.value)}
            placeholder="e.g. Ample parking space and wheelchair accessible."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Facebook page name</Label>
            <Input
              value={form.facebook_label}
              onChange={(e) => set("facebook_label", e.target.value)}
              placeholder="e.g. Linaw Dinig Hearing Aid Center – Tanay"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Facebook link</Label>
            <Input
              value={form.facebook_href}
              onChange={(e) => set("facebook_href", e.target.value)}
              placeholder="https://facebook.com/…"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Google reviews link (optional)</Label>
            <Input
              value={form.reviews_href ?? ""}
              onChange={(e) => set("reviews_href", e.target.value)}
              placeholder="https://…"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Photo</Label>
          <ImageUploader
            value={form.image}
            onChange={(src) => set("image", src)}
            heightClass="h-40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Toggle
            checked={form.is_main}
            onChange={(v) => set("is_main", v)}
            label="Main office"
          />
          <Toggle
            checked={form.is_published}
            onChange={(v) => set("is_published", v)}
            label={form.is_published ? "Published" : "Draft (hidden from site)"}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving || !form.name.trim() || !form.slug.trim()}
          >
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
