import { createClient } from "@/lib/supabase/server";
import TestimonialsClient from "./TestimonialsClient";

export const dynamic = "force-dynamic";

export type Testimonial = {
  id: string;
  name: string;
  source: string;
  quote: string;
  rating: number;
  display_order: number;
  is_published: boolean;
  created_at: string;
};

export default async function TestimonialsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("id, name, source, quote, rating, display_order, is_published, created_at")
    .order("display_order", { ascending: true });
  return <TestimonialsClient initialItems={(data ?? []) as Testimonial[]} />;
}
