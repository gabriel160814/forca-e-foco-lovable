import musculacao from "@/assets/mod-musculacao.jpg";
import cross from "@/assets/mod-cross.jpg";
import funcional from "@/assets/mod-funcional.jpg";
import spinning from "@/assets/mod-spinning.jpg";
import boxe from "@/assets/mod-boxe.jpg";

import musc1 from "@/assets/musc-1.jpg";
import musc2 from "@/assets/musc-2.jpg";
import musc3 from "@/assets/musc-3.jpg";
import cross1 from "@/assets/cross-1.jpg";
import cross2 from "@/assets/cross-2.jpg";
import cross3 from "@/assets/cross-3.jpg";
import func1 from "@/assets/func-1.jpg";
import func2 from "@/assets/func-2.jpg";
import func3 from "@/assets/func-3.jpg";
import spin1 from "@/assets/spin-1.jpg";
import spin2 from "@/assets/spin-2.jpg";
import spin3 from "@/assets/spin-3.jpg";
import boxe1 from "@/assets/boxe-1.jpg";
import boxe2 from "@/assets/boxe-2.jpg";
import boxe3 from "@/assets/boxe-3.jpg";

export type Modalidade = {
  slug: string;
  nome: string;
  capa: string;
  descricao: string;
  destaques: string[];
  galeria: string[];
};

export const modalidades: Modalidade[] = [
  {
    slug: "musculacao",
    nome: "Musculação",
    capa: musculacao,
    descricao:
      "Treinos personalizados de força e hipertrofia, com acompanhamento técnico em todos os exercícios. Equipamentos profissionais e fichas evoluindo com você.",
    destaques: [
      "Avaliação física inicial",
      "Ficha personalizada e progressiva",
      "Acompanhamento de professor na sala",
    ],
    galeria: [musc1, musc2, musc3],
  },
  {
    slug: "cross",
    nome: "Cross",
    capa: cross,
    descricao:
      "Treinos funcionais de alta intensidade combinando levantamento de peso, ginástica e condicionamento metabólico. Comunidade forte e resultado rápido.",
    destaques: ["WODs diários", "Box jumps, kettlebells e barra", "Todos os níveis bem-vindos"],
    galeria: [cross1, cross2, cross3],
  },
  {
    slug: "funcional",
    nome: "Funcional",
    capa: funcional,
    descricao:
      "Movimentos integrados para força, mobilidade, equilíbrio e queima calórica. Perfeito para quem busca condicionamento completo em pouco tempo.",
    destaques: ["TRX, kettlebell e medicine ball", "Aulas em grupo de 45 min", "Foco em mobilidade e core"],
    galeria: [func1, func2, func3],
  },
  {
    slug: "spinning",
    nome: "Spinning",
    capa: spinning,
    descricao:
      "Pedal indoor de alta intensidade com música, luz e instrutor guiando cada subida. Queima calórica enorme em uma aula só.",
    destaques: ["Aulas com playlists exclusivas", "Bike profissional regulada para você", "Iniciantes a avançados"],
    galeria: [spin1, spin2, spin3],
  },
  {
    slug: "boxe",
    nome: "Boxe",
    capa: boxe,
    descricao:
      "Técnica, condicionamento e atitude. Aulas de boxe que ensinam fundamentos e levam você ao limite com saco, manopla e sparring controlado.",
    destaques: ["Fundamentos de soco e esquiva", "Trabalho em saco e manopla", "Ganho de explosão e resistência"],
    galeria: [boxe1, boxe2, boxe3],
  },
];

export function getModalidade(slug: string): Modalidade | undefined {
  return modalidades.find((m) => m.slug === slug);
}
