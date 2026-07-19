import { Activity, Brain, ClipboardCheck, FileText, HeartPulse, MapPinned, ShieldCheck, Stethoscope } from "lucide-react";
import {
  ARQUIVO_LOCAL_EDITAL,
  atualizacoesEdital,
  DATA_CONFERENCIA_EDITAL,
  disciplinasAgente,
  etapasOficiais,
  examesOficiais,
  FONTE_EDITAL,
  FONTE_OFICIAL_PENDENTE,
  limiteTotalTitulos,
  notaMinimaObjetivaAgente,
  regioesOficiais,
  titulosOficiais,
  URL_FONTE_FGV,
} from "@/data/edital";
import type { AtualizacaoPortal, Dica, EtapaConcurso, Exame, FonteRegistro, LocalExame, PainelItem, Projecao, Regiao, TafItem, TituloItem } from "@/types/content";

export const avisoNaoOficial = "Projeto independente e não oficial. Consulte sempre o edital e os canais oficiais.";
export const ultimaAtualizacao = DATA_CONFERENCIA_EDITAL;
export const fontePendente = FONTE_OFICIAL_PENDENTE;
export const fonteOficialEdital = FONTE_EDITAL;
export const caminhoEditalOficial = ARQUIVO_LOCAL_EDITAL;
export const observacaoProvisoria = "Registro provisório usado para estruturação acadêmica e validação da interface.";

const baseEstimativa = { tipo: "estimativa" as const, fonte: "Metodologia provisória interna", urlFonte: "", dataAtualizacao: ultimaAtualizacao, observacao: "Estimativa local demonstrativa. Não representa classificação, nota de corte, resultado ou convocação oficial.", ativo: true };
const baseDemonstracao = { tipo: "demonstracao" as const, fonte: "Dado fictício para demonstração de interface", urlFonte: "", dataAtualizacao: ultimaAtualizacao, observacao: observacaoProvisoria, ativo: true };

