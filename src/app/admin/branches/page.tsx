import { createClient } from "@/lib/supabase/server";
import BranchesClient from "./BranchesClient";

export const dynamic = "force-dynamic";

export type BranchRow = {
  id: string;
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
  place: string;
  hero_subtitle: string;
  about: string[];
  seo_title: string;
  seo_description: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
};

export default async function BranchesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("branches")
    .select("*")
    .order("display_order", { ascending: true });
  return <BranchesClient initialItems={(data ?? []) as BranchRow[]} />;
}
