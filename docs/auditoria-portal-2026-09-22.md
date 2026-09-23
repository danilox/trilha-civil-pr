# Edital no Controle — auditoria de 22/09/2026

## Auditoria inicial

Base: main, commit 8aad1d1029700f3f0be1d859720adf7825443632, árvore limpa antes da tarefa.

- A home ainda tinha posicionamento genérico e catálogo de três concursos; PM-SP e PC-RS eram páginas em construção.
- PCPR estava na homologação preliminar de agosto, apesar das publicações de setembro.
- Sobre descrevia ausência de banco remoto, incompatível com o Radar em Supabase.
- Estatísticas filtradas usavam 62.657 como denominador; Agente exige 40.284. A consulta baixava registros para contar no servidor, sujeita ao limite de linhas da API.
- Versões divergentes e sitemap com data global antiga. Redes sociais não configuradas.
- Foram reutilizados InternalPage, Card, badges, navegação, componentes de concurso e todas as ferramentas PCPR.

## Implementação

- Portal nacional: home, catálogo com filtros GET compartilháveis, Radar nacional e feed geral.
- Modelo tipado de concursos, fontes, eventos e módulos opcionais; template único para seis guias. PCPR conserva sua estrutura completa.
- PC-AP, PM-AL, PM-SP, PC-RS, PC-BA e PC-MA documentados somente a partir de órgãos/bancas.
- Timeline PCPR: homologação concluída, preparação atual, prova próxima, demais etapas futuras; histórico preservado.
- Fontes e datas visíveis, metadados únicos, canonical, OpenGraph, breadcrumbs, JSON-LD e sitemap sem duplicação.
- Instagram confirmado pelo proprietário; YouTube/LinkedIn ocultos. Contato atual preservado; institucional preparado e desativado.
- Versão corrente 0.4.0 centralizada em package.json. Versões antigas são explicitamente identificadas como versão na publicação histórica.
- Server Components para catálogo, cards, feed e guias; sem dependências novas. Paleta preto/grafite/amarelo, estados com texto e ícone, menu mobile e timeline por teclado.

## Backend e segurança

- competition-totals.ts concentra totais por cargo e deriva o geral. service.ts usa esse total no retorno indisponível, sem mudar validação/participação.
- repository.ts troca a leitura integral das participações por contagens exatas HEAD, com filtros no PostgreSQL; última atualização lê uma linha. Contrato público preservado, incluindo todos os cargos. Não exige view, RPC, migration ou alteração de schema.
- stats/route.ts guarda somente agregados públicos por 30 segundos, com chave separada por argumentos/cargo; falhas retornam 503 sem detalhes privados. Validação e participação não são cacheadas.
- crypto.ts rejeita segmentos adicionais no token e expiração no instante limite. Mantidos AES-GCM, HMAC, verificação de assinatura, duração de 15 minutos e identificadores separados.
- candidate_key, chave primária, upsert onConflict, rate limit e APIs de escrita preservados. Revalidar não grava; alterar região reaproveita a mesma participação.
- Nenhum nome, inscrição, token ou identificador individual é incluído nas estatísticas. Nenhuma migration, variável de ambiente ou linha do banco foi alterada. Testes de escrita usam adaptadores em memória ou interceptação do navegador.
- Cache implica defasagem aproximada de 30 segundos. Contagens independentes podem observar uma alteração concorrente entre consultas; não são um snapshot transacional. Uma RPC transacional exigiria mudança de banco, fora deste escopo.

## Fontes oficiais consultadas em 22/09/2026

