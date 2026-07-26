import type { Metadata } from "next";
import { InfoCard, InternalPage } from "@/components/internal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Política de Privacidade",
  description: "Entenda como o Trilha Civil PR utiliza dados apenas no navegador, sem cadastro, envio de documentos ou armazenamento de notas em servidor.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <InternalPage
      path="/privacidade"
      title="Política de privacidade"
      description="Como o MVP trata dados no navegador e quais limites existem nesta versão."
      audited
      className="internal-page-lot4 internal-page-prose"
    >
      <InfoCard>
        <h2>Sem cadastro e sem envio de documentos</h2>
        <p>O MVP não possui cadastro de usuário, login, upload de arquivos ou recebimento de documentos.</p>
        <h3>Projeção local</h3>
        <p>O painel do candidato funciona localmente no navegador. As informações digitadas não são enviadas para servidor e não são compartilhadas com terceiros.</p>
        <h3>Sem armazenamento de notas em servidor</h3>
        <p>Notas, acertos e títulos usados na simulação permanecem no dispositivo do usuário por meio de armazenamento local do navegador.</p>
        <h3>Sem cookies ou analytics declarados</h3>
        <p>Esta versão não declara uso de cookies, analytics ou ferramentas externas de rastreamento.</p>
        <h3>Versões futuras</h3>
        <p>Se versões futuras adicionarem coleta, autenticação, banco de dados ou integrações, esta política deverá ser atualizada antes da publicação dessas mudanças.</p>
      </InfoCard>
    </InternalPage>
  );
}
