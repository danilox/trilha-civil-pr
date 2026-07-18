# Arquitetura

## Next.js
O projeto usa Next.js com App Router, páginas em `src/app` e componentes React em `src/components`.

## Componentes
A interface é dividida em componentes reutilizáveis: cabeçalho, aviso, hero, busca, painel, cards, timeline, badges e layout interno.

## Fluxo de dados
Os dados ficam em `src/data/portal.ts`. Componentes e páginas importam esses dados e apenas renderizam a informação.

## Separação entre dados e interface
Tipos ficam em `src/types/content.ts`. A classificação `oficial`, `estimativa` e `demonstracao` é parte do modelo de dados e aparece visualmente por meio de badges.

## Ausência de backend no MVP
Não há API própria, banco de dados remoto, autenticação, pagamentos, envio de arquivos ou coleta de dados pessoais. O painel do candidato usa `localStorage`.

## Evolução futura
O projeto pode evoluir para cadastro administrativo, integração com fontes oficiais, auditoria de alterações e publicação estática com domínio próprio.
