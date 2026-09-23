import { Camera, Video, Link2 } from "lucide-react";
import { platformConfig } from "@/config/site-config";
const networks = [{ key: "instagram", label: "Instagram", icon: Camera }, { key: "youtube", label: "YouTube", icon: Video }, { key: "linkedin", label: "LinkedIn", icon: Link2 }] as const;

export function SocialLinks() {
  const configured = networks.filter(network => platformConfig.social[network.key]);
  if (!configured.length) return null;
  return <nav className="platform-social-links" aria-label="Redes sociais">{configured.map(({ key, label, icon: Icon }) => <a className="ds-focusable" key={key} href={platformConfig.social[key]} target="_blank" rel="noopener noreferrer" aria-label={`${label} do Edital no Controle (abre em nova aba)`}><Icon aria-hidden="true" className="h-5 w-5" /><span>{label}</span></a>)}</nav>;
}
