import { Link } from "wouter";
import { Mascot } from "./Mascot";
import { StarRow } from "./StarRow";

export function RoundComplete({
  earned, total, onPlayAgain,
}: {
  earned: number;
  total: number;
  onPlayAgain: () => void;
}) {
  return (
    <div
      className="rounded-[2rem] border-2 border-border bg-white p-8 sm:p-12 text-center shadow-lg"
      role="dialog"
      aria-labelledby="round-complete-title"
      data-testid="dialog-round-complete"
    >
      <Mascot size={140} mood="cheer" className="mx-auto animate-pop text-[hsl(var(--coral))]" />
      <h2 id="round-complete-title" className="mt-2 font-display text-3xl sm:text-4xl font-bold">
        You did it!
      </h2>
      <p className="mt-2 text-lg text-muted-foreground">You earned</p>
      <div className="mt-2 flex justify-center">
        <StarRow earned={earned} total={total} size={36} />
      </div>
      <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={onPlayAgain}
          data-testid="button-play-again"
          className="h-14 px-6 rounded-full bg-[hsl(var(--coral))] text-white font-display text-lg font-bold border-2 border-[hsl(20_30%_18%/0.15)] shadow-md active:translate-y-[1px]"
        >
          Play again
        </button>
        <Link
          href="/"
          data-testid="link-back-home"
          className="h-14 px-6 inline-flex items-center rounded-full bg-white text-[hsl(20_30%_18%)] font-display text-lg font-bold border-2 border-border shadow-sm active:translate-y-[1px]"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
