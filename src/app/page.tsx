import Link from "next/link";
import { ContestCard } from "@/components/platform/contest-card";
import { HowItWorks } from "@/components/platform/how-it-works";
import { PlatformFooter } from "@/components/platform/platform-footer";
import { PlatformHeader } from "@/components/platform/platform-header";
import { PlatformHero } from "@/components/platform/platform-hero";
import { UpdatesFeed } from "@/components/platform/updates-feed";
import { JsonLd } from "@/components/seo/json-ld";
import { platformConfig } from "@/config/site-config";
import { contests } from "@/data/contests";
import { getContestStatus, getUpcomingExams, sortContestsByPriority } from "@/lib/contest-catalog";
import { formatarData } from "@/lib/format";
import { createPageMetadata, createWebPageJsonLd } from "@/lib/seo";
export const revalidate = 3600;
export const metadata = createPageMetadata({ title: "Edital no Controle | Concursos de Segurança Pública", description: platformConfig.description, path: "/", absoluteTitle: true });
export default function PlatformHomePage() {
  const open = sortContestsByPriority(contests.filter(contest => getContestStatus(contest) === "inscricoes-abertas"));
  return <><JsonLd data={createWebPageJsonLd(platformConfig.name, platformConfig.description, "/")} /><PlatformHeader /><main className="platform-shell platform-home national-home"><PlatformHero />
    <p className="portal-independent">Projeto independente e não oficial. Consulte sempre o edital e os canais oficiais.</p>
    <section className="platform-section" aria-labelledby="open-title"><div className="platform-section-heading"><span>Oportunidades</span><h2 id="open-title">Inscrições abertas</h2><p>Prazos conferidos em fontes oficiais. Inscreva-se exclusivamente pelo canal da banca.</p></div>{open.length ? <div className="platform-contest-grid">{open.map(contest => <ContestCard key={contest.slug} contest={contest} />)}</div> : <p className="platform-empty">Nenhuma inscrição aberta confirmada no catálogo neste momento.</p>}</section>
    <section className="platform-section" aria-labelledby="exams-title"><div className="platform-section-heading"><span>Na agenda</span><h2 id="exams-title">Próximas provas</h2><p>Datas previstas em ordem cronológica; acompanhe eventuais retificações.</p></div><ol className="upcoming-exams">{getUpcomingExams(contests).map(contest => <li key={contest.slug}><time dateTime={contest.dataProva}>{formatarData(contest.dataProva!)}</time><div><h3>{contest.sigla}</h3><p>{contest.nome}</p></div><Link className="ds-button ds-button-secondary ds-focusable" href={contest.href}>Ver concurso<span className="sr-only"> {contest.sigla}</span> →</Link></li>)}</ol></section>
    <section className="platform-section" aria-labelledby="updates-title"><div className="platform-section-heading"><span>Acompanhamento</span><h2 id="updates-title">Últimas movimentações</h2><p>Publicações e marcos de todos os concursos acompanhados.</p></div><UpdatesFeed limit={5} /><Link className="ds-button ds-button-secondary ds-focusable" href="/atualizacoes">Ver todas as atualizações →</Link></section>
    <section className="platform-section" aria-labelledby="featured-title"><div className="platform-section-heading"><span>Guias completos</span><h2 id="featured-title">Concursos em destaque</h2><p>A PCPR segue como guia de referência, com ferramentas exclusivas para o candidato.</p></div><div className="platform-contest-grid">{contests.filter(contest => ["pc-pr-2026", "pm-sp", "pc-rs"].includes(contest.slug)).map(contest => <ContestCard key={contest.slug} contest={contest} />)}</div></section>
    <HowItWorks /></main><PlatformFooter /></>;
}
