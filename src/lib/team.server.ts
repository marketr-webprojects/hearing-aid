import { createClient } from "@/lib/supabase/server";
import { DEFAULT_TEAM, type TeamMember } from "@/lib/team";

/** Published team members in display order; in-code defaults when the DB is empty/unreachable. */
export async function getPublishedTeam(): Promise<TeamMember[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("team_members")
      .select("name, title, img, creds, fun_fact")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) return DEFAULT_TEAM;
    return data.map((r) => ({
      name: r.name as string,
      title: r.title as string,
      img: r.img as string,
      creds: (r.creds ?? []) as string[],
      funFact: r.fun_fact as string,
    }));
  } catch {
    return DEFAULT_TEAM;
  }
}
