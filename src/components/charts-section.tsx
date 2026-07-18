"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { projecoes, regioes } from "@/data/portal";
import { formatarDecimal, formatarNumero } from "@/lib/format";
import { SectionHeading } from "@/components/section-heading";

const tooltipStyle = {
  background: "#050505",
  border: "1px solid rgba(255,255,255,0.16)",
  borderRadius: 0,
  color: "#fff",
};

export function ChartsSection() {
  return (
    <section id="concorrencia" className="border-y border-white/10 bg-zinc-950/70">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Estimativas"
          title="Concorrência e possíveis notas de corte"
          description="Os gráficos abaixo são projeções transparentes, marcadas como estimativa. Eles não substituem notas oficiais nem publicações da banca."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="chart-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Distribuição regional</h3>
                <p className="mt-2 text-sm text-zinc-500">Vagas e inscritos estimados por região</p>
              </div>
              <span className="badge">estimativa</span>
            </div>
            <div className="mt-8 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regioes}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="nome" tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value, name) => [
                      typeof value === "number" ? formatarNumero(value) : value,
                      name,
                    ]}
                  />
                  <Legend wrapperStyle={{ color: "#d4d4d8", fontSize: 12 }} />
                  <Bar dataKey="vagas" name="Vagas" fill="#f4f4f5" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="inscritosEstimados" name="Inscritos estimados" fill="#71717a" radius={[0, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="chart-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Faixa competitiva</h3>
                <p className="mt-2 text-sm text-zinc-500">Leitura provisória por cargo</p>
              </div>
              <span className="badge">estimativa</span>
            </div>
            <div className="mt-8 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projecoes}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="cargo" tick={{ fill: "#a1a1aa", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} domain={[55, 90]} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value, name) => [
                      typeof value === "number" ? `${formatarDecimal(value)} pts` : value,
                      name,
                    ]}
                  />
                  <Legend wrapperStyle={{ color: "#d4d4d8", fontSize: 12 }} />
                  <Line type="monotone" dataKey="notaMinima" name="Mínima" stroke="#71717a" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="notaProvavel" name="Provável" stroke="#d4d4d8" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="notaCompetitiva" name="Competitiva" stroke="#ffffff" strokeWidth={3} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {regioes.slice(0, 3).map((regiao) => (
            <article key={regiao.nome} className="metric-card">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{regiao.nome}</p>
              <strong className="mt-3 block text-4xl font-semibold text-white">
                {formatarDecimal(regiao.concorrencia)}
              </strong>
              <span className="mt-1 block text-sm text-zinc-500">candidatos por vaga estimados</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
