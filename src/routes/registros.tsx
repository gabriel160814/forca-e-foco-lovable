import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import bgRegistros from "@/assets/bg-registros.jpg";
import { useStaffPassword } from "@/hooks/use-staff-password";
import { StaffUnlockPanel } from "@/components/StaffUnlockPanel";
import {
  staffListCheckins,
  staffUpdateStatus,
  staffDeleteCheckin,
  staffVerifyPassword,
  publicListCheckins,
} from "@/lib/staff-checkins.functions";

export const Route = createFileRoute("/registros")({
  head: () => ({
    meta: [
      { title: "Registros de Alunos — Força & Foco" },
      { name: "description", content: "Gerencie as inscrições dos alunos: aceitar, recusar ou deixar pendente." },
    ],
  }),
  component: RegistrosPage,
});

type Status = "pendente" | "aceito" | "recusado";

type Checkin = {
  id: string;
  nome: string;
  contato: string | null;
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

function RegistrosPage() {
  const { password, ready, login, logout } = useStaffPassword();
  const qc = useQueryClient();
  const [filtro, setFiltro] = useState<"todos" | Status>("todos");
  const listFn = useServerFn(staffListCheckins);
  const publicListFn = useServerFn(publicListCheckins);
  const verifyFn = useServerFn(staffVerifyPassword);
  const updateFn = useServerFn(staffUpdateStatus);
  const deleteFn = useServerFn(staffDeleteCheckin);

  const unlocked = !!password;

  const { data: registros = [], isLoading } = useQuery({
    queryKey: ["registros", unlocked],
    enabled: ready,
    queryFn: async () => {
      const rows = unlocked
        ? ((await listFn({ data: { password: password! } })) as Checkin[])
        : ((await publicListFn()) as Checkin[]);
      return rows;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      await updateFn({ data: { password: password!, id, status } });
    },
    onSuccess: () => {
      toast.success("Status atualizado");
      qc.invalidateQueries({ queryKey: ["registros"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remover = useMutation({
    mutationFn: async (id: string) => {
      await deleteFn({ data: { password: password!, id } });
    },
    onSuccess: () => {
      toast.success("Registro removido");
      qc.invalidateQueries({ queryKey: ["registros"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!ready) return null;

  const filtrados = filtro === "todos" ? registros : registros.filter((r) => r.status === filtro);

  const contadores = {
    pendente: registros.filter((r) => r.status === "pendente").length,
    aceito: registros.filter((r) => r.status === "aceito").length,
    recusado: registros.filter((r) => r.status === "recusado").length,
  };

  async function handleUnlock(pw: string) {
    await verifyFn({ data: { password: pw } });
    login(pw);
    qc.invalidateQueries({ queryKey: ["registros"] });
  }

  function handleLock() {
    logout();
    qc.invalidateQueries({ queryKey: ["registros"] });
  }

  return (
    <div className="relative min-h-screen">
      <img
        src={bgRegistros}
        alt=""
        aria-hidden
        className="fixed inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="fixed inset-0 -z-10 bg-background/90 backdrop-blur-sm" />
      <Toaster richColors position="top-center" />

      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl lg:max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="font-display text-2xl text-foreground">
            Força &amp; <span className="text-primary">Foco</span>
          </a>
          <div className="flex items-center gap-4 text-sm">
            <a href="/checkin" className="text-muted-foreground hover:text-foreground">Check-in</a>
            <a href="/inicio" className="text-muted-foreground hover:text-foreground">Início</a>
            <a href="#area-restrita" className="text-muted-foreground hover:text-foreground">
              {unlocked ? "Bloquear" : "Área restrita"}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl lg:max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl text-foreground sm:text-5xl">Registros dos Alunos</h1>
          <p className="mt-2 text-muted-foreground">
            {unlocked
              ? "Aceite, recuse ou deixe pendente as inscrições."
              : "Visualização protegida. Para alterar status ou ver contatos, desbloqueie a Área Restrita no final da página."}
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
          {isLoading && (
            <p className="text-center text-muted-foreground">Carregando...</p>
          )}
          {!isLoading && filtrados.length === 0 && (
            <p className="rounded-xl border border-dashed border-border bg-card/60 p-8 text-center text-muted-foreground">
              Nenhum registro encontrado.
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
                    <h3
                      className={`text-xl font-semibold text-foreground transition ${
                        unlocked ? "" : "blur-sm select-none"
                      }`}
                    >
                      {r.nome}
                    </h3>
                    <span
                      className={`rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wide ${badgeClasses(r.status)}`}
                    >
                      {r.status}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span>{r.modalidade}</span>
                    <span>às <span className="text-foreground">{r.horario}</span></span>
                    {unlocked && r.contato && <span className="text-foreground">{r.contato}</span>}
                    {!unlocked && (
                      <span className="text-foreground blur-sm select-none">••••••••••</span>
                    )}
                    <span>{new Date(r.created_at).toLocaleString("pt-BR")}</span>
                  </div>
                </div>

                {unlocked && (
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
                )}
              </div>
            </div>
          ))}
        </div>

        <StaffUnlockPanel unlocked={unlocked} onUnlock={handleUnlock} onLock={handleLock} />
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
