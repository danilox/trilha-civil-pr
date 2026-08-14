import type {
  CausaIncapacitante,
  DadoGeralEdital,
  DisciplinaProva,
  EtapaOficial,
  ExameOficial,
  FaixaEtaria,
  FonteOficial,
  ModalidadeCota,
  RegiaoOficial,
  SexoBiologico,
  StatusConcurso,
  TafIndice,
  TituloOficial,
} from "@/types/edital";

export const VERSAO_PORTAL = "0.2.0";
export const DATA_CONFERENCIA_EDITAL = "2026-07-19";
export const DATA_COMUNICADO_PRORROGACAO_PAGAMENTO = "2026-08-13";
export const DATA_ATUALIZACAO_ISENCOES_FGV = "2026-08-14";
export const DATA_ULTIMA_ATUALIZACAO_OFICIAL = DATA_ATUALIZACAO_ISENCOES_FGV;
export const DOCUMENTO_EDITAL = "Edital nº 01/2026 - PCPR";
export const FONTE_EDITAL = "Edital nº 01/2026 - Concurso Público da Polícia Civil do Paraná";
export const URL_FONTE_FGV = "https://conhecimento.fgv.br/concursos/pcpr26";
export const URL_COMUNICADO_PRORROGACAO_PAGAMENTO = "https://conhecimento.fgv.br/sites/default/files/concursos/comunicado-pcpr.pdf";
export const URL_REIMPRESSAO_BOLETO_FGV = URL_FONTE_FGV;
export const ARQUIVO_LOCAL_EDITAL = "docs/fontes-oficiais/edital-pcpr-01-2026.pdf";
export const FONTE_OFICIAL_PENDENTE = "Fonte oficial ainda não cadastrada.";

function oficial(base: Omit<FonteOficial, "tipo" | "documento" | "fonte" | "urlFonte" | "dataConferencia" | "ativo">): FonteOficial {
  return {
    ...base,
    tipo: "oficial",
    documento: DOCUMENTO_EDITAL,
    fonte: FONTE_EDITAL,
    urlFonte: URL_FONTE_FGV,
    dataConferencia: DATA_CONFERENCIA_EDITAL,
    observacao: base.observacao ?? "Dado extraído do edital local conferido. Consulte sempre edital, anexos, retificações e canais oficiais.",
    ativo: true,
  };
}

export const modalidades: { id: ModalidadeCota; label: string }[] = [
  { id: "ampla", label: "Ampla concorrência" },
  { id: "afrodescendente", label: "Afrodescendente" },
  { id: "pcd", label: "Pessoa com Deficiência" },
];
export const faixasEtarias: { id: FaixaEtaria; label: string }[] = [
  { id: "ate-29", label: "Até 29 anos" },
  { id: "30-39", label: "30 a 39 anos" },
  { id: "40-49", label: "40 a 49 anos" },
  { id: "50-mais", label: "50 anos ou mais" },
];
export const sexosBiologicos: { id: SexoBiologico; label: string }[] = [
  { id: "masculino", label: "Masculino" },
  { id: "feminino", label: "Feminino" },
];

