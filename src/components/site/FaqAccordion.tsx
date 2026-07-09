"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/lib/faqs";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="mt-10 space-y-3">
      {faqs.map((f, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="rounded-2xl border border-border bg-card px-5 shadow-card"
        >
          <AccordionTrigger className="text-left text-base font-bold hover:no-underline md:text-lg">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
