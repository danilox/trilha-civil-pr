import { ContestDetail } from "@/components/platform/contest-detail";
import { getContest } from "@/data/contests";
import { createPageMetadata } from "@/lib/seo";
const contest = getContest("pm-sp")!;
export const revalidate = 3600;
export const metadata = createPageMetadata({ title: contest.titulo, description: contest.descricao, path: contest.href });
export default function Page() { return <ContestDetail contest={contest} />; }
