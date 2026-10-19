# Vitória Sampaio Arquitetura — site

Site estático, mobile-first, pronto para **GitHub Pages (branch `main`, pasta `/root`)**. Não precisa de build nem de servidor Node para funcionar publicado.

## Editar conteúdo

Tudo fica em **`js/config.js`**: nome, contatos, textos, serviços, projetos, processo, FAQ, depoimentos e fotos.

- `modoDemonstracao: true` → apresentação comercial: mostra itens não confirmados com o selo **“A confirmar”** e espaços reservados para fotos.
- `modoDemonstracao: false` → versão pública: oculta tudo que tiver `confirmado: false` ou estiver sem foto.
- Seções **Antes e depois** e **Depoimentos** só aparecem quando houver conteúdo real. O menu se ajusta sozinho.
- Mapa e botão “Como chegar” só aparecem com `endereco.confirmado: true`.
- Botões de orçamento usam `atendimento.url` → senão WhatsApp → senão Direct do Instagram.

## Comandos (Node.js)

```bash
npm install
npm run dev          # servidor local com recarga
npm run pendencias   # lista tudo que falta confirmar/preencher
npm run imagens      # converte fotos de assets/originais/ em WebP em assets/img/
```

## Publicar no GitHub Pages

1. Envie esta pasta para a raiz da branch `main` do repositório.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. Preencha `urlSite` no config, atualize `sitemap.xml` e descomente a linha do sitemap em `robots.txt`.

Todos os caminhos são relativos, então o site funciona em `usuario.github.io/repositorio/`. O arquivo `.nojekyll` evita processamento do Jekyll.

## Identidade provisória

O Instagram não pôde ser lido automaticamente, então a paleta (neutros quentes, grafite e acento terroso), a tipografia (Instrument Serif + Manrope) e o monograma “VS” do favicon são **provisórios**. Troque os tokens no topo de `css/styles.css` e o logotipo em `marca.logo` pela identidade oficial.

## Estrutura

```
index.html            página principal (seções renderizadas a partir do config)
privacidade.html      política de privacidade
404.html              página de erro personalizada
css/styles.css        estilos e tokens de cor
js/config.js          ← conteúdo editável
js/main.js            renderização e interações (menu, lightbox, FAQ, comparador)
assets/img/           imagens, favicon, imagem de compartilhamento
scripts/              utilitários Node (pendências e otimização de imagens)
```
