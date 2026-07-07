import type { Metadata } from "next";
import { pageMetadata } from "@/lib/content/page-content.server";

import { InfoCard } from "@/components/site/SubPage";
import { CmsSubPage } from "@/components/site/CmsSubPage";

const staticMetadata: Metadata = {
  title: "Hearing Aid Repair & Maintenance | Linaw Dinig",
  description: "Reliable repair and maintenance for your hearing devices in the Philippines. In-clinic servicing at our Tanay, Cebu, Dasmariñas and La Union branches.",
  keywords: [
    "hearing aid repair Philippines",
    "hearing aid maintenance",
    "hearing aid servicing",
    "hearing aid cleaning",
    "hearing aid repair Tanay Cebu Dasmariñas La Union",
  ],
  openGraph: {
    title: "Hearing Aid Repair & Maintenance",
    description: "Reliable repair and maintenance for your hearing devices.",
  },
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("services-hearing-aid-repairs", staticMetadata);
}

export default function Page() {
  return (
    <CmsSubPage pageKey="services-hearing-aid-repairs">
      <p>Routine maintenance and minor cleaning can be done in-clinic the same day. For more complex issues, we send to the manufacturer and keep you updated every step of the way.</p>
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Who it's for">For clients using hearing aid brands we offer.</InfoCard>
        <InfoCard title="Turnaround">Often same-day for cleaning and minor fixes. 2 weeks to 1 month for manufacturer repairs.</InfoCard>
        <InfoCard title="Cost">A quote is provided before any chargeable work begins — no surprises.</InfoCard>
      </div>

      <h2 className="text-2xl md:text-3xl">Common problems we can help with</h2>
      <p>
        A hearing aid that suddenly seems &ldquo;broken&rdquo; often just needs a professional clean or a small part
        replaced. These are the issues we see most:
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="No sound or weak sound">
          Often caused by a blocked wax guard, clogged dome or a flat battery. Many of these are fixed in minutes at the
          clinic — before assuming the worst, have it checked.
        </InfoCard>
        <InfoCard title="Whistling or feedback">
          Persistent whistling can point to earwax build-up, a loose fit or a damaged tube or dome. We identify the
          cause and correct it, so wearing your aids is comfortable again.
        </InfoCard>
        <InfoCard title="Distorted or crackling sound">
          Moisture, debris or an ageing receiver can make speech sound rough or intermittent. In-clinic cleaning and
          drying resolves many cases; otherwise we coordinate a manufacturer repair.
        </InfoCard>
        <InfoCard title="Charging & battery issues">
          Devices that won&rsquo;t charge, drain quickly or switch off unexpectedly. We test the battery and charging
          contacts and advise whether a repair or replacement part is needed.
        </InfoCard>
      </div>

      <h2 className="text-2xl md:text-3xl">Caring for your hearing aids at home</h2>
      <p>
        A few simple habits between visits go a long way toward reaching the typical 3–5 year lifespan of a modern
        hearing aid:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Wipe your devices daily with a soft, dry cloth and check the microphone openings for debris.</li>
        <li>Store them overnight in a dry, cool place — ideally in a drying kit or dehumidifier, never the bathroom.</li>
        <li>Change wax guards and domes regularly, and keep devices away from water, hairspray and direct heat.</li>
        <li>If you won&rsquo;t use battery-powered aids for a while, remove the batteries to prevent corrosion.</li>
      </ul>
      <p>
        Not sure how to do any of the above? Bring your hearing aids to any of our branches in Tanay, Cebu City,
        Dasmariñas or Rosario, La Union — we&rsquo;ll walk you through it and give your devices a professional check
        while you&rsquo;re there.
      </p>
    </CmsSubPage>
  );
}
