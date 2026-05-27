import { Header } from "./Header";
import { SpeechBanner } from "./SpeechBanner";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SpeechBanner />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
          {children}
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <span aria-hidden="true">🌟</span> Made for little learners
      </footer>
    </div>
  );
}
