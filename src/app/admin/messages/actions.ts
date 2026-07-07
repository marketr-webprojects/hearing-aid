"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";

export type MessageStatus = "new" | "read" | "archived";

export async function setMessageStatus(id: string, status: MessageStatus) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("messages")
    .update({ status })
    .eq("id", id);
  if (error) return { error: error.message };
  await logActivity("update", "messages", `Message ${id} → ${status}`, id);
  revalidatePath("/admin/messages");
  return {};
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) return { error: error.message };
  await logActivity("delete", "messages", `Deleted message ${id}`, id);
  revalidatePath("/admin/messages");
  return {};
}
