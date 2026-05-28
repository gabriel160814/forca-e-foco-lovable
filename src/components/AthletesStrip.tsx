import gbg from "@/assets/atleta-gbg.jpg";
import gb from "@/assets/atleta-gb.jpg";
import ganlay from "@/assets/atleta-ganlay.jpg";

const photos = [
  { src: gbg, alt: "Atleta Força & Foco treinando" },
  { src: gb, alt: "Atleta Força & Foco em pose" },
  { src: ganlay, alt: "Atleta Força & Foco celebrando" },
];

export function AthletesStrip() {
  return (
    <section className="relative border-y border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {photos.map((p) => (
          <div key={p.alt} className="group relative aspect-[4/3] overflow-hidden">
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-5">
        <span className="font-display text-3xl tracking-wide text-primary sm:text-4xl">
          Disciplina · Energia · Resultado
        </span>
      </div>
    </section>
  );
}
