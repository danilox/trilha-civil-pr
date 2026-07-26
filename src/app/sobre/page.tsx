import type { Metadata } from "next";
import { InfoCard, InternalPage } from "@/components/internal-page";
import { VERSAO_PORTAL } from "@/data/edital";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre o Projeto",
  description: "Conheça o objetivo, o escopo acadêmico e os limites institucionais do projeto independente e não oficial Trilha Civil PR.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <InternalPage
      path="/sobre"
      title="Sobre"
      description="Contexto acadêmico, limites institucionais e escopo do MVP Trilha Civil PR."
      audited
      className="internal-page-lot4 internal-page-prose"
    >
      <InfoCard>
        <h2>Projeto independente e não oficial</h2>
        <p>O Trilha Civil PR organiza informações de acompanhamento do concurso da Polícia Civil do Paraná, sem vínculo institucional, sem brasão, sem logotipo oficial e sem coleta de dados pessoais.</p>
        <p>A versão {VERSAO_PORTAL} incorpora dados oficiais extraídos do edital local conferido, mantendo estimativas e demonstrações separadas e identificadas.</p>
        <p>O MVP não possui autenticação, banco de dados remoto, pagamentos, envio de arquivos ou painel administrativo. O painel do candidato usa apenas estado local do navegador.</p>
        <h3>Uso acadêmico</h3>
        <p>A documentação em docs/ descreve problema, requisitos, arquitetura, testes, fontes e roadmap para apresentação acadêmica.</p>
      </InfoCard>
    </InternalPage>
  );
}
