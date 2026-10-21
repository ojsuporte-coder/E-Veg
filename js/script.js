// JavaScript do E-veg

// Lista de produtos (cada posição de uma lista combina com as outras)
var ids = ["hamburguer", "leite", "queijo", "chocolate", "granola", "sabonete"];
var nomes = ["Hambúrguer de grão-de-bico", "Leite de aveia", "Queijo de castanha", "Chocolate 70% cacau", "Granola artesanal", "Sabonete vegetal"];
var precos = [24.9, 12.5, 38.0, 16.9, 21.0, 14.0];

// Mostra o valor como dinheiro. Ex: 12.5 vira R$ 12,50
function formatar(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

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
    var q = pegarQuantidade(id);
    localStorage.setItem("eveg_" + id, q + 1);
    atualizarContador();
    alert("Produto adicionado ao carrinho!");
}

// Botão "Remover" do carrinho
function remover(id) {
    localStorage.removeItem("eveg_" + id);
    atualizarContador();
    mostrarCarrinho();
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
    var texto = "<table>";
    texto = texto + "<tr><th>Produto</th><th>Preço</th><th>Qtd.</th><th>Subtotal</th><th></th></tr>";
    for (var i = 0; i < ids.length; i++) {
        var q = pegarQuantidade(ids[i]);
        if (q > 0) {
            texto = texto + "<tr>";
            texto = texto + "<td>" + nomes[i] + "</td>";
            texto = texto + "<td>" + formatar(precos[i]) + "</td>";
            texto = texto + "<td>" + q + "</td>";
            texto = texto + "<td>" + formatar(precos[i] * q) + "</td>";
            texto = texto + "<td><button onclick=\"remover('" + ids[i] + "')\">Remover</button></td>";
            texto = texto + "</tr>";
        }
    }
    texto = texto + "</table>";
    texto = texto + "<h3>Total: " + formatar(calcularTotal()) + "</h3>";
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
    if (contarItens() == 0) {
        alert("Seu carrinho está vazio!");
        return false;
    }
    for (var i = 0; i < ids.length; i++) {
        localStorage.removeItem("eveg_" + ids[i]);
    }
    alert("Pedido recebido! (Este site é só uma demonstração, nada foi cobrado.)");
    window.location = "index.html";
    return false;
}

// Formulário de contato
function enviarContato() {
    alert("Mensagem enviada! Responderemos em breve.");
    return false;
}

// Formulário de login
function entrar() {
    alert("Login de demonstração: ainda não existe um servidor para conferir a senha.");
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

// Roda quando a página termina de carregar
window.onload = function () {
    atualizarContador();
    mostrarCarrinho();
    mostrarResumo();
    if (document.getElementById("resultado") != null) {
        calcular();
    }
};
