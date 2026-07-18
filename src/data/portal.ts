import {
  Activity,
  Brain,
  ClipboardCheck,
  FileText,
  HeartPulse,
  MapPinned,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import type {
  Dica,
  EtapaConcurso,
  Exame,
  FonteRegistro,
  LocalExame,
  PainelItem,
  Projecao,
  Regiao,
  TafItem,
  TituloItem,
  AtualizacaoPortal,
} from "@/types/content";

export const avisoNaoOficial =
  "Projeto independente e não oficial. Consulte sempre o edital e os canais oficiais.";

export const ultimaAtualizacao = "2026-07-18";

export const fontePendente = "Fonte oficial ainda não cadastrada.";
export const observacaoProvisoria =
  "Registro provisório usado para estruturação acadêmica e validação da interface.";

const baseOficial = {
  tipo: "oficial" as const,
  fonte: fontePendente,
  urlFonte: "",
  dataAtualizacao: ultimaAtualizacao,
  observacao:
    "Campo preparado para receber edital, banca ou publicação oficial. Conferir sempre a publicação vigente.",
  ativo: true,
};

const baseEstimativa = {
  tipo: "estimativa" as const,
  fonte: fontePendente,
  urlFonte: "",
  dataAtualizacao: ultimaAtualizacao,
  observacao:
    "Estimativa demonstrativa baseada em dados provisórios. Não representa classificação ou resultado oficial.",
  ativo: true,
};

const baseDemonstracao = {
  tipo: "demonstracao" as const,
  fonte: "Dado fictício para demonstração de interface",
  urlFonte: "",
  dataAtualizacao: ultimaAtualizacao,
  observacao: observacaoProvisoria,
  ativo: true,
};

export const resumoConcurso = [
  {
    id: "situacao-concurso",
    titulo: "Situação do concurso",
    destaque: "Em andamento",
    detalhe: "Aguardando próximas atualizações",
    ...baseDemonstracao,
  },
  {
    id: "proxima-etapa",
    titulo: "Próxima etapa",
    destaque: "Exames Médicos",
    detalhe: "Data prevista: a definir",
    ...baseEstimativa,
  },
  {
    id: "contagem-regressiva",
    titulo: "Contagem regressiva",
    destaque: "Prazo demonstrativo",
    detalhe: "Dias, horas, minutos e segundos",
    ...baseDemonstracao,
  },
];

export const etapas: EtapaConcurso[] = [
  {
    id: "inscricao",
    ordem: 1,
    titulo: "Inscrição",
    periodo: "fase administrativa",
    status: "concluida",
    descricao:
      "Conferência de dados cadastrais, comprovante de inscrição e eventuais condições declaradas.",
    checklist: ["Comprovante salvo", "Dados conferidos", "Publicações acompanhadas"],
    ...baseOficial,
  },
  {
    id: "prova-objetiva",
    ordem: 2,
    titulo: "Prova objetiva",
    periodo: "fase objetiva",
    status: "concluida",
    descricao:
      "Organização do resultado, conferência de classificação e leitura dos critérios de avanço.",
    checklist: ["Gabarito conferido", "Resultado arquivado", "Recursos revisados"],
    ...baseOficial,
  },
  {
    id: "taf",
    ordem: 3,
    titulo: "TAF",
    periodo: "após convocação",
    status: "prevista",
    descricao:
      "Controle de treinos, índices mínimos e itens permitidos no dia da avaliação física.",
    checklist: ["Treino por protocolo", "Aquecimento planejado", "Roupas conferidas"],
    ...baseOficial,
  },
  {
    id: "exames-medicos",
    ordem: 4,
    titulo: "Exames médicos",
    periodo: "data a definir",
    status: "atencao",
    descricao:
      "Separação de laudos, exames laboratoriais e avaliações clínicas exigidas em edital.",
    checklist: ["Laudos assinados", "Validade checada", "Documento original"],
    ...baseOficial,
  },
  {
    id: "avaliacao-psicologica",
    ordem: 5,
    titulo: "Avaliação psicológica",
    periodo: "fase técnica",
    status: "prevista",
    descricao:
      "Etapa técnica conduzida conforme critérios oficiais, sem promessa de preparação ou resultado.",
    checklist: ["Convocação lida", "Documento separado", "Horário confirmado"],
    ...baseOficial,
  },
  {
    id: "investigacao-social",
    ordem: 6,
    titulo: "Investigação social",
    periodo: "fase documental",
    status: "prevista",
    descricao:
      "Organização de certidões, declarações e histórico documental solicitado pela administração.",
    checklist: ["Certidões emitidas", "Endereços revisados", "Protocolos guardados"],
    ...baseOficial,
  },
  {
    id: "titulos",
    ordem: 7,
    titulo: "Títulos",
    periodo: "quando convocada",
    status: "prevista",
    descricao:
      "Conferência de documentos acadêmicos e profissionais aceitos para pontuação complementar.",
    checklist: ["Certificados separados", "Carga horária validada", "Arquivos digitalizados"],
    ...baseOficial,
  },
  {
    id: "curso-formacao",
    ordem: 8,
    titulo: "Curso de formação",
    periodo: "se previsto em edital",
    status: "prevista",
    descricao:
      "Estrutura reservada para registrar regras de matrícula, frequência, avaliação e convocação.",
    checklist: ["Regras oficiais", "Documentos de matrícula", "Calendário publicado"],
    ...baseOficial,
  },
  {
    id: "nomeacao",
    ordem: 9,
    titulo: "Nomeação",
    periodo: "fase final",
    status: "prevista",
    descricao:
      "Acompanhamento das publicações de resultado final, homologação, chamadas e prazos de posse.",
    checklist: ["Diário oficial acompanhado", "Contatos atualizados", "Documentos finais prontos"],
    ...baseOficial,
  },
];

export const regioes: Regiao[] = [
  { id: "curitiba", nome: "Curitiba", vagas: 52, inscritosEstimados: 5300, concorrencia: 101.9, ...baseEstimativa },
  { id: "londrina", nome: "Londrina", vagas: 24, inscritosEstimados: 1840, concorrencia: 76.7, ...baseEstimativa },
  { id: "maringa", nome: "Maringá", vagas: 20, inscritosEstimados: 1510, concorrencia: 75.5, ...baseEstimativa },
  { id: "cascavel", nome: "Cascavel", vagas: 18, inscritosEstimados: 1260, concorrencia: 70, ...baseEstimativa },
  { id: "ponta-grossa", nome: "Ponta Grossa", vagas: 16, inscritosEstimados: 1120, concorrencia: 70, ...baseEstimativa },
  { id: "guarapuava", nome: "Guarapuava", vagas: 12, inscritosEstimados: 720, concorrencia: 60, ...baseEstimativa },
];

export const projecoes: Projecao[] = [
  { id: "agente", cargo: "Agente", notaMinima: 66, notaProvavel: 72, notaCompetitiva: 78, ...baseEstimativa },
  { id: "delegado", cargo: "Delegado", notaMinima: 70, notaProvavel: 76, notaCompetitiva: 82, ...baseEstimativa },
  { id: "papiloscopista", cargo: "Papiloscopista", notaMinima: 64, notaProvavel: 70, notaCompetitiva: 76, ...baseEstimativa },
];

export const exames: Exame[] = [
  {
    id: "avaliacao-clinica",
    titulo: "Avaliação clínica",
    resumo: "Laudo médico com identificação completa e assinatura profissional.",
    finalidade: "Verificar condições gerais de saúde exigidas para a etapa.",
    preparo: ["Documento original", "Histórico de saúde", "Validade do laudo"],
    validade: "A definir conforme edital ou convocação.",
    errosDocumentais: ["Ausência de CRM", "Data fora da validade", "Nome incompleto"],
    icon: Stethoscope,
    ...baseOficial,
  },
  {
    id: "oftalmologica",
    titulo: "Oftalmológica",
    resumo: "Avaliação visual conforme exigências e parâmetros descritos no edital.",
    finalidade: "Registrar acuidade e condições visuais quando exigidas.",
    preparo: ["Consulta agendada", "Receitas anteriores", "Assinatura e CRM"],
    validade: "A definir conforme edital ou convocação.",
    errosDocumentais: ["Laudo sem identificação", "Parâmetro incompleto", "Assinatura ilegível"],
    icon: HeartPulse,
    ...baseOficial,
  },
  {
    id: "cardiologica",
    titulo: "Cardiológica",
    resumo: "Checagem cardiológica e exames complementares quando solicitados.",
    finalidade: "Avaliar aptidão cardiológica para etapas posteriores, quando aplicável.",
    preparo: ["Eletrocardiograma", "Laudo descritivo", "Prazo de entrega"],
    validade: "A definir conforme edital ou convocação.",
    errosDocumentais: ["Exame sem laudo", "Médico não identificado", "Resultado incompleto"],
    icon: Activity,
    ...baseOficial,
  },
  {
    id: "laboratoriais",
    titulo: "Laboratoriais",
    resumo: "Exames laboratoriais com resultados legíveis e dentro da validade.",
    finalidade: "Comprovar parâmetros laboratoriais exigidos em convocação.",
    preparo: ["Hemograma", "Coleta programada", "Resultado impresso"],
    validade: "A definir conforme edital ou convocação.",
    errosDocumentais: ["Coleta fora do prazo", "Resultado sem identificação", "Arquivo ilegível"],
    icon: ClipboardCheck,
    ...baseOficial,
  },
  {
    id: "ortopedica",
    titulo: "Ortopédica",
    resumo: "Avaliação de condições motoras e registros de exames de imagem.",
    finalidade: "Registrar condições ortopédicas exigidas para a etapa médica.",
    preparo: ["Imagem quando exigida", "Laudo assinado", "Dados do candidato"],
    validade: "A definir conforme edital ou convocação.",
    errosDocumentais: ["Laudo sem data", "Imagem sem conclusão", "Especialidade divergente"],
    icon: ShieldCheck,
    ...baseOficial,
  },
  {
    id: "taf-exame",
    titulo: "TAF",
    resumo: "Teste de aptidão física com índices, sequência e regras de execução.",
    finalidade: "Avaliar desempenho físico conforme critérios oficiais.",
    preparo: ["Corrida", "Força", "Aquecimento controlado"],
    validade: "Executado na data e local convocados pela banca.",
    errosDocumentais: ["Documento ausente", "Atestado divergente", "Chegada fora do horário"],
    icon: Brain,
    ...baseOficial,
  },
];

export const taf: TafItem[] = [
  {
    id: "estrutura-taf",
    titulo: "Estrutura preparada para índices",
    descricao: "A página está pronta para receber índices oficiais por sexo, idade, cargo e modalidade.",
    regras: ["Cumprir ordem definida em edital", "Respeitar chamada e identificação", "Seguir orientação da banca"],
    documentos: ["Documento oficial", "Atestado quando exigido", "Convocação impressa ou digital"],
    motivosEliminacao: ["Não atingir índice", "Ausência", "Descumprimento de regra de execução"],
    ...baseOficial,
  },
];

export const titulos: TituloItem[] = [
  {
    id: "pos-graduacao-demo",
    titulo: "Pós-graduação",
    tipoTitulo: "Formação acadêmica",
    pontuacao: "Demonstração: até 2 pontos",
    limite: "Demonstração: limite a definir",
    comprovacao: "Certificado ou diploma conforme edital.",
    descricao: "Exemplo de estrutura para receber regra oficial de pontuação.",
    ...baseDemonstracao,
  },
  {
    id: "experiencia-demo",
    titulo: "Experiência profissional",
    tipoTitulo: "Atividade profissional",
    pontuacao: "Demonstração: até 3 pontos",
    limite: "Demonstração: limite a definir",
    comprovacao: "Documento comprobatório aceito em edital.",
    descricao: "Exemplo demonstrativo sem validade oficial.",
    ...baseDemonstracao,
  },
];

export const dicas: Dica[] = [
  { id: "onde-fazer-exames", titulo: "Onde fazer exames", descricao: "Compare agenda, prazo de entrega e emissão correta dos laudos.", categoria: "saude", ...baseEstimativa },
  { id: "documentos-duvidas", titulo: "Documentos com dúvidas", descricao: "Certidões, títulos e comprovantes devem ser nomeados e arquivados por etapa.", categoria: "documentos", ...baseEstimativa },
  { id: "prazos-validade", titulo: "Prazos e validade", descricao: "Confira datas absolutas na convocação oficial antes de agendar.", categoria: "prazo", ...baseEstimativa },
  { id: "planejamento-logistico", titulo: "Planejamento logístico", descricao: "Considere transporte, hospedagem, horário de abertura e margem de deslocamento.", categoria: "deslocamento", ...baseEstimativa },
  { id: "preparacao-convocacao", titulo: "Preparação para convocação", descricao: "Mantenha documentos, exames e agenda de treinos separados por etapa.", categoria: "convocacao", ...baseEstimativa },
];

export const locaisExame: LocalExame[] = [
  {
    id: "clinica-exemplo-curitiba",
    nome: "Clínica Exemplo Curitiba",
    cidade: "Curitiba",
    regiao: "Curitiba e Região Metropolitana",
    categoria: "clínicas de avaliação",
    endereco: "Endereço demonstrativo, sem empresa real cadastrada",
    telefone: "Telefone demonstrativo",
    site: "Site demonstrativo",
    servicosOferecidos: ["avaliação clínica", "cardiologia"],
    verificadoEm: ultimaAtualizacao,
    patrocinado: false,
    ...baseDemonstracao,
  },
  {
    id: "laboratorio-exemplo-londrina",
    nome: "Laboratório Exemplo Londrina",
    cidade: "Londrina",
    regiao: "Norte",
    categoria: "laboratórios",
    endereco: "Endereço demonstrativo, sem empresa real cadastrada",
    telefone: "Telefone demonstrativo",
    site: "Site demonstrativo",
    servicosOferecidos: ["hemograma", "exames laboratoriais"],
    verificadoEm: ultimaAtualizacao,
    patrocinado: false,
    ...baseDemonstracao,
  },
  {
    id: "imagem-exemplo-maringa",
    nome: "Centro de Imagem Exemplo Maringá",
    cidade: "Maringá",
    regiao: "Noroeste",
    categoria: "centros de imagem",
    endereco: "Endereço demonstrativo, sem empresa real cadastrada",
    telefone: "Telefone demonstrativo",
    site: "Site demonstrativo",
    servicosOferecidos: ["imagem", "ortopedia"],
    verificadoEm: ultimaAtualizacao,
    patrocinado: false,
    ...baseDemonstracao,
  },
];

export const painelItens: PainelItem[] = [
  { id: "documento", titulo: "Documento oficial", detalhe: "RG, CNH ou documento aceito no edital." },
  { id: "convocacao", titulo: "Convocação salva", detalhe: "PDF ou print da publicação da banca." },
  { id: "exames", titulo: "Exames agendados", detalhe: "Datas e validade conferidas." },
  { id: "certidoes", titulo: "Certidões emitidas", detalhe: "Arquivos separados por órgão." },
];

export const atualizacoes: AtualizacaoPortal[] = [
  {
    id: "atualizacao-demo-2026-07-18",
    data: "2026-07-18",
    titulo: "Preparação da versão 0.1.0",
    descricao: "Registro demonstrativo da auditoria de produção, páginas legais, sitemap, robots e documentação de publicação.",
    responsavelConferencia: "Equipe do projeto acadêmico",
    versaoPortal: "0.1.0",
    ...baseDemonstracao,
  },
  {
    id: "conteudo-demo-2026-07-18",
    data: "2026-07-18",
    titulo: "Estruturação de conteúdo e transparência",
    descricao: "Registro demonstrativo para classificar dados oficiais pendentes, estimativas e demonstrações sem fonte oficial cadastrada.",
    responsavelConferencia: "Equipe do projeto acadêmico",
    versaoPortal: "0.1.0",
    ...baseDemonstracao,
  },
];

export const fontesRegistros: FonteRegistro[] = [
  {
    id: "fontes-edital",
    informacao: "Etapas, documentos, exames, TAF e títulos",
    classificacao: "oficial",
    fonte: fontePendente,
    urlFonte: "",
    dataPublicacao: "pendente de cadastro",
    dataConferencia: ultimaAtualizacao,
    observacao: "Cadastrar edital, banca e publicações oficiais quando definidos.",
    tipo: "oficial",
    ativo: true,
  },
  {
    id: "fontes-projecoes",
    informacao: "Projeções de concorrência e nota de corte",
    classificacao: "estimativa",
    fonte: "Metodologia provisória interna",
    urlFonte: "",
    dataPublicacao: "não aplicável",
    dataConferencia: ultimaAtualizacao,
    observacao: "Não representa classificação oficial.",
    tipo: "estimativa",
    ativo: true,
  },
  {
    id: "fontes-locais",
    informacao: "Locais para exames",
    classificacao: "demonstracao",
    fonte: "Exemplos fictícios para estrutura de dados",
    urlFonte: "",
    dataPublicacao: "não aplicável",
    dataConferencia: ultimaAtualizacao,
    observacao: "Não há empresas reais cadastradas nesta etapa.",
    tipo: "demonstracao",
    ativo: true,
  },
];

export const atalhosBusca = [
  { termo: "exames médicos", icon: HeartPulse },
  { termo: "documentos", icon: FileText },
  { termo: "linha do tempo", icon: ClipboardCheck },
  { termo: "locais", icon: MapPinned },
];



