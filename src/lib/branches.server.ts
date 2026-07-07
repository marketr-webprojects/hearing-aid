import { createClient } from "@/lib/supabase/server";
import { telHref } from "@/lib/settings";
import { DEFAULT_BRANCHES, type Branch } from "@/lib/branches";

type BranchRow = {
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
};

function rowToBranch(row: BranchRow): Branch {
  return {
    slug: row.slug,
    name: row.name,
    shortName: row.short_name,
    main: row.is_main,
    address: row.address,
    phone: row.phone,
    phoneHref: row.phone_href || telHref(row.phone),
    hours: row.hours,
    openingHours: row.opening_hours ?? undefined,
    access: row.access,
    facebookLabel: row.facebook_label,
    facebookHref: row.facebook_href,
    reviewsHref: row.reviews_href ?? undefined,
    image: row.image,
  };
}

/** Published branches in display order; in-code defaults when the DB is empty/unreachable. */
export async function getBranches(): Promise<Branch[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("branches")
      .select(
        "slug, name, short_name, is_main, address, phone, phone_href, hours, opening_hours, access, facebook_label, facebook_href, reviews_href, image"
      )
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) return DEFAULT_BRANCHES;
    return (data as BranchRow[]).map(rowToBranch);
  } catch {
    return DEFAULT_BRANCHES;
  }
}

export async function getBranch(slug: string): Promise<Branch | undefined> {
  const branches = await getBranches();
  return branches.find((b) => b.slug === slug);
}