export const dadosGeraisEdital: DadoGeralEdital[] = [
  ["cadastro-reserva", "Cadastro de reserva", "Concurso para cadastro de reserva", "concurso", "Cadastro de reserva", "1.1 a 1.1.2", 1],
  ["cargo-agente", "Cargo", "Cargo de Agente de Polícia Judiciária", "cargo", "Agente de Polícia Judiciária", "1.1.1", 1],
  ["organizadora-fgv", "Organizadora", "Banca organizadora", "banca", "FGV", "2.5", 3],
  ["validade", "Validade", "Prazo de validade", "prazo", "2 anos, prorrogável uma vez por igual período", "2.4", 3],
  ["sem-direito-nomeacao", "Nomeação", "Sem direito automático à nomeação", "limite", "Sem direito automático à nomeação", "1.1.2", 1],
  ["graduacao", "Escolaridade", "Curso superior completo", "requisito", "Graduação em qualquer área", "3.10", 6],
  ["cnh", "CNH", "Habilitação mínima", "requisito", "CNH ou permissão categoria B válida", "3.13", 10],
  ["idade-minima", "Idade mínima", "Requisito etário", "requisito", "18 anos", "3.13", 10],
  ["jornada", "Jornada", "Jornada e regime", "regime", "40 horas semanais, com regime especial policial", "3.14 e 3.14.1", 11],
  ["remuneracao-subsidio", "Subsídio", "Referência agosto de 2026", "remuneração", "R$ 8.131,19", "3.3", 5],
  ["remuneracao-alimentacao", "Auxílio-alimentação", "Referência agosto de 2026", "remuneração", "R$ 876,48", "3.3", 5],
  ["remuneracao-total", "Remuneração total", "Subsídio mais auxílio-alimentação", "remuneração", "R$ 9.007,67", "3.3", 5],
].map(([id, titulo, descricao, categoria, valor, itemEdital, paginaPdf]) => ({
  ...oficial({ id: String(id), titulo: String(titulo), descricao: String(descricao), itemEdital: String(itemEdital), paginaPdf: Number(paginaPdf) }),
  categoria: String(categoria),
  valor: String(valor),
}));

export const inscricoesEProva = {
  inscricoesInicio: "2026-07-14T16:00:00-03:00",
  inscricoesFim: "2026-08-12T16:00:00-03:00",
  boletoFim: "2026-08-18T23:59:00-03:00",
  boletoProrrogadoEm: DATA_COMUNICADO_PRORROGACAO_PAGAMENTO,
  boletoProrrogacaoFonte: URL_COMUNICADO_PRORROGACAO_PAGAMENTO,
  taxaAgente: 156.36,
  provaData: "2026-10-11T13:00:00-03:00",
  provaFim: "2026-10-11T18:00:00-03:00",
  locaisProvaDisponiveis: "2026-10-05T00:00:00-03:00",
  cidades: ["Curitiba", "Londrina", "Cascavel"],
  questoes: 100,
  pontos: 100,
  alternativas: 5,
  respostasCorretas: 1,
  referencia: oficial({ id: "inscricoes-prova", titulo: "Inscrições e prova objetiva", descricao: "Período de inscrição, taxa, cidades, data, horário e estrutura da prova objetiva", itemEdital: "4.1, 4.1.1.2, 4.2, 4.5, 9.1, 9.2, 9.6 e 9.8", paginaPdf: 11, observacao: "Horários conforme Brasília/DF. Locais de prova devem ser conferidos na página oficial da FGV." }),
};

export const disciplinasAgente: DisciplinaProva[] = [
  ["portugues", "Língua Portuguesa", "Conhecimentos", 25],
  ["raciocinio", "Raciocínio Lógico-Matemático", "Conhecimentos", 5],
  ["realidade-pr", "Realidade do Paraná", "Conhecimentos", 5],
  ["tecnologia", "Tecnologia, Sistemas, Segurança Cibernética e Crimes Digitais", "Conhecimentos", 25],
  ["forenses", "Ciências Forenses", "Conhecimentos", 10],
  ["contabilidade", "Contabilidade Geral", "Conhecimentos", 5],
  ["estatistica", "Estatística", "Conhecimentos", 5],
  ["legislacao", "Legislação Estadual e Institucional", "Legislação", 5],
  ["penal", "Direito Penal", "Direito", 3],
  ["processo-penal", "Direito Processual Penal", "Direito", 3],
  ["constitucional", "Direito Constitucional", "Direito", 3],
  ["administrativo", "Direito Administrativo", "Direito", 3],
  ["direitos-humanos", "Direitos Humanos", "Direito", 3],
].map(([id, titulo, bloco, questoes]) => ({
  ...oficial({ id: `disciplina-${id}`, titulo: String(titulo), descricao: `${questoes} questões na prova objetiva para Agente`, itemEdital: "9.6", paginaPdf: 27 }),
  bloco: String(bloco), questoes: Number(questoes), pontos: Number(questoes),
}));
export const totalQuestoesAgente = disciplinasAgente.reduce((total, disciplina) => total + disciplina.questoes, 0);
export const notaMinimaObjetivaAgente = oficial({ id: "nota-minima-agente", titulo: "Nota mínima objetiva", descricao: "Mínimo de 50 pontos na prova objetiva para Agente", itemEdital: "9.18", paginaPdf: 29 });
export const regioesOficiais: RegiaoOficial[] = [
  { ...oficial({ id: "regiao-interior", titulo: "Interior do Estado", descricao: "Macrorregião com 80% da distribuição para Agente, em cadastro de reserva", itemEdital: "2.8.2, 2.9.1, 2.10, 2.11 e 9.18.1", paginaPdf: 3, observacao: "Pode haver designação para qualquer município da região escolhida e permanência mínima de 3 anos, salvo motivo justificado." }), percentualDistribuicao: 80, reservas: { afrodescendente: 10, pcd: 5 }, barreiras: { ampla: 1360, afrodescendente: 160, pcd: 80 } },
  { ...oficial({ id: "regiao-curitiba-rmc", titulo: "Curitiba e Região Metropolitana", descricao: "Macrorregião com 20% da distribuição para Agente, em cadastro de reserva", itemEdital: "2.8.2, 2.9.1, 2.10, 2.11 e 9.18.2", paginaPdf: 3, observacao: "Pode haver designação para qualquer município da região escolhida e permanência mínima de 3 anos, salvo motivo justificado." }), percentualDistribuicao: 20, reservas: { afrodescendente: 10, pcd: 5 }, barreiras: { ampla: 340, afrodescendente: 40, pcd: 20 } },
];

