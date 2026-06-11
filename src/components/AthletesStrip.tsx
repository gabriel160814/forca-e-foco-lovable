import ga from "@/assets/athlete-1n.jpg.asset.json";
import gg from "@/assets/athlete-2n.jpg.asset.json";
import gbr from "@/assets/athlete-3n.jpg.asset.json";

const photos = [
  { src: ga.url, alt: "Atleta Força & Foco treinando" },
  { src: gg.url, alt: "Atleta Força & Foco em pose" },
  { src: gbr.url, alt: "Atleta Força & Foco em treino" },
];

export function AthletesStrip() {
  return (
    <section className="relative border-y border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {photos.map((p) => (
          <div key={p.alt} className="group relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-8">
        <span className="font-display text-5xl tracking-wide text-primary drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl">
          Disciplina · Energia · Resultado
        </span>
      </div>
    </section>
  );
}
