"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signOutAction } from "./actions";
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Quote,
  Users,
  HelpCircle,
  Inbox,
  SlidersHorizontal,
  UserCog,
  ScrollText,
  LogOut,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import type { UserProfile, PermissionKey } from "@/lib/rbac";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  permission?: PermissionKey | "admin_only";
};

type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/home", icon: LayoutDashboard },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Pages", href: "/admin/pages", icon: FileText, permission: "pages" },
      { label: "Branches", href: "/admin/branches", icon: MapPin, permission: "branches" },
      {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: Quote,
        permission: "testimonials",
      },
      { label: "Team", href: "/admin/team", icon: Users, permission: "team" },
      { label: "FAQs", href: "/admin/faqs", icon: HelpCircle, permission: "faqs" },
    ],
  },
  {
    label: "Engage",
    items: [
      { label: "Messages", href: "/admin/messages", icon: Inbox, permission: "messages" },
    ],
  },
  {
    label: "Admin",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: SlidersHorizontal,
        permission: "settings",
      },
      { label: "Users", href: "/admin/users", icon: UserCog, permission: "admin_only" },
      { label: "Logs", href: "/admin/logs", icon: ScrollText, permission: "logs" },
    ],
  },
];

function canSeeItem(item: NavItem, profile: UserProfile): boolean {
  if (profile.role === "admin") return true;
  if (item.permission === "admin_only") return false;
  if (!item.permission) return true;
  return profile.permissions.includes(item.permission);
}

function visibleGroups(profile: UserProfile): NavGroup[] {
  return navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => canSeeItem(item, profile)),
    }))
    .filter((group) => group.items.length > 0);
}

export default function AdminSidebar({
  userEmail,
  profile,
}: {
  userEmail: string;
  profile: UserProfile;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    await signOutAction();
    router.push("/admin/login");
    router.refresh();
  };

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "TOKEN_REFRESHED" && !session) {
        supabase.auth.signOut().then(() => router.push("/admin/login"));
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  const groups = visibleGroups(profile);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (label: string) =>
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-foreground border-b border-white/10 flex items-center gap-3 px-4 h-14">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <img
            src="/LDregistered.webp"
            alt="Linaw Dinig"
            className="h-7 w-7 rounded-lg bg-white object-contain p-0.5"
          />
          <p className="text-white font-semibold text-sm leading-none">Admin Panel</p>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-60 bg-foreground flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/LDregistered.webp"
              alt="Linaw Dinig"
              className="h-9 w-9 rounded-lg bg-white object-contain p-0.5 shrink-0"
            />
            <div className="flex-1">
              <p className="text-white font-display font-bold text-sm leading-none tracking-wide">
                LINAW DINIG
              </p>
              <p className="text-white/50 text-xs mt-1">Admin Panel</p>
            </div>
            <button
              onClick={closeMobile}
              className="md:hidden p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {groups.map((group) => {
            const isCollapsed = !!collapsed[group.label];
            return (
              <div key={group.label}>
                <button
                  onClick={() => toggle(group.label)}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors group"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40 group-hover:text-white/60">
                    {group.label}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-white/40 group-hover:text-white/60 transition-transform duration-200 ${
                      isCollapsed ? "-rotate-90" : ""
                    }`}
                  />
                </button>

                {!isCollapsed && (
                  <div className="space-y-0.5 mt-0.5 mb-2">
                    {group.items.map(({ label, href, icon: Icon }) => {
                      const active = pathname.startsWith(href);
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeMobile}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            active
                              ? "bg-primary text-primary-foreground"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            View Site
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
          <div className="px-3 pt-3 space-y-1">
            <p className="text-xs text-white/40 truncate">{userEmail}</p>
            <span
              className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                profile.role === "admin"
                  ? "bg-primary/30 text-white"
                  : "bg-white/10 text-white/60"
              }`}
            >
              {profile.role === "admin" ? "Administrator" : "Employee"}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
