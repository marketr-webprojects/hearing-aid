import type { Metadata } from "next";

import { SubPage, InfoCard } from "@/components/site/SubPage";

export const metadata: Metadata = {
  title: "Follow-up Care & Counseling | Linaw Dinig Hearing Aid Center",
  description:
    "Ongoing support, counseling and fine-tuning to help you adapt to your hearing aids and get the most from your hearing every day — available across our Tanay, Cebu, Dasmariñas and La Union branches.",
  keywords: [
    "hearing aid follow-up care",
    "hearing aid counseling Philippines",
    "hearing aid adjustment",
    "aural rehabilitation",
    "hearing care support",
  ],
  openGraph: {
    title: "Follow-up Care & Counseling",
    description: "Ongoing support to help you adapt and maximize your hearing potential.",
  },
};

export default function Page() {
  return (
    <SubPage
      eyebrow="Services"
      title="Follow-up Care & Counseling"
      subtitle="Hearing well is a journey, not a one-time visit. We stay with you every step of the way."
    >
      <p>
        Adjusting to better hearing takes time and support. Our follow-up care helps you adapt to your devices, build
        confidence in everyday situations, and maximize your hearing potential — with your family supported alongside you.
      </p>
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Who it's for">Anyone adapting to new hearing aids, or returning for regular check-ups and adjustments.</InfoCard>
        <InfoCard title="What to expect">Fine-tuning sessions, listening practice, cleaning and friendly guidance whenever you need it.</InfoCard>
        <InfoCard title="Family counseling">We educate and support families so everyone can help on the journey to better hearing.</InfoCard>
      </div>

      <h2 className="text-2xl md:text-3xl">The first weeks with new hearing aids</h2>
      <p>
        Hearing aids don&rsquo;t just make sound louder — they reintroduce your brain to sounds it may not have heard
        clearly for years. In the first weeks, everyday noises like footsteps, running water or rustling paper can seem
        surprisingly loud. That&rsquo;s normal, and it settles as your brain re-learns which sounds to focus on and
        which to tune out.
      </p>
      <p>
        Follow-up visits are where this adjustment gets easier. Based on your real-world experience — which situations
        feel great, which still feel hard — your audiologist fine-tunes the programming step by step, so your devices
        keep matching your life rather than the other way around.
      </p>

      <h2 className="text-2xl md:text-3xl">What a follow-up visit includes</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="Fine-tuning & re-programming">
          Adjustments based on how your hearing aids perform at home, at work and in noisy places — including updates
          when your hearing changes over time.
        </InfoCard>
        <InfoCard title="Device check & cleaning">
          Professional cleaning, wax guard and dome replacement, and a physical check so small issues are caught before
          they become repairs.
        </InfoCard>
        <InfoCard title="Listening strategies">
          Practical coaching for the situations that stay difficult — group conversations, restaurants, phone calls and
          the TV.
        </InfoCard>
        <InfoCard title="Counseling for you & your family">
          Communication tips for the whole household: getting attention before speaking, facing the listener, and
          reducing background noise.
        </InfoCard>
      </div>

      <h2 className="text-2xl md:text-3xl">When to book a follow-up</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Sounds seem too loud, too soft or different from your last visit.</li>
        <li>Your own voice sounds hollow or boomy, or your devices whistle.</li>
        <li>You&rsquo;ve started struggling in situations that used to be fine.</li>
        <li>It&rsquo;s been a year or more since your last hearing check — an annual re-test keeps your programming
          matched to your current hearing.</li>
      </ul>
      <p>
        Follow-up care is available at all four Linaw Dinig branches in Tanay, Rizal, Cebu City, Dasmariñas City and
        Rosario, La Union — book online or call the branch nearest you.
      </p>
    </SubPage>
  );
}
