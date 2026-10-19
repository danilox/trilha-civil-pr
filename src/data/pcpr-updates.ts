import { platformConfig } from "@/config/site-config";
import type { AtualizacaoPortal } from "@/types/content";

export const pcprRecentUpdates: AtualizacaoPortal[] = [
  { data: "2026-10-14", titulo: "Recursos contra o gabarito preliminar", descricao: "A FGV abriu a interposição de recursos contra o Gabarito Oficial Preliminar da Prova Objetiva. Consulte o prazo e o procedimento diretamente na página oficial.", urlFonte: "https://conhecimento.fgv.br/concursos/pcpr26" },
  { data: "2026-10-13", titulo: "Gabarito oficial preliminar e provas objetivas", descricao: "A FGV publicou o gabarito oficial preliminar e os cadernos das provas objetivas para Agente, Delegado e Papiloscopista.", urlFonte: "https://conhecimento.fgv.br/concursos/pcpr26" },
  { data: "2026-10-08", titulo: "Comunicado de inclusão sub judice", descricao: "A FGV publicou novo comunicado de inclusão sub judice antes da aplicação da prova objetiva.", urlFonte: "https://conhecimento.fgv.br/concursos/pcpr26" },
  { data: "2026-09-22", titulo: "Comunicado sobre revogação de convocação sub judice", descricao: "A FGV publicou comunicado sobre anulação dos efeitos de convocação sub judice para Delegado. Consulte o documento original para os efeitos individuais.", urlFonte: "https://conhecimento.fgv.br/sites/default/files/concursos/comunicado-pcpr-exclusao__0.pdf" },
  { data: "2026-09-15", titulo: "Comunicado de inclusão sub judice", descricao: "Publicado comunicado sobre inclusão sub judice. O histórico é preservado e deve ser lido junto às publicações posteriores.", urlFonte: "https://conhecimento.fgv.br/concursos/pcpr26" },
  { data: "2026-09-14", titulo: "Homologação definitiva das inscrições", descricao: "Publicados os resultados definitivos das inscrições, condições especiais e respostas aos recursos na página oficial da FGV.", urlFonte: "https://conhecimento.fgv.br/concursos/pcpr26" },
].map(item => ({ ...item, id: "pcpr-" + item.data, responsavelConferencia: "Edital no Controle", versaoPortal: platformConfig.version, tipo: "oficial", fonte: "FGV — PCPR 2026", dataAtualizacao: "2026-10-19", observacao: "Consulte a FGV. Nenhum nome ou número de inscrição é reproduzido aqui.", ativo: true }));
