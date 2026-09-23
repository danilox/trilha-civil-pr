import { platformConfig } from "@/config/site-config";
import type { AtualizacaoPortal } from "@/types/content";

export const pcprRecentUpdates: AtualizacaoPortal[] = [
  { data: "2026-09-22", titulo: "Comunicado sobre revogação de convocação sub judice", descricao: "A FGV publicou comunicado sobre anulação dos efeitos de convocação sub judice para Delegado. Consulte o documento original para os efeitos individuais.", urlFonte: "https://conhecimento.fgv.br/sites/default/files/concursos/comunicado-pcpr-exclusao__0.pdf" },
  { data: "2026-09-15", titulo: "Comunicado de inclusão sub judice", descricao: "Publicado comunicado sobre inclusão sub judice. O histórico é preservado e deve ser lido junto às publicações posteriores.", urlFonte: "https://conhecimento.fgv.br/concursos/pcpr26" },
  { data: "2026-09-14", titulo: "Homologação definitiva das inscrições", descricao: "Publicados os resultados definitivos das inscrições, condições especiais e respostas aos recursos na página oficial da FGV.", urlFonte: "https://conhecimento.fgv.br/concursos/pcpr26" },
].map(item => ({ ...item, id: "pcpr-" + item.data, responsavelConferencia: "Edital no Controle", versaoPortal: platformConfig.version, tipo: "oficial", fonte: "FGV — PCPR 2026", dataAtualizacao: "2026-09-22", observacao: "Consulte a FGV. Nenhum nome ou número de inscrição é reproduzido aqui.", ativo: true }));
