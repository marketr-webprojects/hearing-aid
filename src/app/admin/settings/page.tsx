import { getSettings } from "@/lib/settings.server";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function SettingsAdminPage() {
  const settings = await getSettings();
  return <SettingsClient initial={settings} />;
}
