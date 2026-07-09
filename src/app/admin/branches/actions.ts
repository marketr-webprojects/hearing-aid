"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";

export type BranchFields = {
  slug: string;
  name: string;
  short_name: string;
  is_main: boolean;
  address: string;
  phone: string;
  phone_href: string;
  hours: string;
  opening_hours: string | null;
  access: string;
  facebook_label: string;
  facebook_href: string;
  reviews_href: string | null;
  image: string;
  /** Copy + SEO for the branch's own /branches/[slug] page. */
  place: string;
  hero_subtitle: string;
  about: string[];
  seo_title: string;
  seo_description: string;
  is_published: boolean;
};

function revalidateBranchPages(slug?: string) {
  revalidatePath("/admin/branches");
  // Branches appear in the footer (layout) and drive /branches/[slug].
  revalidatePath("/", "layout");
  if (slug) revalidatePath(`/branches/${slug}`);
}

export async function createBranch(fields: BranchFields) {
  const supabase = await createClient();

  const { data: last } = await supabase
    .from("branches")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .single();

  const display_order = last ? last.display_order + 1 : 0;

  const { data, error } = await supabase
    .from("branches")
    .insert({ ...fields, display_order })
    .select("*")
    .single();

  if (error) return { error: error.message };

  await logActivity("create", "branches", `Created branch: ${fields.name}`, data.id);
  revalidateBranchPages(fields.slug);
  return { item: data };
}

export async function updateBranch(id: string, fields: Partial<BranchFields>) {
  const supabase = await createClient();
  const { error } = await supabase.from("branches").update(fields).eq("id", id);
  if (error) return { error: error.message };

  await logActivity("update", "branches", `Updated branch ${id}`, id);
  revalidateBranchPages(fields.slug);
  return {};
}

export async function deleteBranch(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("branches").delete().eq("id", id);
  if (error) return { error: error.message };
  await logActivity("delete", "branches", `Deleted branch ${id}`, id);
  revalidateBranchPages();
  return {};
}

export async function reorderBranches(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("branches").update({ display_order: index }).eq("id", id)
    )
  );
  revalidateBranchPages();
}