const etapasBase = [
  ["inscricao-preliminar", 1, "Inscrição preliminar", "Inscrições encerradas em 12/08/2026 às 16h. Pagamento prorrogado até 18/08/2026 às 23h59.", "2026-07-14", "prorrogado", "Inscrição pela página da FGV. O período de inscrições permanece encerrado; a prorrogação vale exclusivamente para pagamento da taxa de inscrição.", ["Conferir inscrição já realizada", "Salvar comprovante", "Pagar boleto até 18/08/2026 às 23h59"], "4.1 a 4.5", 11],
  ["prova-objetiva", 2, "Prova objetiva", "11/10/2026, das 13h às 18h", "2026-10-11", "prevista", "Prova objetiva com 100 questões, 100 pontos, cinco alternativas e uma resposta correta.", ["Locais a partir de 05/10/2026", "Documento oficial", "Curitiba, Londrina e Cascavel"], "9.1, 9.2, 9.6 e 9.8", 25],
  ["inspecao-saude", 3, "Inspeção de saúde", "Data ainda não divulgada oficialmente.", "", "prevista", "Etapa eliminatória para análise de exames médicos, laboratoriais, de imagem e toxicológico.", ["Exames por conta do candidato", "Validade máxima de 90 dias", "Laudos identificados"], "12.1 a 12.17", 38],
  ["aptidao-fisica", 4, "Aptidão física", "Data ainda não divulgada oficialmente.", "", "prevista", "TAF com aprovação obrigatória em todos os exercícios do Anexo IV.", ["Atestado médico", "Documento oficial", "Índices por sexo e idade"], "13 e Anexo IV", 40],
  ["avaliacao-psicologica", 5, "Avaliação psicológica", "Data ainda não divulgada oficialmente.", "", "prevista", "Avaliação psicológica conforme critérios e convocações oficiais.", ["Ler convocação", "Levar documento", "Acompanhar FGV"], "14", 42],
  ["investigacao-social", 6, "Investigação social", "Data ainda não divulgada oficialmente.", "", "prevista", "Investigação social com conferência documental e análise de requisitos de conduta.", ["Organizar certidões", "Conferir prazos", "Guardar protocolos"], "15", 45],
  ["avaliacao-titulos", 7, "Avaliação de títulos", "Data ainda não divulgada oficialmente.", "", "prevista", "Pontuação complementar limitada a 15,5 pontos para Agente.", ["Digitalizar diplomas", "Comprovar tempo completo", "Respeitar limites"], "17", 51],
  ["classificacao-final", 8, "Classificação final", "Data ainda não divulgada oficialmente.", "", "prevista", "Resultado final após fases eliminatórias, classificatórias, recursos e homologação.", ["Acompanhar FGV", "Conferir Diário Oficial", "Guardar publicações"], "18", 54],
  ["curso-formacao-nomeacao", 9, "Curso de formação e eventual nomeação", "Data ainda não divulgada oficialmente.", "", "prevista", "Nomeação eventual condicionada à conveniência, oportunidade e necessidade da administração.", ["Cadastro de reserva", "Sem direito automático", "Atender requisitos"], "1.1.2 e 2.4", 1],
] as const;
export const etapasOficiais: EtapaOficial[] = etapasBase.map(([id, ordem, titulo, periodo, data, status, descricao, checklist, itemEdital, paginaPdf]) => ({
  ...oficial({ id, titulo, descricao, itemEdital, paginaPdf }), ordem, periodo, data: data || undefined, status, checklist: [...checklist],
}));

