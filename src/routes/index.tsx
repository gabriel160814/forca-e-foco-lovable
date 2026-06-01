import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { AthletesStrip } from "@/components/AthletesStrip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plano de Implantação — Check-in Força & Foco v1.0.0" },
      {
        name: "description",
        content:
          "Sistema web de check-in antecipado para controle de vagas nas aulas da academia Força & Foco.",
      },
      { property: "og:title", content: "Plano de Implantação — Check-in Força & Foco" },
      {
        property: "og:description",
        content:
          "Sistema web de check-in antecipado para controle de vagas nas aulas da academia.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <AthletesStrip />

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-2xl text-foreground">Força &amp; Foco</p>
        <p className="mt-2">Plano de Implantação · v1.0.0 · Gabriel Damazio · 28/05/2026</p>
      </footer>
    </div>
  );
}
