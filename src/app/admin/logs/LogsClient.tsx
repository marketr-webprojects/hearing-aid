"use client";

import { useState } from "react";
import { ScrollText } from "lucide-react";
import type { ActivityLog } from "./page";

const ACTION_BADGE: Record<string, string> = {
  create: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  update: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  delete: "bg-destructive/15 text-destructive border-destructive/30",
  login: "bg-muted text-muted-foreground border-border",
  logout: "bg-muted text-muted-foreground border-border",
};

const TABLE_LABEL: Record<string, string> = {
  faqs: "FAQs",
  testimonials: "Testimonials",
  team_members: "Team",
  branches: "Branches",
  messages: "Messages",
  site_settings: "Settings",
  page_content: "Pages",
  user_profiles: "Users",
  users: "Users",
  auth: "Auth",
};

export default function LogsClient({ logs }: { logs: ActivityLog[] }) {
  const [actionFilter, setActionFilter] = useState("all");
  const [tableFilter, setTableFilter] = useState("all");

  const actions = ["all", ...Array.from(new Set(logs.map((l) => l.action)))];
  const tables = ["all", ...Array.from(new Set(logs.map((l) => l.table_name)))];

  const visible = logs.filter((l) => {
    if (actionFilter !== "all" && l.action !== actionFilter) return false;
    if (tableFilter !== "all" && l.table_name !== tableFilter) return false;
    return true;
  });

  function fmt(iso: string) {
    return new Date(iso).toLocaleString("en-PH", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const hasFilter = actionFilter !== "all" || tableFilter !== "all";

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {actions.map((a) => (
            <option key={a} value={a}>
              {a === "all" ? "All actions" : a}
            </option>
          ))}
        </select>
        <select
          value={tableFilter}
          onChange={(e) => setTableFilter(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {tables.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All sections" : TABLE_LABEL[t] ?? t}
            </option>
          ))}
        </select>
        {hasFilter && (
          <button
            onClick={() => {
              setActionFilter("all");
              setTableFilter("all");
            }}
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            Clear filters
          </button>
        )}
        <span className="ml-auto text-xs text-muted-foreground">
          {visible.length} entries
        </span>
      </div>

      {visible.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <ScrollText className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p className="text-sm">No logs yet.</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {visible.map((log) => (
            <div
              key={log.id}
              className="flex flex-wrap items-start gap-3 rounded-xl border border-border bg-card px-4 py-3"
            >
              <span
                className={`shrink-0 rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  ACTION_BADGE[log.action] ?? "bg-muted text-muted-foreground border-border"
                }`}
              >
                {log.action}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="mr-2 font-medium text-muted-foreground">
                    {TABLE_LABEL[log.table_name] ?? log.table_name}
                  </span>
                  {log.details}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {log.user_email ?? "system"} · {fmt(log.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
