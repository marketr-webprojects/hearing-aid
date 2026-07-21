import "server-only";
import { Resend } from "resend";

/**
 * Resend transactional email. All outbound mail (booking notifications,
 * customer confirmations, admin password resets) goes through here.
 *
 * Configure via env:
 *   RESEND_API_KEY       — API key from https://resend.com/api-keys
 *   EMAIL_FROM           — verified sender, e.g. "Linaw Dinig <noreply@linawdinig.com>"
 *   CONTACT_NOTIFY_EMAIL — inbox that receives new booking requests
 */

let client: Resend | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

/** Verified "from" address. Must be on a domain verified in Resend. */
export const EMAIL_FROM =
  process.env.EMAIL_FROM ??
  "Linaw Dinig Hearing Aid Center <noreply@linawdinig.com>";

/**
 * Internal inbox(es) that receive new booking requests. Accepts one or more
 * addresses in CONTACT_NOTIFY_EMAIL, separated by commas (or semicolons), e.g.
 * "a@x.com, b@y.com, c@z.com". Resend allows up to 50 recipients.
 */
export const NOTIFY_TO: string[] = (
  process.env.CONTACT_NOTIFY_EMAIL ?? "linaw.dinig.hac@gmail.com"
)
  .split(/[,;]/)
  .map((addr) => addr.trim())
  .filter(Boolean);

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string | string[];
};

/**
 * Send an email through Resend. Never throws — returns `{ error }` on failure
 * so callers can decide whether the failure is user-facing. When
 * RESEND_API_KEY is missing (e.g. local dev), it no-ops with a warning.
 */
export async function sendEmail(
  input: SendEmailInput
): Promise<{ id?: string; error?: string }> {
  const resend = getResend();
  if (!resend) {
    console.warn(
      `[email] RESEND_API_KEY not set — skipped "${input.subject}" to ${String(
        input.to
      )}`
    );
    return { error: "Email is not configured." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
    });
    if (error) {
      console.error("[email] send failed:", error);
      return { error: error.message };
    }
    return { id: data?.id };
  } catch (e) {
    console.error("[email] send threw:", e);
    return { error: "Failed to send email." };
  }
}
