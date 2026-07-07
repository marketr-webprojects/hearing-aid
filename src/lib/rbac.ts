export type Role = "admin" | "employee";

export interface UserProfile {
  user_id: string;
  role: Role;
  permissions: PermissionKey[];
}

export const PERMISSION_KEYS = [
  "pages",
  "branches",
  "testimonials",
  "team",
  "faqs",
  "messages",
  "settings",
  "users",
  "logs",
] as const;

export type PermissionKey = (typeof PERMISSION_KEYS)[number];

export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  pages: "Pages (text)",
  branches: "Branches",
  testimonials: "Testimonials",
  team: "Team",
  faqs: "FAQs",
  messages: "Messages",
  settings: "Settings",
  users: "Users",
  logs: "Activity Logs",
};

export const PERMISSION_PRESETS: Record<
  string,
  { label: string; permissions: PermissionKey[] }
> = {
  content_editor: {
    label: "Content Editor",
    permissions: ["pages", "branches", "testimonials", "team", "faqs"],
  },
  inbox_only: {
    label: "Inbox Only",
    permissions: ["messages"],
  },
  custom: {
    label: "Custom",
    permissions: [],
  },
};

export const PATH_PERMISSION_MAP: Record<string, PermissionKey | "admin_only"> = {
  "/admin/pages": "pages",
  "/admin/branches": "branches",
  "/admin/testimonials": "testimonials",
  "/admin/team": "team",
  "/admin/faqs": "faqs",
  "/admin/messages": "messages",
  "/admin/settings": "settings",
  "/admin/users": "admin_only",
  "/admin/logs": "logs",
};

/** Return the first admin path an employee is allowed to visit. */
export function getDefaultPage(profile: UserProfile): string {
  if (profile.role === "admin") return "/admin/home";

  const permissionToPath: [PermissionKey, string][] = [
    ["pages", "/admin/pages"],
    ["branches", "/admin/branches"],
    ["testimonials", "/admin/testimonials"],
    ["team", "/admin/team"],
    ["faqs", "/admin/faqs"],
    ["messages", "/admin/messages"],
    ["settings", "/admin/settings"],
    ["logs", "/admin/logs"],
  ];

  for (const [perm, path] of permissionToPath) {
    if (profile.permissions.includes(perm)) return path;
  }

  return "/admin/home";
}

export function canAccess(
  profile: UserProfile | null,
  pathname: string
): boolean {
  if (!profile) return false;
  if (profile.role === "admin") return true;

  if (pathname.startsWith("/admin/profile")) return true;

  const matchedKey = Object.entries(PATH_PERMISSION_MAP).find(([path]) =>
    pathname.startsWith(path)
  );

  if (!matchedKey) return true;
  const [, required] = matchedKey;

  if (required === "admin_only") return false;
  return profile.permissions.includes(required);
}
