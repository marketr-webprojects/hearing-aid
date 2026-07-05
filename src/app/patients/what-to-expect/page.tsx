import type { Metadata } from "next";

import { SubPage, InfoCard } from "@/components/site/SubPage";

export const metadata: Metadata = {
  title: "What to Expect at Your Hearing Test | Linaw Dinig",
  description: "A friendly walk-through of your first hearing appointment — what happens, how long it takes, and what you'll learn.",
  openGraph: {
    title: "What to Expect",
    description: "What happens during your first hearing appointment.",
  },
};

export default function Page() {
  return (
    <SubPage eyebrow="For Patients" title="What to Expect" subtitle="Most people are pleasantly surprised by how relaxed a hearing appointment really is.">
      <ol className="space-y-4 text-lg">
        <li><span className="font-bold text-primary">1. A welcome and chat.</span> We'll ask about your hearing concerns, lifestyle and goals.</li>
        <li><span className="font-bold text-primary">2. A quick look in your ears.</span> Using an otoscope to check for wax, ear infection, or anything unusual in your external ears.</li>
        <li><span className="font-bold text-primary">3. Comfortable listening tests.</span> In a sound-treated booth — no needles, nothing scary.</li>
        <li><span className="font-bold text-primary">4. Jargon-free explanation of results.</span> Your audiologist explains what we found and your options, with no pressure.</li>
        <li><span className="font-bold text-primary">5. Next steps — if any.</span> If hearing aids would help, we'll talk through options and budgets. If not, you'll leave reassured.</li>
      </ol>

      <h2 className="text-2xl md:text-3xl">Understanding your results</h2>
      <p>
        Your test results are plotted on an <strong>audiogram</strong> — a simple chart showing the softest sounds you
        can hear at each pitch, for each ear. From it, your audiologist identifies the <strong>degree</strong> of any
        hearing loss (from mild to profound) and the <strong>type</strong> — whether the issue sits in the outer or
        middle ear, the inner ear, or a combination. Together these determine what will actually help, whether
        that&rsquo;s medical referral, hearing aids, or simply monitoring over time.
      </p>
      <p>
        You won&rsquo;t be left decoding a chart on your own: we explain what your audiogram means for real life —
        why speech might sound muffled in a crowd but fine at home, or why some voices are harder to follow than
        others.
      </p>

      <h2 className="text-2xl md:text-3xl">Good to know before you come</h2>
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="It doesn't hurt">
          Every test is comfortable and non-invasive — you&rsquo;ll mostly listen to tones and repeat words. Children
          are tested through play.
        </InfoCard>
        <InfoCard title="Colds & ear infections">
          A congested ear can temporarily affect results. If you have an active ear infection or a heavy cold, mention
          it when booking — it may be worth rescheduling for an accurate picture.
        </InfoCard>
        <InfoCard title="Bring a companion">
          A family member or friend is welcome in the room. Two sets of ears help when discussing results, and a
          familiar voice is useful during testing.
        </InfoCard>
      </div>
    </SubPage>
  );
}
