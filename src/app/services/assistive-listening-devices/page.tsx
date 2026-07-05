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

      <h2 className="text-2xl md:text-3xl">Why hearing aids sometimes need a helping hand</h2>
      <p>
        Hearing aids are built to handle conversation at close range, but physics gets in the way in certain
        situations: the further you are from a sound source, the more room echo and background noise reach your ears
        before the speech does. Assistive listening devices solve this by picking up sound at its source — the TV, the
        speaker&rsquo;s voice, the phone — and delivering it directly to your hearing aids.
      </p>

      <h2 className="text-2xl md:text-3xl">Situations where an accessory makes the difference</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="Watching TV with the family">
          A TV streamer sends the audio straight into your hearing aids at your own volume, while everyone else listens
          at theirs — no more volume-level negotiations.
        </InfoCard>
        <InfoCard title="Meetings, classrooms & church">
          A remote microphone clipped to the speaker or placed on the table carries their voice across the room,
          cutting through distance and echo.
        </InfoCard>
        <InfoCard title="Phone & video calls">
          Direct streaming from a smartphone puts the caller&rsquo;s voice in both ears at once — usually much clearer
          than holding the phone to one ear.
        </InfoCard>
        <InfoCard title="Restaurants & gatherings">
          A table microphone focuses on the voices around it and reduces the clatter, helping you stay in the
          conversation instead of guessing at it.
        </InfoCard>
      </div>

      <h2 className="text-2xl md:text-3xl">Matched to your hearing aids</h2>
      <p>
        Accessories are brand- and model-specific, so the right choice depends on the devices you wear. Bring your
        hearing aids to any Linaw Dinig branch — in Tanay, Cebu City, Dasmariñas or Rosario, La Union — and we&rsquo;ll
        demonstrate the compatible options, help you weigh whether an accessory or a programming adjustment is the
        better fix, and keep you stocked with the everyday consumables your devices need.
      </p>
    </SubPage>
  );
}
