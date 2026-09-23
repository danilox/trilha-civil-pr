import test from "node:test";
import assert from "node:assert/strict";
import { loadModule } from "./helpers.mjs";
const catalog = loadModule("src/lib/contest-catalog.ts");
const now = new Date("2026-09-22T12:00:00-03:00");
const contests = [
  { slug: "a", categoria: "Polícia Civil", estado: "Amapá", status: "inscricoes-abertas", inscricoesInicio: "2026-09-22", inscricoesFim: "2026-10-19", dataProva: "2026-12-06" },
  { slug: "b", categoria: "Polícia Militar", estado: "Alagoas", status: "inscricoes-abertas", inscricoesInicio: "2026-09-14", inscricoesFim: "2026-10-16", dataProva: "2027-01-17" },
  { slug: "c", categoria: "Polícia Militar", estado: "São Paulo", status: "pos-prova", dataProva: "2026-09-20" },
];
test("filtros combinam instituição, situação e estado; filtros sem resultados são vazios", () => {
  assert.equal(catalog.filterContests(contests, { situacao: "inscricoes-abertas" }, now).length, 2);
  assert.deepEqual(catalog.filterContests(contests, { categoria: "Polícia Militar", situacao: "inscricoes-abertas", estado: "Alagoas" }, now).map(x => x.slug), ["b"]);
  assert.equal(catalog.filterContests(contests, { categoria: "Bombeiros" }, now).length, 0);
});
test("inscrições encerradas não permanecem abertas; provas são ordenadas e passadas são excluídas", () => {
  assert.equal(catalog.getContestStatus(contests[0], new Date("2026-12-07T12:00:00-03:00")), "pos-prova");
  assert.equal(catalog.getContestStatus(contests[0], new Date("2026-10-20T12:00:00-03:00")), "prova-proxima");
  assert.equal(catalog.getContestStatus(contests[0], new Date("2026-09-21T12:00:00-03:00")), "em-andamento");
  assert.deepEqual(catalog.getUpcomingExams(contests, now).map(x => x.slug), ["a", "b"]);
});
test("datas completas e ISO são formatadas corretamente no Brasil", () => {
  const { formatarData } = loadModule("src/lib/format.ts");
  assert.equal(formatarData("2026-10-11T13:00:00-03:00"), "11/10/2026");
  assert.equal(formatarData("2026-10-11"), "11/10/2026");
});
