"use client";

import Link from "next/link";

import { useState } from "react";
import { z } from "zod";
import { Check, Phone } from "lucide-react";
import { useBranches, usePhone } from "@/components/site/SettingsProvider";
import type { BookContent } from "@/lib/content/registry";
import { requestAppointment, type AppointmentRequest } from "./actions";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(120),
  dob: z.string().trim().min(1, "Please enter your date of birth"),
  location: z.string().trim().min(1),
  appointmentType: z.string().trim().min(1),
  preferredDate: z.string().trim().min(1, "Please choose a preferred date"),
  preferredTime: z.string().trim().min(1),
  hearAbout: z.string().trim().min(1),
  notes: z.string().trim().max(800).optional().or(z.literal("")),
});

const FIELD = "h-12 w-full rounded-xl border-2 border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";
const LABEL = "block text-sm font-bold text-foreground";

export default function BookPage({ content }: { content: BookContent }) {
  const { eyebrow, title, subtitle } = content;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { phone, phoneHref } = usePhone();
  const branches = useBranches();
  const defaultClinic = (branches.find((b) => b.main) ?? branches[0])?.name;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setSubmitting(true);
    const res = await requestAppointment(result.data as AppointmentRequest);
    setSubmitting(false);
    if (res?.error) {
      setSubmitError(res.error);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-xl px-4 text-center md:px-6">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-cta text-cta-foreground shadow-soft">
            <Check className="size-8" aria-hidden />
          </div>
          <h1 className="mt-6 text-3xl md:text-4xl">{content.successTitle}</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {content.successBody.replace("{phone}", phone)}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full border-2 border-primary px-6 py-3 text-base font-bold text-primary hover:bg-primary-soft">Back to home</Link>
            <a href={phoneHref} className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-base font-bold text-cta-foreground shadow-soft hover:bg-cta-hover">
              <Phone className="size-4" /> {phone}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center md:px-6 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">{eyebrow}</p>
          <h1 className="mt-2 text-4xl md:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-card md:p-10" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="firstName" label="First Name" error={errors.firstName}><input id="firstName" name="firstName" autoComplete="given-name" required className={FIELD} /></Field>
              <Field id="lastName" label="Last Name" error={errors.lastName}><input id="lastName" name="lastName" autoComplete="family-name" required className={FIELD} /></Field>
              <Field id="phone" label="Phone" error={errors.phone}><input id="phone" name="phone" type="tel" autoComplete="tel" required className={FIELD} /></Field>
              <Field id="email" label="Email" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" required className={FIELD} /></Field>
              <Field id="dob" label="Date of Birth" error={errors.dob}><input id="dob" name="dob" type="date" required className={FIELD} /></Field>
              <Field id="location" label="Preferred Clinic" error={errors.location}>
                <select id="location" name="location" required defaultValue={defaultClinic} className={FIELD}>
                  {branches.map((b) => (
                    <option key={b.slug}>{b.name}</option>
                  ))}
                </select>
              </Field>
              <Field id="appointmentType" label="Appointment Type" error={errors.appointmentType}>
                <select id="appointmentType" name="appointmentType" required defaultValue={content.appointmentTypes[0]} className={FIELD}>
                  {content.appointmentTypes.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field id="preferredDate" label="Preferred Date" error={errors.preferredDate}><input id="preferredDate" name="preferredDate" type="date" required className={FIELD} /></Field>
              <Field id="preferredTime" label="Preferred Time" error={errors.preferredTime}>
                <select id="preferredTime" name="preferredTime" required defaultValue={content.preferredTimes[0]} className={FIELD}>
                  {content.preferredTimes.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field id="hearAbout" label="How did you hear about us?" error={errors.hearAbout}>
                <select id="hearAbout" name="hearAbout" required defaultValue={content.hearAboutOptions[0]} className={FIELD}>
                  {content.hearAboutOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id="notes" label="Any additional notes (optional)" error={errors.notes}>
              <textarea id="notes" name="notes" rows={4} maxLength={800} className={`${FIELD} h-auto py-3`} />
            </Field>
            {submitError && (
              <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
                {submitError}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-cta px-7 py-4 text-base font-bold text-cta-foreground shadow-soft hover:bg-cta-hover disabled:opacity-60"
            >
              {submitting ? "Sending…" : content.submitLabel}
            </button>
            <div className="text-center text-sm text-muted-foreground">
              <p>{content.callPrompt}</p>
              <ul className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1">
                {branches.map((b) => (
                  <li key={b.name}>
                    <span className="font-semibold text-foreground">{b.shortName}:</span>{" "}
                    <a href={b.phoneHref} className="font-bold text-primary hover:underline">{b.phone}</a>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>{label}</label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-sm font-semibold text-destructive">{error}</p>}
    </div>
  );
}
