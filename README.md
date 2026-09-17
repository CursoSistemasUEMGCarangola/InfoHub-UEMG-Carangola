# InfoHub UEMG Carangola

[![UEMG](https://img.shields.io/badge/UEMG-Unidade%20Carangola-003366.svg)](https://www.uemg.br/)
[![Extensão](https://img.shields.io/badge/Extens%C3%A3o-Sistemas%20de%20Informa%C3%A7%C3%A3o-e65100.svg)](/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-success.svg)](#suporte-a-progressive-web-app-pwa)
[![Zero Backend](https://img.shields.io/badge/Architecture-Zero--Backend-blue.svg)](#arquitetura-e-stack-tecnológica)
[![LGPD](https://img.shields.io/badge/Compliance-LGPD%20%7C%20Privacy--by--Design-green.svg)](#segurança-governança-e-lgpd)
[![License](https://img.shields.io/badge/License-MIT-gray.svg)](LICENSE)

> **Portal Institucional de Autoatendimento e Centralização Informacional da Unidade Acadêmica de Carangola da Universidade do Estado de Minas Gerais (UEMG).**

---

## 🏛️ 1. Visão Geral e Contexto Acadêmico

O **InfoHub UEMG Carangola** foi desenvolvido no âmbito da curricularização da extensão universitária na disciplina de **Programação 2** do curso de **Bacharelado em Sistemas de Informação (BSI)** da **UEMG Unidade Carangola**.

A plataforma atua como ponto focal seguro, moderno e de autoatendimento para toda a comunidade acadêmica (estudantes, professores, servidores técnico-administrativos e comunidade externa), reunindo e direcionando para os **10 portais setoriais informacionais** concebidos, implementados e mantidos pelos próprios discentes extensionistas.

---

## 🎯 2. Objetivos Principais

* **Centralização de Acesso:** Substituir fluxos burocráticos dispersos por uma interface unificada, responsiva e de navegação instantânea.
* **Identidade Institucional:** Preservar rigorosamente os padrões estéticos, cores e tipografia do portal oficial da UEMG (`https://www.uemg.br/`).
* **Mobilidade (PWA):** Disponibilizar o InfoHub como aplicativo instalável diretamente na tela inicial de smartphones sem depender de lojas de aplicativos.
* **Custo Zero & Longevidade:** Arquitetura estática desacoplada, sem servidores dedicados ou bancos de dados pagos, garantindo manutenção perene por turmas futuras.

---

## 📑 3. Os 10 Portais Setoriais Mapeados

O InfoHub organiza os serviços da universidade em uma grade balanceada de 5 linhas x 2 colunas no desktop (e coluna única e fluida em smartphones):

| # | Setor / Tema | Descrição e Escopo | Categoria |
| --- | --- | --- | --- |
| **01** | **Acesso Institucional & Sistemas** | Orientações de e-mail institucional, Portal do Aluno (Giz), Microsoft Teams e Wi-Fi do campus. | Acadêmico |
| **02** | **Comissão Própria de Avaliação (CPA)** | Relatórios de autoavaliação institucional, pesquisas de clima acadêmico e planos de melhoria da unidade. | Institucional |
| **03** | **Setor de Estágios & Empregabilidade** | Formulários de termo de compromisso, convênios de estágio obrigatório/não obrigatório e relatórios. | Carreira |
| **04** | **Formatura & Colação de Grau** | Calendário de solenidades, documentação de colação oficial/gabinete e normas de vestimenta. | Graduação |
| **05** | **Atividades Complementares (AAC)** | Manual de envio de certificados, barema de pontuação de horas e prazos de validação curricular. | Acadêmico |
| **06** | **Iniciação Científica & Pesquisa** | Editais PIBIC/PIBITI/PAEX, submissão de planos de trabalho, relatórios e comitê de ética. | Pesquisa |
| **07** | **Secretaria Acadêmica & Matrícula** | Calendário letivo oficial, emissão de histórico/declarações, trancamento e ajuste de matrícula. | Atendimento |
| **08** | **Revista Científica & Publicações** | Diretrizes para submissão de artigos científicos, indexação acadêmica e corpo editorial. | Pesquisa |
| **09** | **Núcleo de Apoio Estudantil (NAE)** | Bolsas socioeconômicas (PEAES), suporte pedagógico, apoio psicológico e inclusão/acessibilidade. | Apoio Social |
| **10** | **Trabalho de Conclusão de Curso (TCC)** | Regulamento geral de TCC, cronograma de bancas públicas, templates ABNT e depósito na biblioteca. | Graduação |

---

## ⚡ 4. Arquitetura e Stack Tecnológica

O projeto adota uma arquitetura **JAMstack Estática Pura (Zero-Backend)**, priorizando performance máxima, inteligibilidade didática e segurança por isolamento:

* **HTML5 Semântico:** Estruturação rica para acessibilidade por leitores de tela (`role="banner"`, `role="main"`, `role="contentinfo"`).
* **CSS3 Modular com Design Tokens:** Variáveis CSS nativas no `:root` sem frameworks pesados como Tailwind ou Bootstrap, reproduzindo a paleta cromática e tipográfica oficial da UEMG.
* **JavaScript ES6+ Puro:** Sem runtime de frameworks SPA (React, Vue, Angular), viabilizando manutenção didática direta por estudantes dos primeiros semestres.
* **Abordagem Data-Driven:** Dados do catálogo 100% desacoplados em `src/js/services-data.js`, permitindo edição ágil sem tocar no DOM ou no CSS.
* **Progressive Web App (PWA):** Manifesto Web (`manifest.webmanifest`) e Service Worker nativo (`public/sw.js`) com estratégia de cache *Stale-While-Revalidate* para o App Shell.
* **Vite:** Ferramenta de empacotamento ultrarrápida para desenvolvimento local e compilação de produção otimizada.
* **Vitest:** Suíte de testes unitários automatizados validando integridade de dados, regras de PWA e conformidade de headers.
* **Vercel Edge Network:** Hospedagem estática contínua com SSL automático, CDN global e latência mínima.

---

## 🔒 5. Segurança, Governança e LGPD

1. **Proteção Anti-Tabnabbing:** Todos os links externos para projetos setoriais utilizam rigorosamente os atributos `target="_blank"` e `rel="noopener noreferrer"`, prevenindo sequestro do objeto `window.opener`.
2. **Conformidade Estrita com a LGPD (Lei nº 13.709/2018):**
   * Zero coleta ou retenção de Dados Pessoais Identificáveis (PII).
   * Sem uso de cookies de rastreamento de terceiros.
   * Telemetria restrita às métricas anônimas e livres de cookies do Vercel Web Analytics.
3. **Cabeçalhos HTTP de Segurança (`vercel.json`):**
   * `X-Content-Type-Options: nosniff` (prevenção de sniffing de tipo MIME).
   * `X-Frame-Options: DENY` (bloqueio contra ataques de clickjacking em iframes).
   * `Referrer-Policy: strict-origin-when-cross-origin` (proteção de metadados de navegação).
4. **Modais Nativos Acessíveis:** Seções de "Sobre o Projeto", "Termos de Uso" e "Política de Privacidade" renderizadas através da tag nativa `<dialog>`, garantindo isolamento sem bibliotecas externas.

---

## 🚀 6. Instalação e Execução Local

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* `npm` (versão 9 ou superior)

### Passo a Passo

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/niltonfjunior2/InfoHub-UEMG-Carangola.git
   cd InfoHub-UEMG-Carangola
   ```

2. **Instalar dependências de desenvolvimento:**

   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento local:**

   ```bash
   npm run dev
   ```

   Acesse a aplicação no navegador em `http://localhost:5173/`.

4. **Executar a suíte de testes automatizados:**

   ```bash
   npm test
   ```

5. **Gerar build de produção otimizado:**

   ```bash
   npm run build
   ```

6. **Pré-visualizar o build localmente:**

   ```bash
   npm run preview
   ```

---

## 📂 7. Estrutura de Diretórios

```plaintext
InfoHub-UEMG-Carangola/
├── dist/                      # Bundle de produção gerado pelo Vite
├── public/                    # Assets estáticos servidos diretamente
│   ├── images/                # Fachadas, logotipos e ícones PWA
│   ├── manifest.webmanifest   # Manifesto de instalação PWA
│   └── sw.js                  # Service Worker com cache do App Shell
├── src/                       # Código-fonte da aplicação
│   ├── css/
│   │   └── style.css          # Design System e estilos modulares
│   └── js/
│       ├── main.js            # Lógica de interface, modais, PWA e eventos
│       └── services-data.js   # Catálogo desacoplado dos 10 serviços setoriais
├── tests/                     # Testes automatizados com Vitest
│   ├── pwa-modals.test.js     # Validação de PWA, modais e headers
│   └── services.test.js       # Validação da integridade dos 10 setores
├── index.html                 # Página inicial da landing page (HTML5 semântico)
├── package.json               # Configurações do projeto e scripts
├── vercel.json                # Roteamento e cabeçalhos de segurança na Vercel
├── vite.config.js             # Configuração do Vite
└── vitest.config.js           # Configuração da suíte de testes
```

---

## 🤖 8. Nota de Transparência sobre o Uso de Inteligência Artificial

> Em consonância com as diretrizes contemporâneas de ética, transparência acadêmica e inovação pedagógica no ensino superior de computação, declara-se que este projeto utilizou ferramentas de **Inteligência Artificial Generativa (LLMs)** durante as etapas de concepção arquitetural, engenharia de software e refinamento de código.
>
> ### Papel da IA no Projeto
>
> * **Pair Programming e Aceleração de Código:** A IA atuou como assistente técnico sob a supervisão direta do professor orientador e dos estudantes, auxiliando na geração de scaffolding semântico, refatoração cirúrgica e elaboração de testes automatizados.
> * **Engenharia de Sustentação Baseada em Contexto (RAG):** Todas as intervenções foram orientadas por protocolos estritos de governança (`.ai/rag.md`), respeitando restrições invioláveis de segurança, ausência de custos e fidelidade à identidade visual da UEMG.
> * **Responsabilidade Humana Integral:** Todo o código gerado, decisões arquiteturais, critérios de acessibilidade e validações de segurança foram criticamente revisados, testados e aprovados pelos docentes e discentes responsáveis pela disciplina. A IA não substitui o rigor conceitual nem a autoria intelectual pedagógica da extensão curricularizada.
