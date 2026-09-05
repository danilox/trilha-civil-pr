import { Activity, Brain, ClipboardCheck, FileText, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import {
  ARQUIVO_LOCAL_EDITAL,
  atualizacoesEdital,
  DATA_ATUALIZACAO_ISENCOES_FGV,
  DATA_COMUNICADO_PRORROGACAO_PAGAMENTO,
  DATA_HOMOLOGACAO_PRELIMINAR_FGV,
  DATA_RECURSOS_HOMOLOGACAO_FGV,
  DATA_RETIFICACAO_EDITAL,
  DATA_ULTIMA_ATUALIZACAO_OFICIAL,
  disciplinasAgente,
  etapasOficiais,
  examesOficiais,
  FONTE_EDITAL,
  FONTE_OFICIAL_PENDENTE,
  limiteTotalTitulos,
  notaMinimaObjetivaAgente,
  regioesOficiais,
  situacaoAtualPcpr2026,
  titulosOficiais,
  URL_COMUNICADO_PRORROGACAO_PAGAMENTO,
  URL_FONTE_FGV,
} from "@/data/edital";
import type { AtualizacaoPortal, Dica, EtapaConcurso, Exame, FonteRegistro, LocalExame, PainelItem, Projecao, Regiao, TafItem, TituloItem } from "@/types/content";

export const avisoNaoOficial = "Projeto independente e não oficial. Consulte sempre o edital e os canais oficiais.";
export const ultimaAtualizacao = DATA_ULTIMA_ATUALIZACAO_OFICIAL;
export const fontePendente = FONTE_OFICIAL_PENDENTE;
export const fonteOficialEdital = FONTE_EDITAL;
export const caminhoEditalOficial = ARQUIVO_LOCAL_EDITAL;
export const observacaoProvisoria = "Registro provisório usado para estruturação acadêmica e validação da interface.";

const baseEstimativa = { tipo: "estimativa" as const, fonte: "Metodologia provisória interna", urlFonte: "", dataAtualizacao: ultimaAtualizacao, observacao: "Estimativa local demonstrativa. Não representa classificação, nota de corte, resultado ou convocação oficial.", ativo: true };

export const resumoConcurso = [
  { id: "situacao-concurso", titulo: "Situação oficial", destaque: situacaoAtualPcpr2026.statusCurto, detalhe: situacaoAtualPcpr2026.substatus, tipo: "oficial" as const, fonte: situacaoAtualPcpr2026.fonte, urlFonte: URL_FONTE_FGV, dataAtualizacao: ultimaAtualizacao, observacao: "Status baseado nas publicações oficiais da FGV de 27/08 e 28/08/2026.", ativo: true },
  { id: "proxima-etapa", titulo: "Próximo grande marco", destaque: situacaoAtualPcpr2026.proximoMarco.resumo, detalhe: "Prova objetiva em destaque. Demais fases aguardam convocação oficial.", tipo: "oficial" as const, fonte: FONTE_EDITAL, urlFonte: URL_FONTE_FGV, dataAtualizacao: ultimaAtualizacao, observacao: "O edital e as convocações oficiais prevalecem.", ativo: true },
  { id: "estrutura-prova", titulo: "Prova objetiva", destaque: `${disciplinasAgente.reduce((total, disciplina) => total + disciplina.questoes, 0)} questões`, detalhe: "100 pontos, cinco alternativas e uma resposta correta", tipo: "oficial" as const, fonte: FONTE_EDITAL, urlFonte: URL_FONTE_FGV, dataAtualizacao: ultimaAtualizacao, observacao: "Distribuição oficial de disciplinas validada com soma igual a 100.", ativo: true },
];

export const etapas: EtapaConcurso[] = etapasOficiais.map((etapa) => ({ id: etapa.id, ordem: etapa.ordem, titulo: etapa.titulo, periodo: etapa.periodo, status: etapa.status, descricao: etapa.descricao, checklist: etapa.checklist, tipo: etapa.tipo, fonte: etapa.fonte, urlFonte: etapa.urlFonte, dataAtualizacao: etapa.dataConferencia, observacao: `Item ${etapa.itemEdital}, página ${etapa.paginaPdf}. ${etapa.observacao}`, ativo: etapa.ativo }));
export const regioes: Regiao[] = regioesOficiais.map((regiao) => ({ id: regiao.id, nome: regiao.titulo, vagas: 0, inscritosEstimados: 0, concorrencia: regiao.percentualDistribuicao, tipo: "oficial", fonte: regiao.fonte, urlFonte: regiao.urlFonte, dataAtualizacao: regiao.dataConferencia, observacao: `${regiao.percentualDistribuicao}% da distribuição regional em cadastro de reserva. Item ${regiao.itemEdital}, página ${regiao.paginaPdf}.`, ativo: true }));
export const projecoes: Projecao[] = [
  { id: "minimo-oficial", cargo: "Mínimo objetivo", notaMinima: 50, notaProvavel: 50, notaCompetitiva: 50, tipo: "oficial", fonte: FONTE_EDITAL, urlFonte: URL_FONTE_FGV, dataAtualizacao: ultimaAtualizacao, observacao: `Item ${notaMinimaObjetivaAgente.itemEdital}, página ${notaMinimaObjetivaAgente.paginaPdf}.`, ativo: true },
  { id: "painel-local", cargo: "Painel local", notaMinima: 50, notaProvavel: 72, notaCompetitiva: 86, ...baseEstimativa },
];
export const exames: Exame[] = examesOficiais.map((exame) => ({ id: exame.id, titulo: exame.titulo, resumo: exame.descricao, finalidade: exame.finalidade, preparo: exame.preparo, validade: exame.validade, errosDocumentais: exame.errosDocumentais, icon: exame.categoria === "laboratorial" ? ClipboardCheck : exame.categoria === "toxicológico" ? ShieldCheck : exame.id.includes("cardiovascular") ? HeartPulse : Stethoscope, tipo: exame.tipo, fonte: exame.fonte, urlFonte: exame.urlFonte, dataAtualizacao: exame.dataConferencia, observacao: `Item ${exame.itemEdital}, página ${exame.paginaPdf}. ${exame.observacao}`, ativo: exame.ativo }));
export const taf: TafItem[] = [{ id: "taf-oficial", titulo: "Índices oficiais do Anexo IV", descricao: "TAF eliminatório com índices por sexo biológico e faixa etária. É necessário atingir o índice mínimo em todos os exercícios.", regras: ["Aprovação em todos os exercícios", "Até duas tentativas onde indicado", "Intervalo mínimo de 10 minutos nos exercícios com duas tentativas"], documentos: ["Documento oficial", "Atestado médico conforme edital", "Convocação conferida na FGV"], motivosEliminacao: ["Não atingir qualquer índice", "Ausência", "Descumprimento de regra de execução"], tipo: "oficial", fonte: FONTE_EDITAL, urlFonte: URL_FONTE_FGV, dataAtualizacao: ultimaAtualizacao, observacao: "Anexo IV, página 78 e item 13 do edital.", ativo: true }];
export const titulos: TituloItem[] = titulosOficiais.map((titulo) => ({ id: titulo.id, titulo: titulo.titulo, tipoTitulo: titulo.tipoTitulo, pontuacao: `${titulo.pontosPorUnidade.toLocaleString("pt-BR")} ponto(s) por ${titulo.unidade}`, limite: `${titulo.limite.toLocaleString("pt-BR")} ponto(s)`, comprovacao: titulo.comprovacao, descricao: `Pontuação oficial da prova de títulos para Agente. O total não pode ultrapassar ${limiteTotalTitulos.toLocaleString("pt-BR")} pontos.`, tipo: "oficial", fonte: titulo.fonte, urlFonte: titulo.urlFonte, dataAtualizacao: titulo.dataConferencia, observacao: `Item ${titulo.itemEdital}, página ${titulo.paginaPdf}.`, ativo: true }));
export const dicas: Dica[] = [
  { id: "exames-sem-convocacao", titulo: "Exames: aguarde convocação", descricao: "Antes de realizar exames, confirme a convocação oficial e as regras vigentes na FGV.", categoria: "saude", ...baseEstimativa },
  { id: "documentos-duvidas", titulo: "Documentos com dúvidas", descricao: "Certidões, títulos e comprovantes devem ser nomeados e arquivados por etapa.", categoria: "documentos", ...baseEstimativa },
  { id: "prazos-validade", titulo: "Prazos e validade", descricao: "Use datas absolutas da convocação oficial antes de agendar exames ou deslocamentos.", categoria: "prazo", ...baseEstimativa },
  { id: "planejamento-logistico", titulo: "Planejamento logístico", descricao: "Considere transporte, hospedagem, horário de abertura e margem de deslocamento.", categoria: "deslocamento", ...baseEstimativa },
  { id: "preparacao-convocacao", titulo: "Preparação para convocação", descricao: "Mantenha documentos, exames e agenda de treinos separados por etapa.", categoria: "convocacao", ...baseEstimativa },
];
export const locaisExame: LocalExame[] = [];
export const painelItens: PainelItem[] = [
  { id: "documento", titulo: "Documento oficial", detalhe: "RG, CNH ou documento aceito no edital." },
  { id: "convocacao", titulo: "Convocação salva", detalhe: "PDF ou print da publicação da banca." },
  { id: "exames", titulo: "Exames agendados", detalhe: "Datas e validade conferidas." },
  { id: "certidoes", titulo: "Certidões emitidas", detalhe: "Arquivos separados por órgão." },
];
export const atualizacoes: AtualizacaoPortal[] = [
  {
    id: "atualizacao-2026-08-28-recursos-homologacao",
    data: DATA_RECURSOS_HOMOLOGACAO_FGV,
    titulo: "Recursos relacionados à homologação preliminar",
    descricao: "A FGV disponibilizou links de interposição de recursos contra indeferimento preliminar de inscrição, condição PcD, condição de candidato afrodescendente e atendimento especial.",
    responsavelConferencia: "Equipe do projeto acadêmico",
    versaoPortal: "0.3.0",
    tipo: "oficial",
    fonte: "Página oficial FGV - Concurso PCPR 2026",
    urlFonte: URL_FONTE_FGV,
    dataAtualizacao: DATA_RECURSOS_HOMOLOGACAO_FGV,
    observacao: "Não há, nesta atualização, julgamento definitivo desses recursos no portal.",
    ativo: true,
  },
  {
    id: "atualizacao-2026-08-27-homologacao-preliminar",
    data: DATA_HOMOLOGACAO_PRELIMINAR_FGV,
    titulo: "Resultado preliminar de homologação das inscrições",
    descricao: "Publicados resultado preliminar de homologação de inscrição, homologação de candidatos afrodescendentes, deferimento/indeferimento PcD, atendimento especial e consultas individuais correspondentes.",
    responsavelConferencia: "Equipe do projeto acadêmico",
    versaoPortal: "0.3.0",
    tipo: "oficial",
    fonte: "Página oficial FGV - Concurso PCPR 2026",
    urlFonte: URL_FONTE_FGV,
    dataAtualizacao: DATA_HOMOLOGACAO_PRELIMINAR_FGV,
    observacao: "Homologação definitiva ainda não indicada nesta fonte conferida.",
    ativo: true,
  },
  {
    id: "atualizacao-2026-08-14-isencoes",
    data: DATA_ATUALIZACAO_ISENCOES_FGV,
    titulo: "FGV atualiza resultados definitivos dos pedidos de isenção",
    descricao: "A página oficial do concurso passou a apresentar o resultado definitivo dos pedidos de isenção indeferidos retificado em 14/08/2026 e o resultado definitivo dos pedidos deferidos atualizado em 14/08/2026. O portal não reproduz nomes ou dados pessoais dos candidatos.",
    responsavelConferencia: "Equipe do projeto acadêmico",
    versaoPortal: "0.2.1",
    tipo: "oficial",
    fonte: "Página oficial FGV - Concurso PCPR 2026",
    urlFonte: URL_FONTE_FGV,
    dataAtualizacao: DATA_ATUALIZACAO_ISENCOES_FGV,
    observacao: "Consulte a página oficial da FGV para acessar os arquivos completos de isenção.",
    ativo: true,
  },
  {
    id: "atualizacao-2026-08-13-pagamento-prorrogado",
    data: DATA_COMUNICADO_PRORROGACAO_PAGAMENTO,
    titulo: "FGV prorroga prazo para pagamento da taxa de inscrição",
    descricao: "A FGV prorrogou até 18/08/2026, às 23h59, o prazo para pagamento da taxa de inscrição do Concurso PCPR 2026. A alteração não reabriu o período de inscrições.",
    responsavelConferencia: "Equipe do projeto acadêmico",
    versaoPortal: "0.2.1",
    tipo: "oficial",
    fonte: "Comunicado FGV de 13/08/2026",
    urlFonte: URL_COMUNICADO_PRORROGACAO_PAGAMENTO,
    dataAtualizacao: DATA_COMUNICADO_PRORROGACAO_PAGAMENTO,
    observacao: "Prorrogação exclusivamente para pagamento da taxa de inscrição; inscrições permanecem encerradas em 12/08/2026 às 16h.",
    ativo: true,
  },
  {
    id: "atualizacao-2026-07-31-retificacao",
    data: DATA_RETIFICACAO_EDITAL,
    titulo: "1ª Retificação do edital",
    descricao: "A FGV publicou retificação do edital. O portal deve considerar a documentação vigente e conferir regras sensíveis, como títulos, contra o edital retificado.",
    responsavelConferencia: "Equipe do projeto acadêmico",
    versaoPortal: "0.3.0",
    tipo: "oficial",
    fonte: "Página oficial FGV - Concurso PCPR 2026",
    urlFonte: URL_FONTE_FGV,
    dataAtualizacao: DATA_RETIFICACAO_EDITAL,
    observacao: "Retificação considerada como documentação vigente ao lado do Edital nº 01/2026.",
    ativo: true,
  },
  ...atualizacoesEdital.map((item) => ({ id: item.id, data: item.data, titulo: item.titulo, descricao: item.descricao, responsavelConferencia: item.responsavelConferencia, versaoPortal: item.versaoPortal, tipo: item.tipo, fonte: item.fonte, urlFonte: item.urlFonte, dataAtualizacao: item.dataConferencia, observacao: `Item ${item.itemEdital}, página ${item.paginaPdf}. ${item.observacao}`, ativo: item.ativo })),
];
export const fontesRegistros: FonteRegistro[] = [
  { id: "fontes-edital", informacao: "Edital nº 01/2026 + 1ª Retificação - dados gerais, prova, regiões, barreiras, exames, TAF e títulos", classificacao: "oficial", fonte: FONTE_EDITAL, urlFonte: URL_FONTE_FGV, dataPublicacao: "06/07/2026 e 31/07/2026", dataConferencia: ultimaAtualizacao, observacao: `Arquivo local base conferido em ${ARQUIVO_LOCAL_EDITAL}. Não disponibilizar o PDF local publicamente; prevalecem retificações e a página oficial da FGV.`, tipo: "oficial", ativo: true },
  { id: "fontes-fgv-atualizacoes", informacao: "Homologação preliminar, recursos e publicações posteriores", classificacao: "oficial", fonte: "Página oficial FGV - Concurso PCPR 2026", urlFonte: URL_FONTE_FGV, dataPublicacao: "27/08/2026 e 28/08/2026", dataConferencia: ultimaAtualizacao, observacao: "Fonte prioritária para a fase atual do concurso e consultas individuais.", tipo: "oficial", ativo: true },
  { id: "fontes-projecoes", informacao: "Painel local e posição estimada", classificacao: "estimativa", fonte: "Metodologia provisória interna", urlFonte: "", dataPublicacao: "não aplicável", dataConferencia: ultimaAtualizacao, observacao: "Não representa classificação oficial, aprovação, convocação ou nota de corte oficial.", tipo: "estimativa", ativo: true },
];
export const atalhosBusca = [
  { termo: "exames médicos", icon: HeartPulse },
  { termo: "documentos", icon: FileText },
  { termo: "linha do tempo", icon: ClipboardCheck },
  { termo: "homologação", icon: ClipboardCheck },
  { termo: "edital", icon: Brain },
  { termo: "taf", icon: Activity },
];
