"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";
import type { PageContentData } from "@/lib/content/registry";

export async function savePageContent(path: string, data: PageContentData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("page_content")
    .upsert({ path, data }, { onConflict: "path" });

  if (error) return { error: error.message };

  await logActivity("update", "page_content", `Updated page content: ${path}`, path);
  revalidatePath(path);
  revalidatePath("/admin/pages");
  return {};
}

export async function resetPageContent(path: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("page_content").delete().eq("path", path);
  if (error) return { error: error.message };

  await logActivity("delete", "page_content", `Reset page content: ${path}`, path);
  revalidatePath(path);
  revalidatePath("/admin/pages");
  return {};
}
