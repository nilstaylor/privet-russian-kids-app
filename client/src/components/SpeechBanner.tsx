import { useEffect, useState } from "react";
import { diagnoseRussianSupport, onVoicesReady } from "@/lib/speech";
import { Info, X } from "lucide-react";

export function SpeechBanner() {
  const [diag, setDiag] = useState(() => diagnoseRussianSupport());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const off = onVoicesReady(() => setDiag(diagnoseRussianSupport()));
    return () => { off(); };
  }, []);

  // Only show if speech IS supported but Russian voice is missing — grown-up tip.
  if (dismissed) return null;
  if (!diag.supported) {
    return (
      <div
        role="status"
        className="bg-[hsl(var(--sky)/0.18)] border-b border-[hsl(var(--sky)/0.4)] text-[hsl(20_30%_18%)] px-4 py-2 text-sm flex items-center gap-2 justify-center"
        data-testid="banner-no-speech"
      >
        <Info className="size-4" aria-hidden="true" />
        <span>Audio won't play here, but you can still see and read everything!</span>
      </div>
    );
  }
  if (!diag.hasRussian) {
    return (
      <div
        role="status"
        className="bg-[hsl(var(--sun)/0.25)] border-b border-[hsl(var(--sun)/0.5)] text-[hsl(20_30%_18%)] px-4 py-2 text-sm flex items-center gap-2 justify-center"
        data-testid="banner-no-russian-voice"
      >
        <Info className="size-4 shrink-0" aria-hidden="true" />
        <span className="flex-1 text-center">
          <strong>Grown-up tip:</strong> Add a Russian voice in your system settings for the best sound. We'll still try to say words out loud!
        </span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss tip"
          data-testid="button-dismiss-banner"
          className="inline-flex items-center justify-center size-7 rounded-full hover:bg-black/5"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    );
  }
  return null;
}
