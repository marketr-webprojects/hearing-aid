import { getPublishedTeam } from "@/lib/team.server";
import { getSharedContent } from "@/lib/content/page-content.server";
import { TeamGrid } from "@/components/site/TeamGrid";

export async function Team() {
  const [members, shared] = await Promise.all([getPublishedTeam(), getSharedContent()]);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">{shared.teamTitle}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{shared.teamSubtitle}</p>
        </div>
        <TeamGrid members={members} />
      </div>
    </section>
  );
}
