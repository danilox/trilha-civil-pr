import type { Metadata } from "next";
import { InternalPage } from "@/components/internal-page";

export const metadata: Metadata = {
  title: "Privacidade | Trilha Civil PR",
  description: "Política de privacidade do MVP Trilha Civil PR, sem cadastro, envio de documentos ou armazenamento em servidor.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <InternalPage title="Política de privacidade" description="Como o MVP trata dados no navegador e quais limites existem nesta versão.">
      <section className="internal-card internal-card-wide">
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
      </section>
    </InternalPage>
  );
}
