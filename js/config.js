/* =========================================================================
   CONFIGURAÇÃO CENTRAL — Vitória Sampaio Arquitetura
   Edite SOMENTE este arquivo para atualizar textos, contatos e imagens.

   - Os textos e as imagens atuais são ilustrativos (fotos do Unsplash).
     Troque pelas fotos reais dos projetos quando estiverem disponíveis:
     coloque os arquivos em assets/img/ e informe o caminho em `src`.
   - Campos vazios ('') não aparecem no site.
   - Se uma imagem não carregar, o site mostra um bloco neutro no lugar.
   ========================================================================= */

// Atalho para imagens do Unsplash (ilustrativas)
const foto = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const site = {
  // URL final do site, com barra no final
  urlSite: 'https://lzzamboniofc.github.io/VitoriaSampaioArq/',

  marca: {
    nome: 'Vitória Sampaio',
    complemento: 'Arquitetura',
    logo: '',        // ex.: 'assets/img/logo.svg' (versão clara para fundo escuro)
    logoEscuro: '',  // ex.: 'assets/img/logo-escuro.svg'
    descricao:
      'Projetos de arquitetura e interiores desenvolvidos com escuta, cuidado técnico e atenção a cada detalhe.',
  },

  // Canal principal dos botões "Solicitar orçamento".
  // Vazio = usa o WhatsApp (se preenchido) ou o Direct do Instagram.
  atendimento: {
    rotulo: 'Solicitar orçamento',
    url: '',
  },

  contato: {
    instagram: {
      usuario: 'vitoriasampaio_arq',
      url: 'https://www.instagram.com/vitoriasampaio_arq/',
      direct: 'https://ig.me/m/vitoriasampaio_arq',
    },
    whatsapp: '',  // somente números com DDI e DDD, ex.: '5511999999999'
    telefone: '',  // ex.: '(11) 99999-9999'
    email: '',
    cidadeAtuacao: '', // ex.: 'Itu e região'
    endereco: { linha: '', cidade: '', uf: '', cep: '' }, // preenchido = ativa "Como chegar"
    mapaEmbed: '', // URL de incorporação do Google Maps
    horarios: [],  // ex.: [{ dias: 'Segunda a sexta', horas: '9h às 18h' }]
    atendimentoObs: 'Atendimento com hora marcada, presencial ou on-line.',
  },

  hero: {
    sobretitulo: 'Arquitetura & Interiores',
    titulo: 'Arquitetura feita para ser vivida.',
    texto:
      'Projetos de arquitetura e interiores pensados a partir de quem vai habitar cada espaço.',
    imagem: { src: foto('1600210492486-724fe5c67fb0', 2200), alt: 'Sala de estar clara com móveis em tons neutros' },
  },

  sobre: {
    titulo: 'Cada projeto começa por uma boa escuta.',
    paragrafos: [
      'Entender a rotina, os desejos e a forma como cada pessoa ocupa um espaço é o ponto de partida. A partir disso, o projeto ganha forma com equilíbrio entre estética, função e viabilidade.',
      'Do primeiro croqui à escolha do último acabamento, cada decisão é tomada em conjunto, com clareza sobre prazos, custos e possibilidades.',
      'O resultado são ambientes com identidade, pensados para durar e para serem vividos todos os dias.',
    ],
    destaques: [
      { titulo: 'Projeto sob medida', texto: 'Soluções desenhadas para a rotina e o estilo de cada cliente, sem fórmulas prontas.' },
      { titulo: 'Acompanhamento próximo', texto: 'Contato direto com a arquiteta em todas as etapas do projeto.' },
      { titulo: 'Atendimento on-line', texto: 'Reuniões e apresentações também a distância, para quem está em outra cidade.' },
    ],
    assinatura: 'Vitória Sampaio',
    registro: '', // ex.: 'Arquiteta e Urbanista — CAU A000000-0'
    imagens: [
      { src: foto('1586023492125-27b2c045efd7', 1200), alt: 'Ambiente de estar com poltrona e iluminação natural' },
      { src: foto('1616486338812-3dadae4b4ace', 800), alt: 'Detalhe de decoração em tons claros' },
    ],
  },

  // Formulário de orçamento da seção Contato.
  // Abre o WhatsApp com a mensagem pronta (se contato.whatsapp estiver preenchido);
  // sem WhatsApp, copia a mensagem e abre o Direct do Instagram.
  orcamento: {
    titulo: 'Solicite um orçamento',
    texto: 'Preencha os campos abaixo e envie sua mensagem direto para a arquiteta.',
    botao: 'Enviar pelo WhatsApp',
    botaoSemWhatsapp: 'Enviar pelo Instagram', // usado enquanto contato.whatsapp estiver vazio
  },

  servicos: [
    {
      nome: 'Projeto arquitetônico',
      descricao: 'Do estudo inicial ao projeto completo para construção, com soluções pensadas para o terreno, o clima e para quem vai morar.',
    },
    {
      nome: 'Projeto de interiores',
      descricao: 'Layout, materiais, marcenaria e iluminação definidos em conjunto para criar ambientes coerentes, funcionais e acolhedores.',
    },
    {
      nome: 'Reforma',
      descricao: 'Reorganização de espaços existentes, com atenção às possibilidades técnicas, ao cronograma e ao orçamento disponível.',
    },
    {
      nome: 'Consultoria',
      descricao: 'Orientação pontual para decisões de layout, revestimentos, cores e mobiliário, ideal para quem quer começar com segurança.',
    },
  ],

  projetos: [
    {
      titulo: 'Casa Jardim', tipo: 'Residencial · Arquitetura', local: '', ano: '',
      imagens: [
        { src: foto('1600585154340-be6161a56a0c'), alt: 'Fachada de casa contemporânea com grandes aberturas de vidro' },
        { src: foto('1600607687939-ce8a6c25118c'), alt: 'Sala integrada da Casa Jardim' },
      ],
    },
    {
      titulo: 'Apartamento Linho', tipo: 'Residencial · Interiores', local: '', ano: '',
      imagens: [{ src: foto('1618221195710-dd6b41faaea6', 1200), alt: 'Sala de estar com sofá claro e quadros' }],
    },
    {
      titulo: 'Cozinha Aberta', tipo: 'Reforma', local: '', ano: '',
      imagens: [{ src: foto('1556909114-f6e7ad7d3136', 1200), alt: 'Cozinha integrada com bancada e marcenaria clara' }],
    },
    {
      titulo: 'Suíte Serena', tipo: 'Interiores', local: '', ano: '',
      imagens: [{ src: foto('1505693416388-ac5ce068fe85', 1200), alt: 'Quarto com roupa de cama clara e luz natural' }],
    },
    {
      titulo: 'Residência Horizonte', tipo: 'Residencial · Arquitetura e interiores', local: '', ano: '',
      imagens: [
        { src: foto('1600047509807-ba8f99d2cdde', 2200), alt: 'Casa moderna com área externa e piscina' },
        { src: foto('1600566753190-17f0baa2a6c3'), alt: 'Ambiente interno da Residência Horizonte' },
      ],
    },
  ],

  processo: {
    titulo: 'Como o projeto acontece',
    texto: 'Um caminho claro, com decisões tomadas em conjunto em cada etapa.',
    imagem: { src: foto('1503387762-592deb58ef4e', 1200), alt: 'Plantas de arquitetura e instrumentos de desenho sobre a mesa' },
    etapas: [
      { titulo: 'Conversa inicial', texto: 'Entendimento das necessidades, do espaço, do orçamento e das expectativas.' },
      { titulo: 'Estudo preliminar', texto: 'Primeiras propostas de layout e linguagem visual, apresentadas para validação.' },
      { titulo: 'Desenvolvimento', texto: 'Detalhamento técnico, escolha de materiais, marcenaria e iluminação.' },
      { titulo: 'Entrega', texto: 'Projeto finalizado para execução, com orientações claras para a obra.' },
    ],
  },

  // Antes e depois — use apenas fotos reais do mesmo ambiente, mesmo enquadramento.
  // A seção fica oculta enquanto a lista estiver vazia.
  antesDepois: [
    // { titulo: 'Reforma de sala', antes: { src: 'assets/img/sala-antes.webp', alt: '...' }, depois: { src: 'assets/img/sala-depois.webp', alt: '...' } }
  ],

  // Depoimentos — use apenas avaliações reais de clientes.
  // A seção fica oculta enquanto a lista estiver vazia.
  depoimentos: [
    // { nome: 'Nome como aparece publicamente', texto: '...', nota: 5, origem: 'Google' }
  ],

  faq: [
    {
      pergunta: 'Como solicito um orçamento?',
      resposta: 'Envie uma mensagem pelo Instagram @vitoriasampaio_arq contando um pouco sobre o seu espaço, o que você deseja e o prazo que tem em mente. A partir disso, agendamos uma conversa inicial.',
    },
    {
      pergunta: 'Quais serviços são oferecidos?',
      resposta: 'Projeto arquitetônico, projeto de interiores, reformas e consultorias pontuais. Cada proposta é ajustada ao tamanho e ao momento do seu projeto.',
    },
    {
      pergunta: 'É possível fazer o projeto a distância?',
      resposta: 'Sim. Reuniões, apresentações e ajustes podem ser feitos on-line, com o mesmo cuidado do atendimento presencial.',
    },
    {
      pergunta: 'Quanto tempo leva um projeto?',
      resposta: 'Depende do tamanho e da complexidade do espaço. Na conversa inicial, apresentamos um cronograma estimado para cada etapa.',
    },
    {
      pergunta: 'Como é definido o valor do projeto?',
      resposta: 'O valor considera a área, o tipo de serviço e o nível de detalhamento necessário. Após entender sua necessidade, enviamos uma proposta detalhada.',
    },
    {
      pergunta: 'A arquiteta acompanha a obra?',
      resposta: 'O acompanhamento pode ser incluído na proposta, com visitas periódicas para garantir que a execução siga o projeto.',
    },
  ],

  rodape: {
    creditos: '', // ex.: 'Site desenvolvido por Nome'
  },
};
