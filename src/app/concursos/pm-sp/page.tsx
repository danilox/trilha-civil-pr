import type { Metadata } from "next";
import { ContestUnderConstruction } from "@/components/platform/contest-under-construction";
import { getContest } from "@/data/contests";
import { createPageMetadata } from "@/lib/seo";

const contest = getContest("pm-sp");

export const metadata: Metadata = createPageMetadata({
  title: "PM-SP — Guia em construção",
  description: "Página informativa sobre a preparação futura do guia PM-SP, sem dados oficiais cadastrados nesta etapa.",
  path: "/concursos/pm-sp",
});

export default function PmSpPage() {
  if (!contest) return null;
  return <ContestUnderConstruction contest={contest} />;
}
