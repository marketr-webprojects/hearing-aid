import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import AdminSidebar from "./AdminSidebar";
import type { UserProfile } from "@/lib/rbac";

export const metadata = {
  title: "Admin | Linaw Dinig",
  robots: "noindex, nofollow",
};

const STANDALONE_PAGES = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isStandalone = STANDALONE_PAGES.includes(pathname);

  if (isStandalone) return <>{children}</>;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <>{children}</>;

  const { data: profile } = await createAdminClient()
    .from("user_profiles")
    .select("user_id, role, permissions")
    .eq("user_id", user.id)
    .single();

  const userProfile = (profile as UserProfile | null) ?? {
    user_id: user.id,
    role: "employee" as const,
    permissions: [],
  };

  return (
    <div className="min-h-screen bg-muted">
      <AdminSidebar userEmail={user.email ?? ""} profile={userProfile} />
      <div className="md:pl-60 pt-14 md:pt-0">
        <main className="px-4 md:px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
