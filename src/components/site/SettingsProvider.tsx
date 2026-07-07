"use client";

import { createContext, useContext, type ReactNode } from "react";
import { SETTINGS_DEFAULTS, type SiteSettings, telHref } from "@/lib/settings";
import { DEFAULT_BRANCHES, type Branch } from "@/lib/branches";

type SettingsContextValue = {
  settings: SiteSettings;
  branches: Branch[];
};

const SettingsContext = createContext<SettingsContextValue>({
  settings: SETTINGS_DEFAULTS,
  branches: DEFAULT_BRANCHES,
});

/** Provides DB-backed settings + branches (fetched in the server layout) to client components. */
export function SettingsProvider({
  settings,
  branches,
  children,
}: SettingsContextValue & { children: ReactNode }) {
  return (
    <SettingsContext.Provider value={{ settings, branches }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SiteSettings {
  return useContext(SettingsContext).settings;
}

export function useBranches(): Branch[] {
  return useContext(SettingsContext).branches;
}

/** Primary phone display + tel: href from settings. */
export function usePhone(): { phone: string; phoneHref: string } {
  const settings = useSettings();
  return { phone: settings.phone, phoneHref: telHref(settings.phone) };
}
