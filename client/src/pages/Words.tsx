import { useState } from "react";
import { CATEGORIES, VOCAB, type VocabCategory } from "@/lib/content";
import { SpeakerButton } from "@/components/SpeakerButton";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const colorBg: Record<string, string> = {
  coral: "bg-[hsl(var(--coral))] text-white",
  sun:   "bg-[hsl(var(--sun))] text-[hsl(20_30%_18%)]",
  sky:   "bg-[hsl(var(--sky))] text-white",
  mint:  "bg-[hsl(var(--mint))] text-white",
  grape: "bg-[hsl(var(--grape))] text-white",
};

export default function Words() {
  const [cat, setCat] = useState<VocabCategory>("animals");
  const { addStar, markWordLearned, learnedWords } = useProgress();
  const words = VOCAB.filter(v => v.category === cat);
  const catMeta = CATEGORIES.find(c => c.id === cat)!;

  const handleSpoke = (ru: string) => {
    if (!learnedWords.has(ru)) {
      markWordLearned(ru);
      addStar("words", 1);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">First Words</h1>
        <p className="text-base sm:text-lg text-muted-foreground">Tap the speaker to hear it in Russian.</p>
      </header>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 sm:gap-3" role="tablist" aria-label="Word categories">
        {CATEGORIES.map(c => {
          const active = c.id === cat;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              data-testid={`tab-category-${c.id}`}
              onClick={() => setCat(c.id)}
              className={cn(
                "inline-flex items-center gap-2 h-12 sm:h-14 px-4 sm:px-5 rounded-full border-2 font-display font-bold text-base sm:text-lg shadow-sm active:translate-y-[1px] transition",
                active
                  ? cn(colorBg[c.color], "border-[hsl(20_30%_18%/0.15)]")
                  : "bg-white text-[hsl(20_30%_18%)] border-border",
              )}
            >
              <span aria-hidden="true">{c.emoji}</span>
              {c.title}
            </button>
          );
        })}
      </div>

      {/* Word grid */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {words.map(w => (
          <li
            key={w.ru}
            className="rounded-[1.5rem] bg-white border-2 border-border shadow-md p-4 flex flex-col items-center text-center"
            data-testid={`card-word-${w.ru}`}
          >
            <div className="text-5xl sm:text-6xl mb-1" aria-hidden="true">{w.emoji}</div>
            <div className="font-display text-xl sm:text-2xl font-bold leading-tight" lang="ru">{w.ru}</div>
            <div className="text-sm text-muted-foreground mb-3">{w.en}</div>
            <SpeakerButton
              text={w.ru}
              label={`Listen to ${w.ru}`}
              size="sm"
              testId={`button-speak-word-${w.ru}`}
              onSpoke={() => handleSpoke(w.ru)}
            />
          </li>
        ))}
      </ul>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Category: <strong>{catMeta.title}</strong> — {words.length} words
      </p>
    </div>
  );
}
