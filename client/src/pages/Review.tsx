import { useEffect, useMemo, useState } from "react";
import { buildReviewRound, type ReviewQuestion } from "@/lib/quiz";
import { speakRussian } from "@/lib/speech";
import { useProgress } from "@/lib/progress";
import { Feedback } from "@/components/Feedback";
import { RoundComplete } from "@/components/RoundComplete";
import { StarRow } from "@/components/StarRow";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRAISE, TRY_AGAIN } from "@/lib/content";

const ROUND_SIZE = 5;

export default function Review() {
  const [round, setRound] = useState<ReviewQuestion[]>(() => buildReviewRound(ROUND_SIZE));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [earned, setEarned] = useState(0);
  const [done, setDone] = useState(false);
  const { addStar } = useProgress();

  const q = round[idx];

  useEffect(() => {
    if (!done && q && q.kind === "listen") {
      const t = setTimeout(() => speakRussian(q.q.answer.ru), 300);
      return () => clearTimeout(t);
    }
  }, [idx, done, q]);

  const praise = useMemo(() => PRAISE[Math.floor(Math.random() * PRAISE.length)], [idx, correct]);
  const tryAgain = useMemo(() => TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)], [idx, correct]);

  if (done) {
    return (
      <RoundComplete
        earned={earned}
        total={ROUND_SIZE}
        onPlayAgain={() => {
          setRound(buildReviewRound(ROUND_SIZE));
          setIdx(0);
          setEarned(0);
          setPicked(null);
          setCorrect(null);
          setDone(false);
        }}
      />
    );
  }

  const handlePick = (ru: string) => {
    if (correct !== null) return;
    const right = ru === q.q.answer.ru;
    setPicked(ru);
    setCorrect(right);
    if (right) {
      addStar("review", 1);
      setEarned(e => e + 1);
      setTimeout(() => {
        if (idx + 1 >= round.length) setDone(true);
        else {
          setIdx(idx + 1);
          setPicked(null);
          setCorrect(null);
        }
      }, 1000);
    } else {
      setTimeout(() => {
        setPicked(null);
        setCorrect(null);
      }, 900);
    }
  };

  // Two question types:
  // "listen": play audio, pick picture
  // "match":  show Russian word, pick picture (no audio prompt)
  const isListen = q.kind === "listen";

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Star Round</h1>
        <StarRow earned={earned} total={ROUND_SIZE} />
      </header>

      <p className="text-base sm:text-lg text-muted-foreground">
        Question {idx + 1} of {round.length}
      </p>

      <section className="rounded-[2rem] border-2 border-border bg-white p-6 sm:p-10 text-center shadow-md">
        {isListen ? (
          <>
            <p className="text-lg sm:text-xl mb-4">Listen and pick the right picture.</p>
            <button
              type="button"
              onClick={() => speakRussian(q.q.answer.ru)}
              data-testid="button-review-listen"
              className="inline-flex items-center gap-3 h-20 px-8 rounded-full bg-[hsl(var(--coral))] text-white font-display text-2xl font-bold border-2 border-[hsl(20_30%_18%/0.15)] shadow-lg active:translate-y-[1px]"
            >
              <Volume2 className="size-8" aria-hidden="true" />
              Listen
            </button>
          </>
        ) : (
          <>
            <p className="text-lg sm:text-xl mb-2">Which picture is this word?</p>
            <div className="font-display text-4xl sm:text-5xl font-bold mt-2" lang="ru" data-testid="text-review-word">
              {q.q.answer.ru}
            </div>
          </>
        )}
      </section>

      <ul className="grid grid-cols-3 gap-3 sm:gap-4">
        {q.q.options.map(opt => {
          const isPicked = picked === opt.ru;
          const isRight = correct && isPicked;
          const isWrong = correct === false && isPicked;
          return (
            <li key={opt.ru}>
              <button
                type="button"
                onClick={() => handlePick(opt.ru)}
                aria-label={`Choice: ${opt.en}`}
                data-testid={`button-review-option-${opt.ru}`}
                className={cn(
                  "w-full aspect-square rounded-[1.5rem] bg-white border-4 shadow-md flex flex-col items-center justify-center gap-1 active:translate-y-[1px] transition",
                  isRight && "border-[hsl(var(--mint))] bg-[hsl(var(--mint)/0.18)] animate-pop",
                  isWrong && "border-[hsl(var(--coral))] bg-[hsl(var(--coral)/0.10)] animate-shake",
                  !isPicked && "border-border hover:-translate-y-0.5",
                )}
              >
                <span className="text-6xl sm:text-7xl leading-none" aria-hidden="true">{opt.emoji}</span>
                <span className="font-display text-sm sm:text-base font-bold text-[hsl(20_30%_18%)]">{opt.en}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="min-h-16 flex justify-center">
        <Feedback
          kind={correct === true ? "good" : correct === false ? "tryagain" : "idle"}
          message={correct ? praise : tryAgain}
        />
      </div>
    </div>
  );
}
