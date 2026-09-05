import Link from "next/link";
import { ArrowRight, ChartNoAxesColumnIncreasing, ClipboardCheck, LockKeyhole, Newspaper, Stethoscope, TrendingUp } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { guidePath } from "@/config/site-config";
import { atualizacoes } from "@/data/portal";

export function SidebarCards() {
  const atualizacao = atualizacoes[0];

  return (
    <div className="sidebar-stack">
      <Card as="article" className="side-card classification-card" interactive>
        <div className="flex items-center justify-between gap-3">
          <Badge variant="accent">Sua possível classificação</Badge>
          <TrendingUp aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        </div>
        <p>
          Simule sua classificação estimada com base nos seus acertos, modalidade, região e na concorrência atual do concurso.
        </p>
        <Link href={guidePath("/nota-de-corte")} className="classification-action ds-focusable">
          <ChartNoAxesColumnIncreasing aria-hidden="true" />
          Simular classificação
          <ArrowRight aria-hidden="true" />
        </Link>
        <p className="side-card-footnote">
          <LockKeyhole aria-hidden="true" />
          Simulação local. Seus dados não são armazenados.
        </p>
      </Card>

      <Card as="article" className="side-card" interactive>
        <div className="flex items-center justify-between gap-3">
          <h3>Últimas atualizações</h3>
          <Newspaper aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        </div>
        <Badge variant="accent">FGV</Badge>
        <strong>{atualizacao.data}</strong>
        <p>{atualizacao.descricao}</p>
        <Link href={guidePath("/atualizacoes")} className="inline-link ds-focusable">
          Ver atualizações
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </Card>

      <Card as="article" className="side-card" interactive>
        <div className="flex items-center justify-between gap-3">
          <h3>Preparação para as próximas fases</h3>
          <ClipboardCheck aria-hidden="true" className="h-4 w-4 text-zinc-500" />
        </div>
        <Badge variant="neutral">Etapas futuras</Badge>
        <p>Organize documentos, títulos e treino físico, mas aguarde convocação oficial antes de realizar exames.</p>
        <ul className="mt-3 grid gap-2 text-xs text-zinc-300">
          <li><Badge variant="neutral">TAF: prepare-se com antecedência</Badge></li>
          <li><Badge variant="neutral">Exames: aguardando convocação</Badge></li>
          <li><Badge variant="neutral">Títulos: conferir edital retificado</Badge></li>
        </ul>
        <Stethoscope aria-hidden="true" className="mt-2 h-4 w-4 text-zinc-500" />
      </Card>
    </div>
  );
}
