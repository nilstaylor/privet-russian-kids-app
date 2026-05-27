import { Link } from "wouter";
import { Mascot } from "@/components/Mascot";

export default function NotFound() {
  return (
    <div className="rounded-[2rem] border-2 border-border bg-white p-8 sm:p-12 text-center shadow-md">
      <Mascot size={140} mood="thinking" className="mx-auto text-[hsl(var(--sky))]" />
      <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold">Oops!</h1>
      <p className="mt-2 text-lg text-muted-foreground">We can't find that page.</p>
      <Link
        href="/"
        data-testid="link-not-found-home"
        className="mt-6 inline-flex h-14 px-6 items-center rounded-full bg-[hsl(var(--coral))] text-white font-display text-lg font-bold border-2 border-[hsl(20_30%_18%/0.15)] shadow-md active:translate-y-[1px]"
      >
        Back home
      </Link>
    </div>
  );
}
