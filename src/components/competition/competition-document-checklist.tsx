"use client";

import { etapas } from "@/data/portal";

export function CompetitionDocumentChecklist() {
  const items = etapas.find((etapa) => etapa.id === "investigacao-social") ?? etapas.find((etapa) => /investiga/i.test(etapa.titulo));
  return <details className="radar-tool"><summary>Checklist de documentos</summary><p>Organize sua preparação e confira as exigências no edital e na convocação de cada etapa.</p><ul>{items?.checklist.map((item) => <li key={item}><label><input type="checkbox" />{item}</label></li>)}</ul></details>;
}
