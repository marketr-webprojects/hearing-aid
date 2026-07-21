"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail, NOTIFY_TO } from "@/lib/email/resend";
import {
  bookingNotificationEmail,
  bookingConfirmationEmail,
} from "@/lib/email/templates";

const schema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  phone: z.string().trim().min(6).max(20),
  email: z.string().trim().email().max(120),
  dob: z.string().trim().min(1).max(30),
  location: z.string().trim().min(1).max(120),
  appointmentType: z.string().trim().min(1).max(120),
  preferredDate: z.string().trim().min(1).max(30),
  preferredTime: z.string().trim().min(1).max(30),
  hearAbout: z.string().trim().min(1).max(120),
  notes: z.string().trim().max(800).optional().or(z.literal("")),
});

export type AppointmentRequest = z.infer<typeof schema>;

/**
 * Store a booking-form submission in the messages table. Uses the
 * service-role client because visitors are not authenticated (the table has
 * no public insert policy).
 */
export async function requestAppointment(
  input: AppointmentRequest
): Promise<{ error?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: "Please check the form and try again." };
  const d = parsed.data;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("messages").insert({
      first_name: d.firstName,
      last_name: d.lastName,
      phone: d.phone,
      email: d.email,
      dob: d.dob,
      location: d.location,
      appointment_type: d.appointmentType,
      preferred_date: d.preferredDate,
      preferred_time: d.preferredTime,
      hear_about: d.hearAbout,
      notes: d.notes || null,
    });
    if (error) return { error: "Something went wrong. Please call us instead." };

    // The request is stored — email delivery is best-effort and must never
    // fail the submission. Notify the clinic (reply-to the customer) and send
    // the customer a confirmation.
    await Promise.allSettled([
      sendEmail({
        to: NOTIFY_TO,
        replyTo: d.email,
        ...bookingNotificationEmail(d),
      }),
      sendEmail({
        to: d.email,
        ...bookingConfirmationEmail(d),
      }),
    ]);

    return {};
  } catch {
    return { error: "Something went wrong. Please call us instead." };
  }
}
