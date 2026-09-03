import type { Metadata } from "next";
import { InfoCard, InternalPage } from "@/components/internal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Política de Privacidade",
  description: "Entenda como o Edital no Controle trata dados locais, validação de inscrição e estatísticas agregadas da concorrência colaborativa.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <InternalPage
      path="/privacidade"
      title="Política de privacidade"
      description="Como o portal trata dados no navegador, validações pontuais e estatísticas agregadas."
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
        <h3>Radar de concorrência colaborativa</h3>
        <p>Na funcionalidade de concorrência, nome completo e número de inscrição são utilizados somente para validar a inscrição informada contra a base carregada no servidor. Esses dados não são exibidos publicamente e não devem ser armazenados em texto aberto pelo portal.</p>
        <p>Para identificar a validação e evitar participação duplicada, o sistema gera um identificador criptográfico persistente a partir da inscrição e do nome normalizados. Esse mecanismo reduz a exposição de dados pessoais, mas não deve ser descrito como anonimização absoluta.</p>
        <p>A região de concorrência é fornecida colaborativamente pelo candidato. Informações como cargo, local de prova e flags Afro/PcD, quando disponíveis, vêm da base validada no servidor e não são autodeclarações livres nessa etapa.</p>
        <p>Os resultados públicos do Radar são sempre agregados. Eles não exibem nome completo, número integral de inscrição, e-mail, IP ou identificadores individuais. Os números colaborativos não representam concorrência oficial da FGV.</p>
        <h3>Independência institucional</h3>
        <p>O portal é independente e não oficial, sem vínculo com a Polícia Civil do Paraná, com a FGV ou com canais institucionais do concurso. Em caso de divergência, prevalecem edital, retificações, comunicados e canais oficiais.</p>
        <h3>Sem cookies ou analytics declarados</h3>
        <p>Esta versão não declara uso de cookies, analytics ou ferramentas externas de rastreamento.</p>
        <h3>Versões futuras</h3>
        <p>Se versões futuras adicionarem coleta, autenticação, banco de dados ou integrações, esta política deverá ser atualizada antes da publicação dessas mudanças.</p>
      </InfoCard>
    </InternalPage>
  );
}
