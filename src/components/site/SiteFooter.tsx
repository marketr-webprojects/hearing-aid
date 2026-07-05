"use client";

import Link from "next/link";
import { Facebook, Mail, MapPin, Phone, Clock } from "lucide-react";
import { COMPANY, BRANCHES } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          {/* Original-color logo kept on purpose — the gold swirl in the "D" is part of the registered trademark. */}
          <span className="inline-block rounded-xl bg-white px-3 py-2">
            <img
              src="/linawdinig-logo.webp"
              alt={COMPANY.name}
              width={1429}
              height={377}
              className="h-10 w-auto"
            />
          </span>
          <p className="mt-3 text-base text-primary-foreground/85">
            {COMPANY.tagline}
          </p>
          <p className="mt-2 text-sm text-primary-foreground/70">
            Established {COMPANY.established}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {BRANCHES.map((b) => (
              <a
                key={b.facebookHref}
                aria-label={b.facebookLabel}
                title={b.facebookLabel}
                href={b.facebookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-2 text-xs font-semibold hover:bg-primary-foreground/20"
              >
                <Facebook className="size-4" /> {b.shortName}
              </a>
            ))}
          </div>
          <a
            href={COMPANY.social.tiktokHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-primary-foreground/85 hover:text-accent"
          >
            TikTok {COMPANY.social.tiktok}
          </a>
        </div>

        <div>
          <h3 className="text-base font-bold text-primary-foreground">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-primary-foreground/85">
            <li>
              <Link href="/services" className="hover:text-accent">
                Services
              </Link>
            </li>
            <li>
              <Link href="/patients" className="hover:text-accent">
                For Patients
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-accent">
                Book Appointment
              </Link>
            </li>
          </ul>
          <h3 className="mt-6 text-base font-bold text-primary-foreground">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-2 text-primary-foreground/85">
            {BRANCHES.map((b) => (
              <li key={b.name} className="flex gap-2">
                <Phone className="mt-0.5 size-5 shrink-0 text-accent" />
                <span>
                  <span className="font-bold text-primary-foreground">{b.shortName}:</span>{" "}
                  <a href={b.phoneHref}>{b.phone}</a>
                </span>
              </li>
            ))}
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-base font-bold text-primary-foreground">Our Branches</h3>
          <ul className="mt-4 grid gap-5 sm:grid-cols-2">
            {BRANCHES.map((b) => (
              <li key={b.name} className="text-sm text-primary-foreground/85">
                <p className="font-bold text-primary-foreground">
                  {b.name}
                  {b.main && (
                    <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
                      Main
                    </span>
                  )}
                </p>
                <p className="mt-1 flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{b.address}</span>
                </p>
                <p className="mt-1 flex gap-2">
                  <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
                  <a href={b.phoneHref}>{b.phone}</a>
                </p>
                <p className="mt-1 flex gap-2">
                  <Clock className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{b.hours}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-primary-foreground/70 md:px-6">
          <p>
            {COMPANY.name} audiologists are qualified practitioners. All
            information on this site is general in nature and not a substitute
            for professional advice.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <span>
              © {new Date().getFullYear()} {COMPANY.name}
            </span>
            <a href="#" className="hover:text-accent">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
