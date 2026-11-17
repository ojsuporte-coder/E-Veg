// JavaScript do E-veg

// Lista de produtos (cada posição de uma lista combina com as outras)
// Para adicionar um produto, coloque o novo item no FIM das três listas.
var ids = [
    "hamburguer", "leite", "queijo", "chocolate",
    "granola", "sabonete", "almondega-lentilha", "tofu",
    "tempeh", "seitan", "nuggets-soja", "linguica-vegetal",
    "leite-amendoas", "leite-coco", "iogurte-coco", "manteiga-castanha",
    "cream-cheese-caju", "kombucha", "suco-verde", "brigadeiro",
    "barra-cereais", "cookie-aveia", "sorvete-acai", "chips-grao",
    "pate-grao", "pasta-amendoim", "aveia-flocos", "azeite",
    "cafe", "farinha-amendoas", "macarrao-integral", "molho-tomate",
    "xarope-agave", "shampoo-solido", "creme-dental", "desodorante"
];
var nomes = [
    "Hambúrguer de grão-de-bico", "Leite de aveia", "Queijo de castanha", "Chocolate 70% cacau",
    "Granola artesanal", "Sabonete vegetal", "Almôndega de lentilha", "Tofu orgânico firme",
    "Tempeh de soja", "Seitan temperado", "Nuggets de soja", "Linguiça vegetal defumada",
    "Leite de amêndoas", "Leite de coco", "Iogurte de coco natural", "Manteiga vegetal de castanha",
    "Cream cheese de castanha-de-caju", "Kombucha de gengibre", "Suco verde prensado a frio", "Brigadeiro vegano",
    "Barra de cereais com castanhas", "Cookies de aveia e cacau", "Sorvete de açaí vegano", "Chips de grão-de-bico",
    "Patê de grão-de-bico", "Pasta de amendoim integral", "Aveia em flocos", "Azeite de oliva extravirgem",
    "Café orgânico torrado e moído", "Farinha de amêndoas", "Macarrão integral sem ovos", "Molho de tomate artesanal",
    "Xarope de agave", "Shampoo sólido vegano", "Creme dental natural", "Desodorante natural em creme"
];
var precos = [
    24.9, 12.5, 38.0, 16.9,
    21.0, 14.0, 22.9, 11.9,
    18.5, 19.9, 17.9, 23.9,
    16.9, 9.9, 8.9, 24.9,
    29.9, 12.0, 13.5, 27.9,
    4.5, 15.9, 26.9, 9.9,
    14.9, 22.0, 7.9, 39.9,
    21.9, 32.9, 8.5, 12.9,
    19.9, 28.0, 13.9, 25.0
];