export const resumoConcurso = [
  { id: "situacao-concurso", titulo: "Situação oficial", destaque: "Status dinâmico", detalhe: "Calculado com datas oficiais do edital", tipo: "oficial" as const, fonte: FONTE_EDITAL, urlFonte: URL_FONTE_FGV, dataAtualizacao: ultimaAtualizacao, observacao: "Status baseado nos marcos de inscrição, boleto, locais e prova objetiva.", ativo: true },
  { id: "proxima-etapa", titulo: "Próxima etapa", destaque: "Inscrição ou prova", detalhe: "Exames só aparecem após a prova objetiva", tipo: "oficial" as const, fonte: FONTE_EDITAL, urlFonte: URL_FONTE_FGV, dataAtualizacao: ultimaAtualizacao, observacao: "O edital e as convocações oficiais prevalecem.", ativo: true },
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
  { id: "onde-fazer-exames", titulo: "Onde fazer exames", descricao: "Compare agenda, prazo de entrega e emissão correta dos laudos. O portal ainda não cadastra empresas reais.", categoria: "saude", ...baseEstimativa },
  { id: "documentos-duvidas", titulo: "Documentos com dúvidas", descricao: "Certidões, títulos e comprovantes devem ser nomeados e arquivados por etapa.", categoria: "documentos", ...baseEstimativa },
  { id: "prazos-validade", titulo: "Prazos e validade", descricao: "Use datas absolutas da convocação oficial antes de agendar exames ou deslocamentos.", categoria: "prazo", ...baseEstimativa },
  { id: "planejamento-logistico", titulo: "Planejamento logístico", descricao: "Considere transporte, hospedagem, horário de abertura e margem de deslocamento.", categoria: "deslocamento", ...baseEstimativa },
  { id: "preparacao-convocacao", titulo: "Preparação para convocação", descricao: "Mantenha documentos, exames e agenda de treinos separados por etapa.", categoria: "convocacao", ...baseEstimativa },
];
export const locaisExame: LocalExame[] = [
  { id: "clinica-exemplo-curitiba", nome: "Exemplo fictício - clínica de avaliação", cidade: "Curitiba", regiao: "Curitiba e Região Metropolitana", categoria: "clínicas de avaliação", endereco: "Endereço demonstrativo, sem empresa real cadastrada", telefone: "Telefone demonstrativo", site: "Site demonstrativo", servicosOferecidos: ["avaliação clínica", "cardiologia"], verificadoEm: ultimaAtualizacao, patrocinado: false, ...baseDemonstracao },
  { id: "laboratorio-exemplo-londrina", nome: "Exemplo fictício - laboratório", cidade: "Londrina", regiao: "Interior do Estado", categoria: "laboratórios", endereco: "Endereço demonstrativo, sem empresa real cadastrada", telefone: "Telefone demonstrativo", site: "Site demonstrativo", servicosOferecidos: ["hemograma", "exames laboratoriais"], verificadoEm: ultimaAtualizacao, patrocinado: false, ...baseDemonstracao },
  { id: "imagem-exemplo-cascavel", nome: "Exemplo fictício - centro de imagem", cidade: "Cascavel", regiao: "Interior do Estado", categoria: "centros de imagem", endereco: "Endereço demonstrativo, sem empresa real cadastrada", telefone: "Telefone demonstrativo", site: "Site demonstrativo", servicosOferecidos: ["imagem", "avaliações especializadas"], verificadoEm: ultimaAtualizacao, patrocinado: false, ...baseDemonstracao },
];
export const painelItens: PainelItem[] = [
  { id: "documento", titulo: "Documento oficial", detalhe: "RG, CNH ou documento aceito no edital." },
  { id: "convocacao", titulo: "Convocação salva", detalhe: "PDF ou print da publicação da banca." },
  { id: "exames", titulo: "Exames agendados", detalhe: "Datas e validade conferidas." },
  { id: "certidoes", titulo: "Certidões emitidas", detalhe: "Arquivos separados por órgão." },
];
export const atualizacoes: AtualizacaoPortal[] = [
  ...atualizacoesEdital.map((item) => ({ id: item.id, data: item.data, titulo: item.titulo, descricao: item.descricao, responsavelConferencia: item.responsavelConferencia, versaoPortal: item.versaoPortal, tipo: item.tipo, fonte: item.fonte, urlFonte: item.urlFonte, dataAtualizacao: item.dataConferencia, observacao: `Item ${item.itemEdital}, página ${item.paginaPdf}. ${item.observacao}`, ativo: item.ativo })),
  { id: "atualizacao-demo-2026-07-18", data: "2026-07-18", titulo: "Preparação da versão 0.1.0", descricao: "Registro demonstrativo da auditoria de produção, páginas legais, sitemap, robots e documentação de publicação.", responsavelConferencia: "Equipe do projeto acadêmico", versaoPortal: "0.1.0", ...baseDemonstracao },
];
export const fontesRegistros: FonteRegistro[] = [
  { id: "fontes-edital", informacao: "Edital nº 01/2026 - dados gerais, prova, regiões, barreiras, exames, TAF e títulos", classificacao: "oficial", fonte: FONTE_EDITAL, urlFonte: URL_FONTE_FGV, dataPublicacao: "06/07/2026", dataConferencia: ultimaAtualizacao, observacao: `Arquivo local conferido em ${ARQUIVO_LOCAL_EDITAL}. Não disponibilizar o PDF local publicamente; verificar retificações e a página oficial da FGV.`, tipo: "oficial", ativo: true },
  { id: "fontes-projecoes", informacao: "Painel local e posição estimada", classificacao: "estimativa", fonte: "Metodologia provisória interna", urlFonte: "", dataPublicacao: "não aplicável", dataConferencia: ultimaAtualizacao, observacao: "Não representa classificação oficial, aprovação, convocação ou nota de corte oficial.", tipo: "estimativa", ativo: true },
  { id: "fontes-locais", informacao: "Locais para exames", classificacao: "demonstracao", fonte: "Exemplos fictícios para estrutura de dados", urlFonte: "", dataPublicacao: "não aplicável", dataConferencia: ultimaAtualizacao, observacao: "Não há empresas reais cadastradas nesta etapa.", tipo: "demonstracao", ativo: true },
];
export const atalhosBusca = [
  { termo: "exames médicos", icon: HeartPulse },
  { termo: "documentos", icon: FileText },
  { termo: "linha do tempo", icon: ClipboardCheck },
  { termo: "locais", icon: MapPinned },
  { termo: "edital", icon: Brain },
  { termo: "taf", icon: Activity },
];