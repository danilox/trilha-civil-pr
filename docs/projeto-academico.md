# Trilha Civil PR - Projeto acadêmico

## Título
Trilha Civil PR: portal independente de organização de informações sobre concurso público.

## Tema
Transparência, organização informacional e apoio prático ao candidato em concurso público de segurança pública.

## Problema
Candidatos consultam informações dispersas sobre etapas, documentos, exames, TAF, títulos e convocações. A falta de organização pode gerar perda de prazos, interpretação equivocada de estimativas e confusão entre dados oficiais e dados provisórios.

## Justificativa
Um portal independente, com dados classificados e metodologia explícita, ajuda o candidato a localizar informações práticas sem substituir edital, banca ou canais oficiais.

## Objetivo geral
Construir um portal responsivo e não oficial para organizar etapas, regiões, exames, TAF, títulos, dicas e fontes do concurso da Polícia Civil do Paraná.

## Objetivos específicos
- Separar dados oficiais, estimativas e demonstrações.
- Registrar fonte, item do edital, página do PDF e data de conferência.
- Criar páginas internas temáticas.
- Implementar painel local sem coleta de dados pessoais.
- Documentar fontes, limitações e metodologia.
- Manter acessibilidade e responsividade.

## Público-alvo
Candidatos, pesquisadores e avaliadores acadêmicos interessados em organização de informações públicas de concursos.

## Metodologia
Desenvolvimento incremental com Next.js, TypeScript e Tailwind CSS. A versão 0.2.0 migra dados oficiais do Edital nº 01/2026 para `src/data/edital.ts`, mantendo estimativas e demonstrações em estruturas separadas.

## Tecnologias
Next.js App Router, TypeScript, Tailwind CSS, Lucide React, Recharts, ESLint, npm e Git.

## Requisitos
Os requisitos funcionais e não funcionais estão detalhados em `docs/requisitos.md`.

## Resultados esperados
Portal navegável, responsivo, com páginas internas, transparência de dados, documentação acadêmica e preparação para publicação.

## Limitações
Não há banco de dados, autenticação, coleta de dados pessoais, painel administrativo ou integração automatizada com fontes oficiais. O PDF oficial local foi usado para conferência, mas retificações futuras precisam ser verificadas manualmente.

## Apresentação visual da versão 0.1.0
A identidade visual definitiva do projeto está registrada em `public/images/trilha-civil-capa.png`. Essa imagem é usada como capa de apresentação, documentação e compartilhamento social, enquanto a homepage preserva título, descrição e aviso institucional como elementos HTML acessíveis.

## Trabalhos futuros
Monitorar retificações, ampliar testes automatizados, revisar metodologia de estimativas, configurar domínio real e evoluir recursos sem adicionar coleta de dados pessoais sem nova política.