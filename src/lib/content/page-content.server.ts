import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getPageDef, type PageContentData } from "./registry";

/**
 * Read a page's content: the DB override (page_content.data) shallow-merged
 * over the registry defaults. Never throws — falls back to defaults if the
 * row is missing or the table/keys aren't ready.
 */
export async function getPageData(key: string): Promise<PageContentData> {
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
    return { ...def.defaults, ...(data.data as Partial<PageContentData>) };
  } catch {
    return def.defaults;
  }
}

/**
 * Build a page's Metadata from the (possibly overridden) SEO fields, merged
 * over any extra static metadata (keywords, openGraph, …) the page keeps
 * in code. Use from a page's generateMetadata().
 */
export async function pageMetadata(
  key: string,
  base: Metadata = {}
): Promise<Metadata> {
  const content = await getPageData(key);
  return {
    ...base,
    title: content.seoTitle,
    description: content.seoDescription,
    openGraph: {
      ...(base.openGraph ?? {}),
      title: content.seoTitle,
      description: content.seoDescription,
    },
  };
}

/** All saved page_content rows as a path -> data map (for the admin list). */
export async function getAllPageOverrides(): Promise<Record<string, unknown>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("path, data");
    if (error || !data) return {};
    return Object.fromEntries(data.map((r) => [r.path, r.data]));
  } catch {
    return {};
  }
}
