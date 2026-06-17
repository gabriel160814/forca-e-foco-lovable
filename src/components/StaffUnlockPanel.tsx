import { useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  unlocked: boolean;
  onUnlock: (password: string) => Promise<void> | void;
  onLock: () => void;
};

export function StaffUnlockPanel({ unlocked, onUnlock, onLock }: Props) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setError(null);
    setLoading(true);
    try {
      await onUnlock(password);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Senha incorreta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="area-restrita"
      className="mt-12 rounded-2xl border border-border bg-card/95 p-6 backdrop-blur"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-3">
        {unlocked ? (
          <Unlock className="h-5 w-5 text-success" />
        ) : (
          <Lock className="h-5 w-5 text-primary" />
        )}
        <h2 className="font-display text-2xl text-foreground">Área Restrita</h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {unlocked
          ? "Área desbloqueada. Você pode visualizar os contatos e alterar o status dos check-ins."
          : "Para visualizar contatos dos alunos e alterar status (aceitar, recusar ou remover), informe a senha da equipe."}
      </p>

      {unlocked ? (
        <div className="mt-4">
          <Button variant="outline" size="sm" onClick={onLock}>
            Bloquear novamente
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Input
            type="password"
            placeholder="Senha da equipe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="sm:max-w-xs"
          />
          <Button type="submit" disabled={loading || !password}>
            {loading ? "Verificando..." : "Desbloquear edição"}
          </Button>
          {error && <p className="text-sm text-destructive sm:self-center">{error}</p>}
        </form>
      )}
    </section>
  );
}
