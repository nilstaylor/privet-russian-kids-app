// Tiny wrapper around the Web Speech API for Russian TTS, with graceful fallback.
// No external paid APIs. Works offline-ish: voices come from the OS/browser.

let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesReady = false;
const listeners = new Set<() => void>();

function loadVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const v = window.speechSynthesis.getVoices();
  if (v && v.length) {
    cachedVoices = v;
    voicesReady = true;
    listeners.forEach(l => l());
  }
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => loadVoices();
}

export function onVoicesReady(cb: () => void): () => void {
  listeners.add(cb);
  if (voicesReady) cb();
  return () => listeners.delete(cb);
}

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export function getRussianVoice(): SpeechSynthesisVoice | null {
  if (!cachedVoices.length) loadVoices();
  // Prefer voices whose lang starts with "ru" (ru, ru-RU, ru_RU...)
  const ru = cachedVoices.find(v => /^ru\b|^ru[-_]/i.test(v.lang));
  return ru || null;
}

export function hasRussianVoice(): boolean {
  return getRussianVoice() !== null;
}

export type SpeakOptions = {
  rate?: number;          // 0.5 - 1.2 typical for kids
  pitch?: number;
  volume?: number;
  onEnd?: () => void;
  onError?: () => void;
};

let lastUtterance: SpeechSynthesisUtterance | null = null;

export function cancelSpeech() {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {/* ignore */}
}

/**
 * Speak Russian text. Returns true if a Russian voice was used, false if it fell back
 * to whatever default voice the browser has (still attempts ru-RU lang tag).
 */
export function speakRussian(text: string, opts: SpeakOptions = {}): boolean {
  if (!isSpeechSupported() || !text) {
    opts.onError?.();
    return false;
  }
  cancelSpeech();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
  utter.rate = opts.rate ?? 0.85;     // a touch slower for learners
  utter.pitch = opts.pitch ?? 1.05;   // slightly bright
  utter.volume = opts.volume ?? 1;
  const voice = getRussianVoice();
  let usedRu = false;
  if (voice) {
    utter.voice = voice;
    usedRu = true;
  }
  utter.onend = () => opts.onEnd?.();
  utter.onerror = () => opts.onError?.();
  lastUtterance = utter;
  try {
    window.speechSynthesis.speak(utter);
  } catch {
    opts.onError?.();
    return false;
  }
  return usedRu;
}

export function speakEnglish(text: string, opts: SpeakOptions = {}) {
  if (!isSpeechSupported() || !text) return;
  cancelSpeech();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = opts.rate ?? 0.95;
  utter.pitch = opts.pitch ?? 1;
  utter.onend = () => opts.onEnd?.();
  utter.onerror = () => opts.onError?.();
  lastUtterance = utter;
  try { window.speechSynthesis.speak(utter); } catch { opts.onError?.(); }
}

// Used for diagnostic UI banner: have we ever successfully spoken Russian?
export function diagnoseRussianSupport(): {
  supported: boolean;
  hasRussian: boolean;
  voiceCount: number;
} {
  return {
    supported: isSpeechSupported(),
    hasRussian: hasRussianVoice(),
    voiceCount: cachedVoices.length,
  };
}

// Keep this so React fast-refresh doesn't complain about unused export
export const __lastUtterance = () => lastUtterance;
