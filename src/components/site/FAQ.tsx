import { getPublishedFaqs } from "@/lib/faqs.server";
import { getSharedContent } from "@/lib/content/page-content.server";
import { FaqAccordion } from "@/components/site/FaqAccordion";

export async function FAQ() {
  const [faqs, shared] = await Promise.all([getPublishedFaqs(), getSharedContent()]);

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">{shared.faqTitle}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{shared.faqSubtitle}</p>
        </div>
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
