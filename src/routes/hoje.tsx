import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import bgHoje from "@/assets/bg-hoje.webp.asset.json";

export const Route = createFileRoute("/hoje")({
  head: () => ({
    meta: [
      { title: "Check-ins de Hoje — Força & Foco" },
      { name: "description", content: "Acompanhe e gerencie os check-ins dos alunos do dia." },
    ],
  }),
  component: HojePage,
});

type Status = "pendente" | "aceito" | "recusado";

type Checkin = {
  id: string;
  nome: string;
  telefone: string | null;
  modalidade: string;
  horario: string;
  status: Status;
  created_at: string;
};

const FILTROS: { label: string; value: "todos" | Status }[] = [
  { label: "Todos", value: "todos" },
  { label: "Pendentes", value: "pendente" },
  { label: "Aceitos", value: "aceito" },
  { label: "Recusados", value: "recusado" },
];

function badgeClasses(status: Status) {
  switch (status) {
    case "aceito":
      return "bg-success/20 text-success border-success/40";
    case "recusado":
      return "bg-destructive/20 text-destructive border-destructive/40";
    default:
      return "bg-primary/20 text-primary border-primary/40";
  }
}

function isHoje(iso: string) {
  const d = new Date(iso);
  const n = new Date();
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  );
}

function HojePage() {
  const qc = useQueryClient();
  const [filtro, setFiltro] = useState<"todos" | Status>("todos");

  const { data: registros = [], isLoading } = useQuery({
    queryKey: ["checkins-hoje"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("checkins")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as Checkin[]).filter((r) => isHoje(r.created_at));
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      const { error } = await supabase.from("checkins").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Status atualizado");
      qc.invalidateQueries({ queryKey: ["checkins-hoje"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remover = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("checkins").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Registro removido");
      qc.invalidateQueries({ queryKey: ["checkins-hoje"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtrados = filtro === "todos" ? registros : registros.filter((r) => r.status === filtro);

  const contadores = {
    pendente: registros.filter((r) => r.status === "pendente").length,
    aceito: registros.filter((r) => r.status === "aceito").length,
    recusado: registros.filter((r) => r.status === "recusado").length,
  };

  const hojeStr = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative min-h-screen">
      <img
        src={bgHoje.url}
        alt=""
        aria-hidden
        className="fixed inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/55 via-background/45 to-background/65 backdrop-blur-[2px]" />
      <Toaster richColors position="top-center" />

      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="font-display text-2xl text-foreground">
            Força &amp; <span className="text-primary">Foco</span>
          </a>
          <div className="flex items-center gap-4 text-sm">
            <a href="/checkin" className="text-muted-foreground hover:text-foreground">Check-in</a>
            <a href="/registros" className="text-muted-foreground hover:text-foreground">Registros</a>
            <a href="/inicio" className="text-muted-foreground hover:text-foreground">Início</a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-primary">{hojeStr}</p>
          <h1 className="mt-2 text-4xl text-foreground sm:text-5xl">Check-ins de Hoje</h1>
          <p className="mt-2 text-muted-foreground">
            Aceite, recuse ou deixe pendente os alunos do dia.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3">
          <StatCard label="Pendentes" value={contadores.pendente} tone="primary" />
          <StatCard label="Aceitos" value={contadores.aceito} tone="success" />
          <StatCard label="Recusados" value={contadores.recusado} tone="destructive" />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                filtro === f.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card/70 text-foreground hover:border-primary/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {isLoading && <p className="text-center text-muted-foreground">Carregando...</p>}
          {!isLoading && filtrados.length === 0 && (
            <p className="rounded-xl border border-dashed border-border bg-card/60 p-8 text-center text-muted-foreground">
              Nenhum check-in para hoje.
            </p>
          )}
          {filtrados.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-border bg-card/90 p-5 backdrop-blur"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-foreground">{r.nome}</h3>
                    <span
                      className={`rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wide ${badgeClasses(r.status)}`}
                    >
                      {r.status}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span>{r.modalidade}</span>
                    <span>às <span className="text-foreground">{r.horario}</span></span>
                    {r.telefone && <span>{r.telefone}</span>}
                    <span>{new Date(r.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={r.status === "aceito" ? "default" : "outline"}
                    onClick={() => updateStatus.mutate({ id: r.id, status: "aceito" })}
                    disabled={updateStatus.isPending}
                  >
                    ✓ Aceitar
                  </Button>
                  <Button
                    size="sm"
                    variant={r.status === "pendente" ? "default" : "outline"}
                    onClick={() => updateStatus.mutate({ id: r.id, status: "pendente" })}
                    disabled={updateStatus.isPending}
                  >
                    ⏳ Pendente
                  </Button>
                  <Button
                    size="sm"
                    variant={r.status === "recusado" ? "destructive" : "outline"}
                    onClick={() => updateStatus.mutate({ id: r.id, status: "recusado" })}
                    disabled={updateStatus.isPending}
                  >
                    ✕ Recusar
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm(`Remover ${r.nome}?`)) remover.mutate(r.id);
                    }}
                    disabled={remover.isPending}
                  >
                    🗑
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "primary" | "success" | "destructive";
}) {
  const toneClass =
    tone === "success"
      ? "text-success"
      : tone === "destructive"
        ? "text-destructive"
        : "text-primary";
  return (
    <div className="rounded-2xl border border-border bg-card/90 p-5 backdrop-blur">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-4xl ${toneClass}`}>{value}</p>
    </div>
  );
}
