import type { Metadata } from "next";
import { pageMetadata } from "@/lib/content/page-content.server";

import { InfoCard } from "@/components/site/SubPage";
import { CmsSubPage } from "@/components/site/CmsSubPage";

const staticMetadata: Metadata = {
  title: "New Patient Information — Linaw Dinig Hearing Aid Center",
  description: "What to bring, how long to allow, and what to expect at your first appointment with Linaw Dinig Hearing Aid Center.",
  openGraph: {
    title: "New Patient Information",
    description: "How to prepare for your first visit.",
  },
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("patients-new-patient-info", staticMetadata);
}

export default function Page() {
  return (
    <CmsSubPage pageKey="patients-new-patient-info">
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="What to bring">Doctor&rsquo;s referral for hearing test (if available) and Senior Citizen or PWD ID. It also helps if you tag along a family member or friend.</InfoCard>
        <InfoCard title="Time to allow">Around 60 minutes for a full hearing assessment and chat.</InfoCard>
        <InfoCard title="Parking & access">
          <span className="block"><strong>Tanay:</strong> Ample parking space and wheelchair accessible.</span>
          <span className="mt-1 block"><strong>Cebu:</strong> Limited parking space. Not accessible by wheelchair.</span>
          <span className="mt-1 block"><strong>Dasma:</strong> Limited parking space. Accessible by wheelchair.</span>
          <span className="mt-1 block"><strong>La Union:</strong> Limited parking space. Limited mobility for wheelchair users.</span>
        </InfoCard>
        <InfoCard title="Fees">Each hearing assessment has its corresponding rate. Please call us to know the exact amount.</InfoCard>
      </div>

      <h2 className="text-2xl md:text-3xl">Before your visit</h2>
      <p>
        There&rsquo;s nothing to study and nothing to prepare — but a couple of small things help us get the most
        accurate picture of your hearing:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Think about where you struggle.</strong> Noisy restaurants? The TV? Phone calls? Specific voices?
          Real examples help your audiologist choose the right tests and, later, the right settings.
        </li>
        <li>
          <strong>Note any ear history.</strong> Past ear infections, surgery, ringing (tinnitus), dizziness or noisy
          work environments are all useful to mention.
        </li>
        <li>
          <strong>Feeling unwell?</strong> A heavy cold or an active ear infection can temporarily affect results —
          let us know when booking and we&rsquo;ll advise whether to reschedule.
        </li>
      </ul>

      <h2 className="text-2xl md:text-3xl">Payments</h2>
      <p>
        We accept cash, GCash, bank transfer or deposit, debit card, and credit card — including Mastercard and Visa.
        Every assessment has its corresponding rate, and hearing aid quotations are provided before anything is
        charged, so there are no surprises.
      </p>

      <h2 className="text-2xl md:text-3xl">Booking your first appointment</h2>
      <p>
        No referral is needed — you&rsquo;re welcome to book directly online or call the branch nearest you in Tanay,
        Rizal; Cebu City; Dasmariñas City, Cavite; or Rosario, La Union. If you&rsquo;d like to know exactly what
        happens during the appointment itself, see our step-by-step guide on the What to Expect page.
      </p>
    </CmsSubPage>
  );
}