const tafBase = (sexo: SexoBiologico, ordem: number, exercicio: string, tentativas: number, criterio: string, indices: Record<FaixaEtaria, string>): TafIndice => ({
  ...oficial({ id: `taf-${sexo}-${ordem}`, titulo: exercicio, descricao: `Índice oficial do TAF para sexo ${sexo}.`, itemEdital: "Anexo IV", paginaPdf: 78, observacao: "Aprovação exige atingir o índice mínimo em todos os exercícios. Exercícios com até duas tentativas possuem intervalo mínimo de 10 minutos." }),
  sexo, ordem, exercicio, tentativas, intervaloMinutos: tentativas > 1 ? 10 : undefined, criterio, indices,
});
export const tafIndices: TafIndice[] = [
  tafBase("masculino", 1, "Flexão de braços em barra fixa", 2, "Repetições", { "ate-29": "5 repetições", "30-39": "4 repetições", "40-49": "3 repetições", "50-mais": "2 repetições" }),
  tafBase("masculino", 2, "Flexão abdominal remador", 2, "Repetições em 1 minuto", { "ate-29": "35 repetições", "30-39": "30 repetições", "40-49": "25 repetições", "50-mais": "20 repetições" }),
  tafBase("masculino", 3, "Shuttle Run 9,14 m x 4", 2, "Tempo máximo para 36,56 m", { "ate-29": "até 11 s", "30-39": "até 12 s", "40-49": "até 13 s", "50-mais": "até 14 s" }),
  tafBase("masculino", 4, "Escalada em corda", 2, "Altura em 1 minuto", { "ate-29": "4,00 m", "30-39": "3,80 m", "40-49": "3,60 m", "50-mais": "3,40 m" }),
  tafBase("masculino", 5, "Cooper de 12 minutos", 1, "Distância mínima", { "ate-29": "2.400 m", "30-39": "2.300 m", "40-49": "2.200 m", "50-mais": "2.000 m" }),
  tafBase("feminino", 1, "Isometria de braços em flexão em barra fixa", 2, "Tempo mínimo", { "ate-29": "25 s", "30-39": "20 s", "40-49": "15 s", "50-mais": "10 s" }),
  tafBase("feminino", 2, "Flexão abdominal remador", 2, "Repetições em 1 minuto", { "ate-29": "30 repetições", "30-39": "25 repetições", "40-49": "20 repetições", "50-mais": "15 repetições" }),
  tafBase("feminino", 3, "Shuttle Run 9,14 m x 4", 2, "Tempo máximo para 36,56 m", { "ate-29": "até 13 s", "30-39": "até 14 s", "40-49": "até 15 s", "50-mais": "até 16 s" }),
  tafBase("feminino", 4, "Escalada em corda", 2, "Altura em 1 minuto", { "ate-29": "3,60 m", "30-39": "3,40 m", "40-49": "3,20 m", "50-mais": "3,00 m" }),
  tafBase("feminino", 5, "Cooper de 12 minutos", 1, "Distância mínima", { "ate-29": "2.000 m", "30-39": "1.900 m", "40-49": "1.800 m", "50-mais": "1.600 m" }),
];
export const regrasTafOficiais = oficial({ id: "regras-taf", titulo: "Regras do TAF", descricao: "TAF eliminatório, com APTO/INAPTO e aprovação exigida em todos os exercícios.", itemEdital: "13.1 a 13.17", paginaPdf: 40 });
export const examesOficiais: ExameOficial[] = [
  { ...oficial({ id: "exames-laboratoriais", titulo: "Exames laboratoriais", descricao: "Hemograma, glicemia, HbA1c, enzimas hepáticas, tireoide, lipidograma, ureia e creatinina.", itemEdital: "12.5", paginaPdf: 38 }), categoria: "laboratorial", finalidade: "Avaliar parâmetros de saúde definidos para a inspeção.", preparo: ["Hemograma completo com plaquetas", "Glicemia", "Hemoglobina glicada", "TGO", "TGP", "Gamma GT", "Fosfatase alcalina", "TSH", "T4 livre", "Lipidograma completo", "Ureia", "Creatinina"], validade: "Realizados no máximo 90 dias antes da convocação.", documentos: ["Resultado legível", "Identificação do candidato", "Assinatura física ou digital quando aplicável"], errosDocumentais: ["Resultado sem identificação", "Exame fora da validade", "Resultado online sem assinatura ou dependente de senha"] },
  { ...oficial({ id: "toxologico", titulo: "Exame toxicológico", descricao: "Larga janela de detecção, negativo por pelo menos 90 dias para substâncias listadas.", itemEdital: "12.4", paginaPdf: 38 }), categoria: "toxicológico", finalidade: "Verificar resultado negativo em janela mínima de 90 dias.", preparo: ["Confirmar janela de detecção", "Conferir substâncias exigidas", "Guardar laudo completo"], validade: "Janela mínima de detecção de 90 dias.", documentos: ["Laudo toxicológico", "Identificação do laboratório", "Resultado negativo para substâncias exigidas"], errosDocumentais: ["Janela incompatível", "Substâncias incompletas", "Laudo sem assinatura ou identificação"] },
  { ...oficial({ id: "avaliacao-oftalmologica", titulo: "Avaliação oftalmológica", descricao: "Acuidade visual, daltonismo, campimetria e fundoscopia.", itemEdital: "12.6.1", paginaPdf: 38 }), categoria: "especializada", finalidade: "Registrar parâmetros oftalmológicos exigidos.", preparo: ["Agendar especialista", "Solicitar relatório específico", "Conferir CRM e RQE"], validade: "Conforme convocação e regra geral de 90 dias quando aplicável.", documentos: ["Relatório específico", "Data", "Assinatura", "CRM", "RQE"], errosDocumentais: ["Ausência de RQE", "Parâmetro não descrito", "Relatório sem data ou assinatura"] },
  { ...oficial({ id: "avaliacao-otorrino", titulo: "Avaliação otorrinolaringológica", descricao: "Audiometria e nasofibrolaringoscopia.", itemEdital: "12.6.2", paginaPdf: 38 }), categoria: "especializada", finalidade: "Avaliar condições otorrinolaringológicas conforme edital.", preparo: ["Audiometria", "Nasofibrolaringoscopia", "Relatório do especialista"], validade: "Conforme convocação e regra geral de 90 dias quando aplicável.", documentos: ["Relatório específico", "Exames anexos", "CRM e RQE"], errosDocumentais: ["Exame sem laudo", "Especialidade não identificada", "Documento incompleto"] },
  { ...oficial({ id: "avaliacao-cardiovascular", titulo: "Avaliação cardiovascular", descricao: "Avaliação cardiovascular completa, teste ergométrico e angiotomografia se houver alteração.", itemEdital: "12.6.3", paginaPdf: 39 }), categoria: "especializada/imagem", finalidade: "Avaliar condições cardiovasculares e exames complementares quando necessários.", preparo: ["Consulta cardiovascular", "Teste ergométrico", "Angiotomografia se indicada"], validade: "Conforme convocação e regra geral de 90 dias quando aplicável.", documentos: ["Relatório específico", "Teste ergométrico", "Exame complementar quando indicado", "CRM e RQE"], errosDocumentais: ["Teste ausente", "Alteração sem complemento exigido", "Relatório sem identificação profissional"] },
];

