import { InternalPage, InfoCard } from "@/components/internal-page";
import { ContestStatusBadge } from "@/components/platform/contest-status-badge";
import { UpdatesFeed } from "@/components/platform/updates-feed";
import { pendingConfirmation, type Contest } from "@/data/contests";
import { getContestStatus } from "@/lib/contest-catalog";
import { formatarData } from "@/lib/format";

export function ContestDetail({ contest }: { contest: Contest }) {
  const facts = [
    ["Cargos", contest.cargos.join(" · ")], ["Banca", contest.banca], ["Escolaridade", contest.escolaridade],
    ["Vagas / cadastro de reserva", contest.vagas], ["Remuneração inicial", contest.salarioInicial],
    ["Inscrições", contest.inscricoesInicio && contest.inscricoesFim ? `${formatarData(contest.inscricoesInicio)} → ${formatarData(contest.inscricoesFim)}` : undefined],
    ["Prova", contest.dataProva ? formatarData(contest.dataProva) : undefined],
  ];
  return <InternalPage title={contest.titulo} description={contest.descricao} path={contest.href} className="national-detail" updatedAt={contest.ultimaAtualizacao} sources={contest.sources.map(source => source.url)}>
    <InfoCard><ContestStatusBadge status={getContestStatus(contest)} /><h2>Visão geral</h2><p>{contest.faseAtual}</p><p>Atualizado em <time dateTime={contest.ultimaAtualizacao}>{formatarData(contest.ultimaAtualizacao)}</time></p><p>Próximo evento: {contest.proximoEvento}</p>
      <dl className="contest-detail-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || pendingConfirmation}</dd></div>)}</dl>
      <a className="ds-button ds-button-primary ds-focusable" href={contest.fonteOficial} target="_blank" rel="noopener noreferrer">Consultar fonte oficial<span className="sr-only"> (abre em nova aba)</span></a>
    </InfoCard>
    <nav className="contest-module-nav" aria-label="Seções do concurso">{contest.modules.map(module => <a className="ds-focusable" key={module.id} href={`#${module.id}`}>{module.title}</a>)}<a className="ds-focusable" href="#atualizacoes">Atualizações</a><a className="ds-focusable" href="#fontes">Fontes oficiais</a></nav>
    <div className="contest-module-grid">{contest.modules.map(module => <InfoCard key={module.id} id={module.id}><h2>{module.title}</h2><p>{module.text}</p>{module.sourceUrl && <a className="source-external-link ds-focusable" href={module.sourceUrl} target="_blank" rel="noopener noreferrer">Consultar documentação<span className="sr-only"> (abre em nova aba)</span></a>}</InfoCard>)}</div>
    <section id="atualizacoes"><h2 className="national-section-title">Atualizações</h2><UpdatesFeed slug={contest.slug} /></section>
    <InfoCard id="fontes"><h2>Fontes oficiais</h2><ul className="contest-source-list">{contest.sources.map(source => <li key={source.url}><a className="source-external-link ds-focusable" href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<span className="sr-only"> (abre em nova aba)</span></a><p>{source.publishedAt ? `Publicação: ${formatarData(source.publishedAt)} · ` : ""}Consultada em {formatarData(source.consultedAt)}</p></li>)}</ul></InfoCard>
  </InternalPage>;
}
