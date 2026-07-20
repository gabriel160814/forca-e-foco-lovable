import { Link } from "@tanstack/react-router";
import { modalidades } from "@/lib/modalidades-data";

export function Modalidades() {
  return (
    <section className="border-b border-border bg-background py-16">
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Nossas aulas
          </span>
          <h2 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">
            Modalidades
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Clique em uma modalidade para ver mais fotos e detalhes.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {modalidades.map((m) => (
            <Link
              key={m.slug}
              to="/modalidades/$slug"
              params={{ slug: m.slug }}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border transition hover:border-primary"
            >
              <img
                src={m.capa}
                alt={`Aula de ${m.nome} na Força & Foco`}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                <span className="font-display text-2xl uppercase tracking-wide text-foreground sm:text-3xl">
                  {m.nome}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
