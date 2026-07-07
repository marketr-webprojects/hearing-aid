import { createClient } from "@/lib/supabase/server";
import TeamClient from "./TeamClient";

export const dynamic = "force-dynamic";

export type TeamMemberRow = {
  id: string;
  name: string;
  title: string;
  img: string;
  creds: string[];
  fun_fact: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
};

export default async function TeamAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("team_members")
    .select("id, name, title, img, creds, fun_fact, display_order, is_published, created_at")
    .order("display_order", { ascending: true });
  return <TeamClient initialItems={(data ?? []) as TeamMemberRow[]} />;
}
