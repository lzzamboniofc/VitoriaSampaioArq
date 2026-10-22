# Vitória Sampaio Arquitetura — site

Site estático, pronto para **GitHub Pages (branch `main`, pasta raiz)**. Não precisa de build nem de servidor.

Endereço: https://lzzamboniofc.github.io/VitoriaSampaioArq/

## Editar conteúdo

Tudo fica em **`js/config.js`**:

- Nome da marca, menu e botões;
- Textos do hero, do "Sobre" e da seção de contato;
- Projetos do portfólio (título, categoria, detalhe e imagem) e filtros;
- WhatsApp, telefone, e-mail, local e Instagram.

Campos vazios não aparecem no site. Para trocar uma imagem, use um link ou coloque o arquivo em `assets/img/` e informe o caminho (ex.: `'assets/img/casa-01.webp'`).

> Os contatos atuais (WhatsApp, telefone e e-mail) são de exemplo. Troque pelos reais antes de divulgar o site.

## Formulário de contato

O formulário não precisa de servidor: ao enviar, ele monta uma mensagem com os dados preenchidos e abre o WhatsApp do número configurado, pronta para envio.

## Estrutura

```
index.html            estrutura da página
css/styles.css        visual (cores e fontes nos tokens de :root)
js/config.js          ← conteúdo editável
js/main.js            montagem da página e interações (filtros, ampliação, formulário)
privacidade.html      política de privacidade
404.html              página de erro personalizada
assets/img/           favicon, ícone e imagem de compartilhamento
scripts/              utilitário de otimização de imagens
```

## Comandos (opcionais, Node.js)

```bash
npm install
npm run dev       # servidor local com recarga
npm run imagens   # converte fotos de assets/originais/ em WebP em assets/img/
```

## Publicar no GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
