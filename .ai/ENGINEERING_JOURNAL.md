# ENGINEERING JOURNAL — INFOHUB UEMG CARANGOLA

Registro contínuo de aprendizados técnicos, restrições operacionais descobertas, soluções de problemas e débitos técnicos acumulados ao longo das Sprints.

---

## Sprint 1 — Fundação Institucional & Catálogo 5x2

### 1. Problemas Encontrados e Soluções

#### Problema 1: Variáveis globais de Timer no ESLint 9 (Flat Config)
* **Descrição:** O linter apontou erro `no-undef` para `setTimeout` no arquivo `src/js/main.js`.
* **Causa:** O novo formato flat config do ESLint 9 requer declaração explícita de variáveis globais de ambiente de navegador caso o pacote `globals` não esteja injetando todos os objetos auxiliares de timer.
* **Solução:** Adicionou-se explicitamente `setTimeout` e `clearTimeout` como `readonly` no bloco `languageOptions.globals` de `eslint.config.js`.

#### Problema 2: Comportamento de Links para Projetos Discentes em Andamento
* **Descrição:** Como os 10 projetos setoriais estão sendo desenvolvidos simultaneamente pelos alunos, colocar links fictícios geraria erros 404 imediatos na experiência do usuário.
* **Causa:** Descasamento temporal entre a entrega do Hub central e a finalização dos protótipos de cada setor.
* **Solução:** Implementou-se um padrão de fallback no `src/js/main.js`: links definidos como `#` recebem a classe de status "Em Validação" e, ao serem clicados, acionam uma notificação flutuante acessível (Toast) avisando que o guia está em homologação pelos alunos extensionistas.

---

### 2. Restrições Descobertas

#### Restrição 1: Limitação do Grid 5x2 em Viewports Intermediários (Mobile e Tablet Estreito)
* **Descrição:** Em larguras inferiores a 768px, renderizar 2 colunas espreme os textos dos 10 cards, prejudicando a legibilidade.
* **Impacto:** O layout 5x2 deve ser estritamente desktop/tablet largo (`min-width: 768px`). Em smartphones, o fluxo precisa ser necessariamente em 1 coluna vertical fluida (Mobile-First).

---

### 3. Lições Aprendidas

#### Lição 1: Separação Rígida entre Dados (`services-data.js`) e Apresentação (`main.js`)
* **Contexto:** Facilidade de manutenção por futuros alunos e professores sem risco de quebrar o HTML.
* **Aprendizado:** Centralizar todos os metadados (números, títulos, categorias, descrições, status, URLs) em um único array JavaScript limpo permite que qualquer pessoa sem conhecimento de CSS ou DOM atualize os dados em segundos.
* **Aplicação Futura:** Manter essa mesma abordagem para o conteúdo dos modais ("Sobre o Projeto", "Termos de Uso" e "Política de Privacidade").

---

### 4. Débitos Técnicos Identificados

#### Débito 1: Ícones PWA Padronizados de 192px e 512px
* **Resolução na Sprint 2:** Concluído com a criação do ícone vetorial SVG com suporte nativo a `maskable` e configuração do `manifest.webmanifest`.

---

## Sprint 2 — Experiência Mobile (PWA), Governança Legal & Produção

### 1. Problemas Encontrados e Soluções

#### Problema 1: Inclusão de `process` nos Globais do ESLint para Testes Node
* **Descrição:** O arquivo `tests/pwa-modals.test.js` apresentou erro `no-undef` para `process.cwd()`.
* **Causa:** ESLint estava configurado apenas com variáveis globais do navegador e Vitest.
* **Solução:** Inclusão de `process: 'readonly'` nos globals de `eslint.config.js`.

#### Problema 2: Pré-visualização com Cache Estático Antigo do Vite
* **Descrição:** O servidor `vite preview` continuou servindo o bundle antigo da pasta `dist/` antes de uma nova compilação.
* **Causa:** `vite preview` consome os arquivos previamente compilados em `dist/`, exigindo que `vite build` seja executado antes de qualquer nova pré-visualização.
* **Solução:** Estabeleceu-se a sequência mandatória `npm run build && vite preview` no processo de validação de entregas.

---

### 2. Restrições Descobertas

#### Restrição 1: Service Worker e Escopo de Mesma Origem
* **Descrição:** Requisições para os 10 links externos sob domínios ou portas distintas não devem ser cacheadas pelo Service Worker do Hub.
* **Impacto:** O Service Worker foi blindado com a verificação `if (!event.request.url.startsWith(self.location.origin)) return;`, permitindo que o navegador manipule normalmente links de terceiros sem interferência.

---

### 3. Lições Aprendidas

#### Lição 1: Uso Semântico do Elemento `<dialog>` Nativo
* **Contexto:** Implementação dos modais "Sobre o Projeto", "Termos de Uso" e "Política de Privacidade (LGPD)".
* **Aprendizado:** O `<dialog>` nativo do HTML5, associado ao método `.showModal()`, resolve nativamente a armadilha de foco (*focus trap*), a acessibilidade de leitores de tela e o fechamento por teclado (`Esc`) sem importar nenhuma biblioteca de JavaScript ou CSS externa.

#### Lição 2: Ícones Vetoriais SVG com `purpose: "any maskable"` no Web Manifest
* **Contexto:** Suporte a múltiplos tamanhos de tela e formatos de ícones em dispositivos Android/iOS.
* **Aprendizado:** Um ícone vetorial SVG bem construído com margem segura (*safe zone*) atende aos critérios do Lighthouse para ícones maskable e convencionais com baixíssimo consumo de banda.

---

### 4. Débitos Técnicos Acumulados

* **Nenhum débito técnico remanescente:** Todos os débitos identificados nas fases anteriores foram quitados durante a Sprint 2.