export const causasIncapacitantes: CausaIncapacitante[] = [
  ["grupo-i", "Grupo I", "Doenças ou deformidades congênitas e adquiridas"],
  ["grupo-ii", "Grupo II", "Doenças infecciosas e parasitárias"],
  ["grupo-iii", "Grupo III", "Doenças, alterações e disfunções endócrinas, metabólicas e nutricionais descompensadas"],
  ["grupo-iv", "Grupo IV", "Doenças e alterações do sangue, órgãos hematopoéticos e sistema imunitário"],
  ["grupo-v", "Grupo V", "Doenças e transtornos mentais e de comportamento"],
  ["grupo-vi", "Grupo VI", "Doenças e alterações otorrinolaringológicas"],
  ["grupo-vii", "Grupo VII", "Doenças e alterações do sistema cardiovascular"],
  ["grupo-viii", "Grupo VIII", "Doenças broncopulmonares"],
  ["grupo-ix", "Grupo IX", "Doenças do aparelho digestivo"],
  ["grupo-x", "Grupo X", "Doenças do aparelho genito-urinário e mama"],
  ["grupo-xi", "Grupo XI", "Doenças e alterações da pele e subcutâneo"],
  ["grupo-xii", "Grupo XII", "Doenças do sistema músculo esquelético"],
  ["grupo-xiii", "Grupo XIII", "Doenças do sistema nervoso"],
  ["grupo-xiv", "Grupo XIV", "Doenças oftalmológicas"],
].map(([id, grupo, titulo]) => ({ ...oficial({ id, titulo, descricao: titulo, itemEdital: "Anexo V", paginaPdf: 89, observacao: "Resumo categorizado. A lista completa e os critérios médicos específicos prevalecem conforme Anexo V." }), grupo, exemplos: ["Condição incompatível com as atribuições", "Alteração potencialmente incapacitante conforme critérios do edital"] }));

