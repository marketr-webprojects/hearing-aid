import { createClient } from "@/lib/supabase/server";
import { DEFAULT_TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

/** Published testimonials in display order; in-code defaults when the DB is empty/unreachable. */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("name, source, quote, rating")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) return DEFAULT_TESTIMONIALS;
    return data as Testimonial[];
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
}
