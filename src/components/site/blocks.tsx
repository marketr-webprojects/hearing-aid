import { InfoCard, ImageCard } from "./SubPage";
import type { Card, ImageCard as ImageCardData } from "@/lib/content/types";

const COLS: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

/** A run of plain paragraphs. */
export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  );
}

/** Grid of {title, body} InfoCards. */
export function CardGrid({ items, columns = 2 }: { items: Card[]; columns?: 2 | 3 }) {
  return (
    <div className={`grid gap-5 ${COLS[columns]}`}>
      {items.map((c) => (
        <InfoCard key={c.title} title={c.title}>
          {c.body}
        </InfoCard>
      ))}
    </div>
  );
}

/** Grid of cards with a photo above the copy. */
export function ImageCardGrid({
  items,
  columns = 2,
  ratio,
}: {
  items: ImageCardData[];
  columns?: 2 | 3;
  ratio?: string;
}) {
  return (
    <div className={`grid gap-5 ${COLS[columns]}`}>
      {items.map((c) => (
        <ImageCard key={c.title} title={c.title} img={c.img} alt={c.alt} ratio={ratio}>
          {c.body}
        </ImageCard>
      ))}
    </div>
  );
}

/** Numbered walk-through, e.g. "What to Expect". */
export function NumberedList({ items }: { items: Card[] }) {
  return (
    <ol className="space-y-4 text-lg">
      {items.map((s, i) => (
        <li key={s.title}>
          <span className="font-bold text-primary">
            {i + 1}. {s.title}
          </span>{" "}
          {s.body}
        </li>
      ))}
    </ol>
  );
}

/** Plain bulleted list. */
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

/** Bulleted list where each item leads with a bold phrase. */
export function BulletCards({ items }: { items: Card[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {items.map((b) => (
        <li key={b.title}>
          <strong>{b.title}</strong> {b.body}
        </li>
      ))}
    </ul>
  );
}
