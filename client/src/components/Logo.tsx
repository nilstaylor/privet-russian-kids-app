// Wordmark + mark: a friendly star with the Cyrillic Я inside.
export function Logo({ className }: { className?: string }) {
  return (
    <div className={className} aria-label="Aiden Russian School">
      <svg viewBox="0 0 360 56" width="100%" height="100%" role="img" aria-hidden="true">
        <g>
          <path
            d="M28 6 l5.5 11.4 12.5 1.8 -9 8.8 2.1 12.4 L28 34.6 16.9 40.4 19 28 10 19.2 22.5 17.4 z"
            fill="#FF6F61"
            stroke="#2A1B0E"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <text
            x="28" y="32"
            textAnchor="middle"
            fontFamily="Fredoka, Nunito, sans-serif"
            fontWeight="700"
            fontSize="18"
            fill="#FFF8E7"
          >Я</text>
        </g>
        <text
          x="60" y="36"
          fontFamily="Fredoka, Nunito, sans-serif"
          fontWeight="700"
          fontSize="23"
          fill="currentColor"
          letterSpacing="-0.6"
        >Aiden Russian School</text>
      </svg>
    </div>
  );
}
