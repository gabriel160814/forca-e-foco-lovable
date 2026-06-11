import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bgCheckin from "@/assets/bg-checkin.jpg";

export const Route = createFileRoute("/checkin")({
  head: () => ({
    meta: [
      { title: "Check-in — Força & Foco" },
      {
        name: "description",
        content:
          "Faça seu check-in antecipado nas aulas da academia Força & Foco e garanta sua vaga.",
      },
      { property: "og:title", content: "Check-in — Força & Foco" },
      {
        property: "og:description",
        content: "Garanta sua vaga nas aulas com o check-in antecipado.",
      },
    ],
  }),
  component: CheckinPage,
});

const MODALIDADES = ["Musculação", "Cross", "Funcional", "Spinning", "Boxe"];
const HORARIOS = ["06:00", "07:00", "12:00", "18:00", "19:00", "20:00"];
const VAGAS_POR_TURMA = 15;

const schema = z.object({
  nome: z.string().trim().min(2, "Informe o nome do aluno").max(80, "Nome muito longo"),
  modalidade: z.string().min(1, "Selecione a modalidade"),
  horario: z.string().min(1, "Selecione o horário"),
});

type Checkin = {
  id: string;
  nome: string;
  modalidade: string;
  horario: string;
  created_at: string;
};

function startOfTodayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function CheckinPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [modalidade, setModalidade] = useState(MODALIDADES[0]);
  const [horario, setHorario] = useState("");

  const { data: checkins = [] } = useQuery({
    queryKey: ["checkins"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("checkins")
        .select("*")
        .gte("created_at", startOfTodayISO())
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Checkin[];
    },
  });

  const vagas = useMemo(() => {
    const map: Record<string, number> = {};
    for (const h of HORARIOS) map[h] = 0;
    for (const c of checkins) if (c.horario in map) map[c.horario] += 1;
    return map;
  }, [checkins]);

  const mutation = useMutation({
    mutationFn: async (payload: z.infer<typeof schema>) => {
      const ocupadas = checkins.filter((c) => c.horario === payload.horario).length;
      if (ocupadas >= VAGAS_POR_TURMA) {
        throw new Error("Turma lotada! Escolha outro horário.");
      }
      const { error } = await supabase.from("checkins").insert({
        nome: payload.nome,
        modalidade: payload.modalidade,
        horario: payload.horario,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Check-in confirmado! Bom treino 💪");
      setNome("");
      setHorario("");
      queryClient.invalidateQueries({ queryKey: ["checkins"] });
      navigate({ to: "/hoje" });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ nome, modalidade, horario });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    mutation.mutate(parsed.data);
  };

  return (
    <div className="relative min-h-screen">
      <img
        src={bgCheckin}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        className="fixed inset-0 -z-10 h-full w-full object-cover [image-rendering:auto]"
        style={{ imageRendering: "auto" }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/60 to-background/80" />

      <Toaster richColors position="top-center" />

      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <a href="/" className="font-display text-2xl text-foreground">
            Força &amp; <span className="text-primary">Foco</span>
          </a>
          <a
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Voltar ao plano
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl text-foreground sm:text-5xl">Check-in de Aula</h1>
          <p className="mt-2 text-muted-foreground">
            Garanta sua vaga antecipadamente. Cada turma tem {VAGAS_POR_TURMA} vagas.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card/95 p-7 backdrop-blur"
            style={{ boxShadow: "var(--shadow-card)" }}
          >

            <div className="space-y-5">
              <div>
                <Label htmlFor="nome">Nome do aluno</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex.: João da Silva"
                  className="mt-1.5"
                  maxLength={80}
                />
              </div>

              <div>
                <Label htmlFor="telefone">Telefone (opcional)</Label>
                <Input
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(00) 90000-0000"
                  className="mt-1.5"
                  maxLength={20}
                  inputMode="tel"
                />
              </div>

              <div>
                <Label>Modalidade</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {MODALIDADES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setModalidade(m)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                        modalidade === m
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-secondary text-foreground hover:border-primary/50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Horário</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {HORARIOS.map((h) => {
                    const ocupadas = vagas[h] ?? 0;
                    const lotado = ocupadas >= VAGAS_POR_TURMA;
                    const restantes = VAGAS_POR_TURMA - ocupadas;
                    return (
                      <button
                        key={h}
                        type="button"
                        disabled={lotado}
                        onClick={() => setHorario(h)}
                        className={`rounded-xl border p-3 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                          horario === h
                            ? "border-primary bg-primary/15"
                            : "border-border bg-secondary hover:border-primary/50"
                        }`}
                      >
                        <span className="block font-display text-2xl text-foreground">{h}</span>
                        <span
                          className={`text-xs ${lotado ? "text-destructive" : "text-muted-foreground"}`}
                        >
                          {lotado ? "Lotado" : `${restantes} vagas`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Confirmando..." : "Confirmar check-in"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
