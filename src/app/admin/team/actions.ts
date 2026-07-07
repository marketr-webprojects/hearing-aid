"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";

export type TeamMemberFields = {
  name: string;
  title: string;
  img: string;
  creds: string[];
  fun_fact: string;
  is_published: boolean;
};

function revalidateTeamPages() {
  revalidatePath("/admin/team");
  revalidatePath("/");
  revalidatePath("/about/audiologists");
}

export async function createTeamMember(fields: TeamMemberFields) {
  const supabase = await createClient();

  const { data: last } = await supabase
    .from("team_members")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .single();

  const display_order = last ? last.display_order + 1 : 0;

  const { data, error } = await supabase
    .from("team_members")
    .insert({ ...fields, display_order })
    .select("id, name, title, img, creds, fun_fact, display_order, is_published, created_at")
    .single();

  if (error) return { error: error.message };

  await logActivity("create", "team_members", `Created team member: ${fields.name}`, data.id);
  revalidateTeamPages();
  return { item: data };
}

export async function updateTeamMember(
  id: string,
  fields: Partial<TeamMemberFields>
) {
  const supabase = await createClient();
  const { error } = await supabase.from("team_members").update(fields).eq("id", id);
  if (error) return { error: error.message };

  await logActivity("update", "team_members", `Updated team member ${id}`, id);
  revalidateTeamPages();
  return {};
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) return { error: error.message };
  await logActivity("delete", "team_members", `Deleted team member ${id}`, id);
  revalidateTeamPages();
  return {};
}

export async function reorderTeamMembers(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("team_members").update({ display_order: index }).eq("id", id)
    )
  );
  revalidateTeamPages();
}
