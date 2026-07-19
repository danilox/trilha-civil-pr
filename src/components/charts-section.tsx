"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionHeading } from "@/components/section-heading";
import { disciplinasAgente, regioesOficiais } from "@/data/edital";
import { formatarNumero } from "@/lib/format";

const tooltipStyle = { background: "#050505", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 0, color: "#fff" };
const dadosRegioes = regioesOficiais.map((regiao) => ({ nome: regiao.titulo.replace(" e Região Metropolitana", "/RMC"), percentual: regiao.percentualDistribuicao }));
const dadosDisciplinas = disciplinasAgente.map((disciplina) => ({ nome: disciplina.titulo, questoes: disciplina.questoes }));

export function ChartsSection() {
  return (
    <section id="concorrencia" className="border-y border-white/10 bg-zinc-950/70">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Dados oficiais" title="Distribuição regional e prova objetiva" description="Os gráficos mostram percentuais e questões extraídos do edital. Estimativas de classificação permanecem separadas no painel local." />
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="chart-card"><div className="flex items-start justify-between gap-4"><div><h3 className="text-xl font-semibold text-white">Macrorregiões</h3><p className="mt-2 text-sm text-zinc-500">Distribuição em cadastro de reserva</p></div><span className="badge">oficial</span></div><div className="mt-8 h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={dadosRegioes}><CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} /><XAxis dataKey="nome" tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, "Distribuição"]} /><Legend wrapperStyle={{ color: "#d4d4d8", fontSize: 12 }} /><Bar dataKey="percentual" name="Percentual" fill="#f4f4f5" /></BarChart></ResponsiveContainer></div><p className="mt-4 text-xs leading-5 text-zinc-500">Texto alternativo: Interior do Estado possui 80% e Curitiba/RMC 20% da distribuição regional para Agente.</p></article>
          <article className="chart-card"><div className="flex items-start justify-between gap-4"><div><h3 className="text-xl font-semibold text-white">Disciplinas</h3><p className="mt-2 text-sm text-zinc-500">Questões da prova objetiva de Agente</p></div><span className="badge">oficial</span></div><div className="mt-8 h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={dadosDisciplinas}><CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} /><XAxis dataKey="nome" tick={{ fill: "#a1a1aa", fontSize: 10 }} axisLine={false} tickLine={false} interval={0} height={78} angle={-28} textAnchor="end" /><YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [formatarNumero(Number(value)), "Questões"]} /><Legend wrapperStyle={{ color: "#d4d4d8", fontSize: 12 }} /><Bar dataKey="questoes" name="Questões" fill="#d4d4d8" /></BarChart></ResponsiveContainer></div><p className="mt-4 text-xs leading-5 text-zinc-500">Texto alternativo: a soma oficial das disciplinas é de 100 questões, com maior peso em Português e Tecnologia.</p></article>
        </div>
      </div>
    </section>
  );
}