/* =========================================================================
   CONFIGURAÇÃO CENTRAL — Vitória Sampaio Arquitetura
   Edite SOMENTE este arquivo para atualizar textos, contatos e imagens.

   Regras:
   - Itens com `confirmado: false` aparecem apenas no modo demonstração,
     com o selo "A confirmar". Com `modoDemonstracao: false`, são ocultados.
   - Campos vazios ('') nunca são exibidos ao visitante.
   - Imagens: coloque os arquivos em assets/img/ e informe o caminho em `src`.
     Sem `src`, o modo demonstração mostra um espaço reservado neutro.
   - Rode `npm run pendencias` para listar o que ainda falta preencher.
   ========================================================================= */

export const site = {
  // true = apresentação comercial (mostra pendências sinalizadas)
  // false = versão pública (esconde tudo que não foi confirmado)
  modoDemonstracao: true,

  // URL final do site, com barra no final (ex.: https://usuario.github.io/repositorio/)
  urlSite: 'https://lzzamboniofc.github.io/VitoriaSampaioArq/',

  marca: {
    nome: 'Vitória Sampaio',
    complemento: 'Arquitetura',
    nomeConfirmado: false, // derivado do @vitoriasampaio_arq — confirmar grafia oficial
    logo: '',              // ex.: 'assets/img/logo.svg' (versão clara para fundo escuro)
    logoEscuro: '',        // ex.: 'assets/img/logo-escuro.svg' (para fundo claro)
    descricao:
      'Projetos de arquitetura e interiores desenvolvidos com escuta, cuidado técnico e atenção a cada detalhe.',
  },

  // Canal principal dos botões "Solicitar orçamento".
  // Vazio = usa o Direct do Instagram (canal oficial conhecido).
  atendimento: {
    rotulo: 'Solicitar orçamento',
    url: '', // ex.: 'https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20um%20orçamento'
  },

  contato: {
    instagram: {
      usuario: 'vitoriasampaio_arq',
      url: 'https://www.instagram.com/vitoriasampaio_arq/',
      direct: 'https://ig.me/m/vitoriasampaio_arq',
    },
    whatsapp: '',  // somente números com DDI e DDD, ex.: '5511999999999'
    telefone: '',  // como deve aparecer, ex.: '(11) 99999-9999'
    email: '',
    cidadeAtuacao: '', // ex.: 'Itu e região' — usado em textos e SEO
    endereco: {
      linha: '',   // ex.: 'Rua Exemplo, 123 — Centro'
      cidade: '',
      uf: '',
      cep: '',
      confirmado: false, // mapa e "Como chegar" só aparecem com true
    },
    mapaEmbed: '', // URL de incorporação do Google Maps (src do iframe)
    horarios: [
      // { dias: 'Segunda a sexta', horas: '9h às 18h' }
    ],
    atendimentoObs: '', // ex.: 'Atendimento com hora marcada'
  },

  hero: {
    sobretitulo: 'Arquitetura & Interiores',
    titulo: 'Arquitetura feita para ser vivida.',
    texto:
      'Projetos de arquitetura e interiores pensados a partir de quem vai habitar cada espaço.',
    imagem: { src: '', alt: 'Ambiente projetado por Vitória Sampaio Arquitetura', placeholder: 'Foto principal de um projeto' },
  },

  sobre: {
    titulo: 'Cada projeto começa por uma boa escuta.',
    paragrafos: [
      'Entender a rotina, os desejos e a forma como cada pessoa ocupa um espaço é o ponto de partida. A partir disso, o projeto ganha forma com equilíbrio entre estética, função e viabilidade.',
      'O resultado são ambientes com identidade, pensados para durar e para serem vividos todos os dias.',
    ],
    // Destaques reais do atendimento (deixe vazio até confirmar)
    destaques: [
      // { titulo: 'Atendimento personalizado', texto: '...' }
    ],
    assinatura: 'Vitória Sampaio',
    registro: '', // ex.: 'Arquiteta e Urbanista — CAU A000000-0'
    imagens: [
      { src: '', alt: 'Retrato da arquiteta Vitória Sampaio', placeholder: 'Retrato da arquiteta' },
      { src: '', alt: 'Detalhe de projeto', placeholder: 'Detalhe de projeto' },
    ],
  },

  // Serviços — confirmar no Instagram antes de publicar
  servicos: [
    {
      nome: 'Projeto arquitetônico',
      descricao: 'Do estudo inicial ao projeto completo para construção, com soluções pensadas para o terreno e para quem vai morar.',
      confirmado: false,
    },
    {
      nome: 'Projeto de interiores',
      descricao: 'Layout, materiais, marcenaria e iluminação definidos em conjunto para criar ambientes coerentes e funcionais.',
      confirmado: false,
    },
    {
      nome: 'Reforma',
      descricao: 'Reorganização de espaços existentes, com atenção às possibilidades técnicas e ao orçamento disponível.',
      confirmado: false,
    },
    {
      nome: 'Consultoria',
      descricao: 'Orientação pontual para decisões de layout, revestimentos, cores e mobiliário.',
      confirmado: false,
    },
  ],

  // Portfólio — adicione projetos reais com suas fotos
  projetos: [
    { titulo: 'Projeto 01', tipo: '', local: '', ano: '', confirmado: false, imagens: [{ src: '', alt: 'Projeto 01 — ambiente', placeholder: 'Projeto 01' }, { src: '', alt: 'Projeto 01 — detalhe', placeholder: 'Projeto 01 · detalhe' }] },
    { titulo: 'Projeto 02', tipo: '', local: '', ano: '', confirmado: false, imagens: [{ src: '', alt: 'Projeto 02', placeholder: 'Projeto 02' }] },
    { titulo: 'Projeto 03', tipo: '', local: '', ano: '', confirmado: false, imagens: [{ src: '', alt: 'Projeto 03', placeholder: 'Projeto 03' }] },
    { titulo: 'Projeto 04', tipo: '', local: '', ano: '', confirmado: false, imagens: [{ src: '', alt: 'Projeto 04', placeholder: 'Projeto 04' }] },
    { titulo: 'Projeto 05', tipo: '', local: '', ano: '', confirmado: false, imagens: [{ src: '', alt: 'Projeto 05', placeholder: 'Projeto 05' }] },
  ],

  processo: {
    titulo: 'Como o projeto acontece',
    texto: 'Um caminho claro, com decisões tomadas em conjunto em cada etapa.',
    imagem: { src: '', alt: 'Estudo de projeto sobre a mesa', placeholder: 'Foto de estudo / croqui' },
    etapas: [
      { titulo: 'Conversa inicial', texto: 'Entendimento das necessidades, do espaço e das expectativas.', confirmado: false },
      { titulo: 'Estudo preliminar', texto: 'Primeiras propostas de layout e linguagem visual para validação.', confirmado: false },
      { titulo: 'Desenvolvimento', texto: 'Detalhamento técnico, materiais, marcenaria e iluminação.', confirmado: false },
      { titulo: 'Entrega', texto: 'Projeto finalizado para execução, com orientações para a obra.', confirmado: false },
    ],
  },

  // Antes e depois — somente fotos reais, mesmo enquadramento.
  // Seção fica oculta enquanto vazia (inclusive no modo demonstração).
  antesDepois: [
    // { titulo: 'Reforma de sala', antes: { src: 'assets/img/sala-antes.webp', alt: '...' }, depois: { src: 'assets/img/sala-depois.webp', alt: '...' } }
  ],

  // Depoimentos — somente avaliações reais e verificáveis.
  // Seção fica oculta enquanto vazia (inclusive no modo demonstração).
  depoimentos: [
    // { nome: 'Nome como aparece publicamente', texto: '...', nota: 5, origem: 'Google' }
  ],

  faq: [
    {
      pergunta: 'Como solicito um orçamento?',
      resposta: 'Envie uma mensagem pelo Instagram @vitoriasampaio_arq contando um pouco sobre o seu espaço e o que você precisa.',
      confirmado: true,
    },
    { pergunta: 'Quais serviços são oferecidos?', resposta: 'Resposta a confirmar com a arquiteta.', confirmado: false },
    { pergunta: 'Atende em quais cidades?', resposta: 'Resposta a confirmar com a arquiteta.', confirmado: false },
    { pergunta: 'É possível fazer o projeto a distância?', resposta: 'Resposta a confirmar com a arquiteta.', confirmado: false },
    { pergunta: 'Quanto tempo leva um projeto?', resposta: 'Resposta a confirmar com a arquiteta.', confirmado: false },
    { pergunta: 'Como é definido o valor do projeto?', resposta: 'Resposta a confirmar com a arquiteta.', confirmado: false },
  ],

  rodape: {
    creditos: '', // ex.: 'Site desenvolvido por Nome'
  },
};
