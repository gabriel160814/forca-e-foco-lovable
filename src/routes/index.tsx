import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Section, InfoCard, ListItem, CheckItem } from "@/components/PlanSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plano de Implantação — Check-in Força & Foco v1.0.0" },
      {
        name: "description",
        content:
          "Documento do plano de implantação do Sistema de Check-in Força & Foco: escopo, cronograma, checklist, migração, treinamento, homologação e termo de aceite.",
      },
      { property: "og:title", content: "Plano de Implantação — Check-in Força & Foco" },
      {
        property: "og:description",
        content:
          "Sistema web de check-in antecipado para controle de vagas nas aulas da academia.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const nav = [
  ["projeto", "Projeto"],
  ["checklist", "Checklist"],
  ["migracao", "Migração"],
  ["treinamento", "Treinamento"],
  ["homologacao", "Homologação"],
  ["operacao", "Operação"],
  ["aceite", "Aceite"],
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <nav className="sticky top-0 z-20 border-y border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 py-3 text-sm">
          {nav.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="whitespace-nowrap rounded-md px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <Section id="projeto" number="01" title="Identificação do Projeto" subtitle="Objetivo e escopo da implantação">
          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard title="Objetivo da Implantação">
              Implantar um sistema web de check-in antecipado para controle de
              vagas nas aulas da academia, evitando superlotação e melhorando a
              organização das turmas.
            </InfoCard>
            <InfoCard title="Ambiente de Produção">
              <ul>
                <ListItem>Hospedagem: Vercel / Render</ListItem>
                <ListItem>Banco de dados: PostgreSQL (nuvem)</ListItem>
                <ListItem>Domínio: www.forcaefoco.com.br</ListItem>
                <ListItem>Acesso via navegador</ListItem>
              </ul>
            </InfoCard>
            <InfoCard title="Escopo da Entrega">
              <ul>
                <ListItem>Sistema de login</ListItem>
                <ListItem>Formulário de check-in (nome + horário)</ListItem>
                <ListItem>Armazenamento em banco de dados</ListItem>
                <ListItem>Interface web responsiva</ListItem>
              </ul>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Não incluído
              </p>
              <ul>
                <ListItem>Aplicativo mobile</ListItem>
                <ListItem>Integração com sistemas de pagamento</ListItem>
              </ul>
            </InfoCard>
            <InfoCard title="Pré-requisitos Técnicos">
              <ul>
                <ListItem>Banco configurado</ListItem>
                <ListItem>Scripts SQL prontos</ListItem>
                <ListItem>Testes realizados</ListItem>
                <ListItem>Variáveis de ambiente configuradas</ListItem>
              </ul>
            </InfoCard>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <InfoCard title="Estratégia de Implantação">
              Implantação direta <strong className="text-foreground">(Big Bang)</strong>,
              pois não existe sistema anterior.
            </InfoCard>
            <InfoCard title="Critérios de Sucesso">
              <ul>
                <ListItem>Sistema acessível online</ListItem>
                <ListItem>Check-in funcionando corretamente</ListItem>
                <ListItem>Dados salvos no banco sem erro</ListItem>
              </ul>
            </InfoCard>
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-xl text-foreground">Cronograma</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["20h", "Início"],
                ["20h30", "Deploy"],
                ["21h", "Testes"],
                ["22h", "Finalização"],
              ].map(([time, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-card p-5 text-center"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="font-display text-4xl text-primary">{time}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="checklist" number="02" title="Checklist" subtitle="Itens validados antes do deploy">
          <ul className="grid gap-3 sm:grid-cols-2">
            {["Banco de dados", "Dados iniciais", "Backup", "Variáveis de ambiente", "Deploy", "Teste de acesso"].map(
              (item) => (
                <CheckItem key={item} label={item} />
              ),
            )}
          </ul>
        </Section>

        <Section id="migracao" number="03" title="Migração de Dados" subtitle="Das planilhas ao banco PostgreSQL">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard title="Origem">Planilhas simples</InfoCard>
            <InfoCard title="Destino">Banco PostgreSQL</InfoCard>
            <InfoCard title="Tratamento">Padronização de nomes</InfoCard>
            <InfoCard title="Validação">Conferência manual dos registros</InfoCard>
          </div>
        </Section>

        <Section id="treinamento" number="04" title="Treinamento" subtitle="Capacitação da equipe de recepção">
          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard title="Público-alvo & Objetivos">
              <p className="mb-3 text-foreground/90">Recepcionistas</p>
              <ul>
                <ListItem>Realizar check-in</ListItem>
                <ListItem>Consultar alunos</ListItem>
                <ListItem>Controlar vagas</ListItem>
              </ul>
            </InfoCard>
            <InfoCard title="Conteúdo & Metodologia">
              <ul>
                <ListItem>Login</ListItem>
                <ListItem>Check-in</ListItem>
                <ListItem>Consulta de dados</ListItem>
              </ul>
              <p className="mt-4 text-foreground/90">
                Metodologia: treinamento prático + manual do usuário.
              </p>
            </InfoCard>
          </div>
        </Section>

        <Section id="homologacao" number="05" title="Homologação" subtitle="Validação final do sistema">
          <ul className="grid gap-3 sm:grid-cols-2">
            <CheckItem label="Login funcionando" value="OK" />
            <CheckItem label="Cadastro funcionando" value="OK" />
            <CheckItem label="Banco funcionando" value="OK" />
            <CheckItem label="Interface funcionando" value="OK" />
          </ul>
          <div
            className="mt-6 rounded-xl border border-success/40 bg-success/10 p-6 text-center"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Sistema</p>
            <p className="font-display text-4xl text-success">Apto para Implantação</p>
          </div>
        </Section>

        <Section id="operacao" number="06" title="Rollback & Operação Assistida" subtitle="Contingência e suporte pós-go-live">
          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard title="Rollback">
              <ul>
                <ListItem>Falha no sistema → voltar versão anterior</ListItem>
                <ListItem>Erro no banco → restaurar backup</ListItem>
              </ul>
            </InfoCard>
            <InfoCard title="Operação Assistida">
              Exemplo: usuários com dúvida → resolvido com manual do usuário.
            </InfoCard>
          </div>
        </Section>

        <Section id="aceite" number="07" title="Termo de Aceite" subtitle="Encerramento do projeto">
          <div
            className="rounded-2xl border border-primary/30 bg-card p-8 text-center"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Sistema entregue</p>
            <h3 className="mt-2 text-4xl text-foreground">Check-in Força &amp; Foco</h3>
            <p className="mt-1 text-muted-foreground">Versão v1.0.0</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-success/15 px-6 py-3 text-lg font-semibold text-success">
              ✔ Aceito Integralmente
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-2xl text-foreground">Força &amp; Foco</p>
        <p className="mt-2">Plano de Implantação · v1.0.0 · Gabriel Damazio · 28/05/2026</p>
      </footer>
    </div>
  );
}
