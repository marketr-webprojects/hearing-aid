"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers,
} from "./actions";
import type { TeamMemberRow } from "./page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal, Toggle } from "@/components/ui/modal";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { StringList } from "@/components/admin/fields";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  GripVertical,
  Eye,
  EyeOff,
} from "lucide-react";

export default function TeamClient({
  initialItems,
}: {
  initialItems: TeamMemberRow[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [dialog, setDialog] = useState<{ open: boolean; item?: TeamMemberRow }>({
    open: false,
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setLoadingId(id);
    await deleteTeamMember(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
    setConfirmDeleteId(null);
    setLoadingId(null);
    router.refresh();
  }

  async function handleTogglePublished(item: TeamMemberRow) {
    setLoadingId(item.id);
    const next = !item.is_published;
    setItems((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, is_published: next } : m))
    );
    await updateTeamMember(item.id, { is_published: next });
    setLoadingId(null);
    router.refresh();
  }

  async function handleDrop(targetId: string) {
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      setDragOverId(null);
      return;
    }
    const from = items.findIndex((m) => m.id === draggingId);
    const to = items.findIndex((m) => m.id === targetId);
    const reordered = [...items];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setItems(reordered);
    setDraggingId(null);
    setDragOverId(null);
    await reorderTeamMembers(reordered.map((m) => m.id));
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Clinicians shown on the home page. Drag to reorder.
          </p>
        </div>
        <Button size="sm" onClick={() => setDialog({ open: true })}>
          <Plus className="h-4 w-4" /> New member
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <Users className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p className="text-sm">
            No team members yet. Until you add one, the site shows the built-in
            team.
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
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
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
                    {!item.is_published && (
                      <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {item.title}
                    {item.creds.length > 0 && ` · ${item.creds.length} credential${item.creds.length > 1 ? "s" : ""}`}
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

      <TeamDialog
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

function TeamDialog({
  open,
  item,
  onClose,
  onSaved,
}: {
  open: boolean;
  item?: TeamMemberRow;
  onClose: () => void;
  onSaved: (created?: TeamMemberRow) => void;
}) {
  const isEdit = !!item;
  const [name, setName] = useState(item?.name ?? "");
  const [title, setTitle] = useState(item?.title ?? "");
  const [img, setImg] = useState(item?.img ?? "");
  const [creds, setCreds] = useState<string[]>(item?.creds ?? []);
  const [funFact, setFunFact] = useState(item?.fun_fact ?? "");
  const [isPublished, setIsPublished] = useState(item?.is_published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError(null);

    const fields = {
      name: name.trim(),
      title: title.trim(),
      img,
      creds: creds.map((c) => c.trim()).filter(Boolean),
      fun_fact: funFact.trim(),
      is_published: isPublished,
    };

    if (isEdit) {
      const result = await updateTeamMember(item.id, fields);
      setSaving(false);
      if (result?.error) return setError(result.error);
      onSaved();
    } else {
      const result = await createTeamMember(fields);
      setSaving(false);
      if (result?.error) return setError(result.error);
      onSaved(result.item as TeamMemberRow);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit team member" : "New team member"}
      size="xl"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
          <div className="space-y-1.5">
            <Label>Photo</Label>
            <ImageUploader value={img} onChange={setImg} heightClass="h-40" />
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jelo Gibas"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Title / role</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lead Audiologist"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Fun fact</Label>
              <Input
                value={funFact}
                onChange={(e) => setFunFact(e.target.value)}
                placeholder="e.g. Animal Lover"
              />
            </div>
          </div>
        </div>
        <StringList
          label="Credentials"
          items={creds}
          onChange={setCreds}
          placeholder="e.g. Registered Nurse"
          multiline
        />
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
          <Button type="submit" disabled={saving || !name.trim()}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
