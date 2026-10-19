// Lista tudo que ainda precisa ser confirmado ou preenchido em js/config.js
import { site } from '../js/config.js';

const p = [];
const c = site.contato;
const add = (msg) => p.push(msg);

if (!site.marca.nomeConfirmado) add('Confirmar nome oficial da marca (marca.nomeConfirmado)');
if (!site.marca.logo) add('Inserir logotipo oficial (marca.logo)');
if (!site.urlSite) add('Informar URL final do site (urlSite) e atualizar sitemap.xml / robots.txt');
if (!site.atendimento.url && !c.whatsapp) add('Definir canal oficial de orçamento (atendimento.url ou contato.whatsapp) — hoje usa o Direct do Instagram');
if (!c.whatsapp && !c.telefone) add('Telefone ou WhatsApp');
if (!c.email) add('E-mail');
if (!c.cidadeAtuacao) add('Cidade/região de atuação (também melhora o SEO local)');
if (!c.endereco.confirmado) add('Endereço (e marcar endereco.confirmado = true para ativar mapa e rota)');
if (c.endereco.confirmado && !c.mapaEmbed) add('URL de incorporação do mapa (mapaEmbed)');
if (!c.horarios.length) add('Horários de atendimento');
if (!site.sobre.registro) add('Registro profissional (CAU), se desejar exibir');
if (!site.sobre.destaques.length) add('Destaques reais do atendimento (sobre.destaques) — opcional');
if (!site.hero.imagem.src) add('Foto principal do hero');
site.sobre.imagens.forEach((im, i) => !im.src && add(`Foto da seção Sobre #${i + 1} (${im.placeholder})`));
if (!site.processo.imagem.src) add('Foto da seção Processo');
site.servicos.forEach((s) => !s.confirmado && add(`Serviço a confirmar: ${s.nome}`));
site.processo.etapas.forEach((e) => !e.confirmado && add(`Etapa do processo a confirmar: ${e.titulo}`));
site.projetos.forEach((pr) => {
  if (!pr.confirmado) add(`Projeto a confirmar: ${pr.titulo}`);
  pr.imagens.forEach((im) => !im.src && add(`  └ foto faltando: ${im.placeholder || im.alt}`));
});
site.faq.forEach((f) => !f.confirmado && add(`Resposta do FAQ: ${f.pergunta}`));
if (!site.depoimentos.length) add('Depoimentos reais (seção oculta até haver algum)');
if (!site.antesDepois.length) add('Fotos reais de antes e depois (seção oculta até haver alguma)');

console.log(`\nModo demonstração: ${site.modoDemonstracao ? 'ATIVO' : 'desativado'}\n`);
if (!p.length) console.log('✓ Nenhuma pendência. Pode definir modoDemonstracao: false e publicar.\n');
else {
  console.log(`${p.length} pendência(s):\n`);
  p.forEach((m) => console.log(m.startsWith('  ') ? m : `• ${m}`));
  console.log('');
}
