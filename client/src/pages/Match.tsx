import { useEffect, useMemo, useState } from "react";
import { buildMatchRound, shuffle, type MatchPair } from "@/lib/quiz";
import { speakRussian } from "@/lib/speech";
import { useProgress } from "@/lib/progress";
import { Feedback } from "@/components/Feedback";
import { RoundComplete } from "@/components/RoundComplete";
import { StarRow } from "@/components/StarRow";
import { cn } from "@/lib/utils";

const ROUND_SIZE = 5;

type PickState = {
  word: string | null;     // ru that was selected
  picture: string | null;  // ru that was selected via picture
};

export default function Match() {
  const [pairs, setPairs] = useState<MatchPair[]>(() => buildMatchRound(ROUND_SIZE));
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [pick, setPick] = useState<PickState>({ word: null, picture: null });
  const [feedback, setFeedback] = useState<"good" | "tryagain" | "idle">("idle");
  const { addStar } = useProgress();

  const picColumn = useMemo(() => shuffle(pairs), [pairs]);
  const wordColumn = useMemo(() => shuffle(pairs), [pairs]);

  const earned = matched.size;
  const done = earned >= pairs.length;

  // Evaluate when both selections are made
  useEffect(() => {
    if (pick.word && pick.picture) {
      if (pick.word === pick.picture) {
        setMatched(prev => {
          const next = new Set(prev);
          next.add(pick.word!);
          return next;
        });
        addStar("match", 1);
        setFeedback("good");
        speakRussian(pick.word);
        setTimeout(() => {
          setPick({ word: null, picture: null });
          setFeedback("idle");
        }, 700);
      } else {
        setFeedback("tryagain");
        setTimeout(() => {
          setPick({ word: null, picture: null });
          setFeedback("idle");
        }, 700);
      }
    }
  }, [pick, addStar]);

  if (done) {
    return (
      <RoundComplete
        earned={earned}
        total={pairs.length}
        onPlayAgain={() => {
          setPairs(buildMatchRound(ROUND_SIZE));
          setMatched(new Set());
          setPick({ word: null, picture: null });
          setFeedback("idle");
        }}
      />
    );
  }

  const cardClass = (isPicked: boolean, isMatched: boolean) =>
    cn(
      "w-full rounded-[1.25rem] border-4 bg-white shadow-md transition active:translate-y-[1px]",
      isMatched && "opacity-40 grayscale pointer-events-none",
      isPicked ? "border-[hsl(var(--sky))] bg-[hsl(var(--sky)/0.12)]" : "border-border hover:-translate-y-0.5",
    );

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Match It!</h1>
        <StarRow earned={earned} total={pairs.length} />
      </header>

      <p className="text-base sm:text-lg text-muted-foreground">
        Tap a picture, then tap the matching Russian word.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {/* Pictures */}
        <ul className="space-y-3" aria-label="Pictures">
          {picColumn.map(p => {
            const isMatched = matched.has(p.ru);
            const isPicked = pick.picture === p.ru;
            return (
              <li key={`pic-${p.ru}`}>
                <button
                  type="button"
                  onClick={() => setPick(s => ({ ...s, picture: p.ru }))}
                  disabled={isMatched}
                  aria-label={`Picture: ${p.en}`}
                  data-testid={`button-match-pic-${p.ru}`}
                  className={cn(cardClass(isPicked, isMatched), "p-4 flex items-center gap-3")}
                >
                  <span className="text-5xl sm:text-6xl leading-none" aria-hidden="true">{p.emoji}</span>
                  <span className="font-display text-sm text-muted-foreground">{p.en}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Words */}
        <ul className="space-y-3" aria-label="Russian words">
          {wordColumn.map(p => {
            const isMatched = matched.has(p.ru);
            const isPicked = pick.word === p.ru;
            return (
              <li key={`word-${p.ru}`}>
                <button
                  type="button"
                  onClick={() => setPick(s => ({ ...s, word: p.ru }))}
                  disabled={isMatched}
                  aria-label={`Word: ${p.ru}`}
                  data-testid={`button-match-word-${p.ru}`}
                  className={cn(cardClass(isPicked, isMatched), "p-4 text-center")}
                >
                  <span className="font-display text-xl sm:text-2xl font-bold" lang="ru">{p.ru}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="min-h-16 flex justify-center">
        <Feedback kind={feedback} />
      </div>
    </div>
  );
}
