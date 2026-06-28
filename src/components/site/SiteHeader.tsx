"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X, ChevronDown } from "lucide-react";
import { COMPANY } from "@/lib/company";

type NavItem = {
  label: string;
  to?: string;
  children?: { label: string; to: string }[];
};

const NAV: NavItem[] = [
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "Hearing Evaluation (Adult & Pediatric)", to: "/services/hearing-evaluation" },
      { label: "Hearing Aid Fitting & Customization", to: "/services/hearing-aid-fittings" },
      { label: "Hearing Aid Repair & Maintenance", to: "/services/hearing-aid-repairs" },
      { label: "Follow-up Care & Counseling", to: "/services/follow-up-care" },
      { label: "Assistive Listening Devices & Accessories", to: "/services/assistive-listening-devices" },
    ],
  },
  {
    label: "For Patients",
    to: "/patients",
    children: [
      { label: "New Patient Info", to: "/patients/new-patient-info" },
      { label: "What to Expect", to: "/patients/what-to-expect" },
      { label: "FAQs", to: "/patients/faqs" },
    ],
  },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "Our Audiologists", to: "/about/audiologists" },
      { label: "Our Clinic", to: "/about/clinic" },
      { label: "Why Choose Us", to: "/about/why-choose-us" },
    ],
  },
];

export const PHONE = COMPANY.phone;
export const PHONE_HREF = COMPANY.phoneHref;

export function SiteHeader() {
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:h-20 md:px-6">
        <Link href="/" className="flex items-center" aria-label="Linaw Dinig Hearing Aid Center — home">
          <img
            src="/linawdinig-logo.webp"
            alt="Linaw Dinig Hearing Aid Center"
            width={1429}
            height={377}
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <NavLinkItem key={item.label} item={item} />
          ))}
        </nav>

        <a
          href={PHONE_HREF}
          className="ml-auto hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-primary hover:bg-primary-soft lg:ml-3 lg:inline-flex"
        >
          <Phone className="size-4" aria-hidden />
          {PHONE}
        </a>

        <Link
          href="/book"
          className="hidden rounded-full bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground shadow-soft transition hover:bg-cta-hover lg:inline-flex"
        >
          Book Appointment
        </Link>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground lg:hidden"
          aria-label={openMobile ? "Close menu" : "Open menu"}
          aria-expanded={openMobile}
          onClick={() => setOpenMobile((v) => !v)}
        >
          {openMobile ? <X /> : <Menu />}
        </button>
      </div>

      {openMobile && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  {item.to && (
                    <Link
                      href={item.to}
                      onClick={() => setOpenMobile(false)}
                      className="block rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.children && (
                    <ul className="ml-3 border-l border-border/70 pl-3">
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <Link
                            href={c.to}
                            onClick={() => setOpenMobile(false)}
                            className="block rounded-md px-3 py-2 text-base text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-4 py-3 text-base font-semibold text-primary"
              >
                <Phone className="size-4" /> {PHONE}
              </a>
              <Link
                href="/book"
                onClick={() => setOpenMobile(false)}
                className="inline-flex items-center justify-center rounded-full bg-cta px-5 py-3 text-base font-bold text-cta-foreground shadow-soft"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLinkItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = item.to ? pathname === item.to || pathname.startsWith(item.to + "/") : false;
  const activeCls = isActive ? " text-primary bg-primary-soft" : "";

  if (!item.children) {
    return (
      <Link
        href={item.to!}
        className={"rounded-full px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted" + activeCls}
      >
        {item.label}
      </Link>
    );
  }
  return (
    <div className="group relative">
      <Link
        href={item.to!}
        className={"inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted" + activeCls}
      >
        {item.label}
        <ChevronDown className="size-3.5 opacity-70" aria-hidden />
      </Link>
      <div className="invisible absolute left-0 top-full z-50 min-w-[260px] translate-y-1 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="rounded-2xl border border-border bg-card p-2 shadow-soft">
          {item.children.map((c) => (
            <Link
              key={c.to}
              href={c.to}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-primary-soft hover:text-primary"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
