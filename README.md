# Trilha Civil PR

Status: versão 0.1.0 em preparação para publicação.

Portal independente e não oficial para organizar informações sobre o concurso da Polícia Civil do Paraná. O projeto não substitui edital, banca organizadora ou canais oficiais.

## Visão geral

O Trilha Civil PR reúne etapas, regiões, projeções demonstrativas, exames, TAF, títulos, dicas práticas, locais fictícios para exames e metodologia de fontes. A primeira versão não possui backend, autenticação, cadastro, upload, pagamentos nem coleta de dados pessoais.

## Objetivo

Oferecer uma interface clara e responsiva para acompanhar informações do concurso, separando dados oficiais pendentes, estimativas e demonstrações de interface.

## Captura de tela de referência

A referência visual está em `public/references/homepage-referencia.png`. Ela orienta proporções, contraste e linguagem visual; a página é construída com componentes reais em React, HTML e CSS.

## Funcionalidades atuais

- Homepage responsiva com hero, busca local, linha do tempo e cards informativos.
- Menu desktop e menu móvel acessível.
- Painel do candidato demonstrativo com dados salvos somente no navegador.
- Rotas internas informativas.
- Central de atualizações demonstrativa.
- Política de privacidade, termos e página 404 personalizada.
- Badges para dado oficial, estimativa e demonstração.
- Sitemap, robots e metadados preparados para domínio futuro.

## Tecnologias

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Lucide React
- Recharts
- ESLint
- npm

## Rotas

- `/`
- `/etapas`
- `/regioes`
- `/nota-de-corte`
- `/exames`
- `/taf`
- `/titulos`
- `/dicas`
- `/fontes`
- `/atualizacoes`
- `/privacidade`
- `/termos`
- `/sobre`

## Estrutura de diretórios

```text
src/app        rotas, layout, sitemap, robots e 404
src/components componentes reutilizáveis
src/data       conteúdo, números e fontes
src/types      tipos TypeScript
src/lib        configuração e formatadores
public         imagens, referência visual e favicon
docs           documentação acadêmica e publicação
```

## Instalação

```bash
npm install
```

## Comandos

```bash
npm run dev
npm run lint
npm run build
npm run start
npm audit
```

## Dados demonstrativos

Dados relevantes usam as classificações:

- `oficial`: campo preparado para edital, banca ou órgão competente. Quando a fonte ainda não existe, aparece como "Fonte oficial ainda não cadastrada.".
- `estimativa`: projeção provisória sem valor oficial.
- `demonstracao`: conteúdo fictício usado para validar interface, fluxo e documentação.

Os dados ainda precisam de conferência oficial antes de qualquer uso público como referência factual.

## Limitações

- Não há fontes oficiais cadastradas nesta etapa.
- Locais para exames são exemplos fictícios.
- Projeções não indicam classificação, convocação ou aprovação.
- O painel do candidato é local e demonstrativo.
- Não há banco de dados, autenticação, analytics ou coleta de dados pessoais.

## Transparência das informações

A página `/fontes` e o arquivo `docs/fontes.md` registram classificação, fonte, data de publicação, data de conferência e observações. Não são usadas URLs oficiais inventadas.

## Aviso não oficial

Projeto independente e não oficial. Consulte sempre o edital e os canais oficiais.

## Privacidade e termos

A política está em `/privacidade` e explica que o MVP não coleta dados pessoais. Os termos estão em `/termos` e reforçam a prevalência do edital, a natureza demonstrativa das projeções e a ausência de garantias.

## Deploy resumido

- Execute `npm run lint`, `npm run build` e `npm audit`.
- Configure `NEXT_PUBLIC_SITE_URL` apenas com o domínio real de produção.
- Publique em provedor compatível com Next.js, como Vercel.
- Teste homepage, rotas internas, 404, sitemap, robots, menu móvel, busca e painel local.

Mais detalhes estão em `docs/deploy.md` e `docs/checklist-publicacao.md`.

## Documentação acadêmica

- `docs/projeto-academico.md`
- `docs/requisitos.md`
- `docs/arquitetura.md`
- `docs/fontes.md`
- `docs/testes.md`
- `docs/roadmap.md`
- `docs/deploy.md`
- `docs/checklist-publicacao.md`

## Roadmap

- Cadastrar edital, banca e fontes oficiais reais quando disponíveis.
- Revisar números com metodologia documentada.
- Adicionar testes automatizados.
- Configurar domínio real e publicação.
- Evoluir recursos sem adicionar coleta de dados pessoais sem nova política.
