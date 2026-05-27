import { useEffect, useState } from "react";
import { buildRepeatRound, type RepeatPrompt } from "@/lib/quiz";
import { speakRussian } from "@/lib/speech";
import { useProgress } from "@/lib/progress";
import { RoundComplete } from "@/components/RoundComplete";
import { StarRow } from "@/components/StarRow";
import { Volume2, Mic, ChevronRight } from "lucide-react";
import { Mascot } from "@/components/Mascot";

const ROUND_SIZE = 6;

export default function Repeat() {
  const [round, setRound] = useState<RepeatPrompt[]>(() => buildRepeatRound(ROUND_SIZE));
  const [idx, setIdx] = useState(0);
  const [earned, setEarned] = useState(0);
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState<"listen" | "your-turn" | "done">("listen");
  const { addStar } = useProgress();

  const current = round[idx];

  // Auto play on enter
  useEffect(() => {
    if (!done && current && phase === "listen") {
      const t = setTimeout(() => speakRussian(current.word.ru), 350);
      return () => clearTimeout(t);
    }
  }, [idx, done, current, phase]);

  if (done) {
    return (
      <RoundComplete
        earned={earned}
        total={ROUND_SIZE}
        onPlayAgain={() => {
          setRound(buildRepeatRound(ROUND_SIZE));
          setIdx(0);
          setEarned(0);
          setDone(false);
          setPhase("listen");
        }}
      />
    );
  }

  const advance = () => {
    if (idx + 1 >= round.length) {
      setDone(true);
    } else {
      setIdx(idx + 1);
      setPhase("listen");
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Say It!</h1>
        <StarRow earned={earned} total={ROUND_SIZE} />
      </header>

      <p className="text-base sm:text-lg text-muted-foreground" data-testid="text-repeat-progress">
        {idx + 1} of {round.length}
      </p>

      <section className="rounded-[2rem] border-2 border-border bg-white p-6 sm:p-10 text-center shadow-md">
        <Mascot
          size={120}
          mood={phase === "listen" ? "listening" : "cheer"}
          className="mx-auto text-[hsl(var(--sky))] animate-bob"
        />

        <div className="mt-3 text-7xl sm:text-8xl" aria-hidden="true">{current.word.emoji}</div>
        <div className="mt-1 font-display text-3xl sm:text-4xl font-bold" lang="ru" data-testid="text-repeat-word">
          {current.word.ru}
        </div>
        <div className="text-base sm:text-lg text-muted-foreground">means {current.word.en}</div>

        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => speakRussian(current.word.ru)}
            data-testid="button-repeat-listen"
            className="inline-flex items-center gap-2 h-14 sm:h-16 px-6 rounded-full bg-[hsl(var(--coral))] text-white font-display text-lg sm:text-xl font-bold border-2 border-[hsl(20_30%_18%/0.15)] shadow-md active:translate-y-[1px]"
          >
            <Volume2 className="size-6" aria-hidden="true" />
            Listen
          </button>

          {phase === "listen" ? (
            <button
              type="button"
              onClick={() => setPhase("your-turn")}
              data-testid="button-repeat-your-turn"
              className="inline-flex items-center gap-2 h-14 sm:h-16 px-6 rounded-full bg-[hsl(var(--sky))] text-white font-display text-lg sm:text-xl font-bold border-2 border-[hsl(20_30%_18%/0.15)] shadow-md active:translate-y-[1px]"
            >
              <Mic className="size-6" aria-hidden="true" />
              Your turn!
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                addStar("repeat", 1);
                setEarned(e => e + 1);
                advance();
              }}
              data-testid="button-repeat-i-said-it"
              className="inline-flex items-center gap-2 h-14 sm:h-16 px-6 rounded-full bg-[hsl(var(--mint))] text-white font-display text-lg sm:text-xl font-bold border-2 border-[hsl(20_30%_18%/0.15)] shadow-md active:translate-y-[1px]"
            >
              I said it!
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          )}
        </div>

        {phase === "your-turn" && (
          <p className="mt-5 font-display text-lg text-muted-foreground animate-float-up">
            Say <strong lang="ru">{current.word.ru}</strong> out loud!
          </p>
        )}
      </section>
    </div>
  );
}
