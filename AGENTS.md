# AGENTS.md — Trilha Civil PR

## Objetivo do projeto

Construir um portal independente e não oficial sobre o concurso da Polícia Civil do Paraná.

O portal deve organizar informações sobre:

* etapas do concurso;
* distribuição regional;
* estimativas de concorrência;
* possíveis notas de corte;
* exames médicos;
* teste de aptidão física;
* avaliação psicológica;
* investigação social;
* prova de títulos;
* documentos;
* dicas práticas e locais para realização de exames.

O projeto não é uma plataforma de estudos e não deve conter aulas, cursos, mapas mentais ou banco de questões.

## Tecnologias

* Next.js com App Router
* TypeScript
* Tailwind CSS
* Lucide React
* Recharts
* ESLint
* Git

## Diretrizes visuais

* Reproduzir a linguagem visual da imagem localizada em `public/references/homepage-referencia.png`.
* Utilizar preto, branco, cinza grafite e prata.
* Manter aparência premium, sóbria e tecnológica.
* Usar alto contraste e boa legibilidade.
* Criar layout responsivo para desktop, tablet e celular.
* Não copiar a imagem como uma página estática.
* Todos os componentes devem ser elementos reais em HTML, CSS e React.
* Utilizar `public/images/hero-pcpr.webp` somente como fundo visual do hero.

## Identidade e limites institucionais

* Não usar brasão oficial.
* Não usar logotipo oficial.
* Não usar escudo, distintivo ou identidade institucional real.
* Não apresentar o portal como site oficial.
* Não reproduzir uniformes ou insígnias identificáveis.
* Exibir permanentemente o aviso:

“Projeto independente e não oficial. Consulte sempre o edital e os canais oficiais.”

## Arquitetura

* Dividir a interface em componentes pequenos e reutilizáveis.
* Manter conteúdo e números separados da interface, dentro de `src/data`.
* Criar tipos TypeScript para etapas, regiões, exames, dicas e projeções.
* Não deixar grandes conjuntos de dados diretamente dentro de componentes.
* Evitar componentes excessivamente longos.
* Evitar duplicação de código.

## Dados

* Identificar claramente valores oficiais e estimativas.
* Não inventar dados como se fossem oficiais.
* Dados provisórios devem receber a propriedade `tipo: "estimativa"`.
* Cada informação relevante deve aceitar campo de fonte e data de atualização.
* Formatar datas e números no padrão brasileiro.

## Primeira versão

A primeira versão não terá:

* autenticação;
* conta de usuário;
* banco de dados remoto;
* pagamentos;
* envio de arquivos;
* coleta de dados pessoais;
* painel administrativo.

O painel do candidato deve funcionar somente com estado local do React.

## Qualidade

Antes de concluir cada tarefa:

1. executar lint;
2. executar build;
3. corrigir erros;
4. verificar console do navegador;
5. testar desktop e celular;
6. revisar ortografia em português brasileiro;
7. informar os arquivos alterados;
8. informar os testes realizados.

## Acessibilidade

* Usar HTML semântico.
* Adicionar textos alternativos em imagens.
* Associar labels aos campos.
* Garantir navegação por teclado.
* Manter foco visível.
* Não depender apenas de cor para transmitir informação.

## Git

* Fazer alterações por etapas pequenas.
* Não misturar várias funcionalidades sem relação no mesmo conjunto de mudanças.
* Sugerir uma mensagem de commit ao concluir cada etapa.
* Nunca apagar arquivos importantes sem justificar.
* Antes de grandes alterações, inspecionar o código existente.

## Definição de pronto

Uma etapa somente está pronta quando:

* funciona visualmente;
* funciona em celular;
* não apresenta erros de TypeScript;
* passa no lint;
* passa no build;
* não apresenta erros no console;
* mantém os dados separados da interface;
* respeita a identidade não oficial do projeto.
