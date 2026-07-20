import { Link } from "@tanstack/react-router";
import heroAsset from "@/assets/hero-gabe.jpg.asset.json";
const heroImg = heroAsset.url;

export function Hero() {
  return (
    <header className="relative min-h-[88vh] flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Atleta Força & Foco em destaque"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl lg:max-w-7xl px-6 py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur">
          Força &amp; Foco · v1.0.0
        </span>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Check-in antecipado para controle de vagas nas aulas da academia —
          evitando superlotação e organizando as turmas com inteligência.
        </p>
        <div className="mt-8">
          <Link
            to="/checkin"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Fazer check-in →
          </Link>
        </div>
        <div className="mt-9 flex flex-wrap gap-4 text-sm">
          <div className="rounded-lg border border-border bg-card/60 px-5 py-3 backdrop-blur">
            <span className="block text-muted-foreground">Emissão</span>
            <span className="font-semibold text-foreground">28/05/2026</span>
          </div>
          <div className="rounded-lg border border-border bg-card/60 px-5 py-3 backdrop-blur">
            <span className="block text-muted-foreground">Responsável</span>
            <span className="font-semibold text-foreground">Gabriel Damazio</span>
          </div>
          <div className="rounded-lg border border-success/40 bg-card/60 px-5 py-3 backdrop-blur">
            <span className="block text-muted-foreground">Situação</span>
            <span className="font-semibold text-success">✔ Aceito Integralmente</span>
          </div>
        </div>
      </div>
    </header>
  );
}
