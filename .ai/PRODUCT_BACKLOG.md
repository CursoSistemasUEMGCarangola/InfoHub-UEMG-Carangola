# PRODUCT BACKLOG — INFOHUB UEMG CARANGOLA

## Visão Geral do Backlog
Este backlog organiza o ciclo de vida do InfoHub UEMG Carangola em Epics, Features e User Stories detalhadas, priorizadas rigorosamente segundo os drivers de negócio (Custo, Manutenibilidade, Segurança e Performance) e estruturadas com critérios de aceitação no padrão BDD (*Given-When-Then* / *Dado-Quando-Então*).

---

## EPIC 1: Identidade Institucional & Fundação Visual UEMG
**Objetivo:** Estabelecer a credibilidade institucional da aplicação reproduzindo os padrões visuais oficiais da Universidade do Estado de Minas Gerais (UEMG).
* **Status do Epic:** CONCLUÍDO (Sprint 1)

### Feature 1.1: Header e Navegação Institucional
* **US 1.1.1 — Cabeçalho Institucional Oficial** `[STATUS: CONCLUÍDO]`
  * **Como** estudante ou visitante da UEMG Carangola,
  * **Quero** visualizar a barra superior padronizada com o logotipo oficial da UEMG e identificação da Unidade Acadêmica de Carangola,
  * **Para que** eu tenha imediata certeza de estar em um canal institucional legítimo e seguro.
  * **Critérios de Aceite (BDD):**
    * **Dado** que o usuário acessa qualquer resolução de tela (mobile ou desktop),
    * **Quando** o cabeçalho for renderizado,
    * **Então** o logotipo transparente oficial da UEMG deve estar visível e com link para a home do Hub, e o texto da Unidade Acadêmica de Carangola deve estar legível com contraste acessível (WCAG AA).
  * **Prioridade:** Essencial (Sprint 1) — *Entregue e Validado*.
  * **Dependências:** Assets oficiais em `public/images/logo_uemg.png`.

### Feature 1.2: Seção Hero com Fachada Histórica
* **US 1.2.1 — Contextualização e Fachada da Unidade** `[STATUS: CONCLUÍDO]`
  * **Como** membro da comunidade acadêmica,
  * **Quero** visualizar um banner hero acolhedor apresentando a imagem da fachada da Unidade Carangola e o propósito do InfoHub,
  * **Para que** eu compreenda instantaneamente o objetivo do portal de autoatendimento.
  * **Critérios de Aceite (BDD):**
    * **Dado** que a página principal é carregada,
    * **Quando** o banner hero for exibido,
    * **Então** a imagem da fachada deve carregar de forma otimizada (sem layout shift - CLS = 0), com sobreposição de contraste e texto claro explicando a finalidade de autoatendimento acadêmico.
  * **Prioridade:** Alta (Sprint 1) — *Entregue e Validado*.
  * **Dependências:** Imagens em `public/images/UEMG-fachada-1.jpg`.

---

## EPIC 2: Catálogo de Serviços Setoriais (Grid 5x2)
**Objetivo:** Exibir de forma clara, intuitiva e balanceada os 10 serviços institucionais mapeados pelos alunos de extensão.
* **Status do Epic:** CONCLUÍDO (Sprint 1)

### Feature 2.1: Grid Responsivo 5x2 e Cards Informativos
* **US 2.1.1 — Renderização Estruturada dos 10 Cards** `[STATUS: CONCLUÍDO]`
  * **Como** estudante com uma dúvida acadêmica,
  * **Quero** navegar por 10 cards setoriais dispostos em 5 linhas de 2 colunas no desktop (e 1 coluna no celular),
  * **Para que** eu localize rapidamente o setor responsável pelo meu problema.
  * **Critérios de Aceite (BDD):**
    * **Dado** que o usuário está navegando em tela com largura >= 768px,
    * **Quando** visualizar a seção de serviços,
    * **Então** os 10 cartões devem estar organizados estritamente na grade de 5 linhas e 2 colunas;
    * **Dado** que o usuário está em dispositivo móvel (< 768px),
    * **Quando** visualizar a seção,
    * **Então** o grid deve se ajustar fluidamente para 1 coluna vertical fácil de rolar e tocar.
  * **Prioridade:** Essencial (Sprint 1) — *Entregue e Validado*.
  * **Dependências:** Feature 1.1.

* **US 2.1.2 — Prévia Informativa e Acesso Externo Seguro** `[STATUS: CONCLUÍDO]`
  * **Como** estudante consultando um cartão setorial,
  * **Quero** ler um breve resumo do que aquele setor resolve e clicar em um botão para abrir o guia oficial em nova aba,
  * **Para que** eu saiba previamente o que esperar antes de sair da página principal.
  * **Critérios de Aceite (BDD):**
    * **Dado** que o cartão de um setor específico (ex.: "Estágios" ou "NAE") é exibido,
    * **Quando** o usuário ler o conteúdo,
    * **Então** deve visualizar o título do tema, a síntese do escopo e um botão de ação com ícone indicador de link externo;
    * **Dado** que o usuário clica no botão do setor,
    * **Quando** o link for acionado,
    * **Então** a página do projeto setorial deve abrir em uma nova aba com os atributos de segurança `target="_blank"` e `rel="noopener noreferrer"`.
  * **Prioridade:** Essencial (Sprint 1) — *Entregue e Validado*.
  * **Dependências:** US 2.1.1, `src/js/services-data.js`.

