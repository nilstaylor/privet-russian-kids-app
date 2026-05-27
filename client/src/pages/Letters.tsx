import { useMemo, useState } from "react";
import { LETTERS, type LetterCard } from "@/lib/content";
import { speakRussian } from "@/lib/speech";
import { SpeakerButton } from "@/components/SpeakerButton";
import { useProgress } from "@/lib/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Letters() {
  const [idx, setIdx] = useState(0);
  const { addStar, markLetterLearned, learnedLetters } = useProgress();
  const letter: LetterCard = LETTERS[idx];

  const tilesColor = useMemo(() => {
    const colors = ["coral", "sun", "sky", "mint", "grape"];
    return colors[idx % colors.length];
  }, [idx]);

  const colorBg: Record<string, string> = {
    coral: "bg-[hsl(var(--coral))] text-white",
    sun:   "bg-[hsl(var(--sun))] text-[hsl(20_30%_18%)]",
    sky:   "bg-[hsl(var(--sky))] text-white",
    mint:  "bg-[hsl(var(--mint))] text-white",
    grape: "bg-[hsl(var(--grape))] text-white",
  };

  const next = () => setIdx((idx + 1) % LETTERS.length);
  const prev = () => setIdx((idx - 1 + LETTERS.length) % LETTERS.length);

  const handleSayLetter = () => {
    speakRussian(letter.upper);
    if (!learnedLetters.has(letter.upper)) {
      markLetterLearned(letter.upper);
      addStar("letters", 1);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Letter Sounds</h1>
        <span className="text-sm sm:text-base text-muted-foreground" data-testid="text-letter-progress">
          {idx + 1} / {LETTERS.length}
        </span>
      </header>

      <article
        className={cn(
          "rounded-[2rem] border-2 border-[hsl(20_30%_18%/0.12)] shadow-lg p-6 sm:p-10 text-center",
          colorBg[tilesColor],
        )}
        aria-live="polite"
      >
        <div className="flex items-end justify-center gap-3 sm:gap-6 mb-4 animate-float-up" key={letter.upper}>
          <span
            className="font-display font-bold leading-none"
            style={{ fontSize: "clamp(7rem, 22vw, 14rem)" }}
            data-testid="text-letter-upper"
          >
            {letter.upper}
          </span>
          <span
            className="font-display font-bold leading-none opacity-80"
            style={{ fontSize: "clamp(4rem, 14vw, 9rem)" }}
            data-testid="text-letter-lower"
          >
            {letter.lower}
          </span>
        </div>

        <div className="text-2xl sm:text-3xl font-display font-semibold mb-2">
          Sounds like <em className="not-italic underline decoration-wavy underline-offset-4">{letter.sound}</em>
        </div>

        {letter.lookalike && (
          <div className="text-base sm:text-lg opacity-90">
            Looks like English <strong>{letter.lookalike}</strong>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          <button
            type="button"
            onClick={handleSayLetter}
            data-testid="button-say-letter"
            className="inline-flex items-center gap-2 px-6 sm:px-8 h-14 sm:h-16 rounded-full bg-white text-[hsl(20_30%_18%)] font-display text-lg sm:text-xl font-bold border-2 border-[hsl(20_30%_18%/0.15)] shadow-md hover:brightness-105 active:translate-y-[2px]"
          >
            🔊 Say the letter
          </button>
          <button
            type="button"
            onClick={() => speakRussian(letter.example)}
            data-testid="button-say-example"
            className="inline-flex items-center gap-2 px-5 sm:px-6 h-14 sm:h-16 rounded-full bg-[hsl(20_30%_18%/0.92)] text-white font-display text-lg sm:text-xl font-bold border-2 border-[hsl(20_30%_18%)] shadow-md hover:brightness-110 active:translate-y-[2px]"
          >
            <span aria-hidden="true">{letter.exampleEmoji}</span>
            {letter.example}
          </button>
        </div>

        <p className="mt-5 text-base sm:text-lg opacity-90">
          <strong>{letter.example}</strong> means <em className="not-italic">{letter.exampleEn}</em>
        </p>

        {letter.funFact && (
          <p className="mt-3 text-sm sm:text-base opacity-90 italic">{letter.funFact}</p>
        )}
      </article>

      <nav className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous letter"
          data-testid="button-prev-letter"
          className="inline-flex items-center gap-1 h-14 px-5 sm:px-6 rounded-full bg-white border-2 border-border shadow-sm font-display text-lg font-bold active:translate-y-[1px]"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
          Back
        </button>

        <SpeakerButton
          text={letter.example}
          label={`Listen to the example word ${letter.example}`}
          size="md"
          variant="ghost"
          testId="button-replay-example"
        />

        <button
          type="button"
          onClick={next}
          aria-label="Next letter"
          data-testid="button-next-letter"
          className="inline-flex items-center gap-1 h-14 px-5 sm:px-6 rounded-full bg-[hsl(var(--coral))] text-white border-2 border-[hsl(20_30%_18%/0.15)] shadow-md font-display text-lg font-bold active:translate-y-[1px]"
        >
          Next
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
