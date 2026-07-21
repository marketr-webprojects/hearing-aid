import "server-only";
import type { AppointmentRequest } from "@/app/(site)/book/actions";

const BRAND = "#1AA7B8"; // Linaw Dinig teal
const INK = "#0f172a";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";
const COMPANY_NAME = "Linaw Dinig Hearing Aid Center";

/** Escape untrusted values before interpolating into email HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Shared responsive, inline-styled shell used by every email. */
function layout(opts: { heading: string; body: string; preview?: string }): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
  </head>
  <body style="margin:0;padding:0;background:#f1f5f9;">
    ${opts.preview ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.preview)}</div>` : ""}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${BORDER};border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:${BRAND};padding:20px 28px;">
                <span style="font-family:Segoe UI,Arial,sans-serif;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">${COMPANY_NAME}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 16px;font-family:Segoe UI,Arial,sans-serif;font-size:20px;line-height:1.3;color:${INK};">${esc(opts.heading)}</h1>
                ${opts.body}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px;border-top:1px solid ${BORDER};">
                <p style="margin:0;font-family:Segoe UI,Arial,sans-serif;font-size:12px;line-height:1.6;color:${MUTED};">
                  ${COMPANY_NAME} &middot; Clear Hearing. Better Living.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 0;font-family:Segoe UI,Arial,sans-serif;font-size:13px;color:${MUTED};width:150px;vertical-align:top;">${esc(label)}</td>
    <td style="padding:8px 0;font-family:Segoe UI,Arial,sans-serif;font-size:14px;color:${INK};vertical-align:top;">${esc(value)}</td>
  </tr>`;
}

type EmailContent = { subject: string; html: string; text: string };

/** Sent to the clinic inbox when a visitor submits the booking form. */
export function bookingNotificationEmail(d: AppointmentRequest): EmailContent {
  const name = `${d.firstName} ${d.lastName}`.trim();
  const details = [
    row("Name", name),
    row("Phone", d.phone),
    row("Email", d.email),
    row("Date of birth", d.dob),
    row("Preferred clinic", d.location),
    row("Appointment type", d.appointmentType),
    row("Preferred date", d.preferredDate),
    row("Preferred time", d.preferredTime),
    row("Heard about us", d.hearAbout),
    row("Notes", d.notes || "—"),
  ].join("");

  const body = `
    <p style="margin:0 0 16px;font-family:Segoe UI,Arial,sans-serif;font-size:14px;line-height:1.6;color:${INK};">
      A new appointment request came in through the website. Reply to this email to reach ${esc(name)} directly.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${details}</table>`;

  const text = [
    "New appointment request",
    "",
    `Name: ${name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
    `Date of birth: ${d.dob}`,
    `Preferred clinic: ${d.location}`,
    `Appointment type: ${d.appointmentType}`,
    `Preferred date: ${d.preferredDate}`,
    `Preferred time: ${d.preferredTime}`,
    `Heard about us: ${d.hearAbout}`,
    `Notes: ${d.notes || "—"}`,
  ].join("\n");

  return {
    subject: `New appointment request — ${name}`,
    html: layout({
      heading: "New appointment request",
      preview: `${name} requested a ${d.appointmentType} at ${d.location}`,
      body,
    }),
    text,
  };
}

/** Confirmation sent to the visitor who submitted the booking form. */
export function bookingConfirmationEmail(d: AppointmentRequest): EmailContent {
  const summary = [
    row("Clinic", d.location),
    row("Appointment type", d.appointmentType),
    row("Preferred date", d.preferredDate),
    row("Preferred time", d.preferredTime),
  ].join("");

  const body = `
    <p style="margin:0 0 16px;font-family:Segoe UI,Arial,sans-serif;font-size:14px;line-height:1.6;color:${INK};">
      Hi ${esc(d.firstName)}, thank you for reaching out to ${COMPANY_NAME}. We've received your request and our team will contact you shortly to confirm your appointment.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${summary}</table>
    <p style="margin:20px 0 0;font-family:Segoe UI,Arial,sans-serif;font-size:13px;line-height:1.6;color:${MUTED};">
      If any details need to change, just reply to this email and we'll help you out.
    </p>`;

  const text = [
    `Hi ${d.firstName},`,
    "",
    `Thank you for reaching out to ${COMPANY_NAME}. We've received your request and our team will contact you shortly to confirm your appointment.`,
    "",
    `Clinic: ${d.location}`,
    `Appointment type: ${d.appointmentType}`,
    `Preferred date: ${d.preferredDate}`,
    `Preferred time: ${d.preferredTime}`,
    "",
    "If any details need to change, just reply to this email.",
  ].join("\n");

  return {
    subject: `We received your request — ${COMPANY_NAME}`,
    html: layout({
      heading: "We received your request",
      preview: "Our team will contact you shortly to confirm your appointment.",
      body,
    }),
    text,
  };
}

/** Password-reset email for admin users. */
export function passwordResetEmail(resetUrl: string): EmailContent {
  const body = `
    <p style="margin:0 0 20px;font-family:Segoe UI,Arial,sans-serif;font-size:14px;line-height:1.6;color:${INK};">
      We received a request to reset the password for your ${COMPANY_NAME} admin account. Click the button below to choose a new password. This link expires in 1 hour.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="border-radius:9999px;background:${BRAND};">
          <a href="${resetUrl}" style="display:inline-block;padding:12px 28px;font-family:Segoe UI,Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:9999px;">Reset password</a>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0;font-family:Segoe UI,Arial,sans-serif;font-size:12px;line-height:1.6;color:${MUTED};">
      If you didn't request this, you can safely ignore this email — your password won't change.
    </p>
    <p style="margin:12px 0 0;font-family:Segoe UI,Arial,sans-serif;font-size:12px;line-height:1.6;color:${MUTED};word-break:break-all;">
      Or paste this link into your browser:<br />${esc(resetUrl)}
    </p>`;

  const text = [
    `We received a request to reset the password for your ${COMPANY_NAME} admin account.`,
    "",
    "Reset your password using this link (expires in 1 hour):",
    resetUrl,
    "",
    "If you didn't request this, you can safely ignore this email.",
  ].join("\n");

  return {
    subject: `Reset your ${COMPANY_NAME} admin password`,
    html: layout({
      heading: "Reset your password",
      preview: "Choose a new password for your admin account.",
      body,
    }),
    text,
  };
}
