/* =========================================================================
   CONFIGURAÇÃO CENTRAL — Vitória Sampaio Arquitetura
   Edite SOMENTE este arquivo para atualizar textos, contatos e imagens.

   - Imagens: podem ser links (Unsplash) ou arquivos em assets/img/.
   - Campos vazios ('') não aparecem no site.
   - Se uma imagem não carregar, o site mostra um bloco neutro no lugar.
   ========================================================================= */

// Atalho para imagens do Unsplash
const foto = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const site = {
  urlSite: 'https://lzzamboniofc.github.io/VitoriaSampaioArq/',

  marca: {
    nome: 'Vitória Sampaio',
    complemento: 'Arquitetura',
    nomeCompleto: 'Vitória Sampaio Arquitetura & Interiores',
  },

  contato: {
    // Número do WhatsApp: somente dígitos, com DDI e DDD (ex.: 5511999999999)
    // ATENÇÃO: o número abaixo é de exemplo — troque pelo número real.
    whatsapp: '5511999999999',
    mensagemWhatsapp: 'Olá, gostaria de solicitar um orçamento de projeto.',
    telefone: '(11) 99999-9999',              // exemplo — trocar pelo real
    email: 'contato@vitoriasampaioarq.com.br', // exemplo — trocar pelo real
    local: 'São Paulo - SP / Atendimento Brasil',
    instagram: 'https://www.instagram.com/vitoriasampaio_arq/',
  },

  menu: [
    { id: 'inicio', rotulo: 'Início' },
    { id: 'sobre', rotulo: 'Sobre' },
    { id: 'projetos', rotulo: 'Projetos' },
    { id: 'contato', rotulo: 'Contato' },
  ],
  botaoCabecalho: 'Orçamento',

  hero: {
    titulo: 'Arquitetura que transforma experiências e espaços',
    texto: 'Projetos residenciais e comerciais desenvolvidos com sofisticação, funcionalidade e identidade única.',
    imagem: foto('1600585154340-be6161a56a0c', 1920),
    botaoPrincipal: 'Ver Portfólio',
    botaoSecundario: 'Solicitar Orçamento',
  },

  sobre: {
    sobretitulo: 'Conheça o escritório',
    titulo: 'Design autoral e foco nos mínimos detalhes',
    paragrafos: [
      'Acreditamos que a arquitetura vai além da estética: trata-se de criar ambientes que promovam bem-estar, praticidade e acolhimento.',
      'Com anos de dedicação a projetos de alto padrão, nosso compromisso é traduzir o estilo de vida de cada cliente em formas, texturas e soluções inteligentes.',
    ],
    // Foto ilustrativa — troque por uma foto real da arquiteta ou do escritório.
    imagem: { src: foto('1573496359142-b8d87734a5a2', 800), alt: 'Vitória Sampaio Arquiteta' },
  },

  projetos: {
    sobretitulo: 'Portfólio em Destaque',
    titulo: 'Projetos Recentes',
    // Filtros exibidos acima da galeria ("Todos" é adicionado automaticamente)
    categorias: [
      { id: 'residencial', nome: 'Residencial' },
      { id: 'comercial', nome: 'Comercial' },
      { id: 'interiores', nome: 'Interiores' },
    ],
    itens: [
      {
        titulo: 'Residência Alphaville',
        categoria: 'residencial',
        detalhe: 'Residencial • 450m²',
        imagem: foto('1600596542815-ffad4c1539a9'),
      },
      {
        titulo: 'Apartamento Jardins',
        categoria: 'interiores',
        detalhe: 'Interiores • 180m²',
        imagem: foto('1618221195710-dd6b41faaea6'),
      },
      {
        titulo: 'Escritório Corporate',
        categoria: 'comercial',
        detalhe: 'Comercial • 250m²',
        imagem: foto('1497366216548-37526070297c'),
      },
    ],
  },

  contatoSecao: {
    sobretitulo: 'Vamos conversar?',
    titulo: 'Inicie Seu Projeto',
    subtitulo: 'Entre em contato',
    texto: 'Preencha o formulário ou envie uma mensagem direta no WhatsApp para agendarmos uma reunião presencial ou online.',
    botaoFormulario: 'Enviar Mensagem',
  },

  rodape: {
    texto: 'Todos os direitos reservados.',
  },
};