export const titulosOficiais: TituloOficial[] = [
  ["doutorado", "Doutorado", "Formação acadêmica", 2, "título", 2, "Diploma de doutorado em qualquer área"],
  ["mestrado", "Mestrado", "Formação acadêmica", 1.5, "título", 1.5, "Diploma de mestrado em qualquer área"],
  ["especializacao", "Especialização lato sensu", "Formação acadêmica", 1, "título", 1, "Certificado lato sensu com mínimo de 360 horas"],
  ["atividade-policial", "Atividade policial", "Experiência profissional", 1, "ano completo", 4, "Comprovação de atividade policial por ano completo"],
  ["docencia-escola-policial", "Docência em Escola Superior de Polícia Civil", "Experiência docente", 0.5, "40 h/aula por ano completo", 2, "Comprovação de docência em Escola Superior de Polícia Civil"],
  ["forcas-armadas", "Forças Armadas", "Experiência profissional", 0.5, "ano completo", 2, "Comprovação de atividade nas Forças Armadas"],
  ["socioeducativo-guarda", "Segurança socioeducativa ou Guarda Municipal", "Experiência profissional", 0.5, "ano completo", 2, "Comprovação como Agente de Segurança Socioeducativo ou Guarda Municipal"],
  ["administrativo-estagio", "Atividade administrativa ou estágio em unidade policial civil", "Experiência administrativa", 0.25, "ano completo", 1, "Comprovação de atividade administrativa ou estágio em unidade policial civil"],
].map(([id, titulo, tipoTitulo, pontosPorUnidade, unidade, limite, comprovacao]) => ({ ...oficial({ id: `titulo-${id}`, titulo: String(titulo), descricao: `Pontuação oficial para ${String(titulo)}.`, itemEdital: "17.4", paginaPdf: 51 }), tipoTitulo: String(tipoTitulo), pontosPorUnidade: Number(pontosPorUnidade), unidade: String(unidade), limite: Number(limite), comprovacao: String(comprovacao) }));
export const limiteTotalTitulos = 15.5;
export const notaFinalMaximaAgente = 115.5;

