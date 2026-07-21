"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters.").max(72),
});

/**
 * Set a new password for the user in the current (recovery) session. Requires
 * the session established by /admin/auth/confirm.
 */
export async function updatePassword(
  input: unknown
): Promise<{ error?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid password." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Your reset link has expired. Please request a new one." };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });
  if (error) return { error: error.message };

  await logActivity("update", "auth", `Password reset for ${user.email}`, user.id);
  return {};
}
