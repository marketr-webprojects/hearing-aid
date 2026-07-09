"use client";

import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { IconPicker, PairList, StringList } from "@/components/admin/fields";
import type {
  Card,
  FieldDef,
  IconCard,
  IconItem,
  ImageCard,
  LinkCard,
  LinkItem,
  TextImage,
} from "@/lib/content/types";

const TEXTAREA =
  "w-full rounded-lg border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Labelled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

/** Shared add/remove scaffolding for the object-list editors below. */
function ObjectList<T>({
  label,
  items,
  onChange,
  blank,
  render,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  blank: () => T;
  render: (item: T, set: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="relative rounded-lg border border-border p-3 pr-11">
            {render(item, (patch) =>
              onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
            )}
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1.5 top-1.5"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              title="Remove"
            >
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" size="sm" variant="outline" onClick={() => onChange([...items, blank()])}>
        <Plus className="h-3.5 w-3.5" /> Add
      </Button>
    </div>
  );
}

/** Renders one schema field against the page's content object. */
export function SchemaField({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  switch (field.type) {
    case "text":
      return (
        <Labelled label={field.label}>
          <Input
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        </Labelled>
      );

    case "textarea":
      return (
        <Labelled label={field.label}>
          <textarea
            className={TEXTAREA}
            rows={3}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        </Labelled>
      );

    case "image":
      return (
        <Labelled label={field.label}>
          <ImageUploader value={(value as string) ?? ""} onChange={onChange} />
        </Labelled>
      );

    case "strings":
      return (
        <StringList
          label={field.label}
          items={(value as string[]) ?? []}
          onChange={onChange}
          placeholder={field.placeholder}
          multiline={field.multiline}
        />
      );

    case "cards":
      return (
        <PairList<Card>
          label={field.label}
          items={(value as Card[]) ?? []}
          onChange={onChange}
          a={{ key: "title", placeholder: "Title" }}
          b={{ key: "body", placeholder: "Body text", textarea: true }}
        />
      );

    case "links":
      return (
        <PairList<LinkItem>
          label={field.label}
          items={(value as LinkItem[]) ?? []}
          onChange={onChange}
          a={{ key: "label", placeholder: "Label" }}
          b={{ key: "href", placeholder: "/destination" }}
        />
      );

    case "linkCards":
      return (
        <ObjectList<LinkCard>
          label={field.label}
          items={(value as LinkCard[]) ?? []}
          onChange={onChange}
          blank={() => ({ title: "", body: "", href: "" })}
          render={(item, set) => (
            <div className="space-y-2">
              <Input value={item.title} onChange={(e) => set({ title: e.target.value })} placeholder="Title" />
              <textarea
                className={TEXTAREA}
                rows={2}
                value={item.body}
                onChange={(e) => set({ body: e.target.value })}
                placeholder="Body text"
              />
              <Input value={item.href} onChange={(e) => set({ href: e.target.value })} placeholder="/destination" />
            </div>
          )}
        />
      );

    case "iconCards":
      return (
        <ObjectList<IconCard>
          label={field.label}
          items={(value as IconCard[]) ?? []}
          onChange={onChange}
          blank={() => ({ icon: "Ear", title: "", desc: "", href: "" })}
          render={(item, set) => (
            <div className="space-y-2">
              <IconPicker value={item.icon} onChange={(icon) => set({ icon })} />
              <Input value={item.title} onChange={(e) => set({ title: e.target.value })} placeholder="Title" />
              <textarea
                className={TEXTAREA}
                rows={2}
                value={item.desc}
                onChange={(e) => set({ desc: e.target.value })}
                placeholder="Description"
              />
              <Input value={item.href} onChange={(e) => set({ href: e.target.value })} placeholder="/destination" />
            </div>
          )}
        />
      );

    case "iconItems":
      return (
        <ObjectList<IconItem>
          label={field.label}
          items={(value as IconItem[]) ?? []}
          onChange={onChange}
          blank={() => ({ icon: "BadgeCheck", label: "" })}
          render={(item, set) => (
            <div className="space-y-2">
              <IconPicker value={item.icon} onChange={(icon) => set({ icon })} />
              <Input value={item.label} onChange={(e) => set({ label: e.target.value })} placeholder="Label" />
            </div>
          )}
        />
      );

    case "imageCards":
      return (
        <ObjectList<ImageCard>
          label={field.label}
          items={(value as ImageCard[]) ?? []}
          onChange={onChange}
          blank={() => ({ title: "", body: "", img: "", alt: "" })}
          render={(item, set) => (
            <div className="space-y-2">
              <ImageUploader value={item.img} onChange={(img) => set({ img })} heightClass="h-32" />
              <Input value={item.title} onChange={(e) => set({ title: e.target.value })} placeholder="Title" />
              <textarea
                className={TEXTAREA}
                rows={3}
                value={item.body}
                onChange={(e) => set({ body: e.target.value })}
                placeholder="Body text"
              />
              <Input
                value={item.alt}
                onChange={(e) => set({ alt: e.target.value })}
                placeholder="Image description (for screen readers)"
              />
            </div>
          )}
        />
      );

    case "textImages":
      return (
        <ObjectList<TextImage>
          label={field.label}
          items={(value as TextImage[]) ?? []}
          onChange={onChange}
          blank={() => ({ text: "", img: "" })}
          render={(item, set) => (
            <div className="space-y-2">
              <ImageUploader value={item.img} onChange={(img) => set({ img })} heightClass="h-32" />
              <Input value={item.text} onChange={(e) => set({ text: e.target.value })} placeholder="Question" />
            </div>
          )}
        />
      );
  }
}