export function calcularPontuacaoTitulos(valores: Record<string, number>) {
  const itens = titulosOficiais.map((titulo) => {
    const quantidade = Math.max(0, Number.isFinite(valores[titulo.id]) ? valores[titulo.id] : 0);
    const pontos = Math.min(titulo.limite, quantidade * titulo.pontosPorUnidade);
    return { id: titulo.id, titulo: titulo.titulo, pontos };
  });
  return { itens, total: Math.min(limiteTotalTitulos, itens.reduce((soma, item) => soma + item.pontos, 0)) };
}
export function obterBarreira(regiaoId: string, modalidade: ModalidadeCota) {
  return regioesOficiais.find((regiao) => regiao.id === regiaoId)?.barreiras[modalidade] ?? regioesOficiais[0].barreiras[modalidade];
}
export function obterStatusConcurso(agora = new Date()): StatusConcurso {
  const t = agora.getTime();
  const inicio = new Date(inscricoesEProva.inscricoesInicio).getTime();
  const fimInscricao = new Date(inscricoesEProva.inscricoesFim).getTime();
  const fimBoleto = new Date(inscricoesEProva.boletoFim).getTime();
  const locais = new Date(inscricoesEProva.locaisProvaDisponiveis).getTime();
  const provaInicio = new Date(inscricoesEProva.provaData).getTime();
  const provaFim = new Date(inscricoesEProva.provaFim).getTime();
  if (t < inicio) return { id: "antes-inscricao", titulo: "Inscrições ainda não abertas", descricao: "Aguarde a abertura oficial das inscrições pela FGV.", dataAlvo: inscricoesEProva.inscricoesInicio, etapaAtualId: "inscricao-preliminar" };
  if (t <= fimInscricao) return { id: "inscricoes-abertas", titulo: "Inscrições abertas", descricao: "Inscrições disponíveis na FGV até 12/08/2026 às 16h.", dataAlvo: inscricoesEProva.inscricoesFim, etapaAtualId: "inscricao-preliminar" };
  if (t <= fimBoleto) return { id: "boleto-prorrogado", titulo: "Pagamento prorrogado", descricao: "Inscrições encerradas. Pagamento da taxa prorrogado pela FGV até 18/08/2026 às 23h59, somente para candidatos já inscritos.", dataAlvo: inscricoesEProva.boletoFim, etapaAtualId: "inscricao-preliminar" };
  if (t < locais) return { id: "aguardando-locais", titulo: "Aguardando locais de prova", descricao: "Locais previstos para divulgação a partir de 05/10/2026.", dataAlvo: inscricoesEProva.locaisProvaDisponiveis, etapaAtualId: "prova-objetiva" };
  if (t < provaInicio) return { id: "locais-disponiveis", titulo: "Locais de prova disponíveis", descricao: "Confira endereço e horário exclusivamente na FGV.", dataAlvo: inscricoesEProva.provaData, etapaAtualId: "prova-objetiva" };
  if (t <= provaFim) return { id: "prova-em-andamento", titulo: "Prova objetiva em realização", descricao: "Prova objetiva prevista das 13h às 18h.", dataAlvo: inscricoesEProva.provaFim, etapaAtualId: "prova-objetiva" };
  return { id: "apos-prova", titulo: "Aguardando resultado e convocações", descricao: "Somente após a prova objetiva avançam saúde, TAF e demais fases, conforme convocações oficiais.", etapaAtualId: "inspecao-saude" };
}
export const atualizacoesEdital = [{ ...oficial({ id: "atualizacao-2026-07-19-edital", titulo: "Migração dos dados oficiais do edital", descricao: "Dados gerais, inscrição, prova, regiões, barreiras, TAF, exames e títulos passam a consumir estrutura oficial separada.", itemEdital: "Edital completo", paginaPdf: 1 }), data: DATA_CONFERENCIA_EDITAL, responsavelConferencia: "Equipe do projeto acadêmico", versaoPortal: VERSAO_PORTAL }];
