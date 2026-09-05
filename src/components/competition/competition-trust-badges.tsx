import { ChartNoAxesColumnIncreasing, LockKeyhole, UserCheck, ListChecks } from "lucide-react";
import { radarTrust } from "@/data/competition-presentation";

const icons = [ListChecks, UserCheck, LockKeyhole, ChartNoAxesColumnIncreasing];

export function CompetitionTrustBadges({ compact = false }: { compact?: boolean }) {
  return <ul className={compact ? "radar-trust radar-trust-compact" : "radar-trust radar-privacy"} aria-label="Confiança e privacidade">
    {radarTrust.map((text, index) => { const Icon = icons[index]; return <li key={text}><Icon aria-hidden="true" /><span>{text}</span></li>; })}
  </ul>;
}
