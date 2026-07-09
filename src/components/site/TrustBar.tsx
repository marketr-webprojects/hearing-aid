import { getIcon } from "@/lib/icons";
import { getSharedContent } from "@/lib/content/page-content.server";

export async function TrustBar() {
  const { trustBarItems } = await getSharedContent();

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 md:px-6 lg:grid-cols-5">
        {trustBarItems.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <div key={item.label} className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-sm font-semibold text-foreground">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
