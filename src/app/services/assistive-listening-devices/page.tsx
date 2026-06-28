import type { Metadata } from "next";

import { SubPage, InfoCard } from "@/components/site/SubPage";

export const metadata: Metadata = {
  title: "Assistive Listening Devices & Accessories | Linaw Dinig",
  description:
    "Assistive listening devices and hearing aid accessories in the Philippines that enhance hearing in challenging environments — TV streamers, remote microphones, chargers, batteries and more.",
  keywords: [
    "assistive listening devices Philippines",
    "hearing aid accessories",
    "TV streamer hearing aid",
    "remote microphone",
    "hearing aid batteries chargers",
  ],
  openGraph: {
    title: "Assistive Listening Devices & Accessories",
    description: "Devices and accessories that enhance hearing in challenging environments.",
  },
};

export default function Page() {
  return (
    <SubPage
      eyebrow="Services"
      title="Assistive Listening Devices & Accessories"
      subtitle="Extra help for the toughest listening situations — and the accessories that keep your hearing aids at their best."
    >
      <p>
        Even the best hearing aids can be supported by the right accessories. We offer assistive listening devices that
        enhance hearing in noisy rooms, over distance, on the phone and in front of the TV — plus the everyday
        accessories that keep your devices running reliably.
      </p>
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Streaming & connectivity">TV streamers and phone accessories that send sound straight to your hearing aids.</InfoCard>
        <InfoCard title="Remote microphones">Bring distant or noisy conversations closer — ideal for classrooms, meetings and restaurants.</InfoCard>
        <InfoCard title="Care & maintenance">Chargers, batteries, domes, wax guards and cleaning kits to keep your devices in top shape.</InfoCard>
      </div>
    </SubPage>
  );
}
