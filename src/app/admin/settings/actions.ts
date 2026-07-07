"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";
import type { SiteSettings } from "@/lib/settings";

export async function updateSettings(data: SiteSettings) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, data }, { onConflict: "id" });

  if (error) return { error: error.message };

  await logActivity("update", "site_settings", "Updated site settings", "1");
  // Settings appear in the header/footer on every page.
  revalidatePath("/", "layout");
  return {};
}
