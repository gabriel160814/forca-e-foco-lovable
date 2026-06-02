import { createFileRoute, Link } from "@tanstack/react-router";
import bgWelcome from "@/assets/bg-welcome.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bem-vindo — Força & Foco" },
      {
        name: "description",
        content: "Bem-vindo à academia Força & Foco. Disciplina, energia e resultado.",
      },
      { property: "og:title", content: "Bem-vindo — Força & Foco" },
      {
        property: "og:description",
        content: "Academia Força & Foco — disciplina, energia e resultado.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <img
        src={bgWelcome}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur">
          Academia
        </span>
        <h1 className="mt-6 text-6xl leading-[0.95] text-foreground sm:text-7xl md:text-8xl">
          Disciplina · Energia
          <span className="block text-primary">Resultado</span>
        </h1>
        <Link
          to="/inicio"
          className="mt-10 inline-flex items-center justify-center rounded-xl bg-primary px-9 py-4 text-lg font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.04]"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          Bem-vindo ao Força &amp; Foco →
        </Link>
      </div>
    </main>
  );
}
