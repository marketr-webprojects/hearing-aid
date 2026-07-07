import { createAdminClient } from "@/lib/supabase/admin";
import { getUserProfiles } from "./actions";
import UsersClient from "./UsersClient";

export const dynamic = "force-dynamic";

export type AdminUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
};

export default async function UsersPage() {
  const supabase = createAdminClient();
  let users: AdminUser[] = [];
  let profiles: { user_id: string; role: string; permissions: string[] }[] = [];

  try {
    const [{ data, error }, p] = await Promise.all([
      supabase.auth.admin.listUsers({ perPage: 1000 }),
      getUserProfiles(),
    ]);
    if (!error) {
      users = data.users.map((u) => ({
        id: u.id,
        email: u.email ?? "",
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at ?? null,
      }));
    }
    profiles = p as typeof profiles;
  } catch {
    // Keys/DB not ready — render empty with guidance.
  }

  const profileMap = Object.fromEntries(profiles.map((p) => [p.user_id, p]));
  return <UsersClient initialUsers={users} profileMap={profileMap} />;
}
