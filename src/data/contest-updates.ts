import { contests } from "@/data/contests";

export const contestUpdates = contests.flatMap(contest => contest.events.map(event => ({
  ...event, slug: contest.slug, contestName: contest.sigla, href: contest.href,
}))).sort((a, b) => b.date.localeCompare(a.date) || a.contestName.localeCompare(b.contestName));
