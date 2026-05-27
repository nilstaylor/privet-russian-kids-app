// Aiden — a friendly red-headed boy mascot. Pure inline SVG, no images required.
// Geometric, rounded, monochrome-friendly. Uses currentColor as accents.

type MascotProps = {
  size?: number;
  mood?: "happy" | "cheer" | "listening" | "thinking";
  className?: string;
};

export function Mascot({ size = 120, mood = "happy", className }: MascotProps) {
  const eyeY = mood === "listening" ? 55 : 56;
  const eyeRx = mood === "thinking" ? 1.7 : 2.8;
  const eyeRy = mood === "thinking" ? 3.4 : 3;
  const mouthD =
    mood === "cheer"
      ? "M45 75 Q56 88 67 75"
      : mood === "thinking"
      ? "M48 79 Q56 75 64 79"
      : "M47 77 Q56 84 65 77";

  return (
    <svg
      viewBox="0 0 112 112"
      width={size}
      height={size}
      role="img"
      aria-label="Aiden, a cute cartoon red-headed boy mascot"
      className={className}
      data-testid="img-mascot"
    >
      {/* soft sticker shadow */}
      <ellipse cx="56" cy="99" rx="28" ry="7" fill="#2A1B0E" opacity="0.12" />

      {/* neck and shirt */}
      <rect x="48" y="78" width="16" height="14" rx="7" fill="#F6BE8F" />
      <path
        d="M27 108 Q33 86 56 86 Q79 86 85 108 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M45 88 L56 100 L67 88" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.88" />

      {/* ears */}
      <circle cx="26" cy="57" r="6" fill="#F2B783" />
      <circle cx="86" cy="57" r="6" fill="#F2B783" />

      {/* face */}
      <circle cx="56" cy="58" r="34" fill="#FFD1A3" />

      {/* red hair cap */}
      <path
        d="M24 50 C25 27 39 14 58 15 C78 16 91 31 89 52 C83 40 72 36 61 34 C49 32 36 36 24 50 Z"
        fill="#C94A2C"
      />
      <path
        d="M28 49 C32 31 44 22 58 22 C72 22 82 31 85 48 C75 39 62 39 55 43 C46 38 36 40 28 49 Z"
        fill="#E85D35"
      />
      <path d="M38 34 C43 23 55 19 64 22" stroke="#FF8A4F" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
      <path d="M52 18 C47 26 48 35 55 43" stroke="#A83A23" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
      <path d="M69 26 C74 31 76 38 75 45" stroke="#A83A23" strokeWidth="4" strokeLinecap="round" opacity="0.45" />

      {/* eyebrows */}
      <path d="M38 49 Q43 46 48 49" stroke="#87311E" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M64 49 Q69 46 74 49" stroke="#87311E" strokeWidth="2.6" strokeLinecap="round" fill="none" />

      {/* eyes */}
      <ellipse cx="42" cy={eyeY} rx={eyeRx} ry={eyeRy} fill="#2A1B0E" />
      <ellipse cx="70" cy={eyeY} rx={eyeRx} ry={eyeRy} fill="#2A1B0E" />
      {/* eye sparkle */}
      <circle cx="43.2" cy={eyeY - 1.2} r="0.9" fill="#fff" />
      <circle cx="71.2" cy={eyeY - 1.2} r="0.9" fill="#fff" />

      {/* nose */}
      <path d="M56 60 Q53 67 58 68" stroke="#D88E5D" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* mouth */}
      <path d={mouthD} stroke="#2A1B0E" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      {/* cheek blush */}
      <circle cx="34" cy="70" r="4.5" fill="#F5A6A0" opacity="0.75" />
      <circle cx="78" cy="70" r="4.5" fill="#F5A6A0" opacity="0.75" />

      {/* cheerful raised hands */}
      {mood === "cheer" && (
        <>
          <path d="M31 92 C18 83 16 72 20 65" stroke="#FFD1A3" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M81 92 C94 83 96 72 92 65" stroke="#FFD1A3" strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="20" cy="64" r="5" fill="#FFD1A3" />
          <circle cx="92" cy="64" r="5" fill="#FFD1A3" />
        </>
      )}

      {/* thinking bubble */}
      {mood === "thinking" && (
        <>
          <circle cx="88" cy="24" r="5" fill="currentColor" opacity="0.28" />
          <circle cx="99" cy="17" r="3" fill="currentColor" opacity="0.2" />
        </>
      )}

      {/* listening: little headphone arc */}
      {mood === "listening" && (
        <>
          <path d="M20 57 Q56 14 92 57" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.68" />
          <rect x="15" y="52" width="9" height="16" rx="4" fill="currentColor" />
          <rect x="88" y="52" width="9" height="16" rx="4" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