// Mostra o valor como dinheiro. Ex: 12.5 vira R$ 12,50
function formatar(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

// Descobre a posição de um produto nas listas
function acharPosicao(id) {
    for (var i = 0; i < ids.length; i++) {
        if (ids[i] == id) {
            return i;
        }
    }
    return -1;
}

// ----- Mensagens para leitores de tela (WAI-ARIA) -----
// O parágrafo <p id="aviso" role="status"> é uma "região viva":
// quando o texto dele muda, o leitor de tela fala a mensagem sozinho.
function avisar(mensagem) {
    var aviso = document.getElementById("aviso");
    if (aviso != null) {
        aviso.innerHTML = mensagem;
    }
}

// ----- Perguntas do FAQ (botão que abre e fecha) -----
// aria-expanded diz ao leitor de tela se a resposta está aberta ("true") ou fechada ("false")
function alternar(idResposta, idBotao) {
    var resposta = document.getElementById(idResposta);
    var botao = document.getElementById(idBotao);
    if (resposta.hidden == true) {
        resposta.hidden = false;
        botao.setAttribute("aria-expanded", "true");
    } else {
        resposta.hidden = true;
        botao.setAttribute("aria-expanded", "false");
    }
}

// ----- Carrinho -----

// Pega quantas unidades de um produto estão no carrinho
function pegarQuantidade(id) {
    var q = localStorage.getItem("eveg_" + id);
    if (q == null) {
        return 0;
    }
    return Number(q);
}

// Botão "Adicionar ao carrinho"
function adicionar(id) {
    var q = pegarQuantidade(id) + 1;
    localStorage.setItem("eveg_" + id, q);
    atualizarContador();
    var nome = nomes[acharPosicao(id)];
    avisar(nome + " adicionado ao carrinho. Quantidade: " + q + ". Itens no carrinho: " + contarItens() + ".");
}

// Botão "Remover" do carrinho
function remover(id) {
    localStorage.removeItem("eveg_" + id);
    atualizarContador();
    mostrarCarrinho();
    avisar(nomes[acharPosicao(id)] + " removido do carrinho. Itens no carrinho: " + contarItens() + ".");
    // leva o foco para o título, para quem usa teclado não ficar "perdido"
    document.getElementsByTagName("h1")[0].setAttribute("tabindex", "-1");
    document.getElementsByTagName("h1")[0].focus();
}

// Soma todos os itens do carrinho
function contarItens() {
    var total = 0;
    for (var i = 0; i < ids.length; i++) {
        total = total + pegarQuantidade(ids[i]);
    }
    return total;
}

// Soma o valor de tudo que está no carrinho
function calcularTotal() {
    var total = 0;
    for (var i = 0; i < ids.length; i++) {
        total = total + pegarQuantidade(ids[i]) * precos[i];
    }
    return total;
}

// Mostra o número de itens no menu
function atualizarContador() {
    var contador = document.getElementById("contador");
    if (contador != null) {
        contador.innerHTML = contarItens();
    }
}

// Página do carrinho: monta a tabela
function mostrarCarrinho() {
    var area = document.getElementById("area-carrinho");
    if (area == null) {
        return;
    }
    if (contarItens() == 0) {
        area.innerHTML = "<p>Seu carrinho está vazio. <a href='produtos.html'>Ver produtos</a></p>";
        return;
    }
    var texto = "<table aria-label='Itens do carrinho'>";
    texto = texto + "<tr><th scope='col'>Produto</th><th scope='col'>Preço</th><th scope='col'>Qtd.</th><th scope='col'>Subtotal</th><th scope='col'>Ação</th></tr>";
    for (var i = 0; i < ids.length; i++) {
        var q = pegarQuantidade(ids[i]);
        if (q > 0) {
            texto = texto + "<tr>";
            texto = texto + "<td>" + nomes[i] + "</td>";
            texto = texto + "<td>" + formatar(precos[i]) + "</td>";
            texto = texto + "<td>" + q + "</td>";
            texto = texto + "<td>" + formatar(precos[i] * q) + "</td>";
            texto = texto + "<td><button onclick=\"remover('" + ids[i] + "')\" aria-label=\"Remover " + nomes[i] + " do carrinho\">Remover</button></td>";
            texto = texto + "</tr>";
        }
    }
    texto = texto + "</table>";
    texto = texto + "<h2>Total: " + formatar(calcularTotal()) + "</h2>";
    texto = texto + "<a class='botao' href='checkout.html'>Finalizar compra</a>";
    area.innerHTML = texto;
}

// Página do checkout: mostra o resumo do pedido
function mostrarResumo() {
    var area = document.getElementById("resumo-pedido");
    if (area == null) {
        return;
    }
    if (contarItens() == 0) {
        area.innerHTML = "<p>Não há itens no carrinho. <a href='produtos.html'>Ver produtos</a></p>";
        document.getElementById("form-checkout").hidden = true;
        return;
    }
    var texto = "<ul>";
    for (var i = 0; i < ids.length; i++) {
        var q = pegarQuantidade(ids[i]);
        if (q > 0) {
            texto = texto + "<li>" + q + " x " + nomes[i] + " - " + formatar(precos[i] * q) + "</li>";
        }
    }
    texto = texto + "</ul>";
    texto = texto + "<p><b>Total: " + formatar(calcularTotal()) + "</b></p>";
    area.innerHTML = texto;
}

// Botão "Confirmar pedido"
function finalizar() {
    for (var i = 0; i < ids.length; i++) {
        localStorage.removeItem("eveg_" + ids[i]);
    }
    atualizarContador();
    document.getElementById("form-checkout").hidden = true;
    document.getElementById("resumo").hidden = true;
    avisar("Pedido recebido! Este site é só uma demonstração, nada foi cobrado. <a href='index.html'>Voltar ao início</a>");
    return false;
}

// Formulário de contato
function enviarContato() {
    avisar("Mensagem enviada! Responderemos em breve.");
    document.getElementById("form-contato").reset();
    return false;
}

// Formulário de login
function entrar() {
    avisar("Login de demonstração: ainda não existe um servidor para conferir a senha.");
    document.getElementById("form-login").reset();
    return false;
}

// Página do orçamento: calcula o valor
function calcular() {
    var plano = Number(document.getElementById("plano").value);
    var meses = Number(document.getElementById("periodo").value);
    var total = plano;

    if (document.getElementById("email").checked) {
        total = total + 9.9;
    }
    if (document.getElementById("backup").checked) {
        total = total + 7.9;
    }

    total = total * meses;

    if (meses == 6) {
        total = total * 0.9;
    }
    if (meses == 12) {
        total = total * 0.8;
    }

    if (document.getElementById("dominio").checked) {
        total = total + 40;
    }

    document.getElementById("resultado").innerHTML = formatar(total);
}

// ----- Menu de navegação do celular -----
// No celular o menu principal fica recolhido; o botão "Menu" abre e fecha.
function abrirMenu() {
    var nav = document.getElementById("menu-principal");
    var botao = document.getElementById("menu-botao");
    if (nav.className == "fechado") {
        nav.className = "";
        botao.setAttribute("aria-expanded", "true");
    } else {
        nav.className = "fechado";
        botao.setAttribute("aria-expanded", "false");
    }
}

// ----- Menu de acessibilidade (botão flutuante) -----
// Um único botão abre o menu com as opções:
//   Baixa visão -> abre o widget Sienna
//   Cegos       -> liga a narração por voz (abaixo)
//   Surdos      -> abre o VLibras (tradutor de Libras)
// O Sienna e o VLibras trazem o próprio botão flutuante; aqui escondemos os dois
// (o do Sienna no CSS e o do VLibras pelo JavaScript) e "clicamos" neles por código,
// para só existir um botão na tela.

// Abre ou fecha o menu
function abrirMenuAcessibilidade() {
    var menu = document.getElementById("acess-menu");
    var botao = document.getElementById("acess-botao");
    if (menu.style.display == "block") {
        fecharMenuAcessibilidade();
    } else {
        menu.style.display = "block";
        botao.setAttribute("aria-expanded", "true");
        document.getElementById("item-baixa-visao").focus();
    }
}

// Fecha o menu
function fecharMenuAcessibilidade() {
    document.getElementById("acess-menu").style.display = "none";
    document.getElementById("acess-botao").setAttribute("aria-expanded", "false");
}

// Opção "Baixa visão": abre o menu do Sienna
function abrirBaixaVisao() {
    var botaoSienna = document.querySelector(".asw-menu-btn");
    if (botaoSienna == null) {
        alert("Os ajustes de baixa visão não carregaram. Verifique a conexão com a internet e recarregue a página.");
        return;
    }
    fecharMenuAcessibilidade();
    botaoSienna.click();
}

// O VLibras guarda o botão dele em window.VLibrasWidget.initBtn (isso está no manual oficial).
// Esta função esconde esse botão. Ela roda de tempo em tempo porque o VLibras
// mostra o botão de novo quando a janela dele é fechada.
function esconderBotaoLibras() {
    if (window.VLibrasWidget != undefined && window.VLibrasWidget.initBtn != undefined) {
        window.VLibrasWidget.initBtn.style.display = "none";
    }
    // Garante também que o botão original do Sienna fique escondido
    var botaoSienna = document.querySelector(".asw-menu-btn");
    if (botaoSienna != null) {
        botaoSienna.style.visibility = "hidden";
    }
}

// Opção "Surdos": abre o VLibras
function abrirLibras() {
    if (window.VLibrasWidget == undefined || window.VLibrasWidget.initBtn == undefined) {
        alert("O tradutor de Libras não carregou. Verifique a conexão com a internet e recarregue a página.");
        return;
    }
    fecharMenuAcessibilidade();
    window.VLibrasWidget.initBtn.click();
}

// ----- Narração por voz (acessibilidade) -----
// Usa a Web Speech API (parte de síntese de voz), que já vem no navegador:
//   window.speechSynthesis        -> controla a voz (speak, cancel)
//   SpeechSynthesisUtterance      -> o texto que vai ser falado
//     .lang  = idioma da voz      .rate = velocidade da voz
//     .onend = evento chamado quando a fala termina

var narrando = false;

// Botão "Narrar página": começa ou para a leitura em voz alta
function narrar() {
    if (!("speechSynthesis" in window)) {
        alert("Seu navegador não tem suporte para narração por voz.");
        return;
    }
    if (narrando == true) {
        pararNarracao();
        return;
    }

    // 1) Pega o título da página e todo o texto do conteúdo principal
    var principal = document.getElementsByTagName("main")[0];
    var texto = "Página " + document.title + ". " + principal.innerText;

    // 2) Cria o "pedido de fala" com o texto, o idioma e a velocidade
    var fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    fala.rate = Number(document.getElementById("velocidade").value);
    fala.onend = function () {
        narrando = false;
        document.getElementById("texto-narrar").innerHTML = "Narrar a página em voz alta";
    };

    // 3) Cancela qualquer fala anterior e manda o navegador falar
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(fala);

    narrando = true;
    document.getElementById("texto-narrar").innerHTML = "Parar narração";
}

// Para a voz
function pararNarracao() {
    window.speechSynthesis.cancel();
    narrando = false;
    document.getElementById("texto-narrar").innerHTML = "Narrar a página em voz alta";
}

// Se mudar a velocidade durante a leitura, recomeça com a nova velocidade
function mudarVelocidade() {
    if (narrando == true) {
        pararNarracao();
        narrar();
    }
}

// Roda quando a página termina de carregar
window.onload = function () {
    // O menu começa fechado (a classe só tem efeito em telas pequenas, veja o CSS)
    document.getElementById("menu-principal").className = "fechado";
    setInterval(esconderBotaoLibras, 300);
    window.onkeydown = function (evento) {
        if (evento.key == "Escape") {
            fecharMenuAcessibilidade();
            document.getElementById("acess-botao").focus();
        }
    };
    atualizarContador();
    mostrarCarrinho();
    mostrarResumo();
    if (document.getElementById("resultado") != null) {
        calcular();
    }
};
