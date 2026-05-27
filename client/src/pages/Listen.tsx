import { useEffect, useMemo, useState } from "react";
import { buildListenRound } from "@/lib/quiz";
import { speakRussian } from "@/lib/speech";
import { useProgress } from "@/lib/progress";
import { Feedback } from "@/components/Feedback";
import { RoundComplete } from "@/components/RoundComplete";
import { StarRow } from "@/components/StarRow";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRAISE, TRY_AGAIN } from "@/lib/content";

const ROUND_SIZE = 6;

export default function Listen() {
  const [round, setRound] = useState(() => buildListenRound(ROUND_SIZE, 3));
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [earned, setEarned] = useState(0);
  const [done, setDone] = useState(false);
  const { addStar } = useProgress();

  const question = round[qIdx];

  // Auto-play prompt when question changes
  useEffect(() => {
    if (!done && question) {
      const t = setTimeout(() => speakRussian(question.answer.ru), 300);
      return () => clearTimeout(t);
    }
  }, [qIdx, done, question]);

  const praise = useMemo(() => PRAISE[Math.floor(Math.random() * PRAISE.length)], [qIdx, correct]);
  const tryAgain = useMemo(() => TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)], [qIdx, correct]);

  if (done) {
    return (
      <RoundComplete
        earned={earned}
        total={ROUND_SIZE}
        onPlayAgain={() => {
          setRound(buildListenRound(ROUND_SIZE, 3));
          setQIdx(0);
          setEarned(0);
          setPicked(null);
          setCorrect(null);
          setDone(false);
        }}
      />
    );
  }

  const handlePick = (ru: string) => {
    if (correct !== null) return; // already answered
    const isRight = ru === question.answer.ru;
    setPicked(ru);
    setCorrect(isRight);
    if (isRight) {
      addStar("listen", 1);
      setEarned(e => e + 1);
      setTimeout(() => {
        if (qIdx + 1 >= round.length) setDone(true);
        else {
          setQIdx(qIdx + 1);
          setPicked(null);
          setCorrect(null);
        }
      }, 1100);
    } else {
      // Let them try again
      setTimeout(() => {
        setPicked(null);
        setCorrect(null);
      }, 900);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Listen & Pick</h1>
        <StarRow earned={earned} total={ROUND_SIZE} />
      </header>

      <p className="text-base sm:text-lg text-muted-foreground" data-testid="text-question-progress">
        Question {qIdx + 1} of {round.length}
      </p>

      <section
        className="rounded-[2rem] border-2 border-border bg-white p-6 sm:p-10 text-center shadow-md"
        aria-live="polite"
      >
        <p className="text-lg sm:text-xl mb-4">Listen, then tap the picture you hear.</p>
        <button
          type="button"
          onClick={() => speakRussian(question.answer.ru)}
          data-testid="button-replay-prompt"
          className="inline-flex items-center gap-3 h-20 px-8 rounded-full bg-[hsl(var(--coral))] text-white font-display text-2xl font-bold border-2 border-[hsl(20_30%_18%/0.15)] shadow-lg active:translate-y-[2px]"
        >
          <Volume2 className="size-8" aria-hidden="true" />
          Listen again
        </button>
      </section>

      <ul className="grid grid-cols-3 gap-3 sm:gap-4">
        {question.options.map(opt => {
          const isPicked = picked === opt.ru;
          const isRight = correct && isPicked;
          const isWrong = correct === false && isPicked;
          return (
            <li key={opt.ru}>
              <button
                type="button"
                onClick={() => handlePick(opt.ru)}
                aria-label={`Choice: ${opt.en}`}
                data-testid={`button-option-${opt.ru}`}
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
