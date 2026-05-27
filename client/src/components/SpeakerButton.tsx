import { useState } from "react";
import { Volume2 } from "lucide-react";
import { speakRussian } from "@/lib/speech";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  label?: string;        // optional accessible label
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "ghost";
  className?: string;
  testId?: string;
  onSpoke?: () => void;
};

const sizeMap = {
  sm: "h-10 w-10 text-base",
  md: "h-14 w-14 text-xl",
  lg: "h-20 w-20 text-3xl",
};

export function SpeakerButton({
  text, label, size = "md", variant = "primary", className, testId, onSpoke,
}: Props) {
  const [speaking, setSpeaking] = useState(false);

  const handle = () => {
    setSpeaking(true);
    speakRussian(text, {
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
    onSpoke?.();
  };

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={label ?? `Listen: say ${text} in Russian`}
      data-testid={testId ?? `button-speak-${text}`}
      className={cn(
        "inline-flex items-center justify-center rounded-full shadow-md border-2 transition active:translate-y-[2px] active:shadow-sm focus-visible:outline-none",
        sizeMap[size],
        variant === "primary"
          ? "bg-[hsl(var(--coral))] text-white border-[hsl(20_30%_18%/0.12)] hover:brightness-105"
          : "bg-white text-[hsl(var(--coral))] border-[hsl(var(--coral)/0.3)]",
        speaking && "animate-wiggle",
        className,
      )}
    >
      <Volume2 className="size-[55%]" aria-hidden="true" />
    </button>
  );
}
