"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Message } from "./page";
import { setMessageStatus, deleteMessage, type MessageStatus } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Inbox,
  Mail,
  Phone,
  MapPin,
  Cake,
  Trash2,
  Archive,
  ArchiveRestore,
} from "lucide-react";

const STATUS_TABS: { key: "all" | MessageStatus; label: string }[] = [
  { key: "new", label: "New" },
  { key: "read", label: "Read" },
  { key: "archived", label: "Archived" },
  { key: "all", label: "All" },
];

const fullName = (m: Message) => `${m.first_name} ${m.last_name}`.trim();

export default function MessagesClient({
  initialMessages,
}: {
  initialMessages: Message[];
}) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [tab, setTab] = useState<"all" | MessageStatus>("new");
  const [selectedId, setSelectedId] = useState<string | null>(
    initialMessages[0]?.id ?? null
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  const filtered =
    tab === "all" ? messages : messages.filter((m) => m.status === tab);
  const selected = messages.find((m) => m.id === selectedId) ?? null;
  const newCount = messages.filter((m) => m.status === "new").length;

  function openMessage(m: Message) {
    setSelectedId(m.id);
    setConfirmDelete(false);
    if (m.status === "new") void changeStatus(m, "read");
  }

  async function changeStatus(m: Message, status: MessageStatus) {
    setMessages((prev) =>
      prev.map((x) => (x.id === m.id ? { ...x, status } : x))
    );
    await setMessageStatus(m.id, status);
    router.refresh();
  }

  async function remove(m: Message) {
    setMessages((prev) => prev.filter((x) => x.id !== m.id));
    setSelectedId((prev) => (prev === m.id ? null : prev));
    setConfirmDelete(false);
    await deleteMessage(m.id);
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Appointment requests from the website booking form.
          </p>
        </div>
        {newCount > 0 && (
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {newCount} new
          </span>
        )}
      </div>

      <div className="mb-4 flex gap-1">
        {STATUS_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              tab === t.key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {messages.length === 0 ? (
        <Empty />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
          {/* List */}
          <div className="space-y-1.5">
            {filtered.length === 0 && (
              <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                Nothing here.
              </p>
            )}
            {filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => openMessage(m)}
                className={`w-full rounded-xl border p-3.5 text-left transition ${
                  selectedId === m.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`truncate text-sm font-semibold ${
                      m.status === "new" ? "" : "text-muted-foreground"
                    }`}
                  >
                    {fullName(m)}
                  </span>
                  {m.status === "new" && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <div className="mt-0.5 truncate text-xs text-muted-foreground">
                  {m.appointment_type} · {m.location}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground/70">
                  {new Date(m.created_at).toLocaleString("en-PH", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="rounded-xl border border-border bg-card p-6">
            {selected ? (
              <MessageDetail
                m={selected}
                confirmDelete={confirmDelete}
                onConfirmDelete={() => setConfirmDelete(true)}
                onCancelDelete={() => setConfirmDelete(false)}
                onDelete={() => remove(selected)}
                onArchive={() =>
                  changeStatus(
                    selected,
                    selected.status === "archived" ? "read" : "archived"
                  )
                }
              />
            ) : (
              <p className="py-16 text-center text-sm text-muted-foreground">
                Select a request to read it.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MessageDetail({
  m,
  confirmDelete,
  onConfirmDelete,
  onCancelDelete,
  onDelete,
  onArchive,
}: {
  m: Message;
  confirmDelete: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onDelete: () => void;
  onArchive: () => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">{fullName(m)}</h2>
          <p className="text-xs text-muted-foreground">
            {new Date(m.created_at).toLocaleString("en-PH", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={onArchive}>
            {m.status === "archived" ? (
              <>
                <ArchiveRestore className="mr-1 h-3.5 w-3.5" /> Unarchive
              </>
            ) : (
              <>
                <Archive className="mr-1 h-3.5 w-3.5" /> Archive
              </>
            )}
          </Button>
          {confirmDelete ? (
            <>
              <Button size="sm" variant="ghost" onClick={onCancelDelete}>
                Cancel
              </Button>
              <Button size="sm" variant="destructive" onClick={onDelete}>
                Confirm delete
              </Button>
            </>
          ) : (
            <Button size="sm" variant="ghost" onClick={onConfirmDelete}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Contact icon={Mail} label="Email">
          <a href={`mailto:${m.email}`} className="text-primary hover:underline">
            {m.email}
          </a>
        </Contact>
        <Contact icon={Phone} label="Phone">
          <a href={`tel:${m.phone}`} className="text-primary hover:underline">
            {m.phone}
          </a>
        </Contact>
        {m.dob && (
          <Contact icon={Cake} label="Date of birth">
            {m.dob}
          </Contact>
        )}
        <Contact icon={MapPin} label="Preferred clinic">
          {m.location}
        </Contact>
      </div>

      <div className="mt-5 grid gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm sm:grid-cols-2">
        <Detail label="Appointment type" value={m.appointment_type} />
        <Detail label="Preferred date" value={m.preferred_date} />
        <Detail label="Preferred time" value={m.preferred_time} />
        <Detail label="Heard about us via" value={m.hear_about} />
      </div>

      {m.notes && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Notes
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
            {m.notes}
          </p>
        </div>
      )}
    </div>
  );
}

function Contact({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <span className="text-muted-foreground">{label}: </span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );
}

function Empty() {
  return (
    <div className="py-20 text-center text-muted-foreground">
      <Inbox className="mx-auto mb-3 h-10 w-10 opacity-40" />
      <p className="text-sm">No appointment requests yet.</p>
    </div>
  );
}
