import { site } from './config.js';

/* ---------- utilitários ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const setText = (sel, value) => { const el = $(sel); if (el) el.textContent = value ?? ''; };

const c = site.contato;
const whatsLink = (texto) =>
  c.whatsapp ? `https://wa.me/${c.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(texto)}` : c.instagram;

/* ---------- cabeçalho ---------- */
function renderHeader() {
  $('[data-logo]').innerHTML = `${esc(site.marca.nome)}<span>${esc(site.marca.complemento)}</span>`;
  $('[data-menu]').innerHTML = site.menu
    .map((m) => `<li><a href="#${esc(m.id)}">${esc(m.rotulo)}</a></li>`)
    .join('');
  setText('[data-btn-header]', site.botaoCabecalho);
}

/* ---------- hero ---------- */
function renderHero() {
  const h = site.hero;
  if (h.imagem) $('[data-hero]').style.setProperty('--hero-img', `url("${h.imagem}")`);
  setText('[data-hero-titulo]', h.titulo);
  setText('[data-hero-texto]', h.texto);
  setText('[data-hero-btn1]', h.botaoPrincipal);
  setText('[data-hero-btn2]', h.botaoSecundario);
}

/* ---------- sobre ---------- */
function renderSobre() {
  const s = site.sobre;
  $('[data-sobre-img]').innerHTML = s.imagem?.src
    ? `<img src="${esc(s.imagem.src)}" alt="${esc(s.imagem.alt)}" width="800" height="1000" loading="lazy" decoding="async">`
    : '';
  setText('[data-sobre-sobretitulo]', s.sobretitulo);
  setText('[data-sobre-titulo]', s.titulo);
  $('[data-sobre-paragrafos]').innerHTML = s.paragrafos.map((p) => `<p>${esc(p)}</p>`).join('');
}

/* ---------- projetos + filtros + ampliação ---------- */
function renderProjetos() {
  const p = site.projetos;
  setText('[data-projetos-sobretitulo]', p.sobretitulo);
  setText('[data-projetos-titulo]', p.titulo);

  const filtros = [{ id: 'todos', nome: 'Todos' }, ...p.categorias];
  $('[data-filtros]').innerHTML = filtros
    .map(
      (f, i) =>
        `<button type="button" class="filter-btn${i === 0 ? ' active' : ''}" data-filtro="${esc(f.id)}" aria-pressed="${i === 0}">${esc(f.nome)}</button>`
    )
    .join('');

  $('[data-projetos]').innerHTML = p.itens
    .map(
      (it, i) => `
      <button type="button" class="project-card" data-category="${esc(it.categoria)}" data-index="${i}" aria-label="Ampliar ${esc(it.titulo)}">
        <img src="${esc(it.imagem)}" alt="${esc(it.titulo)}" loading="lazy" decoding="async">
        <span class="project-overlay">
          <span class="project-title">${esc(it.titulo)}</span>
          ${it.detalhe ? `<span class="project-detail">${esc(it.detalhe)}</span>` : ''}
        </span>
      </button>`
    )
    .join('');

  // filtros
  $$('[data-filtro]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filtro;
      $$('[data-filtro]').forEach((b) => {
        const ativo = b === btn;
        b.classList.toggle('active', ativo);
        b.setAttribute('aria-pressed', String(ativo));
      });
      $$('.project-card').forEach((card) => {
        card.hidden = !(cat === 'todos' || card.dataset.category === cat);
      });
    })
  );

  // ampliação
  const modal = $('[data-modal]');
  const modalImg = $('[data-modal-img]');
  let origem = null;
  const abrir = (i, btn) => {
    const it = p.itens[i];
    origem = btn;
    // versão maior da mesma imagem quando for link com largura (?w=)
    modalImg.src = it.imagemAmpliada || it.imagem.replace(/([?&])w=\d+/, '$1w=1600');
    modalImg.alt = it.titulo;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    $('[data-modal-close]').focus();
  };
  const fechar = () => {
    if (!modal.classList.contains('active')) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    origem?.focus();
  };
  $$('.project-card').forEach((card) => card.addEventListener('click', () => abrir(Number(card.dataset.index), card)));
  modal.addEventListener('click', (e) => { if (e.target !== modalImg) fechar(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
}

/* ---------- contato ---------- */
function renderContato() {
  const s = site.contatoSecao;
  setText('[data-contato-sobretitulo]', s.sobretitulo);
  setText('[data-contato-titulo]', s.titulo);
  setText('[data-contato-subtitulo]', s.subtitulo);
  setText('[data-contato-texto]', s.texto);
  setText('[data-form-btn]', s.botaoFormulario);

  const itens = [];
  if (c.local) itens.push(`📍 ${esc(c.local)}`);
  if (c.email) itens.push(`✉️ <a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`);
  if (c.telefone) itens.push(`📱 <a href="${esc(whatsLink(c.mensagemWhatsapp))}" target="_blank" rel="noopener">${esc(c.telefone)}</a>`);
  if (c.instagram) {
    const usuario = c.instagram.replace(/\/$/, '').split('/').pop();
    itens.push(`📷 <a href="${esc(c.instagram)}" target="_blank" rel="noopener">@${esc(usuario)}</a>`);
  }
  $('[data-contato-itens]').innerHTML = itens.map((t) => `<div class="info-item">${t}</div>`).join('');

  // O formulário monta a mensagem e abre o WhatsApp (não depende de servidor)
  const form = $('[data-form]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = Object.fromEntries(new FormData(form));
    const linhas = [`Olá! Meu nome é ${d.nome}.`, `E-mail: ${d.email}`];
    if (d.telefone) linhas.push(`WhatsApp: ${d.telefone}`);
    linhas.push('', d.mensagem);
    window.open(whatsLink(linhas.join('\n')), '_blank', 'noopener');
    form.reset();
  });

  $('[data-whatsapp-btn]').href = whatsLink(c.mensagemWhatsapp);
}

/* ---------- rodapé ---------- */
function renderRodape() {
  $('[data-rodape]').innerHTML =
    `<p>© ${new Date().getFullYear()} ${esc(site.marca.nomeCompleto)}. ${esc(site.rodape.texto)} · <a href="privacidade.html">Política de privacidade</a></p>`;
}

/* ---------- imagem que não carregar vira um bloco neutro ---------- */
document.addEventListener(
  'error',
  (e) => {
    const img = e.target;
    if (img.tagName !== 'IMG' || img.hasAttribute('data-modal-img')) return;
    img.parentElement?.classList.add('img-fallback');
  },
  true
);

/* ---------- dados estruturados (SEO) ---------- */
function renderSeo() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.marca.nomeCompleto,
    url: site.urlSite,
    sameAs: [c.instagram].filter(Boolean),
  };
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(ld);
  document.head.append(s);
}

renderHeader();
renderHero();
renderSobre();
renderProjetos();
renderContato();
renderRodape();
renderSeo();
