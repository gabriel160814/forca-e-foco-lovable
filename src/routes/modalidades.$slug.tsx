import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getModalidade, modalidades } from "@/lib/modalidades-data";

export const Route = createFileRoute("/modalidades/$slug")({
  loader: ({ params }) => {
    const mod = getModalidade(params.slug);
    if (!mod) throw notFound();
    return { mod };
  },
  head: ({ loaderData }) => {
    const nome = loaderData?.mod.nome ?? "Modalidade";
    return {
      meta: [
        { title: `${nome} — Força & Foco` },
        {
          name: "description",
          content:
            loaderData?.mod.descricao ??
            "Conheça as modalidades da academia Força & Foco.",
        },
        { property: "og:title", content: `${nome} — Força & Foco` },
        {
          property: "og:description",
          content: loaderData?.mod.descricao ?? "Disciplina · Energia · Resultado",
        },
        { property: "og:image", content: loaderData?.mod.capa ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="font-display text-4xl text-foreground">Modalidade não encontrada</h1>
        <Link to="/inicio" className="mt-4 inline-block text-primary hover:underline">
          Voltar para o início
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="font-display text-3xl text-foreground">Ops, algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  ),
  component: ModalidadePage,
});

function ModalidadePage() {
  const { mod } = Route.useLoaderData() as { mod: import("@/lib/modalidades-data").Modalidade };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[360px] w-full overflow-hidden border-b border-border">
        <img
          src={mod.capa}
          alt={mod.nome}
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl lg:max-w-7xl flex-col justify-end px-6 pb-10">
          <Link
            to="/inicio"
            className="mb-4 inline-block w-fit text-xs font-semibold uppercase tracking-widest text-primary hover:underline"
          >
            ← Voltar
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-wide text-foreground sm:text-7xl">
            {mod.nome}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {mod.descricao}
          </p>
        </div>
      </section>

      {/* Destaques */}
      <section className="border-b border-border py-12 lg:py-20">
        <div className="mx-auto grid max-w-6xl lg:max-w-7xl gap-4 px-6 sm:grid-cols-3">
          {mod.destaques.map((d) => (
            <div
              key={d}
              className="rounded-xl border border-border bg-card p-5 text-card-foreground"
            >
              <span className="font-display text-primary">●</span>
              <p className="mt-2 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Galeria */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-6">
          <h2 className="mb-6 font-display text-3xl text-foreground sm:text-4xl">
            Galeria
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mod.galeria.map((src, i) => (
              <div
                key={src}
                className="aspect-square overflow-hidden rounded-xl border border-border"
              >
                <img
                  src={src}
                  alt={`${mod.nome} — foto ${i + 1}`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outras modalidades */}
      <section className="border-t border-border py-12 lg:py-20">
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-6">
          <h2 className="mb-6 font-display text-2xl text-foreground">
            Outras modalidades
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {modalidades
              .filter((m) => m.slug !== mod.slug)
              .map((m) => (
                <Link
                  key={m.slug}
                  to="/modalidades/$slug"
                  params={{ slug: m.slug }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border"
                >
                  <img
                    src={m.capa}
                    alt={m.nome}
                    loading="lazy"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <span className="absolute inset-x-0 bottom-2 text-center font-display text-lg uppercase text-foreground">
                    {m.nome}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-xl text-foreground">Força &amp; Foco</p>
        <p className="mt-2">Disciplina · Energia · Resultado</p>
      </footer>
    </div>
  );
}
