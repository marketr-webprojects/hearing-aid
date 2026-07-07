import Link from "next/link";
import { PAGES } from "@/lib/content/registry";
import { getAllPageOverrides } from "@/lib/content/page-content.server";
import { FileText, ExternalLink, Pencil } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pages | Linaw Dinig Admin" };

export default async function PagesAdminPage() {
  const overrides = await getAllPageOverrides();

  const groups = PAGES.reduce<Record<string, typeof PAGES>>((acc, p) => {
    (acc[p.group] ??= []).push(p);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pages</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Edit the headline text and SEO of every page. Pages show
          &ldquo;Customised&rdquo; once edited; otherwise they use the built-in
          copy.
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(groups).map(([group, pages]) => (
          <div key={group}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {group}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {pages.map((p) => {
                const customised = p.path in overrides;
                return (
                  <div
                    key={p.key}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold">{p.label}</p>
                        {customised && (
                          <span className="shrink-0 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                            Customised
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{p.path}</p>
                    </div>
                    <Link
                      href={p.path}
                      target="_blank"
                      className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      title="View page"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/pages/${p.key}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
