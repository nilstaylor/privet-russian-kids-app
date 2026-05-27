import { VOCAB, type VocabWord } from "./content";

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

export type ListenPickQuestion = {
  answer: VocabWord;
  options: VocabWord[];
};

export function buildListenRound(count = 6, optionCount = 3): ListenPickQuestion[] {
  // Mix categories for variety
  const pool = shuffle(VOCAB);
  const questions: ListenPickQuestion[] = [];
  const used = new Set<string>();
  for (const w of pool) {
    if (questions.length >= count) break;
    if (used.has(w.ru)) continue;
    // Distractors from same or any category, but never duplicates
    const distractors = pickRandom(VOCAB.filter(v => v.ru !== w.ru), optionCount - 1);
    questions.push({
      answer: w,
      options: shuffle([w, ...distractors]),
    });
    used.add(w.ru);
  }
  return questions;
}

export type MatchPair = {
  ru: string;
  en: string;
  emoji: string;
};

export function buildMatchRound(count = 5): MatchPair[] {
  return pickRandom(VOCAB, count).map(({ ru, en, emoji }) => ({ ru, en, emoji }));
}

export type RepeatPrompt = {
  word: VocabWord;
};

export function buildRepeatRound(count = 6): RepeatPrompt[] {
  return pickRandom(VOCAB, count).map(word => ({ word }));
}

export type ReviewQuestion =
  | { kind: "listen"; q: ListenPickQuestion }
  | { kind: "match"; q: ListenPickQuestion };  // also picture-pick reversed

export function buildReviewRound(count = 5): ReviewQuestion[] {
  const base = buildListenRound(count, 3);
  return base.map((q, i) => ({
    kind: i % 2 === 0 ? "listen" : "match",
    q,
  }));
}
