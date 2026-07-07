"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFaq, updateFaq, deleteFaq, reorderFaqs } from "./actions";
import type { Faq } from "./page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Modal, Toggle } from "@/components/ui/modal";
import {
  Plus,
  Pencil,
  Trash2,
  HelpCircle,
  GripVertical,
  Eye,
  EyeOff,
} from "lucide-react";

export default function FaqsClient({ initialFaqs }: { initialFaqs: Faq[] }) {
  const router = useRouter();
  const [faqs, setFaqs] = useState(initialFaqs);
  const [dialog, setDialog] = useState<{ open: boolean; faq?: Faq }>({ open: false });
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setLoadingId(id);
    await deleteFaq(id);
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    setConfirmDeleteId(null);
    setLoadingId(null);
    router.refresh();
  }

  async function handleTogglePublished(faq: Faq) {
    setLoadingId(faq.id);
    const next = !faq.is_published;
    setFaqs((prev) =>
      prev.map((f) => (f.id === faq.id ? { ...f, is_published: next } : f))
    );
    await updateFaq(faq.id, { is_published: next });
    setLoadingId(null);
    router.refresh();
  }

  async function handleDrop(targetId: string) {
    if (!draggingId || draggingId === targetId) {
      setDraggingId(null);
      setDragOverId(null);
      return;
    }
    const from = faqs.findIndex((f) => f.id === draggingId);
    const to = faqs.findIndex((f) => f.id === targetId);
    const reordered = [...faqs];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setFaqs(reordered);
    setDraggingId(null);
    setDragOverId(null);
    await reorderFaqs(reordered.map((f) => f.id));
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">FAQs</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Shown on the home page and Patients → FAQs. Drag to reorder.
          </p>
        </div>
        <Button size="sm" onClick={() => setDialog({ open: true })}>
          <Plus className="h-4 w-4" /> New FAQ
        </Button>
      </div>

      {faqs.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <HelpCircle className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p className="text-sm">No FAQs yet. Add your first one.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {faqs.map((faq) => {
            const isConfirming = confirmDeleteId === faq.id;
            const isLoading = loadingId === faq.id;
            return (
              <div
                key={faq.id}
                draggable
                onDragStart={() => setDraggingId(faq.id)}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (faq.id !== draggingId) setDragOverId(faq.id);
                }}
                onDrop={() => handleDrop(faq.id)}
                onDragEnd={() => {
                  setDraggingId(null);
                  setDragOverId(null);
                }}
                className={`flex items-center gap-4 rounded-xl border bg-card px-5 py-4 transition-all ${
                  draggingId === faq.id ? "opacity-40" : "opacity-100"
                } ${dragOverId === faq.id ? "border-primary" : "border-border"}`}
              >
                <div className="shrink-0 cursor-grab text-muted-foreground active:cursor-grabbing">
                  <GripVertical className="h-4 w-4" />
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={`truncate text-sm font-semibold ${
                        faq.is_published ? "" : "text-muted-foreground"
                      }`}
                    >
                      {faq.question}
                    </p>
                    {!faq.is_published && (
                      <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {faq.answer}
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
                        onClick={() => handleDelete(faq.id)}
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
                        onClick={() => handleTogglePublished(faq)}
                        disabled={isLoading}
                        title={faq.is_published ? "Unpublish" : "Publish"}
                      >
                        {faq.is_published ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDialog({ open: true, faq })}
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setConfirmDeleteId(faq.id)}
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

      <FaqDialog
        key={dialog.faq?.id ?? "new"}
        open={dialog.open}
        faq={dialog.faq}
        onClose={() => setDialog({ open: false })}
        onSaved={(created) => {
          if (created) setFaqs((prev) => [...prev, created]);
          setDialog({ open: false });
          router.refresh();
        }}
      />
    </div>
  );
}

function FaqDialog({
  open,
  faq,
  onClose,
  onSaved,
}: {
  open: boolean;
  faq?: Faq;
  onClose: () => void;
  onSaved: (created?: Faq) => void;
}) {
  const isEdit = !!faq;
  const [question, setQuestion] = useState(faq?.question ?? "");
  const [answer, setAnswer] = useState(faq?.answer ?? "");
  const [isPublished, setIsPublished] = useState(faq?.is_published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    setSaving(true);
    setError(null);

    if (isEdit) {
      const result = await updateFaq(faq.id, {
        question: question.trim(),
        answer: answer.trim(),
        is_published: isPublished,
      });
      setSaving(false);
      if (result?.error) return setError(result.error);
      onSaved();
    } else {
      const result = await createFaq(question.trim(), answer.trim());
      setSaving(false);
      if (result?.error) return setError(result.error);
      onSaved(result.faq as Faq);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit FAQ" : "New FAQ"}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label>Question</Label>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. How long does a hearing test take?"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Answer</Label>
          <Textarea
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Provide a clear, helpful answer…"
          />
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
          <Button type="submit" disabled={saving || !question.trim() || !answer.trim()}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
