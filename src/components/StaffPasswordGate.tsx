import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  onSubmit: (password: string) => Promise<void>;
};

export function StaffPasswordGate({ onSubmit }: Props) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit(value);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao validar senha");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form
        onSubmit={handle}
        className="w-full max-w-sm rounded-2xl border border-border bg-card/90 p-8 backdrop-blur"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <h1 className="font-display text-3xl text-foreground">Área Restrita</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Digite a senha de staff para acessar os check-ins.
        </p>
        <div className="mt-6 space-y-2">
          <Label htmlFor="staff-password">Senha</Label>
          <Input
            id="staff-password"
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            required
          />
        </div>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <Button type="submit" className="mt-6 w-full" disabled={loading || !value}>
          {loading ? "Validando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
