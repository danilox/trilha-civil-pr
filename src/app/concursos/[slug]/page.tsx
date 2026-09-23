import { notFound } from "next/navigation";
import { ContestDetail } from "@/components/platform/contest-detail";
import { contests, getContest } from "@/data/contests";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 3600;
export function generateStaticParams() {
  return contests.filter(contest => !["pc-pr-2026", "pm-sp", "pc-rs"].includes(contest.slug)).map(contest => ({ slug: contest.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const contest = getContest((await params).slug);
  if (!contest) notFound();
  return createPageMetadata({ title: contest.titulo, description: contest.descricao, path: contest.href });
}
export default async function ContestPage({ params }: { params: Promise<{ slug: string }> }) {
  const contest = getContest((await params).slug);
  if (!contest) notFound();
  return <ContestDetail contest={contest} />;
}
