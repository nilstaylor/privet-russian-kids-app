import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRow({
  earned,
  total,
  size = 28,
  className,
}: {
  earned: number;
  total: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      data-testid="stars-row"
      aria-label={`${earned} of ${total} stars earned`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < earned;
        return (
          <Star
            key={i}
            width={size}
            height={size}
            className={cn(
              "transition",
              filled
                ? "fill-[hsl(var(--sun))] text-[hsl(20_30%_18%)] drop-shadow-[0_2px_0_rgba(40,30,10,0.18)]"
                : "fill-transparent text-[hsl(20_30%_18%/0.25)]",
              filled && "animate-pop",
            )}
            strokeWidth={2.5}
          />
        );
      })}
    </div>
  );
}
