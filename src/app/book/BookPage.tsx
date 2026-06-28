"use client";

import Link from "next/link";

import { useState } from "react";
import { z } from "zod";
import { Check, Phone } from "lucide-react";
import { PHONE, PHONE_HREF } from "@/components/site/SiteHeader";

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

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-xl px-4 text-center md:px-6">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-cta text-cta-foreground shadow-soft">
            <Check className="size-8" aria-hidden />
          </div>
          <h1 className="mt-6 text-3xl md:text-4xl">Thanks — your request is in!</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            We'll be in touch within one business day to confirm your appointment. If you'd like to chat sooner, call us on {PHONE}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full border-2 border-primary px-6 py-3 text-base font-bold text-primary hover:bg-primary-soft">Back to home</Link>
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-base font-bold text-cta-foreground shadow-soft hover:bg-cta-hover">
              <Phone className="size-4" /> {PHONE}
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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary/80">Book Online · Under 2 minutes</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Book Your Appointment</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your first hearing test is completely free with no obligation to purchase.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-card md:p-10" noValidate>
            <div className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-semibold text-primary">
              Your first hearing test is completely free with no obligation to purchase.
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="firstName" label="First Name" error={errors.firstName}><input id="firstName" name="firstName" autoComplete="given-name" required className={FIELD} /></Field>
              <Field id="lastName" label="Last Name" error={errors.lastName}><input id="lastName" name="lastName" autoComplete="family-name" required className={FIELD} /></Field>
              <Field id="phone" label="Phone" error={errors.phone}><input id="phone" name="phone" type="tel" autoComplete="tel" required className={FIELD} /></Field>
              <Field id="email" label="Email" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" required className={FIELD} /></Field>
              <Field id="dob" label="Date of Birth" error={errors.dob}><input id="dob" name="dob" type="date" required className={FIELD} /></Field>
              <Field id="location" label="Preferred Clinic" error={errors.location}>
                <select id="location" name="location" required defaultValue="Tanay, Rizal (Main Office)" className={FIELD}>
                  <option>Tanay, Rizal (Main Office)</option>
                  <option>Cebu City, Cebu</option>
                  <option>Dasmariñas City, Cavite</option>
                  <option>Rosario, La Union</option>
                </select>
              </Field>
              <Field id="appointmentType" label="Appointment Type" error={errors.appointmentType}>
                <select id="appointmentType" name="appointmentType" required defaultValue="Free Hearing Consultation" className={FIELD}>
                  <option>Free Hearing Consultation</option>
                  <option>Hearing Evaluation (Adult)</option>
                  <option>Hearing Evaluation (Pediatric)</option>
                  <option>Hearing Aid Fitting &amp; Customization</option>
                  <option>Hearing Aid Repair &amp; Maintenance</option>
                  <option>Follow-up Care &amp; Counseling</option>
                  <option>Assistive Listening Devices &amp; Accessories</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field id="preferredDate" label="Preferred Date" error={errors.preferredDate}><input id="preferredDate" name="preferredDate" type="date" required className={FIELD} /></Field>
              <Field id="preferredTime" label="Preferred Time" error={errors.preferredTime}>
                <select id="preferredTime" name="preferredTime" required defaultValue="Morning" className={FIELD}>
                  <option>Morning</option>
                  <option>Midday</option>
                  <option>Afternoon</option>
                </select>
              </Field>
              <Field id="hearAbout" label="How did you hear about us?" error={errors.hearAbout}>
                <select id="hearAbout" name="hearAbout" required defaultValue="Google" className={FIELD}>
                  <option>Google</option>
                  <option>Friend or family</option>
                  <option>GP referral</option>
                  <option>Social media</option>
                  <option>Existing patient</option>
                  <option>Other</option>
                </select>
              </Field>
            </div>
            <Field id="notes" label="Any additional notes (optional)" error={errors.notes}>
              <textarea id="notes" name="notes" rows={4} maxLength={800} className={`${FIELD} h-auto py-3`} />
            </Field>
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-cta px-7 py-4 text-base font-bold text-cta-foreground shadow-soft hover:bg-cta-hover">
              Request My Appointment
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Prefer to talk? Call us on{" "}
              <a href={PHONE_HREF} className="font-bold text-primary hover:underline">{PHONE}</a>
            </p>
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
