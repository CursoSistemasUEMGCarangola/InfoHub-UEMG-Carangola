# AI EXECUTION GUIDE — INFOHUB UEMG CARANGOLA

## 1. Regras Arquiteturais Invioláveis
Qualquer Inteligência Artificial ou desenvolvedor atuando neste repositório DEVE obedecer estritamente às seguintes diretrizes:

1. **Zero Framework Bloat:** É terminantemente proibido introduzir frameworks reativos pesados (React, Vue, Angular), compiladores complexos (Webpack, Babel) ou utilitários CSS inflados (Tailwind CSS, Bootstrap), salvo aprovação formal explícita. O projeto utiliza **HTML5 Semântico, CSS3 Moderno (Vanilla com Tokens) e JavaScript Puro (ES6+)**.
2. **Separação Rígida de Dados e Apresentação:** A lista dos 10 serviços setoriais NUNCA deve ser *hardcoded* diretamente no HTML se houver um arquivo de dados dedicado (`src/js/services-data.js`). Novas adições ou edições devem ocorrer exclusivamente na camada de dados.
3. **Segurança em Links Externos:** Todo link apontando para páginas externas DEVE conter obrigatoriamente `target="_blank"` e `rel="noopener noreferrer"`.
4. **Respeito ao Layout Grid 5x2:** A disposição dos 10 cards em telas desktop/tablet largo deve manter a grade de 5 linhas x 2 colunas.
5. **Mobile First:** Todo CSS deve ser estruturado partindo da visualização móvel para telas maiores através de `min-width` media queries.
6. **Integridade de Custos:** Nenhuma dependência externa paga ou serviço que gere faturamento pode ser adicionado.

---

## 2. Processo de Implementação
Para implementar uma nova User Story ou funcionalidade:

1. **Leitura Prévia:** Consultar `PROJECT_DNA.md` e `PRODUCT_BACKLOG.md` para verificar escopo e dependências.
2. **Isolamento de Responsabilidade:**
   * Estilos pertencem a arquivos `.css` modulares.
   * Regras de negócio e renderização pertencem a arquivos `.js`.
   * Estrutura pura pertence ao `.html`.
3. **Aderência aos Tokens de Design:** Utilizar exclusivamente as variáveis CSS definidas no `:root` para cores, fontes, espaçamentos e raios de borda.
4. **Semântica HTML5:** Utilizar elementos com significado estrutural (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`), nunca aninhar `<div>` excessivos sem justificativa de estilo.

---

## 3. Processo de Testes e Validação
Antes de considerar qualquer alteração concluída, execute:

1. **Validação de Responsividade:**
   * Testar em 320px (telas móveis compactas).
   * Testar em 375px / 414px (smartphones padrão).
   * Testar em 768px (tablets / início do grid 5x2).
   * Testar em 1024px+ (desktops).
2. **Validação de Acessibilidade:**
   * Verificar contraste de cores via ferramenta de inspeção (mínimo 4.5:1 para texto normal, WCAG AA).
   * Confirmar presença de `alt` descritivo em todas as tags `<img>`.
   * Garantir navegação funcional via teclado (`Tab`, `Shift+Tab`, `Enter`).
3. **Validação PWA:**
   * Auditar a aba *Application* do Chrome DevTools para confirmar manifest válido e Service Worker ativo sem erros de registro.
4. **Validação de Performance:**
   * Assegurar que nenhuma imagem ultrapasse 200KB sem compressão.
   * Verificar se o console do navegador está 100% limpo de erros ou avisos de recursos bloqueados.

---

## 4. Processo de Revisão de Código
Ao revisar o código gerado ou modificado:

* [ ] Não há código morto, funções não utilizadas ou comentários de depuração (`console.log`).
* [ ] Os nomes de classes CSS seguem padrão previsível e semantizado.
* [ ] O código JavaScript utiliza sintaxe moderna (const/let, arrow functions, template literals, desestruturação).
* [ ] Nenhum manipulador de evento inline (`onclick="..."`) no HTML; usar `addEventListener`.
* [ ] O código trata adequadamente ausência eventual de dados ou recursos de rede.

---

## 5. Processo de Atualização de Documentação
* Se um novo setor ou campo for adicionado aos cards, atualizar `PROJECT_DNA.md` e `PRODUCT_BACKLOG.md`.
* Ao concluir tarefas de uma Sprint, registrar o estado no histórico e no resumo da Sprint.

---

## 6. Checklist de Conclusão de Tarefa (Definition of Done)
Uma tarefa só pode ser marcada como concluída se cumprir:

- [ ] Código implementado conforme os critérios de aceite BDD da User Story correspondente.
- [ ] Interface visual perfeitamente alinhada à paleta e padrões institucionais da UEMG.
- [ ] Grid 5x2 preservado em telas desktop e fluidez garantida no mobile.
- [ ] Links externos verificados com `rel="noopener noreferrer"`.
- [ ] Testes de console limpo e inspeção visual aprovados.
- [ ] Documentação correspondente atualizada.
