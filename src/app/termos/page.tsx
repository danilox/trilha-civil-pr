import type { Metadata } from "next";
import { InfoCard, InternalPage } from "@/components/internal-page";

export const metadata: Metadata = {
  title: "Termos e responsabilidade | Trilha Civil PR",
  description: "Termos de uso, limites de responsabilidade e caráter independente do portal Trilha Civil PR.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <InternalPage
      title="Termos e responsabilidade"
      description="Limites do uso das informações e prevalência do edital e canais oficiais."
      audited
      className="internal-page-lot4 internal-page-prose"
    >
      <InfoCard>
        <h2>Caráter independente</h2>
        <p>O Trilha Civil PR é independente e não oficial. Não possui vínculo com a Polícia Civil do Paraná, banca organizadora ou órgão público.</p>
        <h3>Prevalência do edital</h3>
        <p>Edital, retificações, convocações e canais oficiais prevalecem sobre qualquer conteúdo exibido neste portal.</p>
        <h3>Projeções demonstrativas</h3>
        <p>Projeções de nota, classificação ou concorrência são estimativas ou demonstrações e não garantem classificação, aprovação ou convocação.</p>
        <h3>Locais para exames</h3>
        <p>O portal não garante preço, atendimento, disponibilidade, qualidade ou aceitação de exames por clínicas, laboratórios ou centros de imagem.</p>
        <h3>Responsabilidade do candidato</h3>
        <p>O candidato deve confirmar informações, prazos, exigências, documentos e locais diretamente com as fontes oficiais e estabelecimentos envolvidos.</p>
        <h3>Sem orientação oficial</h3>
        <p>O conteúdo não constitui orientação médica, jurídica ou institucional oficial.</p>
        <h3>Atualizações</h3>
        <p>Informações podem ser alteradas sem aviso prévio quando houver atualização oficial, correção de conteúdo ou revisão metodológica.</p>
      </InfoCard>
    </InternalPage>
  );
}
