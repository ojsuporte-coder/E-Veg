"""Teste de responsividade do E-veg.

Abre as 10 páginas em celulares, tablet e celular deitado e confere:
sem rolagem lateral, sem erro de JavaScript, menu do celular, produtos em
coluna, menu de acessibilidade dentro da tela e página sem CSS.

Como rodar (na pasta do projeto):
    pip install playwright
    playwright install chromium
    python tests/teste_responsivo.py
"""
import asyncio, os, glob
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from playwright.async_api import async_playwright
URL = lambda f: 'file://' + os.path.abspath(f)
PAGES = sorted(glob.glob('*.html'))

async def novo(b, w, h, bloquear_css=False):
    ctx = await b.new_context(viewport={'width': w, 'height': h}, has_touch=w < 800)
    pg = await ctx.new_page(); pg.erros = []
    pg.on('pageerror', lambda e: pg.erros.append(str(e)))
    pg.on('dialog', lambda d: asyncio.ensure_future(d.accept()))
    async def rota(r):
        u = r.request.url
        if not u.startswith('file://'): return await r.abort()
        if bloquear_css and 'style.css' in u: return await r.abort()
        return await r.continue_()
    await pg.route('**/*', rota)
    return pg

async def main():
    res = []
    def ok(n, c, e=''): res.append((n, bool(c), e))
    async with async_playwright() as p:
        b = await p.chromium.launch()

        # 1) sem rolagem lateral em celulares e tablet, em todas as páginas
        for (w, h) in [(320, 568), (360, 640), (390, 844), (768, 1024), (740, 360)]:
            for f in PAGES:
                pg = await novo(b, w, h); await pg.goto(URL(f))
                if f in ('carrinho.html', 'checkout.html'):
                    await pg.evaluate('localStorage.setItem("eveg_hamburguer","3"); localStorage.setItem("eveg_queijo","2")')
                    await pg.reload()
                sw = await pg.evaluate('document.documentElement.scrollWidth')
                ok('sem rolagem lateral %dx%d %s' % (w, h, f), sw <= w, 'scrollWidth=%d' % sw)
                ok('sem erro JS %dx%d %s' % (w, h, f), not pg.erros, pg.erros)
                await pg.context.close()

        # 2) navegação recolhível no celular (e fixa no desktop)
        pg = await novo(b, 390, 844); await pg.goto(URL('index.html'))
        ok('celular: botão Menu visível', await pg.is_visible('#menu-botao'))
        ok('celular: menu começa fechado', not await pg.is_visible('#menu-principal'))
        await pg.tap('#menu-botao')
        ok('celular: menu abre', await pg.is_visible('#menu-principal') and await pg.get_attribute('#menu-botao', 'aria-expanded') == 'true')
        alturas = await pg.evaluate('Array.from(document.querySelectorAll("#menu-principal a")).map(a => a.getBoundingClientRect().height)')
        ok('celular: links do menu com altura >= 40px', min(alturas) >= 40, min(alturas))
        await pg.tap('#menu-botao')
        ok('celular: menu fecha', not await pg.is_visible('#menu-principal'))
        await pg.context.close()
        pg = await novo(b, 1100, 700); await pg.goto(URL('index.html'))
        ok('desktop: sem botão Menu e navegação visível', not await pg.is_visible('#menu-botao') and await pg.is_visible('#menu-principal'))
        await pg.context.close()

        # 3) produtos em coluna única no celular; menu de acessibilidade cabe na tela
        pg = await novo(b, 360, 640); await pg.goto(URL('produtos.html'))
        larg = await pg.evaluate('Array.from(document.querySelectorAll(".produto")).map(e => Math.round(e.getBoundingClientRect().width))')
        ok('celular: produtos ocupam a largura toda', len(set(larg)) == 1 and larg[0] >= 300, larg)
        await pg.tap('#acess-botao')
        caixa = await pg.evaluate('(function(){var r=document.getElementById("acess-menu").getBoundingClientRect();return [r.left,r.top,r.right,r.bottom,innerWidth,innerHeight]})()')
        ok('celular 360x640: menu de acessibilidade dentro da tela', caixa[0] >= 0 and caixa[1] >= 0 and caixa[2] <= caixa[4] and caixa[3] <= caixa[5], caixa)
        await pg.context.close()
        pg = await novo(b, 740, 360); await pg.goto(URL('index.html')); await pg.tap('#acess-botao')
        caixa = await pg.evaluate('(function(){var r=document.getElementById("acess-menu").getBoundingClientRect();return [r.top,r.bottom,innerHeight]})()')
        ok('celular deitado 740x360: menu cabe na altura', caixa[0] >= 0 and caixa[1] <= caixa[2], caixa)
        await pg.context.close()

        # 4) CSS antigo/ausente: o menu não pode aparecer quebrado
        pg = await novo(b, 1100, 700, bloquear_css=True); await pg.goto(URL('index.html'))
        ok('sem CSS: menu de acessibilidade escondido', not await pg.is_visible('#acess-menu'))
        tam = await pg.evaluate('Array.from(document.querySelectorAll(".acess svg")).map(s => Math.round(s.getBoundingClientRect().width))')
        ok('sem CSS: ícones pequenos (<= 50px)', max(tam) <= 50, tam)
        await pg.context.close()

        await b.close()
    falhas = [r for r in res if not r[1]]
    for n, c, e in falhas: print('FALHA', n, '->', e)
    print('Total: %d verificações | falhas: %d' % (len(res), len(falhas)))
asyncio.run(main())
