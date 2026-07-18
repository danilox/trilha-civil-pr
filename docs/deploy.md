# Deploy

## Requisitos

- Node.js compatível com Next.js 16.
- npm instalado.
- Repositório Git disponível.
- Conta em provedor de hospedagem compatível com Next.js, como Vercel.

## Instalação

```bash
npm install
```

## Desenvolvimento local

```bash
npm run dev
```

A aplicação abre em `http://localhost:3000` ou na porta indicada pelo Next.js.

## Lint

```bash
npm run lint
```

Corrija todos os avisos e erros antes de publicar.

## Build

```bash
npm run build
```

O build precisa concluir sem erro de TypeScript, lint ou geração estática.

## GitHub

- Revise os arquivos modificados.
- Confirme que não há `.env`, chaves ou segredos versionados.
- Crie um commit pequeno e objetivo para a versão.
- Envie a branch para o repositório remoto.

## Vercel

- Importe o repositório no painel da Vercel.
- Use o framework Next.js.
- Comando de instalação: `npm install`.
- Comando de build: `npm run build`.
- Diretório de saída: configuração padrão do Next.js.

## Variáveis de ambiente

O MVP não necessita de variáveis de ambiente obrigatórias.

Opcionalmente, defina `NEXT_PUBLIC_SITE_URL` com o domínio real de produção para atualizar canonical, sitemap e Open Graph. Não use domínio provisório como definitivo.

## Domínio personalizado

Após configurar o domínio no provedor de hospedagem, atualize `NEXT_PUBLIC_SITE_URL` para a URL pública final com HTTPS.

## DNS

Configure os registros indicados pelo provedor de hospedagem. Aguarde propagação e teste `https://dominio` e `https://www.dominio`, se aplicável.

## Rollback

Use o painel do provedor para restaurar a versão anterior publicada. Registre a reversão no `CHANGELOG.md` quando houver impacto para usuários.

## Atualização de conteúdo

- Edite dados em `src/data/portal.ts`.
- Mantenha a classificação `oficial`, `estimativa` ou `demonstracao`.
- Registre a conferência em `docs/fontes.md`.
- Atualize a central em `/atualizacoes` quando a mudança for relevante.

## Nova versão

- Atualize `package.json`.
- Atualize `CHANGELOG.md`.
- Execute lint, build, audit e verificação visual.
- Crie commit e tag, se o fluxo do projeto exigir.

## Verificação após deploy

- Abrir homepage, rotas internas, `/privacidade`, `/termos`, `/atualizacoes`, `/sitemap.xml` e `/robots.txt`.
- Testar menu móvel, busca, painel local e página 404.
- Conferir console sem erros.
- Verificar desktop, tablet e celular.
