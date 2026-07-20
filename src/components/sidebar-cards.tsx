import { ClipboardList, MapPin, Newspaper, TrendingUp } from "lucide-react";
import { Badge, Card, MetricCard, StatusBadge } from "@/components/ui";
import { atualizacoes, locaisExame } from "@/data/portal";

export function SidebarCards() {
  const atualizacao = atualizacoes[0];

  return (
    <div className="sidebar-stack">
      <Card as="article" className="side-card" interactive>
        <div className="flex items-center justify-between gap-3">
          <h3>Possível faixa de classificação</h3>
          <TrendingUp aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        </div>
        <StatusBadge status="warning">estimativa</StatusBadge>
        <strong>Faixa provável</strong>
        <p>Leitura demonstrativa com base em acertos e concorrência estimada.</p>
      </Card>

      <Card as="article" className="side-card" interactive>
        <div className="flex items-center justify-between gap-3">
          <h3>Checklist de documentos</h3>
          <ClipboardList aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <MetricCard label="Itens" value="18" description="documentos" />
          <MetricCard label="Pendentes" value="7" description="a conferir" />
        </div>
      </Card>

      <Card as="article" className="side-card" interactive>
        <div className="flex items-center justify-between gap-3">
          <h3>Últimas atualizações</h3>
          <Newspaper aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        </div>
        <Badge variant="accent">portal</Badge>
        <strong>{atualizacao.data}</strong>
        <p>{atualizacao.descricao}</p>
      </Card>

      <Card as="article" id="locais" className="side-card" interactive>
        <div className="flex items-center justify-between gap-3">
          <h3>Locais para exames</h3>
          <MapPin aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        </div>
        <ul className="mt-3 space-y-1 text-xs text-zinc-400">
          {locaisExame.map((local) => <li key={local.nome}><Badge variant="neutral">{local.nome}</Badge></li>)}
        </ul>
        <a href="#locais" className="inline-link ds-focusable">
          Ver mais opções
        </a>
      </Card>
    </div>
  );
}
