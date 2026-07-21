import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getPageDef } from "./registry";
import type { BaseContent } from "./types";
import { SHARED, type SharedContent } from "./pages/shared";
import { OG_IMAGE } from "@/lib/seo";

/**
 * Read a page's content: the DB override (page_content.data) shallow-merged
 * over the registry defaults. Never throws — falls back to defaults if the
 * row is missing or the table/keys aren't ready.
 */
export async function getPageData(key: string): Promise<Record<string, unknown>> {
  const def = getPageDef(key);
  if (!def) throw new Error(`Unknown page key: ${key}`);

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("data")
      .eq("path", def.path)
      .single();

    if (error || !data?.data) return def.defaults;
    return { ...def.defaults, ...(data.data as Record<string, unknown>) };
  } catch {
    return def.defaults;
  }
}

/** Typed wrapper around getPageData — pass the page's content type. */
export async function getPageContent<T extends object>(key: string): Promise<T> {
  return (await getPageData(key)) as T;
}

/** Content shared across routes (section bands + headings above DB-driven lists). */
export async function getSharedContent(): Promise<SharedContent> {
  return (await getPageData(SHARED.key)) as SharedContent;
}

/**
 * Build a page's Metadata from the (possibly overridden) SEO fields, merged
 * over any extra static metadata (keywords, openGraph, …) the page keeps
 * in code. Use from a page's generateMetadata().
 */
export async function pageMetadata(key: string, base: Metadata = {}): Promise<Metadata> {
  const content = (await getPageData(key)) as unknown as BaseContent;
  const def = getPageDef(key);
  const baseOg = base.openGraph ?? {};
  return {
    ...base,
    title: content.seoTitle,
    description: content.seoDescription,
    ...(def ? { alternates: { canonical: def.path, ...base.alternates } } : {}),
    openGraph: {
      // Default share image; a page can override by passing its own in `base`.
      images: [OG_IMAGE],
      ...baseOg,
      type: "website",
      ...(def ? { url: def.path } : {}),
      title: content.seoTitle,
      description: content.seoDescription,
    },
  };
}

/** All saved page_content rows as a path -> data map (for the admin list). */
export async function getAllPageOverrides(): Promise<Record<string, unknown>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("page_content").select("path, data");
    if (error || !data) return {};
    return Object.fromEntries(data.map((r) => [r.path, r.data]));
  } catch {
    return {};
  }
}
