import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ModuleId } from "./content";

type ProgressState = {
  stars: number;
  // Module-level: number of successful interactions in current session
  moduleStars: Record<ModuleId, number>;
  // Letters/words "learned" (heard or matched) in this session
  learnedLetters: Set<string>;
  learnedWords: Set<string>;
};

type ProgressApi = ProgressState & {
  addStar: (module: ModuleId, n?: number) => void;
  markLetterLearned: (letter: string) => void;
  markWordLearned: (ru: string) => void;
  reset: () => void;
};

const ProgressCtx = createContext<ProgressApi | null>(null);

const initial: ProgressState = {
  stars: 0,
  moduleStars: { letters: 0, words: 0, listen: 0, match: 0, repeat: 0, review: 0 },
  learnedLetters: new Set(),
  learnedWords: new Set(),
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(initial);

  const addStar = useCallback((module: ModuleId, n = 1) => {
    setState(prev => ({
      ...prev,
      stars: prev.stars + n,
      moduleStars: { ...prev.moduleStars, [module]: prev.moduleStars[module] + n },
    }));
  }, []);

  const markLetterLearned = useCallback((letter: string) => {
    setState(prev => {
      if (prev.learnedLetters.has(letter)) return prev;
      const next = new Set(prev.learnedLetters);
      next.add(letter);
      return { ...prev, learnedLetters: next };
    });
  }, []);

  const markWordLearned = useCallback((ru: string) => {
    setState(prev => {
      if (prev.learnedWords.has(ru)) return prev;
      const next = new Set(prev.learnedWords);
      next.add(ru);
      return { ...prev, learnedWords: next };
    });
  }, []);

  const reset = useCallback(() => setState(initial), []);

  const api = useMemo<ProgressApi>(() => ({
    ...state,
    addStar,
    markLetterLearned,
    markWordLearned,
    reset,
  }), [state, addStar, markLetterLearned, markWordLearned, reset]);

  return <ProgressCtx.Provider value={api}>{children}</ProgressCtx.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressCtx);
  if (!ctx) throw new Error("useProgress must be inside ProgressProvider");
  return ctx;
}
