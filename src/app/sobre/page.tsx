import type { Metadata } from "next";
import { InfoCard, InternalPage } from "@/components/internal-page";
import { VERSAO_PORTAL } from "@/data/edital";

export const metadata: Metadata = {
  title: "Sobre | Trilha Civil PR",
  description: "Contexto acadêmico, limites institucionais e escopo do MVP independente Trilha Civil PR.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <InternalPage title="Sobre" description="Contexto acadêmico, limites institucionais e escopo do MVP Trilha Civil PR.">
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
