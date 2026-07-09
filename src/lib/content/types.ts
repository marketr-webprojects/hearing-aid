// Field-schema types for the CMS. Each page in the registry declares the shape
// of its editable content; the admin renders a form from that schema and the
// public page renders from the same data. Layout stays in code — an editor can
// change copy, images, ordering and list length, never markup.

/** {title, body} — InfoCards, "how it works" steps, mission/vision panels. */
export type Card = { title: string; body: string };

/** A service card: named icon + copy + destination route. */
export type IconCard = { icon: string; title: string; desc: string; href: string };

/** A trust-bar entry: named icon + one-line label. */
export type IconItem = { icon: string; label: string };

/** A card with a photo above the copy. */
export type ImageCard = { title: string; body: string; img: string; alt: string };

/** A quiz question / any "one line of text plus a picture" item. */
export type TextImage = { text: string; img: string };

/** A navigation-style link. */
export type LinkItem = { label: string; href: string };

/** A card that links somewhere (Patients overview). */
export type LinkCard = { title: string; body: string; href: string };

export type FieldDef =
  | { key: string; type: "text"; label: string; placeholder?: string }
  | { key: string; type: "textarea"; label: string; placeholder?: string }
  | { key: string; type: "image"; label: string }
  | { key: string; type: "strings"; label: string; placeholder?: string; multiline?: boolean }
  | { key: string; type: "cards"; label: string }
  | { key: string; type: "iconCards"; label: string }
  | { key: string; type: "linkCards"; label: string }
  | { key: string; type: "iconItems"; label: string }
  | { key: string; type: "imageCards"; label: string }
  | { key: string; type: "textImages"; label: string }
  | { key: string; type: "links"; label: string };

export type FieldGroup = { label: string; fields: FieldDef[] };

/** Hero + SEO fields, shared by every real page (not the pseudo-pages). */
export type BaseContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
};

export type PageDef<T extends object = Record<string, unknown>> = {
  key: string;
  /** page_content primary key. Pseudo-pages use a "_"-prefixed path (never a route). */
  path: string;
  label: string;
  group: string;
  /** Body-content field groups; hero and SEO groups are prepended/appended. */
  groups: FieldGroup[];
  defaults: T;
  /** Pseudo-pages (e.g. Shared sections) have no hero and no SEO block. */
  hero?: boolean;
  seo?: boolean;
};

export const HERO_FIELDS: FieldGroup = {
  label: "Hero",
  fields: [
    { key: "eyebrow", type: "text", label: "Eyebrow (small text above the title)" },
    { key: "title", type: "text", label: "Title" },
    { key: "subtitle", type: "textarea", label: "Subtitle" },
  ],
};

export const SEO_FIELDS: FieldGroup = {
  label: "SEO",
  fields: [
    { key: "seoTitle", type: "text", label: "SEO title (browser tab & Google result)" },
    { key: "seoDescription", type: "textarea", label: "SEO description (snippet under the Google result)" },
  ],
};

/** Full editor schema for a page: hero, then its body groups, then SEO. */
export function fieldGroupsFor(def: PageDef<never> | PageDef<Record<string, unknown>>): FieldGroup[] {
  return [
    ...(def.hero === false ? [] : [HERO_FIELDS]),
    ...def.groups,
    ...(def.seo === false ? [] : [SEO_FIELDS]),
  ];
}

/** Empty value for a field, used when the editor adds a new list row. */
export function emptyFieldValue(type: FieldDef["type"]): unknown {
  switch (type) {
    case "text":
    case "textarea":
    case "image":
      return "";
    default:
      return [];
  }
}
