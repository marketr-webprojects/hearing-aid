import { createClient } from "@/lib/supabase/server";
import { DEFAULT_FAQS, type Faq } from "@/lib/faqs";

/** Published FAQs in display order; in-code defaults when the DB is empty/unreachable. */
export async function getPublishedFaqs(): Promise<Faq[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("question, answer")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) return DEFAULT_FAQS;
    return data.map((r) => ({ q: r.question as string, a: r.answer as string }));
  } catch {
    return DEFAULT_FAQS;
  }
}
