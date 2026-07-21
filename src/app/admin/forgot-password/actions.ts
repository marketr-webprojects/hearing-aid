"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/resend";
import { passwordResetEmail } from "@/lib/email/templates";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const schema = z.object({ email: z.string().trim().email().max(120) });

/**
 * Email a password-reset link to an admin user. We generate the recovery link
 * with the service-role client (without Supabase sending anything) and deliver
 * it ourselves through Resend, so the whole flow runs on our own domain.
 *
 * Always resolves to success — we never reveal whether an email is registered.
 */
export async function requestPasswordReset(
  input: unknown
): Promise<{ ok: true }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: true };
  const email = parsed.data.email;

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.auth.admin.generateLink({
      type: "recovery",
      email,
    });

    const hashedToken = data?.properties?.hashed_token;
    if (!error && hashedToken) {
      const url = new URL("/admin/auth/confirm", SITE_URL);
      url.searchParams.set("token_hash", hashedToken);
      url.searchParams.set("type", "recovery");
      url.searchParams.set("next", "/admin/reset-password");

      await sendEmail({
        to: email,
        ...passwordResetEmail(url.toString()),
      });
    }
  } catch {
    // Swallow — never expose account existence or internal errors.
  }

  return { ok: true };
}
