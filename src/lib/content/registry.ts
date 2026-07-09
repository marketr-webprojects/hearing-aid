// Registry of every editable page: route, admin label and the in-code default
// content. The admin Pages section edits overrides stored in the page_content
// table; getPageData() merges them over these defaults.
//
// The per-page content shapes and field schemas live in ./pages/*.ts.
import type { PageDef } from "./types";
import { HOME } from "./pages/home";
import { SHARED } from "./pages/shared";
import { ABOUT, ABOUT_AUDIOLOGISTS, ABOUT_CLINIC, ABOUT_WHY_CHOOSE_US } from "./pages/about";
import {
  SERVICES,
  SERVICES_HEARING_EVALUATION,
  SERVICES_HEARING_AID_FITTINGS,
  SERVICES_HEARING_AID_REPAIRS,
  SERVICES_FOLLOW_UP_CARE,
  SERVICES_ASSISTIVE_LISTENING_DEVICES,
} from "./pages/services";
import {
  PATIENTS,
  PATIENTS_NEW_PATIENT_INFO,
  PATIENTS_WHAT_TO_EXPECT,
  PATIENTS_FAQS,
} from "./pages/patients";
import { BOOK } from "./pages/book";

export * from "./types";

/** Any page definition, regardless of its content shape. */
export type AnyPageDef = PageDef<Record<string, unknown>>;

export const PAGES = [
  HOME,
  SHARED,
  ABOUT,
  ABOUT_CLINIC,
  ABOUT_AUDIOLOGISTS,
  ABOUT_WHY_CHOOSE_US,
  SERVICES,
  SERVICES_HEARING_EVALUATION,
  SERVICES_HEARING_AID_FITTINGS,
  SERVICES_HEARING_AID_REPAIRS,
  SERVICES_FOLLOW_UP_CARE,
  SERVICES_ASSISTIVE_LISTENING_DEVICES,
  PATIENTS,
  PATIENTS_NEW_PATIENT_INFO,
  PATIENTS_WHAT_TO_EXPECT,
  PATIENTS_FAQS,
  BOOK,
] as unknown as AnyPageDef[];

export function getPageDef(key: string): AnyPageDef | undefined {
  return PAGES.find((p) => p.key === key);
}

export type { HomeContent } from "./pages/home";
export type { SharedContent } from "./pages/shared";
export type {
  AboutContent,
  AboutAudiologistsContent,
  AboutClinicContent,
  AboutWhyChooseUsContent,
} from "./pages/about";
export type {
  ServicesContent,
  HearingEvaluationContent,
  HearingAidFittingsContent,
  HearingAidRepairsContent,
  FollowUpCareContent,
  AssistiveDevicesContent,
} from "./pages/services";
export type {
  PatientsContent,
  NewPatientInfoContent,
  WhatToExpectContent,
  PatientsFaqsContent,
} from "./pages/patients";
export type { BookContent } from "./pages/book";
