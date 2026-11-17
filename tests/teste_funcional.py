"""Teste funcional do E-veg (ponta a ponta, em navegador real).

Confere: as 10 páginas sem erro de JavaScript, teclado e menu de
acessibilidade, compra completa (produto, carrinho, checkout), contato,
login, FAQ, orçamento de hospedagem, narração e cliques do menu no
Sienna e no VLibras (estes dois são simulados, pois dependem de internet).

Como rodar (na pasta do projeto):
    pip install playwright
    playwright install chromium
    python tests/teste_funcional.py
"""
import asyncio, os, glob
from playwright.async_api import async_playwright

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
URL = lambda f: 'file://' + os.path.abspath(f)


async def nova(b):
    pg = await b.new_page(viewport={'width': 1100, 'height': 700})
    pg.erros = []
    pg.on('pageerror', lambda e: pg.erros.append(str(e)))
    pg.on('dialog', lambda d: asyncio.ensure_future(d.accept()))
    # sem internet: só arquivos locais carregam
    await pg.route('**/*', lambda r: r.continue_() if r.request.url.startswith('file://') else r.abort())
    return pg


async def main():
    res = []

    def ok(nome, cond, extra=''):
        res.append((nome, bool(cond), extra))

    async with async_playwright() as p:
        b = await p.chromium.launch()

        # 1) todas as páginas: sem erro de JS, 1º Tab = botão de acessibilidade, menu abre/fecha
        for f in sorted(glob.glob('*.html')):
            pg = await nova(b); await pg.goto(URL(f))
            await pg.keyboard.press('Tab'); foco = await pg.evaluate('document.activeElement.id')
            await pg.keyboard.press('Enter'); a = await pg.evaluate('document.getElementById("acess-menu").style.display')
            await pg.keyboard.press('Escape'); c = await pg.evaluate('document.getElementById("acess-menu").style.display')
            ok('página %s' % f, foco == 'acess-botao' and a == 'block' and c == 'none' and not pg.erros, pg.erros)
            await pg.close()

        # 2) compra: adicionar -> carrinho -> checkout -> confirmar
        pg = await nova(b); await pg.goto(URL('produtos.html'))
        adicionar = lambda id_: pg.click('button[onclick="adicionar(\'%s\')"]' % id_)
        await adicionar('hamburguer'); await adicionar('leite'); await adicionar('leite')
        cont = await pg.inner_text('#contador'); aviso = await pg.inner_text('#aviso')
        ok('adicionar: contador = 3', cont.strip() == '3', cont)
        ok('adicionar: aviso para leitor de tela', len(aviso) > 5, aviso)
        await pg.goto(URL('carrinho.html'))
        linhas = await pg.locator('#area-carrinho tr').count()
        ok('carrinho: tabela com 2 produtos', linhas >= 3, linhas)
        total = await pg.inner_text('#area-carrinho')
        ok('carrinho: total R$ 49,90', 'R$ 49,90' in total, total[-60:].replace('\n', ' '))
        await pg.goto(URL('checkout.html'))
        ok('checkout com itens: formulário visível', await pg.is_visible('#form-checkout'))
        await pg.fill('#nome', 'Maria Teste'); await pg.fill('#email', 'maria@teste.com')
        await pg.fill('#cep', '01310-100'); await pg.fill('#endereco', 'Rua A, 10')
        await pg.click('#form-checkout button[type=submit]')
        aviso = await pg.inner_text('#aviso')
        ok('checkout: pedido confirmado', 'Pedido recebido' in aviso, aviso)
        ok('checkout: formulário some', not await pg.is_visible('#form-checkout'))
        ok('checkout: carrinho esvaziado', (await pg.inner_text('#contador')).strip() == '0')
        ok('checkout: sem erros JS', not pg.erros, pg.erros)
        await pg.goto(URL('checkout.html'))
        ok('checkout vazio: formulário escondido', not await pg.is_visible('#form-checkout'))
        ok('checkout vazio: sem erros JS', not pg.erros, pg.erros)
        await pg.close()

        # 2b) catálogo: os 36 produtos do HTML batem com as listas do JavaScript
        pg = await nova(b); await pg.goto(URL('produtos.html'))
        dados = await pg.evaluate("""() => Array.from(document.querySelectorAll('article.produto')).map(a => {
            var id = /adicionar\\('([^']+)'\\)/.exec(a.querySelector('button').getAttribute('onclick'))[1];
            var pos = ids.indexOf(id);
            return { id: id, existe: pos >= 0,
                     nome: a.querySelector('h3').innerText === nomes[pos],
                     preco: a.querySelector('.preco').innerText === formatar(precos[pos]) };
        })""")
        total_js = await pg.evaluate('ids.length')
        ok('catálogo: 36 produtos na página', len(dados) == 36, len(dados))
        ok('catálogo: 36 produtos no JavaScript (3 listas do mesmo tamanho)', total_js == 36 and await pg.evaluate('nomes.length == 36 && precos.length == 36'))
        ok('catálogo: ids sem repetição', len({d['id'] for d in dados}) == 36)
        ok('catálogo: todo produto da página existe no JavaScript', all(d['existe'] for d in dados))
        ok('catálogo: nomes iguais no HTML e no JavaScript', all(d['nome'] for d in dados), [d['id'] for d in dados if not d['nome']])
        ok('catálogo: preços iguais no HTML e no JavaScript', all(d['preco'] for d in dados), [d['id'] for d in dados if not d['preco']])
        ok('catálogo: 5 links de categoria apontam para títulos existentes',
           await pg.evaluate("Array.from(document.querySelectorAll('.categorias a')).filter(a => document.querySelector(a.getAttribute('href'))).length") == 5)
        await pg.click('button[onclick="adicionar(\'tofu\')"]'); await pg.click('button[onclick="adicionar(\'tofu\')"]'); await pg.click('button[onclick="adicionar(\'desodorante\')"]')
        await pg.goto(URL('carrinho.html'))
        cart = await pg.inner_text('#area-carrinho')
        ok('produtos novos: carrinho soma R$ 48,80 (2 tofus + 1 desodorante)', 'R$ 48,80' in cart, cart[-50:].replace('\n', ' '))
        await pg.close()

        # 3) contato e login
        for arq, form, campos in [('contato.html', '#form-contato', {'#c-nome': 'Ana', '#c-email': 'a@a.com', '#c-msg': 'Oi'}),
                                  ('login.html', '#form-login', {'#l-email': 'a@a.com', '#l-senha': '123456'})]:
            pg = await nova(b); await pg.goto(URL(arq))
            for s, v in campos.items():
                await pg.fill(s, v)
            await pg.click(form + ' button[type=submit]')
            aviso = await pg.inner_text('#aviso')
            ok('%s: mensagem de confirmação' % arq, len(aviso) > 5, aviso)
            ok('%s: sem erros JS' % arq, not pg.erros, pg.erros)
            await pg.close()

        # 4) FAQ
        pg = await nova(b); await pg.goto(URL('faq.html'))
        await pg.click('#perg1')
        e1 = await pg.get_attribute('#perg1', 'aria-expanded'); v1 = await pg.is_visible('#resp1')
        await pg.click('#perg1')
        e2 = await pg.get_attribute('#perg1', 'aria-expanded'); v2 = await pg.is_visible('#resp1')
        ok('FAQ abre e fecha', e1 == 'true' and v1 and e2 == 'false' and not v2, (e1, v1, e2, v2))
        await pg.close()

        # 5) orçamento: Padrão 1 mês = 39,90 | 12 meses + e-mail + backup + domínio = 593,92
        pg = await nova(b); await pg.goto(URL('orcamento_hospedagem.html'))
        r0 = await pg.inner_text('#resultado')
        await pg.select_option('#periodo', '12'); await pg.check('#backup'); await pg.check('#dominio'); await pg.check('#email')
        r1 = await pg.inner_text('#resultado')
        ok('orçamento inicial R$ 39,90', '39,90' in r0, r0)
        ok('orçamento 12 meses + extras R$ 593,92', '593,92' in r1, r1)
        await pg.close()

        # 6) menu: narração (voz simulada), Sienna e VLibras simulados
        pg = await nova(b); await pg.goto(URL('index.html'))
        await pg.evaluate('''() => {
            window.falas = [];
            window.SpeechSynthesisUtterance = function (t) { this.text = t; };
            Object.defineProperty(window, 'speechSynthesis', { value: { speak: function (f) { window.falas.push(f); }, cancel: function () {} }, configurable: true });
            window.c = 0; var a = document.createElement('a'); a.className = 'asw-menu-btn'; a.onclick = function () { window.c++; }; document.body.appendChild(a);
            window.aberturas = 0; var host = document.createElement('div'); var raiz = host.attachShadow({mode: 'closed'});
            var bt = document.createElement('button'); bt.addEventListener('click', function () { window.aberturas++; }); raiz.appendChild(bt); document.body.appendChild(host);
            window.VLibrasWidget = { initBtn: bt }; window.bt = bt;
        }''')
        await pg.click('#acess-botao'); await pg.click('#botao-narrar')
        txt = await pg.inner_text('#texto-narrar'); falas = await pg.evaluate('window.falas.length')
        ok('Cegos: narração inicia e vira "Parar narração"', 'Parar' in txt and falas == 1, (txt, falas))
        await pg.click('#botao-narrar'); txt2 = await pg.inner_text('#texto-narrar')
        ok('Cegos: clicar de novo para a voz', 'Narrar' in txt2, txt2)
        await pg.click('#item-baixa-visao'); await pg.click('#acess-botao'); await pg.click('#item-libras')
        ok('Baixa visão clica no Sienna', await pg.evaluate('window.c') == 1)
        ok('Surdos clica no VLibras', await pg.evaluate('window.aberturas') == 1)
        await pg.evaluate('window.bt.style.display = "block"'); await pg.wait_for_timeout(700)
        ok('botão do VLibras reaparece e é escondido de novo', await pg.evaluate('getComputedStyle(window.bt).display') == 'none')
        ok('menu: sem erros JS', not pg.erros, pg.erros)
        await pg.close()

        await b.close()

    falhas = [r for r in res if not r[1]]
    for n, c, e in falhas:
        print('FALHA', n, '->', e)
    print('Total: %d verificações | falhas: %d' % (len(res), len(falhas)))

asyncio.run(main())
