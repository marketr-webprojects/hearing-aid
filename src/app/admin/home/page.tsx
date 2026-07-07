import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Inbox,
  MapPin,
  Quote,
  Users,
  HelpCircle,
  FileText,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

async function count(table: string, status?: string): Promise<number | null> {
  try {
    const supabase = await createClient();
    const base = supabase.from(table).select("*", { count: "exact", head: true });
    const { count, error } = await (status ? base.eq("status", status) : base);
    if (error) return null;
    return count ?? 0;
  } catch {
    return null;
  }
}

export default async function AdminHome() {
  const [newMessages, branches, testimonials, team, faqs] = await Promise.all([
    count("messages", "new"),
    count("branches"),
    count("testimonials"),
    count("team_members"),
    count("faqs"),
  ]);

  const cards = [
    {
      label: "New appointment requests",
      value: newMessages,
      href: "/admin/messages",
      icon: Inbox,
    },
    { label: "Branches", value: branches, href: "/admin/branches", icon: MapPin },
    {
      label: "Testimonials",
      value: testimonials,
      href: "/admin/testimonials",
      icon: Quote,
    },
    { label: "Team members", value: team, href: "/admin/team", icon: Users },
    { label: "FAQs", value: faqs, href: "/admin/faqs", icon: HelpCircle },
  ];

  const notReady = cards.every((c) => c.value === null);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-0.5">
        Manage the Linaw Dinig website content.
      </p>

      {notReady && (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          Could not read the database. Make sure the Supabase keys are set in{" "}
          <code className="font-mono">.env.local</code> and the SQL in{" "}
          <code className="font-mono">supabase/all.sql</code> has been run.
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="mt-4 text-2xl font-bold">{value ?? "—"}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Quick links
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <QuickLink href="/admin/pages" icon={FileText}>
            Edit page text
          </QuickLink>
          <QuickLink href="/admin/branches" icon={MapPin}>
            Manage branches
          </QuickLink>
          <QuickLink href="/admin/messages" icon={Inbox}>
            View appointment requests
          </QuickLink>
        </div>
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium transition hover:bg-muted"
    >
      <Icon className="h-4 w-4 text-primary" />
      {children}
    </Link>
  );
}
