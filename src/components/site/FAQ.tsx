"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "How much does a hearing test cost?", a: "Hearing test prices can range from 550 pesos up to 8,000 pesos depending on the required hearing test procedure. Message us to know the exact test price." },
  { q: "How much do hearing aids cost, and are there payment options?", a: "Hearing aid price varies depending on the following factors — degree of hearing loss, technology level, visibility when wearing the devices, and connectivity. Send us a copy of your latest hearing test result so we can quote you accordingly. Several flexible payment options are available such as cash, GCash, bank transfer or deposit, debit card, and credit card. We accept major cards such as Mastercard and Visa." },
  { q: "What happens at a hearing test?", a: "We start with a friendly chat about your hearing concerns, take a look in your ears, then run a series of comfortable hearing tests. Your audiologist explains the results in plain language and discusses your options." },
  { q: "How long does a hearing aid fitting take?", a: "Typically 60–90 minutes. We fit the devices, fine-tune them to your hearing profile, show you how to use and care for them, and answer all your questions." },
  { q: "Which hearing aid brand is best?", a: "There is no single 'best' brand. The right device depends on the degree of your hearing, lifestyle, and budget. As an independent clinic we recommend what truly suits you." },
  { q: "Can I trial a hearing aid before buying?", a: "Yes. We offer a no-pressure, in-clinic trial session so you can experience the difference in your everyday life before committing." },
  { q: "Do you repair hearing aids from other clinics?", a: "Yes, we service the same brands that we offer — even if you didn't buy them from us." },
  { q: "How long do hearing aids last?", a: "Most modern hearing aids last 3–5 years with proper care. We provide minor cleaning, servicing, and re-programming for the life of your device. All hearing aid purchases come with a 1-year warranty against manufacturing defects." },
  { q: "Do you test children's hearing?", a: "Yes. We provide comprehensive pediatric hearing evaluation — including newborn hearing screening, play audiometry, ABR/BAER and ASSR — because early detection and intervention give every child the best start." },
  { q: "Do I need a referral to book an appointment?", a: "No referral needed. You're welcome to book directly with us." },
];

export function FAQ() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-3 text-lg text-muted-foreground">Quick answers to the things people ask us most.</p>
        </div>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-5 shadow-card">
              <AccordionTrigger className="text-left text-base font-bold hover:no-underline md:text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}