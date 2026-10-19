import { site } from './config.js';

/* ---------- utilitários ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const demo = !!site.modoDemonstracao;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const ok = (item) => item && (item.confirmado || demo);
const pend = (item) => (demo && item && !item.confirmado ? '<span class="pending">A confirmar</span>' : '');
const temImg = (im) => im && im.src;
const imgOk = (im) => temImg(im) || demo;

const c = site.contato;
const whatsUrl = c.whatsapp ? `https://wa.me/${c.whatsapp.replace(/\D/g, '')}` : '';
const ctaUrl = site.atendimento.url || whatsUrl || c.instagram.direct;
const ctaLabel = site.atendimento.rotulo || 'Solicitar orçamento';
const ext = (url) => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : '';

function media(im, cls = '', { eager = false, sizes = '100vw' } = {}) {
  if (temImg(im)) {
    const dims = im.w && im.h ? ` width="${im.w}" height="${im.h}"` : '';
    return `<img class="${cls}" src="${esc(im.src)}" alt="${esc(im.alt)}"${dims} sizes="${sizes}" ${
      eager ? 'fetchpriority="high"' : 'loading="lazy"'
    } decoding="async">`;
  }
  return `<div class="ph ${cls}" role="img" aria-label="${esc(im?.alt || 'Imagem a substituir')}">${
    demo ? `<span class="ph__label">${esc(im?.placeholder || 'Foto a substituir')}</span>` : ''
  }</div>`;
}

const sectionHead = (id, eyebrow, title, text = '', extra = '') => `
  <header class="section__head reveal">
    <p class="eyebrow">${esc(eyebrow)}</p>
    <h2 class="section__title" id="${id}">${esc(title)}</h2>
    ${text ? `<p class="section__lead">${esc(text)}</p>` : ''}
    ${extra}
  </header>`;

/* ---------- marca ---------- */
function brandMarkup(dark = false) {
  const logo = dark ? site.marca.logoEscuro || site.marca.logo : site.marca.logo;
  if (logo) return `<img src="${esc(logo)}" alt="${esc(site.marca.nome + ' ' + site.marca.complemento)}" height="40">`;
  return `<span class="brand__name">${esc(site.marca.nome)}</span><span class="brand__sub">${esc(site.marca.complemento)}</span>`;
}

/* ---------- render ---------- */
function renderHero() {
  const h = site.hero;
  $('[data-hero-media]').innerHTML = media(h.imagem, 'hero__img', { eager: true });
  $('[data-hero-eyebrow]').textContent = h.sobretitulo;
  $('[data-hero-title]').textContent = h.titulo;
  $('[data-hero-text]').textContent = h.texto;
}

function renderAbout() {
  const s = site.sobre;
  const imgs = s.imagens.filter(imgOk);
  const destaques = s.destaques.filter(Boolean);
  $('#sobre').innerHTML = `
    <div class="wrap about__grid">
      <div class="about__media reveal">
        ${imgs[0] ? `<figure class="about__fig about__fig--main">${media(imgs[0], '', { sizes: '(min-width: 960px) 40vw, 100vw' })}</figure>` : ''}
        ${imgs[1] ? `<figure class="about__fig about__fig--aside">${media(imgs[1], '', { sizes: '30vw' })}</figure>` : ''}
      </div>
      <div class="about__body">
        ${sectionHead('sobre-titulo', 'Sobre', s.titulo)}
        <div class="about__text reveal">
          ${s.paragrafos.map((p) => `<p>${esc(p)}</p>`).join('')}
        </div>
        ${destaques.length ? `<dl class="about__facts reveal">${destaques.map((d) => `<div><dt>${esc(d.titulo)}</dt><dd>${esc(d.texto)}</dd></div>`).join('')}</dl>` : ''}
        <div class="about__sign reveal">
          <p class="about__signature">${esc(s.assinatura)}</p>
          ${s.registro ? `<p class="about__reg">${esc(s.registro)}</p>` : ''}
        </div>
        <a class="link-arrow reveal" href="#servicos">Conhecer os serviços</a>
      </div>
    </div>`;
}

