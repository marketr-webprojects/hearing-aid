"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";

/**
 * Pseudo-pages (e.g. "_shared") aren't routes, and their content renders on
 * many pages — revalidate the whole tree instead of a single path.
 */
function revalidateContent(path: string) {
  if (path.startsWith("/")) revalidatePath(path);
  else revalidatePath("/", "layout");
  revalidatePath("/admin/pages");
}

export async function savePageContent(path: string, data: Record<string, unknown>) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("page_content")
    .upsert({ path, data }, { onConflict: "path" });

  if (error) return { error: error.message };

  await logActivity("update", "page_content", `Updated page content: ${path}`, path);
  revalidateContent(path);
  return {};
}

export async function resetPageContent(path: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("page_content").delete().eq("path", path);
  if (error) return { error: error.message };

  await logActivity("delete", "page_content", `Reset page content: ${path}`, path);
  revalidateContent(path);
  return {};
}
