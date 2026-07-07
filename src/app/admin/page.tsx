import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDefaultPage, type UserProfile } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export default async function AdminIndex() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

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

  redirect(getDefaultPage(userProfile));
}
