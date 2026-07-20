import { type ReactNode } from "react";

export function Section({
  id,
  number,
  title,
  subtitle,
  children,
}: {
  id?: string;
  number: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl lg:max-w-7xl scroll-mt-24 px-6 py-16 lg:py-28">
      <div className="mb-10 flex items-end gap-4 border-b border-border pb-6">
        <span className="font-display text-5xl leading-none text-primary">{number}</span>
        <div>
          <h2 className="text-3xl text-foreground sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export function InfoCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="rounded-xl border border-border bg-card p-6"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="mb-3 text-xl text-foreground">{title}</h3>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 py-1.5">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      <span className="text-foreground/90">{children}</span>
    </li>
  );
}

export function CheckItem({ label, value }: { label: string; value?: string }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/40 px-4 py-3">
      <span className="text-foreground/90">{label}</span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-success">
        ✔ {value ?? "OK"}
      </span>
    </li>
  );
}
