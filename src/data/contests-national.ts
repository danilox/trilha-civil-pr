import type { Contest, ContestSource, ContestModule } from "@/types/contest";

const ap = "https://www.cesgranrio.org.br/publicado-edital-do-concurso-da-policia-civil-do-amapa/";
const al = "https://www.cebraspe.org.br/pmal-reabre-inscricoes-em-concurso-publico-para-admissao-aos-cursos-de-formacao-de-oficiais-e-pracas/";
const sp = "https://concursos.policiamilitar.sp.gov.br/concursos/edital-dp-3-321-26-concurso-para-aluno-soldado-pm/";
const rs = "https://www.pc.rs.gov.br/concurso-publico-para-escrivao-e-inspetor-2025";
const rsDelegado = "https://www.pc.rs.gov.br/concurso-publico-para-delegado-de-policia-2025";
const ba = "https://noticias.institutoaocp.org.br/blog/inscricoes-do-concurso-da-policia-civil-da-bahiaestao-prorrogadas-ate-13-de-setembro/";
const baEdital = "https://noticias.institutoaocp.org.br/blog/pcba-divulga-edital-do-concurso-publico-para-delegado-escrivao-e-investigador/";
const ma = "https://www.cebraspe.org.br/policia-civil-do-maranhao-abre-concurso-publico-para-delegado/";
const maInvestigador = "https://www.cebraspe.org.br/pcma-divulga-concurso-publico-para-oficial-investigador-de-policia/";
const pcpe = "https://www.cebraspe.org.br/policia-civil-de-pernambuco-divulga-concurso-publico-para-agente-delegado-e-escrivao-de-policia/";
const pmpe = "https://www.institutoaocp.org.br/concursos/714";
const pmpeExtension = "https://noticias.institutoaocp.org.br/blog/pm-e-bombeiros-de-pernambuco-tem-prazo-de-inscricao-estendido/";
const cbmpe = "https://beta.institutoaocp.org.br/concursos/715";
const cbmal = "https://www.cebraspe.org.br/reabertura-de-inscricoes-em-selecao-do-cbm-al-destinado-aos-cursos-de-formacao-de-oficiais-e-de-pracas/";
const cbmerj = "https://www.cbmerj.rj.gov.br/cursos-e-concursos/";
const cbmerjEdital = "https://www.cbmerj.rj.gov.br/wp-content/uploads/2026/10/02-10-2026-Edital-de-Abertura-RETIFICADO-Processo-Seletivo-de-Ingresso-para-o-SMTV-%E2%80%93-Edital-no-01-2026-.pdf";
const source = (url: string, title: string, type: ContestSource["type"], publishedAt?: string, consultedAt = "2026-09-22"): ContestSource => ({ url, title, type, publishedAt, consultedAt, official: true });
const moduleOf = (id: ContestModule["id"], title: string, text: string, sourceUrl?: string): ContestModule => ({ id, title, text, sourceUrl });

