# E-veg

Loja virtual de produtos veganos, desenvolvida como projeto acadêmico em HTML, CSS e JavaScript puro, sem frameworks e sem back-end.

O site permite navegar pelo catálogo, montar um carrinho, simular a finalização de um pedido e calcular um orçamento de hospedagem.

> **Aviso:** este é um projeto de demonstração. Nenhum pedido, pagamento, login ou mensagem é enviado a um servidor.

---

## Sumário

- [Escopo do projeto](#escopo-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como executar](#como-executar)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Páginas](#páginas)
- [Acessibilidade: visão geral](#acessibilidade-visão-geral)
- [Acessibilidade: o botão e o menu](#acessibilidade-o-botão-e-o-menu)
- [Acessibilidade: narração por voz](#acessibilidade-narração-por-voz)
- [Acessibilidade: Libras com VLibras](#acessibilidade-libras-com-vlibras)
- [Acessibilidade: ajustes visuais com Sienna](#acessibilidade-ajustes-visuais-com-sienna)
- [Acessibilidade do código (WAI-ARIA)](#acessibilidade-do-código-wai-aria)
- [Responsividade (celular)](#responsividade-celular)
- [Publicação e cache (GitHub Pages)](#publicação-e-cache-github-pages)
- [Como o código funciona](#como-o-código-funciona)
- [Como adicionar um produto](#como-adicionar-um-produto)
- [Regras do orçamento de hospedagem](#regras-do-orçamento-de-hospedagem)
- [Orçamento do projeto (custos)](#orçamento-do-projeto-custos)
- [Identidade visual](#identidade-visual)
- [Testes](#testes)
- [Limitações conhecidas](#limitações-conhecidas)
- [Melhorias do MVP](#melhorias-do-mvp)
- [Uso de Inteligência Artificial](#uso-de-inteligência-artificial)
- [Diário de bordo](#diário-de-bordo)
- [Equipe](#equipe)

---

## Escopo do projeto

### Objetivo

Entregar um **MVP** (produto mínimo viável) de uma loja virtual de produtos veganos que mostre o fluxo completo de compra e seja **acessível** para pessoas com deficiência visual e auditiva, funcionando bem em computador e celular.

### Dentro do escopo (entregue no MVP)

| Área | O que está incluso |
|---|---|
| Loja | Catálogo com 6 produtos de exemplo, carrinho que guarda os itens no navegador, checkout simulado com confirmação |
| Páginas de apoio | Início, Sobre nós (com a equipe), FAQ, Contato, Login (simulado) e Termos de uso |
| Orçamento | Calculadora de orçamento de hospedagem (plano, período, extras e descontos) |
| Acessibilidade | Botão único com menu: **Baixa visão** (Sienna), **Cegos** (narração por voz) e **Surdos** (VLibras), mais boas práticas WAI-ARIA no código |
| Responsividade | Layout adaptado a celulares, tablets e computadores, com menu de navegação recolhível |
| Qualidade | 145 verificações automáticas (pasta `tests/`) e este README |

### Fora do escopo (não será feito neste MVP)

- Back-end, banco de dados e contas de usuário reais.
- Pagamento real, cálculo de frete e emissão de nota fiscal.
- Controle de estoque, painel administrativo e cadastro de produtos.
- Fotos reais dos produtos, avaliações e busca.
- Versões em outros idiomas.

### Premissas e restrições

- O site é **estático** (HTML, CSS e JavaScript puros) e é publicado no **GitHub Pages**.
- Os produtos, preços e textos são **exemplos** e podem ser trocados.
- O VLibras e o Sienna são serviços externos: precisam de internet e podem mudar sem aviso.
- Projeto acadêmico: não há venda real nem tratamento de dados pessoais em servidor.

### Critérios de aceite do MVP

- [x] As 10 páginas abrem sem erro de JavaScript.
- [x] É possível adicionar produtos, ver o carrinho e confirmar um pedido de demonstração.
- [x] Formulários validam os campos e mostram mensagem de confirmação.
- [x] O botão de acessibilidade abre o menu com as três opções e funciona pelo teclado.
- [x] Nenhuma página tem rolagem lateral em celulares de 320 a 390 px de largura.
- [ ] VLibras e Sienna conferidos no site publicado, com internet (veja [Testes](#testes)).
- [ ] Teste em celulares reais e com leitores de tela (veja [Testes](#testes)).

## Funcionalidades

- **Catálogo de produtos** com seis itens de exemplo.
- **Carrinho de compras** que guarda os itens no navegador: eles continuam lá mesmo depois de fechar ou recarregar a página.
- **Contador do carrinho** no menu, atualizado a cada item adicionado ou removido.
- **Checkout simulado** com resumo do pedido, formulário de entrega e escolha da forma de pagamento.
- **Calculadora de orçamento de hospedagem** com plano, período, descontos e extras, com o total atualizado na hora.
- **Formulários de contato e login** com validação dos campos.
- **Páginas informativas:** FAQ, Sobre nós (com a equipe) e Termos de uso.
- **Menu de acessibilidade:** um único botão flutuante (ícone universal de acessibilidade) que abre um menu lateral com três opções: **Baixa visão**, **Cegos** e **Surdos**.
- **Narração por voz (opção Cegos):** lê o conteúdo da página em voz alta, com escolha de velocidade, para apoiar pessoas cegas e com baixa visão.
- **Tradutor de Libras (opção Surdos):** widget VLibras, do governo federal, que traduz o texto em português para a Língua Brasileira de Sinais, para apoiar pessoas surdas.
- **Ajustes de leitura e contraste (opção Baixa visão):** widget Sienna, que permite aumentar a fonte, mudar o contraste, usar fonte para dislexia, parar animações e outros ajustes.
- **Layout responsivo:** o site se adapta a celulares, tablets e computadores, com menu de navegação que recolhe em telas pequenas.
- **Menu e rodapé** iguais em todas as páginas.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Visual e layout |
| JavaScript (puro) | Carrinho, formulários e cálculo do orçamento |
| `localStorage` | Guardar o carrinho no navegador |
| Web Speech API (`speechSynthesis`) | Narração do conteúdo em voz alta |
| VLibras Widget | Tradução do texto para Libras com avatar 3D |
| Sienna Accessibility Widget | Ajustes de fonte, contraste e leitura |
| Google Fonts | Fontes Playfair Display e Lato |

Não há dependências para instalar.

## Como executar

**Opção 1: abrir direto.** Dê dois cliques no arquivo `index.html` ou arraste-o para o navegador.

**Opção 2: servidor local (opcional).** Na pasta do projeto, rode:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

Precisa de internet para carregar as fontes do Google, o VLibras e o Sienna. Sem conexão, o site e a narração por voz funcionam normalmente, com fontes padrão do sistema, mas o tradutor de Libras e o widget de ajustes visuais não aparecem.

## Estrutura do projeto

```
E-Veg/
├── index.html                  Página inicial
├── produtos.html               Catálogo
├── carrinho.html               Carrinho de compras
├── checkout.html               Finalização do pedido
├── contato.html                Formulário de contato
├── login.html                  Formulário de login
├── faq.html                    Perguntas frequentes
├── sobre_nos.html              Sobre o projeto e equipe
├── termos_de_uso.html          Termos de uso
├── orcamento_hospedagem.html   Calculadora de orçamento
├── css/
│   └── style.css               Estilos de todo o site
├── js/
│   └── script.js               Todo o JavaScript do site
├── img/                        Imagens (vazia por enquanto)
├── assets/                     Outros arquivos (vazia por enquanto)
├── tests/
│   ├── teste_funcional.py      Testes automáticos de funcionamento
│   └── teste_responsivo.py     Testes automáticos de celular e tablet
├── docs/
│   └── readme.txt              Resumo curto do projeto
├── Integrantes.txt             Lista da equipe
└── README.md                   Este arquivo
```

## Páginas

| Página | O que faz |
|---|---|
| `index.html` | Apresenta a loja e leva ao catálogo |
| `produtos.html` | Lista os produtos, cada um com botão "Adicionar ao carrinho" |
| `carrinho.html` | Mostra os itens, o subtotal de cada um, o total e o botão de remover |
| `checkout.html` | Mostra o resumo, pede os dados de entrega e confirma o pedido |
| `contato.html` | Formulário com nome, e-mail e mensagem |
| `login.html` | Formulário com e-mail e senha (mínimo de 6 caracteres) |
| `faq.html` | Respostas às dúvidas mais comuns |
| `sobre_nos.html` | Descrição do projeto e lista da equipe |
| `termos_de_uso.html` | Regras de uso do site |
| `orcamento_hospedagem.html` | Calcula o valor da hospedagem conforme as opções escolhidas |

## Acessibilidade: visão geral

O site combina **três recursos que se complementam**. Nenhum widget ou API sozinho atende todas as deficiências, por isso cada um cobre um público. Todos ficam atrás de **um único botão flutuante**:

| Opção do menu | Público | Recurso | Como ajuda |
|---|---|---|---|
| Baixa visão | Baixa visão, dislexia, sensibilidade a movimento | Sienna | Aumenta a fonte, muda o contraste, usa fonte para dislexia e para animações |
| Cegos | Pessoas cegas e com baixa visão | Narração por voz (Web Speech API) | Lê o conteúdo da página em voz alta |
| Surdos | Pessoas surdas ou com deficiência auditiva | VLibras | Traduz o texto em português para Libras com um avatar 3D |

Esses recursos ajudam, mas **não substituem** um site bem construído (textos claros, títulos organizados, navegação por teclado) nem um teste com usuários reais.

## Acessibilidade: o botão e o menu

### O que o usuário vê

No canto inferior direito de todas as páginas há um **botão azul redondo com o símbolo universal de acessibilidade** (a figura humana de braços abertos dentro de um círculo). Ao clicar, abre-se um **menu lateral flutuante** com três opções:

```
(botão de acessibilidade)
 ├── Baixa visão  → abre os ajustes do Sienna
 ├── Cegos        → liga ou desliga a narração por voz (com escolha de velocidade)
 └── Surdos       → abre o tradutor de Libras (VLibras)
```

- O botão é o **primeiro item da navegação por teclado**: ao abrir a página e apertar `Tab`, ele já recebe o foco; `Enter` ou `Espaço` abre o menu e leva o foco para a primeira opção. O segundo `Tab` leva ao link "Pular para o conteúdo".
- A tecla `Esc` fecha o menu e devolve o foco ao botão.
- O botão e as opções têm contorno amarelo bem visível quando recebem o foco do teclado.
- No celular, o menu se ajusta à largura da tela.

### Como funciona por dentro

O Sienna e o VLibras trazem, cada um, o seu **próprio botão flutuante**. Para que exista só um botão na tela:

1. **Sienna:** o CSS esconde o botão original (`.asw-menu-btn`) com `visibility: hidden`.
2. **VLibras:** o botão dele fica dentro de uma área isolada da página (*shadow root*), que o CSS do site não alcança. Por isso o JavaScript usa `window.VLibrasWidget.initBtn`, o acesso ao botão que o manual oficial do VLibras documenta, e o esconde com `style.display = "none"`. Como o VLibras mostra o botão de novo quando a janela dele é fechada, a função `esconderBotaoLibras()` roda a cada 0,3 segundo e o esconde outra vez.
3. As opções "Baixa visão" e "Surdos" **clicam nesses botões por código** (`botao.click()`), o que abre o painel do Sienna e a janela do VLibras.
4. Antes de clicar, o código confere se o widget carregou. Se não carregou (por exemplo, sem internet), mostra um aviso na tela.

| Função (`js/script.js`) | O que faz |
|---|---|
| `abrirMenuAcessibilidade()` | Abre ou fecha o menu e atualiza o `aria-expanded` do botão |
| `fecharMenuAcessibilidade()` | Fecha o menu |
| `abrirBaixaVisao()` | Clica no botão do Sienna (ou avisa que não carregou) |
| `abrirLibras()` | Clica no botão do VLibras (ou avisa que não carregou) |
| `esconderBotaoLibras()` | Mantém escondidos os botões flutuantes originais do VLibras e do Sienna |
| `narrar()`, `pararNarracao()`, `mudarVelocidade()` | Narração por voz |

### Atenção ao atualizar os widgets

O menu depende de dois pontos de contato com serviços externos:

- **VLibras:** `window.VLibrasWidget.initBtn`, previsto no manual oficial do VLibras Widget.
- **Sienna:** o elemento `.asw-menu-btn`, que **não** faz parte de uma documentação oficial de integração.

Se uma atualização mudar esses nomes, a opção correspondente passa a exibir o aviso de "não carregou". Nesse caso, ajuste o nome em `abrirBaixaVisao()` ou `abrirLibras()` (e, no caso do Sienna, a regra que o esconde no `style.css`).

## Acessibilidade: narração por voz

A narração usa a **Web Speech API**, a API do navegador para voz, na parte de **síntese de fala** (texto para voz, ou *Text-to-Speech*). Ela já vem pronta nos navegadores modernos: não precisa instalar biblioteca, criar conta nem pagar por serviço externo.

### O que o usuário vê

Na opção **Cegos** do menu de acessibilidade, que também traz a escolha **Velocidade da voz** (devagar, normal ou rápido).

- Ao clicar em **Cegos**, a voz lê o título da página e todo o conteúdo principal (títulos, textos, produtos, tabela do carrinho, resumo do pedido, resultado do orçamento).
- Com a leitura em andamento, o texto da opção muda para **Parar narração**; clicar de novo interrompe a voz.
- Se a velocidade for trocada durante a leitura, ela recomeça já na nova velocidade.
- O menu pode ser fechado sem interromper a leitura.

### Partes da API usadas

| Parte da API | Para que serve no projeto |
|---|---|
| `window.speechSynthesis` | Controla a voz do navegador |
| `speechSynthesis.speak(fala)` | Manda o navegador falar |
| `speechSynthesis.cancel()` | Interrompe a fala em andamento |
| `new SpeechSynthesisUtterance(texto)` | Cria o "pedido de fala" com o texto a ser lido |
| `fala.lang = "pt-BR"` | Define o idioma (português do Brasil) |
| `fala.rate` | Define a velocidade (0,7 devagar, 1 normal, 1,3 rápido) |
| `fala.onend` | Evento chamado quando a fala termina; volta o botão ao estado inicial |
| `"speechSynthesis" in window` | Verifica se o navegador tem suporte antes de usar |

### Fluxo da narração

```
Clique em "Cegos"
        │
        ▼
O navegador tem suporte? ── não ──► mostra um aviso na tela
        │ sim
        ▼
Pega o título da página + texto do <main>
        │
        ▼
Cria a fala (texto, idioma pt-BR, velocidade escolhida)
        │
        ▼
Cancela falas anteriores e chama speak()
        │
        ▼
Opção "Cegos" mostra "Parar narração"  ──► ao terminar (onend) ou ao clicar de novo, volta ao texto inicial
```

### Trecho principal do código (`js/script.js`)

```js
var principal = document.getElementsByTagName("main")[0];
var texto = "Página " + document.title + ". " + principal.innerText;

var fala = new SpeechSynthesisUtterance(texto);
fala.lang = "pt-BR";
fala.rate = Number(document.getElementById("velocidade").value);

window.speechSynthesis.cancel();
window.speechSynthesis.speak(fala);
```

**Funções:** `narrar()`, `pararNarracao()` e `mudarVelocidade()`.

### Compatibilidade e requisitos

- A interface `SpeechSynthesisUtterance` é considerada amplamente disponível, em vários navegadores, desde setembro de 2018, segundo a documentação da MDN. O suporte e a qualidade variam entre navegador, sistema e aparelho; teste no ambiente em que o site será usado.
- A voz vem do sintetizador de voz instalado no aparelho. Sem uma voz em português do Brasil disponível no sistema, a narração pode falar com outra voz ou não funcionar.
- Navegadores baseados no Chromium só tocam áudio depois de o usuário interagir com a página. Por isso a leitura **não começa sozinha** ao abrir a página: o usuário precisa acionar a opção Cegos.
- Se o navegador não tiver suporte, o site avisa com uma mensagem em vez de falhar em silêncio.
- A leitura é feita pelo próprio aparelho: o site não envia o texto para nenhum servidor.

### Limitações

- A narração lê só o conteúdo principal; o menu, o rodapé e os valores digitados nos formulários não entram na leitura.
- Ela complementa, mas não substitui, leitores de tela como NVDA, JAWS, VoiceOver e TalkBack, que oferecem navegação completa por teclado ou toque.
- Textos muito longos podem ser cortados por alguns navegadores; as páginas deste projeto são curtas.

### Referência

- MDN Web Docs: Web Speech API, <https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API>

## Acessibilidade: Libras com VLibras

O **VLibras** é uma ferramenta gratuita e de código aberto do governo federal que traduz conteúdo em português para a **Língua Brasileira de Sinais (Libras)**, por meio de um avatar 3D. Ele atende pessoas surdas e com deficiência auditiva, enquanto a narração por voz atende pessoas cegas e com baixa visão.

### O que o usuário vê

Na opção **Surdos** do menu de acessibilidade. Ao clicar, abre-se a janela do VLibras com o avatar, e o usuário pode traduzir o texto da página. **O botão flutuante original do VLibras não aparece na tela principal**: só o botão de acessibilidade do site fica visível.

### Como foi instalado

Segundo o manual oficial do VLibras Widget (versão 7.0.0), basta uma linha no HTML, e o widget é iniciado automaticamente. Ela fica no fim do `<body>` de cada página:

```html
<script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
```

Não é preciso o código de integração antigo (as `<div vw>` e a chamada `new window.VLibras.Widget(...)`). Essa chamada continua disponível apenas para quem quiser personalizar posição ou avatar.

### Como o botão foi escondido e acionado

O botão flutuante do VLibras é desenhado dentro de um *shadow root*, que isola o estilo dele do resto da página. O manual informa que, depois que o widget carrega, esse botão fica disponível em `window.VLibrasWidget.initBtn`. O site usa isso para:

```js
window.VLibrasWidget.initBtn.style.display = "none";   // esconde o botão original
window.VLibrasWidget.initBtn.click();                  // abre o VLibras (opção Surdos)
```

### Requisitos e limitações

- **Precisa de internet:** o script e os arquivos do avatar são carregados de `vlibras.gov.br`. Sem conexão, a opção Surdos mostra um aviso.
- **Depende de um serviço externo:** se o site do governo estiver fora do ar ou instável, o VLibras também fica indisponível, independentemente deste projeto.
- **O botão original pode aparecer por um instante** ao carregar a página, antes de o código escondê-lo (a verificação roda a cada 0,3 segundo).
- **Traduz texto em português:** a qualidade da tradução depende do próprio VLibras.
- O VLibras não substitui a presença de intérprete humano de Libras em conteúdos que exijam isso.

### Referências

- VLibras, Governo Federal: <https://vlibras.gov.br>
- Manual do VLibras Widget, "Integrando a uma Página Web" (documentação oficial)

## Acessibilidade: ajustes visuais com Sienna

O **Sienna** é um widget de acessibilidade gratuito e de código aberto (licença MIT). Ele adiciona à página um painel de ajustes, e o próprio visitante escolhe o que precisa. Neste projeto, o painel abre pela opção **Baixa visão** do menu. Não exige cadastro nem chave de acesso: basta uma linha de código.

### O que o usuário pode ajustar

- Tamanho da fonte, espessura da fonte e altura da linha.
- Contraste alto, claro ou escuro, além de saturação e modo monocromático.
- Fonte amigável para dislexia.
- Guia de leitura, destaque de texto e cursor grande.
- Parar animações.
- Perfis prontos de acessibilidade (por exemplo, para baixa visão ou para evitar gatilhos de movimento).

### Como foi instalado

Uma linha no fim do `<body>` de cada página:

```html
<script src="https://cdn.jsdelivr.net/npm/sienna-accessibility/dist/sienna-accessibility.umd.js" async></script>
```

O script é carregado da CDN jsDelivr. O endereço usado não fixa uma versão; para garantir que o comportamento não mude no futuro, é possível fixar uma versão específica no endereço (`sienna-accessibility@versão`).

### Limitações

- **Precisa de internet** para carregar o script.
- **Depende de serviço externo:** se a CDN estiver fora do ar, a opção Baixa visão mostra um aviso.
- **Camada visual:** o Sienna ajusta a aparência para o visitante, mas não conserta falhas estruturais do código do site nem traduz o conteúdo.
- **Não tem leitura em voz nem Libras:** por isso o site usa também a narração e o VLibras.

### Referência

- Sienna Accessibility Widget, <https://accessibility-widget.pages.dev>

## Acessibilidade do código (WAI-ARIA)

Além do menu de acessibilidade, as próprias páginas foram escritas para funcionar bem com leitores de tela e com o teclado:

| Recurso | Onde | Para que serve |
|---|---|---|
| Link "Pular para o conteúdo" | Todas as páginas | Quem usa teclado ou leitor de tela vai direto ao conteúdo, sem passar pelo menu |
| `aria-current="page"` | Menu principal | Informa qual é a página atual |
| `aria-label` nos `<nav>` | Menu principal e rodapé | Identifica cada área de navegação |
| Região viva (`<p id="aviso" role="status">`) | Produtos, carrinho, checkout, contato e login | O leitor de tela fala sozinho as mensagens, como "produto adicionado" ou "pedido recebido" (função `avisar()`) |
| Perguntas do FAQ como botões com `aria-expanded` | `faq.html` | Informa se cada resposta está aberta ou fechada (função `alternar()`) |
| `<label>`, `autocomplete` e `aria-required` | Formulários | Cada campo tem nome, é preenchido automaticamente e avisa que é obrigatório |
| Dicas ligadas com `aria-describedby` | CEP e senha | O leitor de tela lê a dica junto com o campo |
| Títulos organizados (`h1`, `h2`, `h3`) e seções com `aria-labelledby` | Todas as páginas | Facilita a navegação por títulos |
| Foco visível | Todo o site | Contorno claro em links, botões e campos ao navegar pelo teclado |
| Resultado do orçamento com `aria-live="polite"` | `orcamento_hospedagem.html` | O total novo é anunciado a cada mudança |

## Responsividade (celular)

O site foi ajustado para funcionar em telas pequenas, sem rolagem lateral. O ponto de virada é **720 px de largura**.

| Elemento | Computador | Celular (até 720 px) |
|---|---|---|
| Menu principal | Links lado a lado no cabeçalho | Recolhido atrás do botão **Menu** (abre e fecha com toque; usa `aria-expanded`) |
| Links do menu | Em linha | Um por linha, com altura de toque confortável (mínimo de 44 px) |
| Produtos | Cartões lado a lado | Um cartão por linha, na largura toda |
| Tabela do carrinho | Largura normal | Letra e espaços menores; rola para o lado se ainda não couber |
| Títulos | Tamanho normal | Menores, para não quebrar palavras |
| Botões e perguntas do FAQ | Tamanho normal | Área de toque maior |
| Botão de acessibilidade | 64 px, canto inferior direito | 56 px; o menu abre **acima** do botão, com largura da tela |
| Rodapé | Normal | Com espaço extra embaixo, para o botão flutuante não cobrir o texto |

Outros cuidados:

- Todas as caixas usam `box-sizing: border-box`, então campos e botões não estouram a largura.
- Os campos de formulário usam letra de 16 px, o que evita o zoom automático ao tocar em um campo no iPhone.
- Em celular deitado (pouca altura), o menu de acessibilidade ocupa a altura disponível e rola por dentro, sem sair da tela.
- O botão "Menu" só aparece no celular. Se o JavaScript não carregar, a navegação continua visível.

**Como foi testado:** 111 verificações automáticas em navegador, em telas de 320×568, 360×640, 390×844, 768×1024 e 740×360 (celular deitado), conferindo que nenhuma das 10 páginas tem rolagem lateral nem erro de JavaScript.

**Função:** `abrirMenu()` em `js/script.js`.

## Publicação e cache (GitHub Pages)

Se o site publicado aparecer **sem estilo** (por exemplo, o menu de acessibilidade como uma lista de botões com ícones enormes), o navegador ou o GitHub Pages está usando uma cópia **antiga** do `css/style.css`. Para resolver:

1. **Envie todos os arquivos** da pasta do projeto, e não só os `.html`: principalmente `css/style.css` e `js/script.js`. Os três tipos de arquivo precisam ser da mesma versão.
2. Aguarde o GitHub Pages terminar a publicação (alguns minutos).
3. No navegador, force a atualização: `Ctrl + F5` (Windows) ou `Cmd + Shift + R` (Mac). No celular, limpe os dados do site ou abra em aba anônima.

Para evitar cache antigo, os arquivos são chamados com um número de versão (`css/style.css?v=3` e `js/script.js?v=3`). **Quando alterar o CSS ou o JavaScript, aumente o número** (`?v=4`, `?v=5`...) em todas as páginas.

Proteção extra: mesmo se o CSS não carregar, o menu de acessibilidade nasce fechado e os ícones têm tamanho próprio, então a página não fica quebrada.

## Como o código funciona

Todo o JavaScript está em `js/script.js` e é carregado por todas as páginas. As funções verificam se o elemento que precisam existe antes de agir, então cada função só trabalha na página certa.

### Dados dos produtos

Os produtos ficam em três listas. A posição de cada item combina entre as listas:

```js
var ids = ["hamburguer", "leite", "queijo", "chocolate", "granola", "sabonete"];
var nomes = ["Hambúrguer de grão-de-bico", "Leite de aveia", ...];
var precos = [24.9, 12.5, 38.0, 16.9, 21.0, 14.0];
```

| ID | Produto | Preço |
|---|---|---|
| `hamburguer` | Hambúrguer de grão-de-bico | R$ 24,90 |
| `leite` | Leite de aveia | R$ 12,50 |
| `queijo` | Queijo de castanha | R$ 38,00 |
| `chocolate` | Chocolate 70% cacau | R$ 16,90 |
| `granola` | Granola artesanal | R$ 21,00 |
| `sabonete` | Sabonete vegetal | R$ 14,00 |

### Carrinho

A quantidade de cada produto é guardada no `localStorage` com a chave `eveg_` seguida do ID. Por exemplo, `eveg_leite` guarda quantas unidades de leite de aveia estão no carrinho.

| Função | O que faz |
|---|---|
| `adicionar(id)` | Soma 1 à quantidade do produto |
| `remover(id)` | Tira o produto do carrinho |
| `pegarQuantidade(id)` | Lê a quantidade de um produto |
| `contarItens()` | Soma todas as unidades do carrinho |
| `calcularTotal()` | Soma o valor de todos os itens |
| `atualizarContador()` | Atualiza o número no menu |
| `mostrarCarrinho()` | Monta a tabela da página do carrinho |
| `mostrarResumo()` | Monta o resumo na página de checkout |
| `finalizar()` | Esvazia o carrinho e confirma o pedido |
| `formatar(valor)` | Escreve o valor como dinheiro, por exemplo `R$ 12,50` |

### Formulários

- `enviarContato()` e `entrar()` apenas mostram uma mensagem na tela.
- Os campos obrigatórios são validados pelo próprio navegador (atributos `required`, `type="email"` e `minlength`).

## Como adicionar um produto

1. Em `js/script.js`, acrescente o novo item no **fim** das três listas (`ids`, `nomes` e `precos`), mantendo a mesma ordem nas três.
2. Em `produtos.html`, copie um bloco `<div class="produto">` e ajuste nome, descrição, preço e o ID dentro do `onclick="adicionar('id-do-produto')"`.

O ID usado no `onclick` precisa ser idêntico ao ID colocado na lista `ids`.

## Regras do orçamento de hospedagem

**Planos (valor mensal)**

| Plano | Valor |
|---|---|
| Básico | R$ 19,90 |
| Padrão | R$ 39,90 |
| Premium | R$ 79,90 |

**Períodos**

| Período | Desconto |
|---|---|
| 1 mês | nenhum |
| 6 meses | 10% |
| 12 meses | 20% |

**Extras**

| Extra | Valor |
|---|---|
| E-mail profissional | R$ 9,90 por mês |
| Backup diário | R$ 7,90 por mês |
| Domínio .com.br | R$ 40,00 (cobrança única, sem desconto) |

**Cálculo**

```
mensal = plano + e-mail (se marcado) + backup (se marcado)
total  = mensal × meses
total  = total − desconto do período
total  = total + domínio (se marcado)
```

Exemplo: plano Padrão, 12 meses, com backup e domínio:
`(39,90 + 7,90) × 12 = 573,60` → com 20% de desconto `458,88` → mais o domínio `498,88`.

## Orçamento do projeto (custos)

> Não confunda com a **calculadora de orçamento de hospedagem** (página `orcamento_hospedagem.html`), explicada na seção anterior. Aqui está o custo para **construir e manter** o próprio E-veg.

### Custos de infraestrutura

| Item | Custo | Observação |
|---|---|---|
| Hospedagem (GitHub Pages) | R$ 0,00 | Plano gratuito; adequado a sites estáticos como este |
| Fontes (Google Fonts) | R$ 0,00 | Gratuito |
| VLibras (tradutor de Libras) | R$ 0,00 | Ferramenta gratuita do governo federal |
| Sienna (ajustes visuais) | R$ 0,00 | Gratuito e de código aberto (licença MIT) |
| Narração por voz (Web Speech API) | R$ 0,00 | Recurso do próprio navegador |
| Domínio `.com.br` (opcional) | R$ 40,00 por ano | Valor usado na calculadora do projeto; hoje o site usa o endereço `github.io` |
| **Total mínimo** | **R$ 0,00** | |
| **Total com domínio próprio** | **R$ 40,00 no primeiro ano** | |

### Se o projeto crescer: hospedagem paga

Caso o E-veg ganhe back-end (pedidos e contas reais), a hospedagem gratuita deixa de bastar. Cenários calculados com as mesmas regras da calculadora do site (12 meses, com 20% de desconto):

| Plano | Valor mensal | 12 meses | 12 meses + domínio |
|---|---|---|---|
| Básico | R$ 19,90 | R$ 191,04 | R$ 231,04 |
| Padrão | R$ 39,90 | R$ 383,04 | R$ 423,04 |
| Premium | R$ 79,90 | R$ 767,04 | R$ 807,04 |

### Custo de pessoas e ferramentas (a preencher pela equipe)

As horas trabalhadas e o custo de ferramentas pagas **não foram registrados** durante o desenvolvimento. A equipe deve preencher com os valores reais:

| Item | Quantidade | Valor unitário | Total |
|---|---|---|---|
| Horas da equipe de desenvolvimento | a preencher | a preencher | a preencher |
| Assistente de IA (se usado em plano pago) | a preencher | a preencher | a preencher |

Fórmula: `custo de pessoas = horas totais × valor da hora`. Exemplo **apenas ilustrativo**: 6 pessoas × 20 horas × R$ 40,00 por hora = R$ 4.800,00.

## Identidade visual

| Elemento | Valor |
|---|---|
| Verde principal | `#97ad94` |
| Verde escuro (títulos e botões) | `#4b5e45` |
| Verde claro (cabeçalho) | `#c8d4c2` |
| Fundo de destaques | `#eef2eb` |
| Fundo da página | `#fbfbfb` |
| Texto | `#333333` |
| Fonte dos títulos | Playfair Display |
| Fonte do texto | Lato |

## Testes

### Estratégia

O projeto combina **testes automáticos** (rodam em um navegador real, o Chromium, controlado pela biblioteca Playwright) e uma **lista de testes manuais** para o que depende de internet, de aparelhos reais ou de pessoas.

### Testes automáticos

Resultado da última execução (17/11/2026): **145 verificações, 0 falhas**.

| Arquivo | Verificações | O que confere |
|---|---|---|
| `tests/teste_funcional.py` | 34 | As 10 páginas sem erro de JavaScript; primeiro `Tab` no botão de acessibilidade; menu abre com `Enter` e fecha com `Esc`; compra completa (adicionar, carrinho, total, checkout e confirmação); checkout com carrinho vazio; contato e login; FAQ abre e fecha; cálculo do orçamento; narração liga e desliga; opções Baixa visão e Surdos clicam nos widgets (simulados) |
| `tests/teste_responsivo.py` | 111 | Sem rolagem lateral nas 10 páginas em 5 tamanhos de tela (320×568, 360×640, 390×844, 768×1024 e 740×360); menu do celular abre e fecha; links com altura de toque; produtos em coluna única; menu de acessibilidade dentro da tela (inclusive celular deitado); página sem CSS não fica quebrada |

**Como rodar** (na pasta do projeto):

```bash
pip install playwright
playwright install chromium
python tests/teste_funcional.py
python tests/teste_responsivo.py
```

Cada script termina com uma linha `Total: N verificações | falhas: 0`. Se houver falha, ele lista qual foi e o valor encontrado.

### Testes manuais (checklist)

| Teste | Status |
|---|---|
| VLibras real: a opção **Surdos** abre o tradutor e o botão original fica escondido | Pendente (precisa de internet) |
| Sienna real: a opção **Baixa visão** abre o painel de ajustes | Pendente (precisa de internet) |
| Site publicado no GitHub Pages sem cache antigo (`Ctrl + F5`) | Pendente |
| Celular Android e iPhone reais (toque, rotação, menu) | Pendente |
| Leitor de tela (NVDA no Windows, VoiceOver no iPhone ou TalkBack no Android) | Pendente |
| Voz em português do Brasil da narração em Chrome, Edge e Safari | Pendente |
| Navegação só pelo teclado, sem mouse, em todas as páginas | Pendente |
| Teste com usuários reais (pessoas cegas, com baixa visão e surdas) | Pendente |

### Limites dos testes

- O Sienna e o VLibras foram **simulados** nos testes automáticos, porque o ambiente de teste não tinha internet. O teste confere que o menu os aciona, não que eles funcionam por dentro.
- Teste automático não substitui teste com pessoas: ele não diz se a narração é agradável ou se o texto é fácil de entender.

### Problemas encontrados e corrigidos com os testes

| Problema | Causa | Correção |
|---|---|---|
| Botão do VLibras continuava aparecendo na tela | O botão fica dentro de um *shadow root*, que o CSS do site não alcança | Passou a ser escondido por `window.VLibrasWidget.initBtn`, previsto no manual oficial |
| Opção Surdos não avisava nada sem internet | O código antigo do VLibras existia no HTML mesmo sem o script carregar | O aviso agora depende do widget ter carregado de fato |
| Erro de JavaScript no checkout, contato e login | Páginas geradas por um modelo desatualizado, sem os `id` que o script esperava | Páginas regeneradas pelo modelo correto |
| Menu de acessibilidade com ícones gigantes no site publicado | CSS antigo em cache, misturado com HTML novo | Versão nos arquivos (`?v=3`), menu que nasce fechado e ícones com tamanho próprio |

## Limitações conhecidas

- **Sem back-end:** pedidos, mensagens e logins não são enviados nem guardados em servidor algum.
- **Carrinho local:** os itens ficam só no navegador e no aparelho usados. Limpar os dados do navegador esvazia o carrinho.
- **Sem alteração de quantidade:** no carrinho só é possível remover o item; para mudar a quantidade, remova e adicione de novo.
- **Sem imagens:** as pastas `img/` e `assets/` estão vazias e os produtos aparecem só com texto.
- **Dados de exemplo:** produtos, preços, textos do FAQ e dos termos são ilustrativos.
- **Login de mentira:** a senha não é conferida em lugar nenhum.
- **Narração limitada ao conteúdo principal:** não lê o menu nem os valores digitados nos formulários.
- **VLibras e Sienna dependem de internet e de serviços externos:** veja as seções sobre cada um.

## Melhorias do MVP

Próximos passos para evoluir o MVP, em ordem de prioridade.

### Prioridade alta

| Melhoria | Por quê |
|---|---|
| Fotos dos produtos, com texto alternativo | Hoje os produtos aparecem só com texto; fotos ajudam na venda e o texto alternativo mantém a acessibilidade |
| Campo para alterar a quantidade no carrinho | Hoje só é possível remover o item e adicionar de novo |
| Fixar a versão do Sienna no endereço do script | Evita que uma atualização do serviço mude o comportamento do menu |
| Testes manuais pendentes (celulares reais, leitores de tela, VLibras e Sienna publicados) | São os itens do checklist de [Testes](#testes) ainda não conferidos |

### Prioridade média

| Melhoria | Por quê |
|---|---|
| Máscara e validação do CEP, com busca automática do endereço | Reduz erros de digitação no checkout |
| Busca e filtro de produtos por categoria | Facilita encontrar produtos quando o catálogo crescer |
| Página de detalhe de cada produto | Espaço para descrição completa, ingredientes e fotos |
| Escolha da voz e narração de cada elemento ao receber foco | Deixa a narração mais completa para pessoas cegas |
| Auditoria automática de acessibilidade (por exemplo, Lighthouse ou axe) | Encontra falhas que o teste atual não cobre |
| Meta tags de compartilhamento e SEO | Melhora a aparência do link em redes sociais e buscadores |

### Prioridade baixa (exigem back-end)

| Melhoria | Por quê |
|---|---|
| Pedidos, contas e mensagens salvos em servidor | Hoje nada sai do navegador |
| Login real, com senha protegida | O login atual é só demonstração |
| Pagamento real e cálculo de frete | Necessários para vender de verdade |
| Termos de uso e política de privacidade revisados (LGPD) | Obrigatórios quando houver dados pessoais reais |

## Uso de Inteligência Artificial

### Ferramenta

Foi usado o **Claude**, assistente de inteligência artificial da Anthropic, em conversas de chat entre **20/10/2026 e 17/11/2026**. A equipe enviou o projeto inicial (`E-Veg.zip`) e um print do site publicado, e o assistente devolveu os arquivos atualizados.

### O que a IA fez

| Etapa | Contribuição da IA |
|---|---|
| Diagnóstico e correção | Encontrou o CSS cortado e as páginas sem navegação; completou o CSS e o conteúdo das 10 páginas |
| Simplificação | Reescreveu o JavaScript em estilo básico, sem funções avançadas, a pedido da equipe |
| Acessibilidade | Implementou a narração por voz; pesquisou e integrou o VLibras e o Sienna; criou o botão único com menu; aplicou boas práticas WAI-ARIA |
| Responsividade | Ajustou o layout para celulares e corrigiu o visual quebrado do site publicado |
| Testes | Escreveu os testes automáticos da pasta `tests/` e os executou |
| Documentação | Escreveu e manteve este README |

### O que a IA não fez

- Não definiu o tema nem o escopo do projeto: os pedidos vieram da equipe, passo a passo.
- Não viu o site publicado: só recebeu um print e arquivos enviados pela equipe.
- Não testou o VLibras e o Sienna reais, nem celulares reais, nem pessoas usando o site.
- Os produtos, preços, textos do FAQ e dos Termos de uso são **exemplos gerados** e precisam ser revisados pela equipe.

### Como a informação foi verificada

- A narração segue a documentação da Web Speech API (MDN).
- A integração do VLibras segue o manual oficial do VLibras Widget, versão 7.0.0.
- No Sienna, o nome do botão usado pelo menu (`.asw-menu-btn`) **não** vem de uma documentação oficial de integração; veja o aviso em [o botão e o menu](#acessibilidade-o-botão-e-o-menu).
- O que foi possível foi conferido por testes automáticos; o restante está no checklist de testes manuais.

### Responsabilidade da equipe

A IA acelera o trabalho, mas **o código entregue é responsabilidade da equipe**. Antes de apresentar ou publicar:

1. Leia e entenda o código, principalmente `js/script.js`, e ajuste o que não fizer sentido para o grupo.
2. Execute o checklist de testes manuais.
3. Troque os textos e dados de exemplo pelos reais.
4. Informe o uso de IA conforme as regras da disciplina ou da instituição.
5. Evite enviar dados pessoais ou sigilosos à IA. Neste projeto, o arquivo `Integrantes.txt` (nomes da equipe) foi enviado junto com os arquivos.

### Principais pedidos feitos à IA

1. Consertar o site.
2. Simplificar o código, como se feito por quem está começando.
3. Criar um README completo.
4. Adicionar recurso de acessibilidade com voz que narra, para pessoas com deficiência visual.
5. Documentar a API de voz usada, depois incluir o VLibras e, em seguida, reunir recursos para todos os públicos (cegos, surdos e baixa visão).
6. Reunir os três recursos em um único botão flutuante, com menu lateral.
7. Tirar o botão original do VLibras da tela principal.
8. Corrigir o bug visual no site publicado e deixar o site responsivo para celulares.
9. Garantir que o README tenha diário, escopo, orçamento, testes, melhorias do MVP e uso de IA.

## Diário de bordo

> As datas abaixo foram reconstruídas a partir do histórico de arquivos e das conversas com a IA; as marcadas com "a" (aproximada) cobrem um intervalo. A equipe deve ajustar com as datas reais e acrescentar as reuniões em que decidiu cada ponto.

| Data | Etapa | O que foi feito | Resultado ou decisão |
|---|---|---|---|
| 20/10/2026 | Recebimento e diagnóstico | Análise do projeto inicial: 10 páginas quase vazias, CSS cortado, só a página inicial com menu | Versão corrigida entregue (`E-Veg-corrigido.zip`): CSS completo, menu em todas as páginas, catálogo, carrinho, checkout, formulários, FAQ, termos e orçamento |
| 20/10 a 28/10 (aprox.) | Simplificação e documentação | Código reescrito em estilo básico; primeiro README | Decisão: manter o código simples, sem funções avançadas |
| 20/10 a 28/10 (aprox.) | Primeiro recurso de acessibilidade | Narração por voz (Web Speech API) e documentação da API; depois inclusão do VLibras | A narração chegou a ser removida por se achar que o VLibras bastava; depois se percebeu que ele atende surdos, não cegos |
| 20/10 a 28/10 (aprox.) | Escolha dos recursos | Pesquisa por um widget que atendesse "todas as deficiências" | Conclusão: nenhuma ferramenta cobre tudo sozinha. Decisão: **Sienna + narração + VLibras** |
| 29/10/2026 | Botão único de acessibilidade | Botão flutuante com ícone universal e menu lateral com Baixa visão, Cegos e Surdos | Menu testado em navegador, no computador e no celular |
| 29/10/2026 | VLibras fora da tela principal | Descoberta de que o botão do VLibras fica em um *shadow root*; uso de `window.VLibrasWidget.initBtn` | Botão original escondido; só o menu aciona o VLibras |
| 29/10 a 03/11 (aprox.) | Acessibilidade do código | Boas práticas WAI-ARIA (link para pular ao conteúdo, avisos para leitor de tela, FAQ acessível) | Seção própria no README |
| 03/11/2026 | Correção de bug e testes | Erro de JavaScript no checkout, contato e login, causado por páginas geradas com modelo desatualizado | Páginas regeneradas; 34 verificações automáticas passando |
| 17/11/2026 | Bug visual no site publicado | Print do GitHub Pages com menu sem estilo e ícones gigantes (CSS antigo em cache) | Versão nos arquivos (`?v=3`), menu que nasce fechado e ícones com tamanho próprio |
| 17/11/2026 | Responsividade | Menu recolhível, produtos em coluna, ajustes de toque e do menu de acessibilidade | 111 verificações automáticas em 5 tamanhos de tela |
| 17/11/2026 | Documentação final | README com escopo, orçamento, testes, melhorias do MVP, uso de IA e este diário | 145 verificações automáticas passando; testes manuais pendentes |

### Registro da equipe (a preencher)

| Data | Participantes | O que foi discutido ou decidido | Próximos passos |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

## Equipe

- Allan Neres Gomes
- Christian Barra dos Santos
- Erick Viana Dionizio
- Maycon Moura da Silva
- Rafael Enrico Barreto Ruvolo
- Thomas Anderson Nery dos Santos
