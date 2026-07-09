import { createClient } from "@/lib/supabase/server";
import { telHref } from "@/lib/settings";
import { BRANCH_PAGE_COPY, DEFAULT_BRANCHES, type Branch } from "@/lib/branches";

/**
 * Selected with `*` on purpose: the branch-page columns (place, hero_subtitle,
 * about, seo_*) are added by a later migration, and naming them explicitly
 * would make the whole query fail on a database that hasn't run it yet.
 */
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
  place?: string | null;
  hero_subtitle?: string | null;
  about?: string[] | null;
  seo_title?: string | null;
  seo_description?: string | null;
};

function rowToBranch(row: BranchRow): Branch {
  // Blank branch-page copy means "not set" — fall back to the built-in copy,
  // which also keeps the pages intact before the columns exist.
  const copy = BRANCH_PAGE_COPY[row.slug];
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
    place: row.place || copy?.place || "",
    heroSubtitle: row.hero_subtitle || copy?.heroSubtitle || "",
    about: row.about?.length ? row.about : (copy?.about ?? []),
    seoTitle: row.seo_title ?? "",
    seoDescription: row.seo_description || copy?.seoDescription || "",
  };
}

/** Published branches in display order; in-code defaults when the DB is empty/unreachable. */
export async function getBranches(): Promise<Branch[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("branches")
      .select("*")
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
