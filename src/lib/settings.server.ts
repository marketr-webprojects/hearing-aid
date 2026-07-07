import { createClient } from "@/lib/supabase/server";
import { SETTINGS_DEFAULTS, type SiteSettings } from "@/lib/settings";

/**
 * Read global site settings, shallow-merging the DB row over the in-code
 * defaults. Any failure (no Supabase project yet, network, empty row)
 * falls back to the defaults so the site always renders.
 */
export async function getSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("data")
      .eq("id", 1)
      .single();

    const stored = (data?.data ?? {}) as Partial<SiteSettings>;
    return {
      ...SETTINGS_DEFAULTS,
      ...stored,
      social: { ...SETTINGS_DEFAULTS.social, ...(stored.social ?? {}) },
    };
  } catch {
    return SETTINGS_DEFAULTS;
  }
}
