import type { Metadata } from "next";
import { InfoCard, InternalPage } from "@/components/internal-page";
import { VERSAO_PORTAL } from "@/data/edital";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre o Projeto",
  description: "Conheça o objetivo, o funcionamento e os limites institucionais do Edital no Controle.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <InternalPage
      path="/sobre"
      title="Sobre"
      description="Portal de concursos de Segurança Pública: fontes, ferramentas e limites institucionais."
      audited
      className="internal-page-lot4 internal-page-prose"
    >
      <InfoCard>
        <h2>Projeto independente e não oficial</h2>
        <p>O Edital no Controle organiza concursos de Segurança Pública em todo o Brasil. É um projeto independente, sem vínculo com órgãos públicos ou bancas. Não utiliza brasões ou logotipos oficiais como identidade própria.</p>
        <p>A versão {VERSAO_PORTAL} incorpora dados oficiais extraídos do edital local conferido, mantendo estimativas e demonstrações separadas e identificadas.</p>
        <p>O portal não exige cadastro de usuário. O Radar de Concorrência envia nome e inscrição ao servidor para validação contra a base oficial importada. Utiliza Supabase, identificadores criptográficos persistentes e tokens temporários. Publicamente são exibidas somente estatísticas agregadas. O painel de simulação do candidato permanece local no navegador.</p>
        <h3>Fontes e transparência</h3>
        <p>Cada concurso apresenta suas fontes oficiais e a data de conferência. Dados não confirmados são sinalizados. O portal não substitui o edital, a banca ou a consulta individual do candidato.</p>
      </InfoCard>
    </InternalPage>
  );
}
