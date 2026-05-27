import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import { Star, ChevronLeft } from "lucide-react";
import { useProgress } from "@/lib/progress";

export function Header() {
  const [location] = useLocation();
  const { stars } = useProgress();
  const showBack = location !== "/" && location !== "";

  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {showBack ? (
            <Link
              href="/"
              data-testid="link-home"
              className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white border-2 border-border shadow-sm active:translate-y-[1px]"
              aria-label="Back to home"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </Link>
          ) : (
            <Link href="/" className="block w-56 sm:w-72 text-[hsl(var(--coral))]" data-testid="link-logo">
              <Logo />
            </Link>
          )}
        </div>

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-border shadow-sm"
          data-testid="badge-star-count"
          aria-label={`${stars} stars earned`}
        >
          <Star className="size-5 fill-[hsl(var(--sun))] text-[hsl(20_30%_18%)]" strokeWidth={2.5} aria-hidden="true" />
          <span className="font-display text-lg font-bold tabular-nums" data-testid="text-star-count">
            {stars}
          </span>
        </div>
      </div>
    </header>
  );
}