function renderServices() {
  const list = site.servicos.filter(ok);
  if (!list.length) return hide('#servicos');
  $('#servicos').innerHTML = `
    <div class="wrap">
      ${sectionHead('servicos-titulo', 'Serviços', 'O que posso fazer pelo seu espaço', 'Cada serviço é ajustado ao tamanho e ao momento do seu projeto.')}
      <ol class="svc">
        ${list
          .map(
            (s, i) => `
          <li class="svc__item reveal">
            <span class="svc__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
            <div class="svc__body">
              <h3 class="svc__name">${esc(s.nome)} ${pend(s)}</h3>
              <p class="svc__desc">${esc(s.descricao)}</p>
              ${s.preco || s.prazo ? `<p class="svc__meta">${[s.preco, s.prazo].filter(Boolean).map(esc).join(' · ')}</p>` : ''}
            </div>
            <a class="svc__cta" href="${esc(ctaUrl)}"${ext(ctaUrl)} aria-label="Solicitar orçamento de ${esc(s.nome)}">
              <span>Solicitar</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
            </a>
          </li>`
          )
          .join('')}
      </ol>
    </div>`;
}

let projetosVisiveis = [];
function renderProjects() {
  projetosVisiveis = site.projetos
    .filter(ok)
    .map((p) => ({ ...p, imagens: p.imagens.filter(imgOk) }))
    .filter((p) => p.imagens.length);
  if (!projetosVisiveis.length) return hide('#projetos');
  $('#projetos').innerHTML = `
    <div class="wrap">
      ${sectionHead(
        'projetos-titulo',
        'Projetos',
        'Portfólio',
        'Uma seleção de espaços projetados. Toque em um projeto para ampliar.',
        `<a class="link-arrow" href="${esc(c.instagram.url)}" target="_blank" rel="noopener">Mais no Instagram</a>`
      )}
      <ul class="pf">
        ${projetosVisiveis
          .map((p, i) => {
            const meta = [p.tipo, p.local, p.ano].filter(Boolean).map(esc).join(' · ');
            return `
          <li class="pf__item reveal">
            <button class="pf__btn" type="button" data-project="${i}" aria-label="Ampliar ${esc(p.titulo)}${p.imagens.length > 1 ? ` (${p.imagens.length} imagens)` : ''}">
              <span class="pf__media">${media(p.imagens[0], '', { sizes: '(min-width: 960px) 50vw, 100vw' })}</span>
              <span class="pf__info">
                <span class="pf__title">${esc(p.titulo)} ${pend(p)}</span>
                ${meta ? `<span class="pf__meta">${meta}</span>` : ''}
              </span>
            </button>
          </li>`;
          })
          .join('')}
      </ul>
    </div>`;
}

function renderProcess() {
  const p = site.processo;
  const etapas = p.etapas.filter(ok);
  if (!etapas.length) return hide('#processo');
  $('#processo').innerHTML = `
    <div class="wrap process__grid">
      <div class="process__media reveal">${imgOk(p.imagem) ? media(p.imagem, '', { sizes: '(min-width: 960px) 45vw, 100vw' }) : ''}</div>
      <div class="process__body">
        ${sectionHead('processo-titulo', 'Processo', p.titulo, p.texto)}
        <ol class="steps">
          ${etapas
            .map(
              (e, i) => `
            <li class="steps__item reveal">
              <span class="steps__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 class="steps__title">${esc(e.titulo)} ${pend(e)}</h3>
                <p>${esc(e.texto)}</p>
              </div>
            </li>`
            )
            .join('')}
        </ol>
        <a class="btn btn--line-light" href="${esc(ctaUrl)}"${ext(ctaUrl)}>Começar uma conversa</a>
      </div>
    </div>`;
}

