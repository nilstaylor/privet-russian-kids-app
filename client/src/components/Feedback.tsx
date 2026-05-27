import { CheckCircle2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function Feedback({ kind, message }: { kind: "good" | "tryagain" | "idle"; message?: string }) {
  if (kind === "idle") return null;
  const good = kind === "good";
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid={good ? "feedback-good" : "feedback-tryagain"}
      className={cn(
        "inline-flex items-center gap-2 px-5 py-3 rounded-full font-display text-lg font-bold border-2 animate-float-up",
        good
          ? "bg-[hsl(var(--mint)/0.25)] border-[hsl(var(--mint)/0.6)] text-[hsl(152_60%_22%)]"
          : "bg-[hsl(var(--coral)/0.15)] border-[hsl(var(--coral)/0.5)] text-[hsl(8_60%_30%)]",
      )}
    >
      {good ? <CheckCircle2 className="size-6" aria-hidden="true" /> : <RefreshCw className="size-6" aria-hidden="true" />}
      <span>{message ?? (good ? "Great job!" : "Try again!")}</span>
    </div>
  );
}
