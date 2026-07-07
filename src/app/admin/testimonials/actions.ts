"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";

export type TestimonialFields = {
  name: string;
  source: string;
  quote: string;
  rating: number;
  is_published: boolean;
};

function revalidateTestimonialPages() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function createTestimonial(fields: TestimonialFields) {
  const supabase = await createClient();

  const { data: last } = await supabase
    .from("testimonials")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .single();

  const display_order = last ? last.display_order + 1 : 0;

  const { data, error } = await supabase
    .from("testimonials")
    .insert({ ...fields, display_order })
    .select("id, name, source, quote, rating, display_order, is_published, created_at")
    .single();

  if (error) return { error: error.message };

  await logActivity(
    "create",
    "testimonials",
    `Created testimonial: ${fields.name}`,
    data.id
  );
  revalidateTestimonialPages();
  return { item: data };
}

export async function updateTestimonial(
  id: string,
  fields: Partial<TestimonialFields>
) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update(fields).eq("id", id);
  if (error) return { error: error.message };

  await logActivity("update", "testimonials", `Updated testimonial ${id}`, id);
  revalidateTestimonialPages();
  return {};
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };
  await logActivity("delete", "testimonials", `Deleted testimonial ${id}`, id);
  revalidateTestimonialPages();
  return {};
}

export async function reorderTestimonials(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("testimonials").update({ display_order: index }).eq("id", id)
    )
  );
  revalidateTestimonialPages();
}