| Concurso | Fontes |
| --- | --- |
| PCPR | [FGV](https://conhecimento.fgv.br/concursos/pcpr26), [comunicado de 22/09](https://conhecimento.fgv.br/sites/default/files/concursos/comunicado-pcpr-exclusao__0.pdf) |
| PC-AP | [Cesgranrio](https://www.cesgranrio.org.br/publicado-edital-do-concurso-da-policia-civil-do-amapa/), [SEAD](https://sead.portal.ap.gov.br/concursos/vigentes/49603) |
| PM-AL | [Cebraspe — reabertura](https://www.cebraspe.org.br/pmal-reabre-inscricoes-em-concurso-publico-para-admissao-aos-cursos-de-formacao-de-oficiais-e-pracas/), [concurso](https://www.cebraspe.org.br/concursos/PM_AL_26) |
| PM-SP | [PMESP — edital DP-3/321/26](https://concursos.policiamilitar.sp.gov.br/concursos/edital-dp-3-321-26-concurso-para-aluno-soldado-pm/), [publicações](https://concursos.policiamilitar.sp.gov.br/) |
| PC-RS | [Escrivão/Inspetor](https://www.pc.rs.gov.br/concurso-publico-para-escrivao-e-inspetor-2025), [Delegado](https://www.pc.rs.gov.br/concurso-publico-para-delegado-de-policia-2025) |
| PC-BA | [AOCP — edital](https://noticias.institutoaocp.org.br/blog/pcba-divulga-edital-do-concurso-publico-para-delegado-escrivao-e-investigador/), [prorrogação](https://noticias.institutoaocp.org.br/blog/inscricoes-do-concurso-da-policia-civil-da-bahiaestao-prorrogadas-ate-13-de-setembro/) |
| PC-MA | [Cebraspe — Delegado](https://www.cebraspe.org.br/policia-civil-do-maranhao-abre-concurso-publico-para-delegado/), [Investigador](https://www.cebraspe.org.br/pcma-divulga-concurso-publico-para-oficial-investigador-de-policia/) |

Notícias institucionais das próprias bancas foram usadas onde o portal de arquivos depende de JavaScript ou bloqueia automação. Não foram usadas notícias de terceiros como fonte oficial. Documentos nominais não foram copiados para o repositório.

## Validação local

- npm install --ignore-scripts: concluído; árvore de dependências idêntica à anterior. Lockfile preservado, alterando apenas versão da aplicação.
- npm run lint: aprovado, sem avisos.
- npm test: 24 testes aprovados, incluindo cobertura geral/cargo, 1.501 participações, unicidade, troca de região, tokens e API/cache/filtros.
- TypeScript e build de produção aprovados; 44 rotas geradas.
- 70 verificações de navegador: 14 páginas em 360, 390, 768, 1024 e 1440 px. HTTP 200, um h1, canonical presente, sem overflow ou erro de console.
- Links internos encontrados nas páginas, sitemap e robots: sem HTTP de erro.
- Filtros combinados, limpeza, menu mobile e timeline por teclado verificados. Manter escolha não faz POST; alterar envia a região usando token existente. Escritas interceptadas antes da rede.
- Leitura real GET: 3 participantes (1 Interior = 33,3%; 2 Curitiba/RMC = 66,7%). Geral: denominador 62.657, cobertura 0,00478797%; Agente: denominador 40.284, cobertura 0,00744713%. Base importada: 62.657. Sem inserções de teste.

## Pendências e limites

- PM-SP: gabarito, resultados e futuras convocações ainda sem confirmação nesta auditoria; consulta Vunesp não acessível pela ferramenta. Fonte PMESP mantida.
- PC-RS: não inventados banca, vagas, salários e prazos globais para carreiras com etapas distintas.
- Remunerações não transcritas sem conferência específica; campos ausentes exibem Aguardando confirmação oficial. PM-AL ainda sem escolaridade transcrita.
- PC-MA tem dois calendários. O card usa a próxima objetiva de Delegado; detalhes mostram também Investigador e discursiva de Delegado.
- Instagram configurado exatamente conforme informado; a leitura automatizada externa não confirmou o perfil (cache/restrição). E-mail institucional não ativado.
- Dados editoriais requerem atualização após novas publicações; datas previstas não comprovam realização ou liberação de consulta individual.
- Resultado do deploy e verificações de produção será informado na entrega, após publicação pelo Git.

## Revisão em produção

O primeiro deployment passou em 70 verificações, com estatísticas reais corretas e nenhum erro/fatal nos logs consultados. A revisão das capturas encontrou dois detalhes herdados no Radar: quebra do título no meio de uma palavra em celular e zeros provisórios antes do carregamento. A correção apresenta estado de carregamento/indisponibilidade e reduz o título no mobile, sem modificar APIs ou gravações.

## Arquivos alterados

- src/components/competition/competition-page.tsx
- docs/auditoria-portal-2026-09-22.md
- package-lock.json
- package.json
- src/app/api/concorrencia/stats/route.ts
- src/app/atualizacoes/page.tsx
- src/app/concursos/[slug]/page.tsx
- src/app/concursos/page.tsx
- src/app/concursos/pc-pr-2026/atualizacoes/page.tsx
- src/app/concursos/pc-pr-2026/page.tsx
- src/app/concursos/pc-rs/page.tsx
- src/app/concursos/pm-sp/page.tsx
- src/app/layout.tsx
- src/app/opengraph-image.tsx
- src/app/page.tsx
- src/app/privacidade/page.tsx
- src/app/radar/page.tsx
- src/app/sitemap.ts
- src/app/sobre/page.tsx
- src/components/footer-contact.tsx
- src/components/internal-page.tsx
- src/components/platform/catalog-filters.tsx
- src/components/platform/contest-card.tsx
- src/components/platform/contest-catalog.tsx
- src/components/platform/contest-detail.tsx
- src/components/platform/contest-status-badge.tsx
- src/components/platform/dashboard-preview.tsx
- src/components/platform/platform-footer.tsx
- src/components/platform/platform-header.tsx
- src/components/platform/platform-hero.tsx
- src/components/platform/portal-overview.tsx
- src/components/platform/updates-feed.tsx
- src/components/site-footer.tsx
- src/components/social-links.tsx
- src/components/timeline.tsx
- src/config/site-config.ts
- src/data/competition-totals.ts
- src/data/contest-updates.ts
- src/data/contests-national.ts
- src/data/contests.ts
- src/data/edital.ts
- src/data/pcpr-updates.ts
- src/data/portal.ts
- src/lib/competition/crypto.ts
- src/lib/competition/repository.ts
- src/lib/competition/service.ts
- src/lib/contest-catalog.ts
- src/lib/format.ts
- src/lib/seo.ts
- src/styles/national-portal.css
- src/types/contest.ts
- tests/competition/api-contract.test.mjs
- tests/competition/catalog.test.mjs
- tests/competition/existing-participation.test.mjs
- tests/competition/helpers.mjs
- tests/competition/security-stats.test.mjs
- tests/competition/statistics.test.mjs
