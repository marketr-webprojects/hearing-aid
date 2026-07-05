import type { Metadata } from "next";

import { SubPage } from "@/components/site/SubPage";

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
    </SubPage>
  );
}
