import type { Metadata } from "next";
import { ContestUnderConstruction } from "@/components/platform/contest-under-construction";
import { getContest } from "@/data/contests";
import { createPageMetadata } from "@/lib/seo";

const contest = getContest("pc-rs");

export const metadata: Metadata = createPageMetadata({
  title: "PC-RS — Guia em construção",
  description: "Página informativa sobre a preparação futura do guia PC-RS, sem dados oficiais cadastrados nesta etapa.",
  path: "/concursos/pc-rs",
});

export default function PcRsPage() {
  if (!contest) return null;
  return <ContestUnderConstruction contest={contest} />;
}