---

## EPIC 3: Experiência Mobile & Suporte PWA
**Objetivo:** Permitir que o InfoHub funcione como um aplicativo utilitário no smartphone do estudante, com atalho na tela inicial.
* **Status do Epic:** CONCLUÍDO (Sprint 2)

### Feature 3.1: Configuração de Manifesto e Service Worker
* **US 3.1.1 — Instalação do Web App (PWA)** `[STATUS: CONCLUÍDO]`
  * **Como** estudante que utiliza majoritariamente o celular,
  * **Quero** receber a opção de "Instalar aplicativo" ou adicionar o InfoHub à minha tela inicial,
  * **Para que** eu possa acessar os serviços da faculdade com um toque sem precisar digitar a URL.
  * **Critérios de Aceite (BDD):**
    * **Dado** que o usuário navega pelo Chrome Mobile, Safari ou Edge em dispositivo compatível,
    * **Quando** os requisitos de PWA forem avaliados pelo navegador,
    * **Então** o `manifest.webmanifest` deve fornecer ícones válidos (192px e 512px / SVG maskable), nome correto, `theme_color` alinhado à paleta UEMG e o Service Worker registrado com sucesso.
  * **Prioridade:** Alta (Sprint 2) — *Entregue e Validado*.
  * **Dependências:** EPIC 1 e EPIC 2.

---

## EPIC 4: Transparência, Governança & Conformidade Legal (LGPD)
**Objetivo:** Fornecer aos estudantes e à reitoria clareza sobre o projeto de extensão, regras de uso e tratamento ético de dados.
* **Status do Epic:** CONCLUÍDO (Sprint 2)

### Feature 4.1: Rodapé Institucional e Modais Legais
* **US 4.1.1 — Seção "Sobre o Projeto"** `[STATUS: CONCLUÍDO]`
  * **Como** discente, professor ou avaliador do MEC,
  * **Quero** acessar a seção "Sobre o Projeto" no rodapé,
  * **Para que** eu conheça os detalhes da atividade de extensão da disciplina de Programação 2, curso de Sistemas de Informação e a equipe envolvida.
  * **Critérios de Aceite (BDD):**
    * **Dado** que o usuário clica no link "Sobre o Projeto" no rodapé,
    * **Quando** a informação for requisitada,
    * **Então** um modal acessível (`<dialog>`) deve exibir o texto descritivo do Guia de Extensão, competências trabalhadas e créditos institucionais.
  * **Prioridade:** Média (Sprint 2) — *Entregue e Validado*.
  * **Dependências:** EPIC 1.

* **US 4.1.2 — Termos de Uso e Política de Privacidade (LGPD)** `[STATUS: CONCLUÍDO]`
  * **Como** usuário preocupado com privacidade,
  * **Quero** consultar os Termos de Uso e a Política de Privacidade do portal,
  * **Para que** eu compreenda a política de links externos e a inexistência de coleta invasiva de dados pessoais.
  * **Critérios de Aceite (BDD):**
    * **Dado** que o usuário acessa "Política de Privacidade",
    * **Quando** o documento for aberto,
    * **Então** o texto deve explicitar o uso de métricas anônimas sem cookies via Vercel Web Analytics, ausência de cadastro obrigatório e isenção de responsabilidade sobre conteúdos de terceiros.
  * **Prioridade:** Média (Sprint 2) — *Entregue e Validado*.
  * **Dependências:** EPIC 1.

---

## EPIC 5: Deploy Contínuo, Otimização e Performance
**Objetivo:** Garantir que o produto final esteja hospedado de forma gratuita, contínua e com alta performance na Vercel.
* **Status do Epic:** CONCLUÍDO (Sprint 2)

### Feature 5.1: Integração Vercel e Headers de Segurança
* **US 5.1.1 — Pipeline de Hospedagem Contínua na Vercel** `[STATUS: CONCLUÍDO]`
  * **Como** mantenedor do projeto na UEMG,
  * **Quero** que todo push na branch `main` do GitHub publique automaticamente a versão mais recente na Vercel,
  * **Para que** novas atualizações entrem em produção sem intervenção manual de infraestrutura.
  * **Critérios de Aceite (BDD):**
    * **Dado** que um novo commit é enviado ao repositório GitHub oficial,
    * **Quando** o webhook da Vercel for acionado,
    * **Então** o deploy estático deve ser concluído com sucesso e a URL pública atualizada com headers de segurança ativos (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).
  * **Prioridade:** Alta (Sprint 1 e Sprint 2) — *Entregue e Validado*.
  * **Dependências:** Repositório Git configurado e `vercel.json`.
