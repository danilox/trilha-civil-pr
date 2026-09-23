import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { contestUpdates } from "@/data/contest-updates";
import { formatarData } from "@/lib/format";

export function UpdatesFeed({ slug, limit, headingLevel = 3 }: { slug?: string; limit?: number; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const updates = contestUpdates.filter(item => !slug || item.slug === slug).slice(0, limit);
  return <ol className="national-updates" aria-label="Movimentações oficiais, da mais recente para a mais antiga">{updates.map(item =>
    <li key={`${item.slug}-${item.date}-${item.title}`}><FileText aria-hidden="true" /><article>
      <div className="update-meta"><time dateTime={item.date}>{formatarData(item.date)}</time><Link className="ds-focusable" href={item.href}>{item.contestName}</Link></div>
      <Heading>{item.title}</Heading><p>{item.summary}</p>
      <a className="source-external-link ds-focusable" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Fonte oficial <ExternalLink aria-hidden="true" /><span className="sr-only">(abre em nova aba)</span></a>
    </article></li>)}
  </ol>;
}
