# CodeMirror Editor Pro (`wp-codemirror-block`)

[![WordPress Gutenberg Block](https://img.shields.io/badge/Gutenberg-Block%20API%20v3-blue.svg)](https://developer.wordpress.org/block-editor/)
[![CodeMirror](https://img.shields.io/badge/CodeMirror-6.x-green.svg)](https://codemirror.net/)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

**CodeMirror Editor Pro** é um plugin e bloco Gutenberg nativo para WordPress projetado para desenvolvedores, educadores e criadores de conteúdo técnico que necessitam de um editor de código-fonte profissional, elegante e de alto desempenho dentro do editor de blocos do WordPress.

Desenvolvido utilizando a biblioteca moderna e modular **CodeMirror 6**, o bloco oferece realce de sintaxe em tempo real, suporte a múltiplas linguagens de programação, alternância dinâmica de temas visuais, design no estilo terminal moderno (com controles de janela e botão de cópia com um clique) e internacionalização completa (i18n).

---

## 🚀 Funcionalidades Principais

- **Integração Nativa com Gutenberg (API v3)**: Desenvolvido seguindo as diretrizes oficiais do `@wordpress/scripts` e componentes do `@wordpress/components`.
- **Motor CodeMirror 6**: Arquitetura moderna baseada em extensões modulares, garantindo carregamento ultrarrápido e ausência de vazamento de memória (*memory leak prevention* via descarte no ciclo de vida `useEffect`).
- **Suporte Multi-Linguagem**:
  - JavaScript (ECMAScript, JSX)
  - Python
  - PHP
  - HTML / XML
  - CSS
  - SQL
  - Markdown
- **Alternador de Temas em Tempo Real**:
  - *Default (Clean Light)*
  - *One Dark*
  - *Dracula*
  - *Solarized Dark*
  - *Nord (Arctic Frost)*
- **Reconfiguração Dinâmica (Compartments)**: Mudança instantânea de linguagem e tema sem recriar o editor DOM ou perder o histórico de desfazer/refazer.
- **Frontend Otimizado e Acessível**: Saída semântica em HTML5 (`<pre><code>`), com cabeçalho de janela personalizável, botões de ação e compatibilidade total com leitores de tela.
- **Internacionalização Pronta (i18n)**: Suporte nativo aos idiomas Português do Brasil (`pt_BR`), Inglês (`en_US`), Italiano (`it_IT`) e Espanhol (`es_ES`).

---

## 📂 Estrutura do Projeto

```
wp-codemirror-block/
├── package.json               # Dependências e scripts de compilação
├── block.json                 # Manifesto do bloco (API v3)
├── wp-codemirror-block.php    # Arquivo principal do plugin WordPress
├── README.md                  # Documentação completa
├── src/                       # Código-fonte React & SCSS
│   ├── index.js               # Registro do bloco
│   ├── edit.js                # Componente do editor Gutenberg e CodeMirror 6
│   ├── save.js                # Serialização semântica do frontend
│   ├── editor.scss            # Estilos do editor Gutenberg
│   └── style.scss             # Estilos de frontend e temas
├── languages/                 # Dicionários de internacionalização
│   ├── pt-br.json             # Português do Brasil
│   ├── en-us.json             # Inglês (Padrão)
│   ├── it.json                # Italiano
│   └── es.json                # Espanhol
└── screenshots/               # Capturas de tela demonstrativas
    ├── 01-editor-overview.png
    ├── 02-language-selector.png
    ├── 03-theme-switcher.png
    └── 04-frontend-output.png
```

---

## 🛠️ Instalação e Compilação

### Requisitos
- **Node.js**: v18.0.0 ou superior (testado com Node v24+)
- **npm**: v8.0.0 ou superior
- **WordPress**: 6.0 ou superior
- **PHP**: 7.4 ou superior

### 1. Clonar ou Baixar o Repositório
Coloque a pasta `wp-codemirror-block` dentro do diretório de plugins do seu WordPress:
```bash
wp-content/plugins/wp-codemirror-block/
```

### 2. Instalar as Dependências
Navegue até a pasta do plugin e instale os pacotes npm:
```bash
cd wp-codemirror-block
npm install
```

### 3. Scripts de Compilação

- **Ambiente de Desenvolvimento** (com *hot-reloading* e *watch*):
  ```bash
  npm run start
  ```
- **Build de Produção** (arquivos minificados e otimizados na pasta `build/`):
  ```bash
  npm run build
  ```
- **Validação e Linters**:
  ```bash
  npm run lint:js
  npm run lint:css
  ```

### 4. Ativação no WordPress
1. Acesse o Painel Administrativo do WordPress (`/wp-admin`).
2. Vá em **Plugins** > **Plugins Instalados**.
3. Localize **CodeMirror Editor Pro** e clique em **Ativar**.
4. Crie ou edite uma postagem/página e adicione o bloco digitando `/codemirror` ou selecionando na categoria **Formatação**.

---

## 📸 Guia Detalhado de Screenshots

As capturas de tela localizadas na pasta [`screenshots/`](./screenshots/) ilustram o fluxo de trabalho completo do plugin:

| Arquivo | Descrição |
| :--- | :--- |
| **`01-editor-overview.png`** | **Visão Geral do Editor**: Mostra o bloco inserido no Gutenberg com destaque de sintaxe, cabeçalho moderno no estilo macOS (com botões de janela), numeração de linhas e barra de status. |
| **`02-language-selector.png`** | **Seletor de Linguagem**: Demonstração do painel lateral *InspectorControls*, evidenciando o `SelectControl` para alternar entre JavaScript, Python, PHP, HTML, CSS, SQL e Markdown com reconfiguração instantânea. |
| **`03-theme-switcher.png`** | **Alternador de Temas**: Demonstração da troca de temas visuais em tempo real (ex: One Dark, Dracula, Solarized Dark, Nord, Default) no painel de configurações. |
| **`04-frontend-output.png`** | **Renderização no Frontend**: Exibição elegante do código publicado na página do site, com contraste ideal, badge de linguagem e botão de cópia rápida para a área de transferência. |

---

## 🌐 Internacionalização (i18n)

O plugin é 100% preparado para tradução. Os arquivos de tradução encontram-se em formato JSON na pasta `languages/`:
- `pt-br.json`: Português do Brasil
- `en-us.json`: Inglês (Default)
- `it.json`: Italiano
- `es.json`: Espanhol

O plugin utiliza a função nativa `wp_set_script_translations` e `@wordpress/i18n`, integrando-se perfeitamente com os pacotes de idiomas do WordPress.

---

## 👨‍💻 Autor & Referências Profissionais

Desenvolvido por **Luiz**:

- 🌐 **WordPress User Profile**: [https://profiles.wordpress.org/luiz0067/](https://profiles.wordpress.org/luiz0067/)
- 💼 **LinkedIn**: [https://www.linkedin.com/in/luiz-developer/](https://www.linkedin.com/in/luiz-developer/)
- 🐙 **GitHub**: [https://github.com/luiz0067yahoo](https://github.com/luiz0067yahoo)

---

## 📄 Licença

Distribuído sob a licença **GPL-2.0-or-later**. Consulte [GNU General Public License](https://www.gnu.org/licenses/gpl-2.0.html) para mais informações.
