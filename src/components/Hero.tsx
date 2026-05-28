import heroImg from "@/assets/hero-gym.jpg";

export function Hero() {
  return (
    <header className="relative min-h-[88vh] flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Atleta treinando com foco em academia"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur">
          Plano de Implantação · v1.0.0
        </span>
        <h1 className="mt-6 max-w-3xl text-6xl leading-[0.95] text-foreground sm:text-7xl md:text-8xl">
          Sistema de Check-in
          <span className="block text-primary">Força &amp; Foco</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Check-in antecipado para controle de vagas nas aulas da academia —
          evitando superlotação e organizando as turmas com inteligência.
        </p>
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
