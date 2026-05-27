// Mishka — a friendly bear cub mascot. Pure inline SVG, no images required.
// Geometric, rounded, monochrome-friendly. Uses currentColor as accents.

type MascotProps = {
  size?: number;
  mood?: "happy" | "cheer" | "listening" | "thinking";
  className?: string;
};

export function Mascot({ size = 120, mood = "happy", className }: MascotProps) {
  const eyeY = mood === "listening" ? 52 : 54;
  const eyeRx = mood === "thinking" ? 1.6 : 3;
  const eyeRy = mood === "thinking" ? 3.5 : 3.2;
  const mouthD =
    mood === "cheer"
      ? "M44 70 Q56 84 68 70"
      : mood === "thinking"
      ? "M48 74 Q56 70 64 74"
      : "M46 72 Q56 80 66 72";

  return (
    <svg
      viewBox="0 0 112 112"
      width={size}
      height={size}
      role="img"
      aria-label="Mishka the bear cub mascot"
      className={className}
      data-testid="img-mascot"
    >
      {/* ears */}
      <circle cx="28" cy="26" r="13" fill="#A8693E" />
      <circle cx="28" cy="26" r="6"  fill="#FFD8B0" />
      <circle cx="84" cy="26" r="13" fill="#A8693E" />
      <circle cx="84" cy="26" r="6"  fill="#FFD8B0" />
      {/* head */}
      <circle cx="56" cy="58" r="38" fill="#C5824E" />
      {/* muzzle */}
      <ellipse cx="56" cy="72" rx="20" ry="15" fill="#FFE6C7" />
      {/* nose */}
      <ellipse cx="56" cy="64" rx="5" ry="4" fill="#2A1B0E" />
      {/* eyes */}
      <ellipse cx="42" cy={eyeY} rx={eyeRx} ry={eyeRy} fill="#2A1B0E" />
      <ellipse cx="70" cy={eyeY} rx={eyeRx} ry={eyeRy} fill="#2A1B0E" />
      {/* eye sparkle */}
      <circle cx="43.2" cy={eyeY - 1.2} r="0.9" fill="#fff" />
      <circle cx="71.2" cy={eyeY - 1.2} r="0.9" fill="#fff" />
      {/* mouth */}
      <path d={mouthD} stroke="#2A1B0E" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      {/* cheek blush */}
      <circle cx="34" cy="68" r="4" fill="#F5A6A0" opacity="0.7" />
      <circle cx="78" cy="68" r="4" fill="#F5A6A0" opacity="0.7" />
      {/* listening: little headphone arc */}
      {mood === "listening" && (
        <>
          <path d="M14 56 Q56 8 98 56" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.6" />
          <circle cx="14" cy="56" r="5" fill="currentColor" />
          <circle cx="98" cy="56" r="5" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
