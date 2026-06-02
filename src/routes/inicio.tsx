import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { AthletesStrip } from "@/components/AthletesStrip";

export const Route = createFileRoute("/inicio")({
  head: () => ({
    meta: [
      { title: "Força & Foco — Início" },
      {
        name: "description",
        content:
          "Academia Força & Foco — faça seu check-in antecipado nas aulas e garanta sua vaga.",
      },
      { property: "og:title", content: "Força & Foco" },
      {
        property: "og:description",
        content: "Academia Força & Foco — disciplina, energia e resultado.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <AthletesStrip />
      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-2xl text-foreground">Força &amp; Foco</p>
        <p className="mt-2">Disciplina · Energia · Resultado</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href="/checkin" className="text-primary hover:underline">Fazer check-in</a>
          <a href="/registros" className="text-primary hover:underline">Gerenciar registros</a>
        </div>
      </footer>
    </div>
  );
}
