import Link from "next/link";
import { ArrowUpRight, CalendarDays, Radio } from "lucide-react";
import { contests } from "@/data/contests";
import { getUpcomingExams } from "@/lib/contest-catalog";
import { formatarData } from "@/lib/format";
export function PortalOverview() {
  return <aside className="portal-overview" aria-label="Agenda nacional de provas"><div className="portal-overview-label"><Radio aria-hidden="true" /> NO SEU RADAR<span>FONTES OFICIAIS</span></div><h2>Seu próximo passo,<br /><span>com informação.</span></h2><p>Da abertura do edital às próximas convocações.</p><ol>{getUpcomingExams(contests).slice(0, 3).map(contest => <li key={contest.slug}><CalendarDays aria-hidden="true" /><div><strong>{contest.sigla}</strong><span>Prova prevista · {formatarData(contest.dataProva!)}</span></div><Link className="ds-focusable" href={contest.href} aria-label={"Acompanhar " + contest.sigla}><ArrowUpRight aria-hidden="true" /></Link></li>)}</ol><Link className="portal-overview-footer ds-focusable" href="/radar">Explorar o Radar de concursos <ArrowUpRight aria-hidden="true" /></Link></aside>;
}
