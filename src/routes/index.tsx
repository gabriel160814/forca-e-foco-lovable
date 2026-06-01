import { createFileRoute, Link } from "@tanstack/react-router";
import { AthletesStrip } from "@/components/AthletesStrip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Força & Foco — Academia" },
      {
        name: "description",
        content:
          "Academia Força & Foco — disciplina, energia e resultado. Faça seu check-in antecipado.",
      },
      { property: "og:title", content: "Força & Foco" },
      {
        property: "og:description",
        content: "Academia Força & Foco — faça seu check-in antecipado.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-display text-3xl text-foreground">
            Força &amp; <span className="text-primary">Foco</span>
          </span>
          <Link
            to="/checkin"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Fazer check-in →
          </Link>
        </div>
      </header>

      <AthletesStrip />

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-2xl text-foreground">Força &amp; Foco</p>
        <p className="mt-2">Disciplina · Energia · Resultado</p>
      </footer>
    </div>
  );
}