function renderCompare() {
  const items = site.antesDepois.filter((a) => temImg(a.antes) && temImg(a.depois));
  if (!items.length) return hide('#antes-depois');
  const sec = $('#antes-depois');
  sec.hidden = false;
  sec.innerHTML = `
    <div class="wrap">
      ${sectionHead('ad-titulo', 'Transformação', 'Antes e depois', 'Arraste para comparar.')}
      <div class="ba-list">
        ${items
          .map(
            (a, i) => `
          <figure class="ba reveal" style="--pos:50%">
            <div class="ba__frame">
              ${media(a.depois, 'ba__img')}
              <div class="ba__before">${media(a.antes, 'ba__img')}</div>
              <span class="ba__tag ba__tag--l">Antes</span>
              <span class="ba__tag ba__tag--r">Depois</span>
              <span class="ba__handle" aria-hidden="true"></span>
              <input class="ba__range" type="range" min="0" max="100" value="50" aria-label="Comparar antes e depois: ${esc(a.titulo || 'projeto ' + (i + 1))}">
            </div>
            ${a.titulo ? `<figcaption>${esc(a.titulo)}</figcaption>` : ''}
          </figure>`
          )
          .join('')}
      </div>
    </div>`;
  $$('.ba', sec).forEach((fig) => {
    const r = $('.ba__range', fig);
    r.addEventListener('input', () => fig.style.setProperty('--pos', r.value + '%'));
  });
}

function renderReviews() {
  const items = site.depoimentos.filter((d) => d.nome && d.texto);
  if (!items.length) return hide('#depoimentos');
  const sec = $('#depoimentos');
  sec.hidden = false;
  sec.innerHTML = `
    <div class="wrap">
      ${sectionHead('dep-titulo', 'Depoimentos', 'Quem já viveu o projeto')}
      <ul class="rv">
        ${items
          .map(
            (d) => `
          <li class="rv__item reveal">
            <blockquote><p>${esc(d.texto)}</p></blockquote>
            <p class="rv__who"><strong>${esc(d.nome)}</strong>${d.nota ? ` · <span aria-label="Nota ${d.nota} de 5">${d.nota}/5</span>` : ''}${d.origem ? ` · ${esc(d.origem)}` : ''}</p>
          </li>`
          )
          .join('')}
      </ul>
    </div>`;
}

function renderFaq() {
  const items = site.faq.filter(ok);
  if (!items.length) return hide('#duvidas');
  $('#duvidas').innerHTML = `
    <div class="wrap faq__grid">
      ${sectionHead('faq-titulo', 'Dúvidas', 'Perguntas frequentes', 'Não encontrou o que procura? Fale diretamente comigo.', `<a class="link-arrow" href="${esc(ctaUrl)}"${ext(ctaUrl)}>Enviar mensagem</a>`)}
      <div class="acc">
        ${items
          .map(
            (f, i) => `
          <div class="acc__item reveal">
            <h3 class="acc__h">
              <button class="acc__btn" type="button" aria-expanded="false" aria-controls="faq-${i}" id="faq-b-${i}">
                <span>${esc(f.pergunta)} ${pend(f)}</span>
                <span class="acc__icon" aria-hidden="true"></span>
              </button>
            </h3>
            <div class="acc__panel" id="faq-${i}" role="region" aria-labelledby="faq-b-${i}">
              <div class="acc__inner"><p>${esc(f.resposta)}</p></div>
            </div>
          </div>`
          )
          .join('')}
      </div>
    </div>`;
  $$('.acc__btn').forEach((b) =>
    b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      b.closest('.acc__item').classList.toggle('is-open', !open);
    })
  );
}

function enderecoTexto() {
  const e = c.endereco;
  return [e.linha, [e.cidade, e.uf].filter(Boolean).join(' – '), e.cep].filter(Boolean).join(', ');
}

