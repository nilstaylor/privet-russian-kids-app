import { Link } from "wouter";
import { Mascot } from "@/components/Mascot";
import { MODULES } from "@/lib/content";
import { useProgress } from "@/lib/progress";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const colorClasses: Record<string, string> = {
  coral: "bg-[hsl(var(--coral))] text-white",
  sun:   "bg-[hsl(var(--sun))] text-[hsl(20_30%_18%)]",
  sky:   "bg-[hsl(var(--sky))] text-white",
  mint:  "bg-[hsl(var(--mint))] text-white",
  grape: "bg-[hsl(var(--grape))] text-white",
};

export default function Home() {
  const { stars } = useProgress();
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-confetti border-2 border-border bg-white/40 p-6 sm:p-10">
        <div className="grid sm:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05] text-[hsl(20_30%_18%)]">
              Hi! Let's learn{" "}
              <span className="text-[hsl(var(--coral))]">Russian</span>!
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-[hsl(20_30%_22%)] max-w-md">
              Tap a card to play. Earn <Star className="inline size-5 -mt-0.5 fill-[hsl(var(--sun))] text-[hsl(20_30%_18%)]" aria-hidden="true" /> stars as you go!
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-border shadow-sm">
              <Star className="size-5 fill-[hsl(var(--sun))] text-[hsl(20_30%_18%)]" aria-hidden="true" />
              <span className="font-display font-bold tabular-nums" data-testid="text-home-star-count">
                {stars} stars so far
              </span>
            </div>
          </div>
          <div className="hidden sm:block">
            <Mascot size={180} mood="cheer" className="animate-bob text-[hsl(var(--coral))]" />
          </div>
          <div className="sm:hidden flex justify-center">
            <Mascot size={140} mood="cheer" className="animate-bob text-[hsl(var(--coral))]" />
          </div>
        </div>
      </section>

      {/* Module grid */}
      <section aria-labelledby="modules-heading">
        <h2 id="modules-heading" className="font-display text-2xl font-bold mb-4 text-[hsl(20_30%_18%)]">
          Pick a game
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {MODULES.map(m => (
            <li key={m.id}>
              <Link
                href={`/${m.id}`}
                data-testid={`card-module-${m.id}`}
                className={cn(
                  "group block rounded-[1.5rem] border-2 border-[hsl(20_30%_18%/0.12)] shadow-md hover:-translate-y-0.5 active:translate-y-0 transition p-5 sm:p-6 min-h-[160px]",
                  colorClasses[m.color],
                )}
              >
                <div className="text-5xl sm:text-6xl leading-none mb-3" aria-hidden="true">{m.emoji}</div>
                <div className="font-display text-xl sm:text-2xl font-bold leading-tight">{m.title}</div>
                <div className="text-sm sm:text-base opacity-90">{m.subtitle}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
