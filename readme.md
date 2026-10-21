# E-veg

Loja virtual de produtos veganos, desenvolvida como projeto acadêmico em HTML, CSS e JavaScript puro, sem frameworks e sem back-end.

O site permite navegar pelo catálogo, montar um carrinho, simular a finalização de um pedido e calcular um orçamento de hospedagem.

> **Aviso:** este é um projeto de demonstração. Nenhum pedido, pagamento, login ou mensagem é enviado a um servidor.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como executar](#como-executar)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Páginas](#páginas)
- [Como o código funciona](#como-o-código-funciona)
- [Como adicionar um produto](#como-adicionar-um-produto)
- [Regras do orçamento de hospedagem](#regras-do-orçamento-de-hospedagem)
- [Identidade visual](#identidade-visual)
- [Limitações conhecidas](#limitações-conhecidas)
- [Melhorias futuras](#melhorias-futuras)
- [Equipe](#equipe)

---

## Funcionalidades

- **Catálogo de produtos** com seis itens de exemplo.
- **Carrinho de compras** que guarda os itens no navegador: eles continuam lá mesmo depois de fechar ou recarregar a página.
- **Contador do carrinho** no menu, atualizado a cada item adicionado ou removido.
- **Checkout simulado** com resumo do pedido, formulário de entrega e escolha da forma de pagamento.
- **Calculadora de orçamento de hospedagem** com plano, período, descontos e extras, com o total atualizado na hora.
- **Formulários de contato e login** com validação dos campos.
- **Páginas informativas:** FAQ, Sobre nós (com a equipe) e Termos de uso.
- **Menu e rodapé** iguais em todas as páginas.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Visual e layout |
| JavaScript (puro) | Carrinho, formulários e cálculo do orçamento |
| `localStorage` | Guardar o carrinho no navegador |
| Google Fonts | Fontes Playfair Display e Lato |

Não há dependências para instalar.

## Como executar

**Opção 1: abrir direto.** Dê dois cliques no arquivo `index.html` ou arraste-o para o navegador.

**Opção 2: servidor local (opcional).** Na pasta do projeto, rode:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

Precisa de internet apenas para carregar as fontes do Google. Sem conexão, o site funciona normalmente com fontes padrão do sistema.

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

## Limitações conhecidas

- **Sem back-end:** pedidos, mensagens e logins não são enviados nem guardados em servidor algum.
- **Carrinho local:** os itens ficam só no navegador e no aparelho usados. Limpar os dados do navegador esvazia o carrinho.
- **Sem alteração de quantidade:** no carrinho só é possível remover o item; para mudar a quantidade, remova e adicione de novo.
- **Sem imagens:** as pastas `img/` e `assets/` estão vazias e os produtos aparecem só com texto.
- **Dados de exemplo:** produtos, preços, textos do FAQ e dos termos são ilustrativos.
- **Login de mentira:** a senha não é conferida em lugar nenhum.

## Melhorias futuras

- Fotos dos produtos.
- Campo para alterar a quantidade no carrinho.
- Back-end para salvar pedidos, contas e mensagens.
- Pagamento real e cálculo de frete.
- Busca e filtro de produtos por categoria.
- Menu que recolhe em telas pequenas.

## Equipe

- Allan Neres Gomes
- Christian Barra dos Santos
- Erick Viana Dionizio
- Maycon Moura da Silva
- Rafael Enrico Barreto Ruvolo
- Thomas Anderson Nery dos Santos