export const additionalContests: Contest[] = [
  {
    slug: "pc-pe-2026", nome: "Polícia Civil de Pernambuco", sigla: "PC-PE 2026", titulo: "Concurso PC-PE 2026",
    estado: "Pernambuco", categoria: "Polícia Civil", status: "inscricoes-abertas", faseAtual: "Inscrições abertas",
    banca: "Cebraspe", cargos: ["Agente de Polícia", "Escrivão de Polícia", "Delegado de Polícia"],
    escolaridade: "Nível superior; requisitos específicos por cargo", vagas: "1.315 vagas",
    salarioInicial: "R$ 5.667,92 (Agente e Escrivão) · R$ 13.560,00 (Delegado)",
    inscricoesInicio: "2026-10-15", inscricoesFim: "2026-12-16", dataProva: "2027-03-07", fonteOficial: pcpe, ultimaAtualizacao: "2026-10-19",
    descricao: "Novo concurso da Polícia Civil de Pernambuco para Agente, Escrivão e Delegado, com inscrições abertas pelo Cebraspe.", destaque: "1.315 vagas", href: "/concursos/pc-pe-2026", proximoEvento: "Inscrições até 16/12/2026; provas de Agente e Escrivão em 07/03/2027",
    sources: [source(pcpe, "Cebraspe — concurso PC-PE 2026", "edital", "2026-10-19", "2026-10-19"), source("https://www.cebraspe.org.br/concursos/PC_PE_26", "Cebraspe — página de acompanhamento PC-PE 2026", "inscricao", undefined, "2026-10-19")],
    events: [{ date: "2026-10-19", type: "edital", title: "Cebraspe divulga o concurso PC-PE 2026", summary: "Seleção oferta 1.315 vagas para Agente, Escrivão e Delegado. Inscrições seguem até 16/12.", sourceUrl: pcpe }, { date: "2026-10-15", type: "inscricao", title: "Início das inscrições", summary: "Solicitações de inscrição abertas no Cebraspe.", sourceUrl: pcpe }],
    modules: [moduleOf("edital", "Edital e acompanhamento", "O concurso oferece 1.315 vagas para Agente, Escrivão e Delegado. Consulte o edital e eventuais retificações no Cebraspe.", pcpe), moduleOf("requisitos", "Requisitos", "Agente e Escrivão exigem curso superior em qualquer área e CNH, no mínimo, categoria B. Delegado possui requisitos próprios previstos no edital.", pcpe), moduleOf("cronograma", "Cronograma", "Inscrições: 15/10 a 16/12/2026. Pagamento até 18/12. Agente e Escrivão: provas em 07/03/2027. Delegado: provas em 14/03/2027.", pcpe), moduleOf("prova", "Provas", "Agente e Escrivão terão provas objetiva e discursiva em 07/03/2027. Delegado terá prova objetiva e discursiva em 14/03/2027.", pcpe)],
  },
  {
    slug: "pm-pe-2026", nome: "Polícia Militar de Pernambuco", sigla: "PM-PE 2026", titulo: "Concurso PM-PE 2026",
    estado: "Pernambuco", categoria: "Polícia Militar", status: "inscricoes-abertas", faseAtual: "Inscrições abertas — prazo prorrogado",
    banca: "Instituto AOCP", cargos: ["Soldado", "Oficial QOPM", "Oficiais da Saúde"], escolaridade: "Nível médio e superior, conforme o cargo",
    vagas: "1.320 vagas (1.250 Soldado e 70 Oficial)", salarioInicial: "R$ 5.617,92 (Soldado) · até R$ 12.937,33 (Oficial)",
    inscricoesInicio: "2026-09-30", inscricoesFim: "2026-11-23", dataProva: "2027-02-21", fonteOficial: pmpe, ultimaAtualizacao: "2026-10-19",
    descricao: "Concurso estatutário da PMPE para Soldado e Oficiais. O Instituto AOCP prorrogou o prazo de inscrição.", destaque: "Prazo prorrogado", href: "/concursos/pm-pe-2026", proximoEvento: "Inscrições prorrogadas até 23/11/2026",
    sources: [source(pmpe, "Instituto AOCP — concurso PMPE 001/2026", "edital", "2026-09-30", "2026-10-19"), source(pmpeExtension, "Instituto AOCP — prorrogação das inscrições PMPE/CBMPE", "retificacao", undefined, "2026-10-19")],
    events: [{ date: "2026-10-16", type: "retificacao", title: "Prazo de inscrição prorrogado", summary: "O Instituto AOCP informou que as inscrições passam a seguir até 23/11/2026.", sourceUrl: pmpeExtension }, { date: "2026-09-30", type: "edital", title: "Edital de abertura", summary: "Concurso para 1.250 vagas de Soldado e 70 vagas de Oficial.", sourceUrl: pmpe }],
    modules: [moduleOf("edital", "Edital", "Concurso Público nº 001/2026 da Polícia Militar de Pernambuco.", pmpe), moduleOf("requisitos", "Requisitos", "Soldado exige ensino médio. Há vagas de Oficial QOPM e Oficiais da Saúde com requisitos de nível superior específicos.", pmpeExtension), moduleOf("cronograma", "Cronograma", "Inscrições prorrogadas até 23/11/2026. Prova objetiva prevista para 21/02/2027.", pmpeExtension), moduleOf("prova", "Prova", "Prova objetiva prevista para 21/02/2027. Consulte local, horário e eventuais retificações na banca.", pmpeExtension), moduleOf("taf", "Etapas físicas e demais fases", "O concurso possui etapas posteriores previstas em edital. Acompanhe as convocações individualizadas no Instituto AOCP.", pmpe)],
  },
  {
    slug: "cbm-pe-2026", nome: "Corpo de Bombeiros Militar de Pernambuco", sigla: "CBM-PE 2026", titulo: "Concurso CBM-PE 2026",
    estado: "Pernambuco", categoria: "Bombeiros", status: "inscricoes-abertas", faseAtual: "Inscrições abertas — prazo prorrogado",
    banca: "Instituto AOCP", cargos: ["Soldado", "2º Tenente — Oficial Combatente"], escolaridade: "Ensino médio para Soldado; superior para Oficial",
    vagas: "570 vagas (510 Soldado e 60 Oficial)", salarioInicial: "R$ 5.617,92 (Soldado) · R$ 12.937,33 (Oficial)",
    inscricoesInicio: "2026-09-30", inscricoesFim: "2026-11-23", dataProva: "2027-02-28", fonteOficial: cbmpe, ultimaAtualizacao: "2026-10-19",
    descricao: "Concurso estatutário do CBMPE para Soldado e Oficial Combatente, organizado pelo Instituto AOCP.", destaque: "570 vagas", href: "/concursos/cbm-pe-2026", proximoEvento: "Inscrições prorrogadas até 23/11/2026",
    sources: [source(cbmpe, "Instituto AOCP — concurso CBMPE 002/2026", "edital", "2026-09-30", "2026-10-19"), source(pmpeExtension, "Instituto AOCP — prorrogação das inscrições PMPE/CBMPE", "retificacao", undefined, "2026-10-19")],
    events: [{ date: "2026-10-16", type: "retificacao", title: "Prazo de inscrição prorrogado", summary: "O Instituto AOCP informou novo término em 23/11/2026.", sourceUrl: pmpeExtension }, { date: "2026-09-30", type: "edital", title: "Edital de abertura", summary: "Concurso para 510 vagas de Soldado e 60 vagas de Oficial Combatente.", sourceUrl: cbmpe }],
    modules: [moduleOf("edital", "Edital", "Concurso Público nº 002/2026 do Corpo de Bombeiros Militar de Pernambuco.", cbmpe), moduleOf("requisitos", "Requisitos", "Soldado exige ensino médio; Oficial Combatente exige nível superior. Confira idade, altura e demais requisitos no edital.", pmpeExtension), moduleOf("cronograma", "Cronograma", "Inscrições prorrogadas até 23/11/2026. Prova objetiva prevista para 28/02/2027.", pmpeExtension), moduleOf("prova", "Prova", "Prova objetiva prevista para 28/02/2027. Consulte a banca para local e horário.", pmpeExtension), moduleOf("taf", "Etapas posteriores", "TAF e demais etapas seguem o edital e as convocações oficiais do certame.", cbmpe)],
  },
  {
    slug: "cbm-al-2026", nome: "Corpo de Bombeiros Militar de Alagoas", sigla: "CBM-AL 2026", titulo: "Concurso CBM-AL 2026",
    estado: "Alagoas", categoria: "Bombeiros", status: "inscricoes-abertas", faseAtual: "Inscrições reabertas",
    banca: "Cebraspe", cargos: ["Oficial de Estado-Maior", "Soldado QPBM/1", "Soldado QPBM/2"], vagas: "172 vagas imediatas e cadastro de reserva",
    inscricoesInicio: "2026-09-18", inscricoesFim: "2026-10-26", dataProva: "2027-01-24", fonteOficial: cbmal, ultimaAtualizacao: "2026-10-19",
    descricao: "Inscrições reabertas para formação de oficiais e praças do CBM-AL, com novo cronograma.", destaque: "Até 26/10", href: "/concursos/cbm-al-2026", proximoEvento: "Encerramento das inscrições em 26/10/2026",
    sources: [source(cbmal, "Cebraspe — reabertura das inscrições CBM-AL", "retificacao", "2026-09-17", "2026-10-19"), source("https://www.cebraspe.org.br/concursos/CBM_AL_26", "Cebraspe — página do concurso CBM-AL", "edital", undefined, "2026-10-19")],
    events: [{ date: "2026-09-17", type: "retificacao", title: "Inscrições reabertas e cronograma alterado", summary: "Solicitações de inscrição de 18/09 a 26/10; provas previstas para 24/01/2027.", sourceUrl: cbmal }],
    modules: [moduleOf("edital", "Edital e retificações", "Concurso para Oficial de Estado-Maior e Soldados QPBM/1 e QPBM/2, com 172 vagas imediatas e cadastro de reserva.", cbmal), moduleOf("cronograma", "Cronograma", "Inscrições: 18/09 a 26/10/2026. Pagamento até 28/10. Provas objetiva e discursiva em 24/01/2027.", cbmal), moduleOf("prova", "Provas", "Provas objetivas e discursiva previstas para 24/01/2027.", cbmal), moduleOf("taf", "Etapas posteriores", "TAF, avaliação médica, psicológica e procedimentos de verificação estão previstos para candidatos convocados.", cbmal)],
  },
  {
    slug: "cbmerj-smtv-2026", nome: "Corpo de Bombeiros Militar do Estado do Rio de Janeiro", sigla: "CBMERJ SMTV 2026", titulo: "CBMERJ SMTV 2026 — Oficiais Especialistas",
    estado: "Rio de Janeiro", categoria: "Bombeiros", status: "inscricoes-abertas", faseAtual: "Inscrições abertas — Serviço Militar Temporário Voluntário",
    banca: "Instituto AOCP", cargos: ["1º Tenente BM Temporário Especialista"], escolaridade: "Nível superior e especialização/requisitos profissionais conforme a vaga",
    vagas: "192 vagas", salarioInicial: "R$ 10.466,77 no estágio · R$ 12.279,71 após o estágio",
    inscricoesInicio: "2026-10-19", inscricoesFim: "2026-11-09", fonteOficial: cbmerj, ultimaAtualizacao: "2026-10-19",
    descricao: "Processo seletivo simplificado para Oficiais Especialistas do Serviço Militar Temporário Voluntário. Não se trata de cargo efetivo.", destaque: "Temporário", href: "/concursos/cbmerj-smtv-2026", proximoEvento: "Inscrições até 09/11; cadastro e envio de títulos de 20/10 a 19/11/2026",
    sources: [source(cbmerj, "CBMERJ — cursos e concursos", "edital", "2026-10-19", "2026-10-19"), source(cbmerjEdital, "CBMERJ — Edital nº 01/2026 retificado em 19/10/2026", "retificacao", "2026-10-19", "2026-10-19")],
    events: [{ date: "2026-10-19", type: "retificacao", title: "Edital retificado e inscrições iniciadas", summary: "O edital retificado confirma 192 vagas para 1º Tenente BM Temporário Especialista e inscrições de 19/10 a 09/11.", sourceUrl: cbmerjEdital }],
    modules: [moduleOf("edital", "Processo seletivo temporário", "São 192 vagas para 1º Tenente BM Temporário Especialista. O vínculo é temporário e não deve ser confundido com cargo efetivo.", cbmerjEdital), moduleOf("requisitos", "Especialidades e requisitos", "Há vagas para especialidades médicas, odontológicas e outras áreas profissionais, com graduação, registro e qualificações específicas conforme o edital.", cbmerjEdital), moduleOf("cronograma", "Cronograma", "Inscrições e pagamento: 19/10 a 09/11/2026. Cadastro e envio de títulos: 20/10 a 19/11/2026. Resultado preliminar de títulos previsto para 08/12.", cbmerjEdital), moduleOf("titulos", "Prova de títulos", "A primeira etapa é classificatória e baseada na análise de títulos, formação, experiência e produção técnico-científica. Não há prova objetiva neste edital.", cbmerjEdital), moduleOf("documentos", "Demais etapas", "O processo ainda prevê teste ergométrico, exame de saúde, exame documental e investigação social.", cbmerjEdital)],
  },
  {
    slug: "pc-ap-2026", nome: "Polícia Civil do Amapá", sigla: "PC-AP 2026", titulo: "Concurso PC-AP 2026",
    estado: "Amapá", categoria: "Polícia Civil", status: "inscricoes-abertas", faseAtual: "Inscrições",
    banca: "Cesgranrio", cargos: ["Oficial Investigador de Polícia Civil", "Delegado de Polícia Civil"],
    escolaridade: "Superior; requisitos específicos por cargo no edital", vagas: "396 em cadastro de reserva (294 Investigador e 102 Delegado)",
    inscricoesInicio: "2026-09-22", inscricoesFim: "2026-10-19", dataProva: "2026-12-06", fonteOficial: ap, ultimaAtualizacao: "2026-10-19",
    descricao: "Seleção para cadastro de reserva de Oficial Investigador e Delegado, organizada pela Cesgranrio.", destaque: "Inscrições", href: "/concursos/pc-ap-2026", proximoEvento: "Último dia de inscrições: 19/10/2026",
    sources: [source(ap, "Cesgranrio — edital, carreiras e cronograma", "edital", "2026-09-16"), source("https://sead.portal.ap.gov.br/concursos/vigentes/49603", "SEAD Amapá — publicações do concurso", "edital", "2026-09-16")],
    events: [{ date: "2026-09-22", type: "inscricao", title: "Início do período de inscrições", summary: "Inscrições previstas de 22/09 a 19/10. Consulte o edital e a área oficial da Cesgranrio.", sourceUrl: ap }, { date: "2026-09-16", type: "edital", title: "Edital de abertura publicado", summary: "Cadastro de reserva para Delegado e Oficial Investigador.", sourceUrl: ap }],
    modules: [moduleOf("edital", "Edital", "Edital nº 001/2026, publicado em 16/09. Cadastro de reserva não garante nomeação.", ap), moduleOf("requisitos", "Requisitos", "Investigador: graduação em qualquer área e CNH B, no mínimo. Delegado: Direito e três anos de atividade jurídica ou policial. Confira todos os requisitos no edital.", ap), moduleOf("cronograma", "Cronograma", "Inscrições: 22/09 a 19/10. Isenção: 22 a 29/09. Pagamento até 03/11. Primeira fase em 06/12/2026.", ap), moduleOf("prova", "Provas", "Objetiva e redação para Investigador; objetiva e dissertativa para Delegado.", ap), moduleOf("taf", "TAF e demais etapas", "O edital prevê aptidão física, exames, avaliação psicológica, investigação social e formação. Delegado também terá prova oral e títulos. Confira índices e convocações na fonte.", ap)],
  },
  {
    slug: "pm-al-2026", nome: "Polícia Militar de Alagoas", sigla: "PM-AL 2026", titulo: "Concurso PM-AL 2026",
    estado: "Alagoas", categoria: "Polícia Militar", status: "prova-proxima", faseAtual: "Inscrições encerradas; preparação para as provas",
    banca: "Cebraspe", cargos: ["Oficial de Estado-Maior", "Soldado do Quadro de Praças"], vagas: "530 imediatas e cadastro de reserva",
    inscricoesInicio: "2026-09-14", inscricoesFim: "2026-10-16", dataProva: "2027-01-17", fonteOficial: al, ultimaAtualizacao: "2026-10-19",
    descricao: "Inscrições encerradas em 16/10; provas previstas para 17/01/2027, conforme cronograma do Cebraspe.", destaque: "Prova em janeiro", href: "/concursos/pm-al-2026", proximoEvento: "Provas objetiva e discursiva previstas para 17/01/2027",
    sources: [source(al, "Cebraspe — reabertura e novo cronograma", "retificacao", "2026-09-17"), source("https://www.cebraspe.org.br/concursos/PM_AL_26", "Página do concurso PM/AL", "edital")],
    events: [{ date: "2026-09-17", type: "retificacao", title: "Cebraspe divulga novo cronograma", summary: "Reabertura de 14/09 a 16/10; provas previstas para 17/01/2027.", sourceUrl: al }],
    modules: [moduleOf("edital", "Edital e retificações", "Consulte o edital vigente e as alterações na página do Cebraspe.", "https://www.cebraspe.org.br/concursos/PM_AL_26"), moduleOf("cronograma", "Cronograma", "Inscrições de 14/09 a 16/10; pagamento até 20/10/2026; provas objetiva e discursiva em 17/01/2027.", al), moduleOf("prova", "Provas", "Aplicação prevista em Arapiraca e Maceió. Consulte sua convocação para endereço e horário.", al), moduleOf("taf", "Etapas posteriores", "TAF, avaliação médica e psicológica estão previstos. As datas individuais dependem de convocação oficial.", al)],
  },
  {
    slug: "pm-sp", nome: "Polícia Militar do Estado de São Paulo", sigla: "PM-SP 2026", titulo: "PM-SP 2026 — Aluno-Soldado",
    estado: "São Paulo", categoria: "Polícia Militar", status: "pos-prova", faseAtual: "Pós-prova — acompanhar gabaritos e resultados",
    banca: "Vunesp", cargos: ["Aluno-Soldado PM"], vagas: "2.000", inscricoesInicio: "2026-06-15", inscricoesFim: "2026-08-21", dataProva: "2026-09-20", fonteOficial: sp, ultimaAtualizacao: "2026-09-22",
    descricao: "Acompanhamento do edital DP-3/321/26 para Aluno-Soldado, com consulta às publicações da PMESP e Vunesp.", destaque: "Pós-prova", href: "/concursos/pm-sp", proximoEvento: "Gabarito e resultados: confirmar publicação na Vunesp",
    sources: [source(sp, "PMESP — edital DP-3/321/26", "edital"), source("https://concursos.policiamilitar.sp.gov.br/", "PMESP — convocação e data do exame", "prova")],
    events: [{ date: "2026-09-20", type: "prova", title: "Data prevista para os exames de conhecimentos", summary: "Etapa prevista no calendário oficial da PMESP. Acompanhe os atos posteriores da banca.", sourceUrl: "https://concursos.policiamilitar.sp.gov.br/" }],
    modules: [moduleOf("edital", "Edital", "DP-3/321/26: seleção para 2.000 cargos de Aluno-Soldado PM. Outros editais da PMESP têm cronogramas próprios.", sp), moduleOf("cronograma", "Cronograma", "Inscrições encerradas em 21/08. Exames de conhecimentos previstos para 20/09/2026.", sp), moduleOf("prova", "Prova e gabarito", "Gabarito: aguardando confirmação oficial nesta conferência. Consulte os arquivos da Vunesp pelo link disponível na página da PMESP.", sp), moduleOf("resultados", "Resultados e próximas etapas", "Aguardando confirmação oficial de resultados e convocações deste edital. Não utilize cronogramas de outros concursos da PMESP.", sp)],
  },
  {
    slug: "pc-rs", nome: "Polícia Civil do Rio Grande do Sul", sigla: "PC-RS", titulo: "PC-RS — acompanhamento dos concursos de 2025",
    estado: "Rio Grande do Sul", categoria: "Polícia Civil", status: "em-andamento", faseAtual: "Etapas distintas por carreira",
    cargos: ["Escrivão de Polícia", "Inspetor de Polícia", "Delegado de Polícia"], fonteOficial: rs, ultimaAtualizacao: "2026-09-22",
    descricao: "Concursos de 2025 com publicações em 2026: saúde e atos posteriores ao TAF para Escrivão/Inspetor; preparação do TAF para Delegado.", destaque: "Convocações", href: "/concursos/pc-rs", proximoEvento: "Conferir convocação individual por carreira",
    sources: [source(rs, "PC-RS — Escrivão e Inspetor (2025)", "convocacao"), source(rsDelegado, "PC-RS — Delegado (2025)", "taf")],
    events: [{ date: "2026-09-22", type: "retificacao", title: "Edital 179/2026: adendo às convocações", summary: "Adendo aos editais 174 e 178 para Escrivão e Inspetor. Consulte os efeitos e as datas diretamente na PC-RS.", sourceUrl: rs }, { date: "2026-09-18", type: "taf", title: "Delegado: publicações sobre o TAF", summary: "Divulgação da banca e convocação para entrega de atestado médico.", sourceUrl: rsDelegado }],
    modules: [moduleOf("edital", "Editais por carreira", "São acompanhamentos de concursos abertos em 2025. Não se trata de novo edital de abertura de 2026.", rs), moduleOf("exames", "Escrivão e Inspetor", "Publicações de setembro incluem convocações e retificações para exame de saúde. A convocação depende da situação individual.", rs), moduleOf("taf", "Delegado", "Publicações de 18/09 tratam da banca do TAF e entrega de atestado. Confira o cronograma próprio dessa carreira.", rsDelegado), moduleOf("resultados", "Resultados", "Consulte resultados e recursos no canal oficial de cada carreira. O portal não reproduz listas nominais.", rs)],
  },
  {
    slug: "pc-ba-2026", nome: "Polícia Civil da Bahia", sigla: "PC-BA 2026", titulo: "PC-BA 2026 — Delegado, Escrivão e Investigador",
    estado: "Bahia", categoria: "Polícia Civil", status: "prova-proxima", faseAtual: "Inscrições encerradas; preparação para as provas",
    banca: "Instituto AOCP", cargos: ["Delegado", "Escrivão", "Investigador"], escolaridade: "Superior; Direito para Delegado", vagas: "750 (100 Delegado, 150 Escrivão e 500 Investigador)",
    inscricoesInicio: "2026-08-07", inscricoesFim: "2026-09-13", dataProva: "2026-12-06", fonteOficial: ba, ultimaAtualizacao: "2026-09-22",
    descricao: "Seleção para três carreiras da Polícia Civil, com inscrições prorrogadas até 13/09 e provas previstas para dezembro.", destaque: "Provas próximas", href: "/concursos/pc-ba-2026", proximoEvento: "Provas previstas em Salvador em 06/12/2026",
    sources: [source(ba, "Instituto AOCP — prorrogação e cronograma", "retificacao"), source(baEdital, "Instituto AOCP — divulgação do edital", "edital")],
    events: [{ date: "2026-09-13", type: "inscricao", title: "Fim do prazo prorrogado de inscrições", summary: "Prazo prorrogado encerrado. Próximo marco confirmado pela banca: provas em 06/12.", sourceUrl: ba }],
    modules: [moduleOf("edital", "Edital e fontes", "Concurso para provimento de 750 cargos. Consulte edital e retificações no Instituto AOCP.", baEdital), moduleOf("cronograma", "Cronograma", "Inscrições de 07/08 a 13/09 após prorrogação. Pagamento até 14/09. Provas previstas para 06/12/2026.", ba), moduleOf("requisitos", "Requisitos", "Direito para Delegado; graduação em qualquer área para Escrivão e Investigador. Consulte os demais requisitos no edital.", baEdital), moduleOf("prova", "Provas", "Provas objetiva e discursiva previstas em Salvador. Local e horário individuais: aguardando confirmação oficial.", baEdital), moduleOf("resultados", "Resultados previstos", "A banca informa resultado preliminar da objetiva em 13/01/2027 e resultado final previsto em 20/05/2027. Datas sujeitas a retificação.", ba)],
  },
  {
    slug: "pc-ma-2026", nome: "Polícia Civil do Maranhão", sigla: "PC-MA 2026", titulo: "PC-MA 2026 — Investigador e Delegado",
    estado: "Maranhão", categoria: "Polícia Civil", status: "prova-proxima", faseAtual: "Inscrições encerradas; provas por carreira",
    banca: "Cebraspe", cargos: ["Oficial Investigador de Polícia", "Delegado de Polícia Civil"], escolaridade: "Superior; requisitos específicos por cargo", vagas: "357 para Investigador e 58 para Delegado, além de cadastro de reserva",
    dataProva: "2026-11-01", fonteOficial: ma, ultimaAtualizacao: "2026-09-22",
    descricao: "Dois concursos com cronogramas próprios. A próxima prova é a objetiva de Delegado; Investigador tem provas previstas em dezembro.", destaque: "Provas próximas", href: "/concursos/pc-ma-2026", proximoEvento: "Delegado: objetiva prevista em 01/11; Investigador: 06/12/2026",
    sources: [source(ma, "Cebraspe — concurso de Delegado", "edital", "2026-07-20"), source(maInvestigador, "Cebraspe — concurso de Oficial Investigador", "edital", "2026-07-24")],
    events: [{ date: "2026-07-24", type: "edital", title: "Cebraspe divulga concurso para Investigador", summary: "Divulgadas regras e cronograma da seleção para Oficial Investigador.", sourceUrl: maInvestigador }, { date: "2026-07-20", type: "edital", title: "Concurso para Delegado divulgado", summary: "Seleção com provas e cronograma próprios para Delegado.", sourceUrl: ma }],
    modules: [moduleOf("edital", "Editais por carreira", "Consulte separadamente os concursos de Oficial Investigador e Delegado no Cebraspe.", ma), moduleOf("inscricoes", "Inscrições encerradas", "Delegado: 20/07 a 13/08. Investigador: 24/07 a 24/08/2026. As datas de cada carreira são independentes.", maInvestigador), moduleOf("cronograma", "Cronograma de provas", "Delegado: objetiva em 01/11 e discursiva em 13/12. Investigador: objetiva e discursiva em 06/12/2026. Datas previstas; acompanhe retificações.", ma), moduleOf("requisitos", "Requisitos", "Investigador: graduação em qualquer área e CNH B. Delegado: Direito, três anos de atividade jurídica ou policial e CNH. Consulte o edital completo.", maInvestigador), moduleOf("taf", "Etapas posteriores", "Ambas as carreiras incluem exame médico, TAF, avaliação psicológica, investigação social e formação. Delegado também prevê prova oral e títulos.", ma)],
  },
];