function renderContact() {
  const e = c.endereco;
  const endOk = e.confirmado && e.linha;
  const rota = endOk ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(enderecoTexto())}` : '';
  const rows = [];
  if (c.whatsapp) rows.push(['WhatsApp', `<a href="${whatsUrl}" target="_blank" rel="noopener">${esc(c.telefone || c.whatsapp)}</a>`]);
  else if (c.telefone) rows.push(['Telefone', `<a href="tel:${esc(c.telefone.replace(/\D/g, ''))}">${esc(c.telefone)}</a>`]);
  if (c.email) rows.push(['E-mail', `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`]);
  rows.push(['Instagram', `<a href="${esc(c.instagram.url)}" target="_blank" rel="noopener">@${esc(c.instagram.usuario)}</a>`]);
  if (c.cidadeAtuacao) rows.push(['Atuação', esc(c.cidadeAtuacao)]);
  if (endOk) rows.push(['Endereço', esc(enderecoTexto())]);
  if (c.horarios.length) rows.push(['Horários', c.horarios.map((h) => `${esc(h.dias)}: ${esc(h.horas)}`).join('<br>')]);
  if (c.atendimentoObs) rows.push(['Observação', esc(c.atendimentoObs)]);

  const pendentes = demo
    ? ['WhatsApp ou telefone', 'E-mail', 'Cidade de atuação', 'Endereço e mapa', 'Horários'].filter((_, i) =>
        [!(c.whatsapp || c.telefone), !c.email, !c.cidadeAtuacao, !endOk, !c.horarios.length][i]
      )
    : [];

  $('#contato').innerHTML = `
    <div class="wrap contact__grid">
      <div class="contact__body">
        ${sectionHead('contato-titulo', 'Contato', 'Vamos conversar sobre o seu projeto?', 'Conte um pouco sobre o seu espaço e o que você imagina para ele.')}
        <dl class="contact__list reveal">
          ${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
        </dl>
        ${pendentes.length ? `<p class="contact__pending reveal"><span class="pending">A confirmar</span> ${pendentes.join(' · ')}</p>` : ''}
        <div class="contact__actions reveal">
          <a class="btn btn--accent" href="${esc(ctaUrl)}"${ext(ctaUrl)}>${esc(ctaLabel)}</a>
          ${rota ? `<a class="btn btn--line" href="${rota}" target="_blank" rel="noopener">Como chegar</a>` : ''}
        </div>
      </div>
      ${
        endOk && c.mapaEmbed
          ? `<div class="contact__map reveal"><iframe src="${esc(c.mapaEmbed)}" title="Mapa: ${esc(enderecoTexto())}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`
          : `<div class="contact__art reveal" aria-hidden="true">${planSvg()}</div>`
      }
    </div>`;
}

// Desenho técnico decorativo (planta abstrata) — elemento gráfico provisório da identidade
function planSvg() {
  return `<svg viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="1">
    <rect x="40" y="40" width="320" height="320"/>
    <path d="M40 180h140v180M180 180V40M180 260h180M260 260v100M260 40v140h100"/>
    <path d="M180 120a60 60 0 0 1 60 60" stroke-dasharray="3 4"/>
    <path d="M90 180a50 50 0 0 0 50-50" stroke-dasharray="3 4"/>
    <circle cx="300" cy="310" r="22"/>
    <path d="M20 40v-12M380 40v-12M20 28h360M28 40H16M28 360H16M16 40v320" stroke-width=".6"/>
  </svg>`;
}

function renderFooter() {
  const navLinks = navItems().map((n) => `<li><a href="#${n.id}">${n.label}</a></li>`).join('');
  $('[data-footer]').innerHTML = `
    <div class="wrap footer__grid">
      <div class="footer__brand">
        <a class="brand brand--footer" href="#inicio">${brandMarkup()}</a>
        <p>${esc(site.marca.descricao)}</p>
        <a class="btn btn--accent" href="${esc(ctaUrl)}"${ext(ctaUrl)}>${esc(ctaLabel)}</a>
      </div>
      <nav aria-label="Rodapé"><p class="footer__h">Navegação</p><ul>${navLinks}</ul></nav>
      <div>
        <p class="footer__h">Contato</p>
        <ul>
          <li><a href="${esc(c.instagram.url)}" target="_blank" rel="noopener">Instagram @${esc(c.instagram.usuario)}</a></li>
          ${c.whatsapp ? `<li><a href="${whatsUrl}" target="_blank" rel="noopener">WhatsApp</a></li>` : ''}
          ${c.email ? `<li><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>` : ''}
          ${c.endereco.confirmado && c.endereco.linha ? `<li>${esc(enderecoTexto())}</li>` : ''}
        </ul>
      </div>
    </div>
    <div class="wrap footer__bottom">
      <p>© ${new Date().getFullYear()} ${esc(site.marca.nome)} ${esc(site.marca.complemento)}</p>
      <p><a href="privacidade.html">Política de privacidade</a>${site.rodape.creditos ? ` · ${esc(site.rodape.creditos)}` : ''}</p>
    </div>`;
}

function hide(sel) {
  const el = $(sel);
  el.hidden = true;
  el.innerHTML = '';
}

const NAV = [
  ['inicio', 'Início'],
  ['sobre', 'Sobre'],
  ['servicos', 'Serviços'],
  ['projetos', 'Projetos'],
  ['processo', 'Processo'],
  ['antes-depois', 'Antes e depois'],
  ['depoimentos', 'Depoimentos'],
  ['duvidas', 'Dúvidas'],
  ['contato', 'Contato'],
];
const navItems = () => NAV.filter(([id]) => !document.getElementById(id).hidden).map(([id, label]) => ({ id, label }));

function renderNav() {
  $('[data-nav]').innerHTML = navItems()
    .filter((n) => n.id !== 'inicio')
    .map((n) => `<li><a href="#${n.id}">${n.label}</a></li>`)
    .join('');
  $('[data-brand]').innerHTML = brandMarkup();
}

/* ---------- comportamento ---------- */
function setupCtas() {
  $$('[data-cta]').forEach((a) => {
    a.href = ctaUrl;
    if (/^https?:/.test(ctaUrl)) { a.target = '_blank'; a.rel = 'noopener'; }
    if (!a.hasAttribute('data-float')) a.textContent = ctaLabel;
  });
}

function setupHeader() {
  const header = $('.header');
  const hero = $('#inicio');
  const float = $('[data-float]');
  const contato = $('#contato');
  let heroVisible = true, contactVisible = false;
  const sync = () => float.classList.toggle('is-on', !heroVisible && !contactVisible);
  new IntersectionObserver(([e]) => {
    heroVisible = e.isIntersecting;
    header.classList.toggle('is-solid', !e.isIntersecting);
    sync();
  }, { rootMargin: '-72px 0px 0px 0px' }).observe(hero);
  new IntersectionObserver(([e]) => { contactVisible = e.isIntersecting; sync(); }).observe(contato);
}

function setupMenu() {
  const btn = $('.menu-btn');
  const nav = $('#menu');
  const label = $('.sr-only', btn);
  const set = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Fechar menu' : 'Abrir menu';
    document.body.classList.toggle('menu-open', open);
    if (open) $('a', nav)?.focus();
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { set(false); btn.focus(); }
  });
  matchMedia('(min-width: 1024px)').addEventListener('change', () => set(false));
}

function setupActiveNav() {
  const links = $$('.nav__list a');
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.removeAttribute('aria-current'));
        map.get(e.target.id)?.setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => io.observe(document.getElementById(id)));
}

function setupReveal() {
  const els = $$('.reveal');
  if (reduced || !('IntersectionObserver' in window)) return els.forEach((el) => el.classList.add('in'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  els.forEach((el) => io.observe(el));
}

function setupLightbox() {
  const dlg = $('.lightbox');
  if (!dlg || !projetosVisiveis.length) return;
  const stage = $('[data-lb-stage]', dlg);
  const caption = $('[data-lb-caption]', dlg);
  const prev = $('[data-lb-prev]', dlg);
  const next = $('[data-lb-next]', dlg);
  // Lista plana: todas as imagens de todos os projetos, em ordem
  const slides = projetosVisiveis.flatMap((p, pi) => p.imagens.map((im, ii) => ({ im, p, pi, ii })));
  let idx = 0, opener = null;

  const show = (i) => {
    idx = (i + slides.length) % slides.length;
    const s = slides[idx];
    stage.innerHTML = media(s.im, 'lightbox__img', { eager: true, sizes: '100vw' });
    const meta = [s.p.tipo, s.p.local, s.p.ano].filter(Boolean).join(' · ');
    caption.textContent = `${s.p.titulo}${meta ? ' — ' + meta : ''}  ·  ${idx + 1} / ${slides.length}`;
    const single = slides.length < 2;
    prev.hidden = next.hidden = single;
  };

  $$('[data-project]').forEach((b) =>
    b.addEventListener('click', () => {
      opener = b;
      show(slides.findIndex((s) => s.pi === Number(b.dataset.project)));
      dlg.showModal();
      document.body.classList.add('lb-open');
    })
  );
  const close = () => dlg.close();
  dlg.addEventListener('close', () => { document.body.classList.remove('lb-open'); opener?.focus(); });
  $('[data-lb-close]', dlg).addEventListener('click', close);
  prev.addEventListener('click', () => show(idx - 1));
  next.addEventListener('click', () => show(idx + 1));
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target === stage) close(); });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  // gestos de toque
  let x0 = null, y0 = null;
  stage.addEventListener('pointerdown', (e) => { x0 = e.clientX; y0 = e.clientY; });
  stage.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { show(idx + (dx < 0 ? 1 : -1)); e.stopPropagation(); }
    x0 = null;
  });
}

function setupSeo() {
  const brand = `${site.marca.nome} ${site.marca.complemento}`;
  const cidade = c.cidadeAtuacao;
  document.title = `${brand} | Arquitetura e interiores${cidade ? ' em ' + cidade : ''}`;
  if (site.urlSite) {
    $('link[rel=canonical]').href = site.urlSite;
    $('meta[property="og:image"]').content = site.urlSite + 'assets/img/og-image.png';
    const og = document.createElement('meta');
    og.setAttribute('property', 'og:url'); og.content = site.urlSite; document.head.append(og);
  }
  // Dados estruturados apenas com informações confirmadas
  if (!site.marca.nomeConfirmado) return;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: brand,
    description: site.marca.descricao,
    sameAs: [c.instagram.url],
  };
  if (site.urlSite) ld.url = site.urlSite;
  if (c.telefone) ld.telephone = c.telefone;
  if (c.email) ld.email = c.email;
  if (c.endereco.confirmado && c.endereco.linha)
    ld.address = { '@type': 'PostalAddress', streetAddress: c.endereco.linha, addressLocality: c.endereco.cidade, addressRegion: c.endereco.uf, postalCode: c.endereco.cep, addressCountry: 'BR' };
  if (cidade) ld.areaServed = cidade;
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(ld);
  document.head.append(s);
}

/* ---------- init ---------- */
renderHero();
renderAbout();
renderServices();
renderProjects();
renderProcess();
renderCompare();
renderReviews();
renderFaq();
renderContact();
renderNav();
renderFooter();
setupCtas();
setupHeader();
setupMenu();
setupActiveNav();
setupReveal();
setupLightbox();
setupSeo();
document.documentElement.classList.add('ready');
if (demo) document.documentElement.classList.add('is-demo');
