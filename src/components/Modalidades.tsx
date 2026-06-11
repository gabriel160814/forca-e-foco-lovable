import musculacao from "@/assets/mod-musculacao.jpg";
import cross from "@/assets/mod-cross.jpg";
import funcional from "@/assets/mod-funcional.jpg";
import spinning from "@/assets/mod-spinning.jpg";
import boxe from "@/assets/mod-boxe.jpg";

const modalidades = [
  { nome: "Musculação", img: musculacao },
  { nome: "Cross", img: cross },
  { nome: "Funcional", img: funcional },
  { nome: "Spinning", img: spinning },
  { nome: "Boxe", img: boxe },
];

export function Modalidades() {
  return (
    <section className="border-b border-border bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Nossas aulas
          </span>
          <h2 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">
            Modalidades
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {modalidades.map((m) => (
            <div
              key={m.nome}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border"
            >
              <img
                src={m.img}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
