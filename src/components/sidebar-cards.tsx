import { ClipboardList, MapPin, Newspaper, TrendingUp } from "lucide-react";
import { atualizacoes, locaisExame } from "@/data/portal";

export function SidebarCards() {
  const atualizacao = atualizacoes[0];

  return (
    <div className="sidebar-stack">
      <article className="side-card">
        <div className="flex items-center justify-between gap-3">
          <h3>Possível faixa de classificação</h3>
          <TrendingUp aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        </div>
        <strong>Faixa provável</strong>
        <p>Leitura demonstrativa com base em acertos e concorrência estimada.</p>
      </article>

      <article className="side-card">
        <div className="flex items-center justify-between gap-3">
          <h3>Checklist de documentos</h3>
          <ClipboardList aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span><b>18</b> itens</span>
          <span><b>7</b> pendentes</span>
        </div>
      </article>

      <article className="side-card">
        <div className="flex items-center justify-between gap-3">
          <h3>Últimas atualizações</h3>
          <Newspaper aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        </div>
        <strong>{atualizacao.data}</strong>
        <p>{atualizacao.descricao}</p>
      </article>

      <article id="locais" className="side-card">
        <div className="flex items-center justify-between gap-3">
          <h3>Locais para exames</h3>
          <MapPin aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        </div>
        <ul className="mt-3 space-y-1 text-xs text-zinc-400">
          {locaisExame.map((local) => <li key={local.nome}>{local.nome}</li>)}
        </ul>
        <a href="#locais" className="mt-3 inline-flex text-[11px] font-bold uppercase tracking-[0.14em] text-white underline underline-offset-4">
          Ver mais opções
        </a>
      </article>
    </div>
  );
}
