import { type Messages } from '../messages';

export const PT_BR: Messages = {
  brand: 'Carros Elétricos',
  meta: {
    description:
      'Um guia claro e bilíngue sobre carros elétricos e sustentáveis: como funcionam, os quatro principais tipos, modelos que já estão nas ruas e as vantagens e desafios de fazer a troca.',
    ogLocale: 'pt_BR',
    pageTitles: {
      landing: 'Carros Elétricos — Um guia claro sobre mobilidade sustentável',
      notFound: 'Página não encontrada — Carros Elétricos',
    },
  },
  a11y: {
    skipToContent: 'Pular para o conteúdo principal',
    opensInNewTab: '(abre em uma nova aba)',
  },
  nav: {
    ariaLabel: 'Principal',
    home: 'Carros Elétricos — início',
    sections: {
      'what-is': 'O que são',
      'how-it-works': 'Como funcionam',
      types: 'Tipos',
      examples: 'Exemplos',
      'pros-cons': 'Prós e contras',
    },
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    menuTitle: 'Navegação',
  },
  language: {
    label: 'Idioma',
  },
  hero: {
    eyebrow: 'Mobilidade sustentável, explicada',
    titleLead: 'Direção sustentável,',
    titleAccent: 'explicada com clareza.',
    lead: 'Como os carros elétricos funcionam, os quatro tipos que você encontra nas ruas, modelos reais e as vantagens e desafios — em um guia claro e com fontes.',
    primaryCta: 'Começar a explorar',
    secondaryCta: 'Comparar os tipos',
    facts: [
      { value: '4', label: 'tipos de carros eletrificados, comparados lado a lado' },
      { value: '77%+', label: 'da energia da rede chega às rodas de um carro elétrico' },
      { value: '0 g', label: 'de emissões pelo escapamento rodando com a bateria' },
    ],
    factsNote: 'Dado de eficiência: Departamento de Energia e EPA dos EUA.',
    factsNoteLink: 'Ver todas as fontes',
  },
  whatIs: {
    eyebrow: 'O básico',
    title: 'O que é um carro sustentável?',
    lead: 'Um carro sustentável é projetado para reduzir seu impacto ambiental ao longo de toda a vida útil — da fábrica, passando por cada quilômetro rodado, até o destino de suas peças no fim do ciclo.',
    pillars: {
      'clean-energy': {
        title: 'Energia mais limpa',
        text: 'Usa eletricidade ou hidrogênio em vez de queimar gasolina ou diesel, e por isso emite pouco ou nada pelo escapamento.',
      },
      efficiency: {
        title: 'Eficiente por natureza',
        text: 'Transforma mais da energia armazenada em movimento e recupera parte dela a cada frenagem.',
      },
      lifecycle: {
        title: 'Pensado para todo o ciclo de vida',
        text: 'Prioriza materiais recicláveis e planeja o reaproveitamento ou a reciclagem das baterias em vez do descarte.',
      },
      'healthier-cities': {
        title: 'Cidades mais saudáveis',
        text: 'Menos fumaça e menos ruído de motor onde as pessoas moram, trabalham e respiram.',
      },
    },
  },
  howItWorks: {
    eyebrow: 'Sob o assoalho',
    title: 'Como funciona um carro elétrico?',
    lead: 'A energia percorre o caminho da tomada até as rodas em cinco etapas. Selecione um componente para ver onde ele fica no carro.',
    diagramLabel: 'Diagrama, visto de cima, do sistema de tração de um carro elétrico',
    stepsLabel: 'Componentes do sistema de tração, na ordem em que a energia passa por eles',
    parts: {
      'charge-port': {
        title: 'Porta de recarga',
        text: 'Conecta o carro a um carregador de parede em casa ou a uma estação de recarga pública.',
      },
      'onboard-charger': {
        title: 'Carregador de bordo',
        text: 'Converte a corrente alternada (CA) da rede na corrente contínua (CC) que a bateria armazena. Carregadores rápidos CC dispensam essa etapa.',
      },
      battery: {
        title: 'Bateria',
        text: 'Centenas de células de íons de lítio sob o assoalho armazenam a energia e mantêm o centro de gravidade baixo.',
      },
      inverter: {
        title: 'Inversor',
        text: 'Converte a CC da bateria de volta em CA para o motor e controla quanta potência ele recebe.',
      },
      motor: {
        title: 'Motor elétrico',
        text: 'Movimenta as rodas por meio de uma transmissão de marcha única, entregando torque máximo desde a partida.',
      },
    },
    regeneration: {
      title: 'E quando você freia?',
      text: 'O fluxo se inverte. O motor passa a funcionar como gerador, desacelerando o carro enquanto devolve energia à bateria — é a frenagem regenerativa.',
    },
    nextCta: 'Ver os quatro tipos',
  },
  types: {
    eyebrow: 'Entenda a diferença',
    title: 'Quatro tipos de carros eletrificados',
    lead: 'Nem todo carro “elétrico” funciona da mesma forma. A diferença está na origem da energia e em quanto da condução é feita de forma elétrica.',
    tablistLabel: 'Tipos de veículos eletrificados',
    attributes: {
      energySources: 'Fonte de energia',
      plugsIn: 'Recarrega na tomada',
      tailpipe: 'Emissões pelo escapamento',
      refuel: 'Como abastecer',
      bestFor: 'Ideal para',
    },
    yes: 'Sim',
    no: 'Não',
    electricDrive: {
      label: 'Condução elétrica',
      levels: {
        assist: 'Assistência elétrica',
        partial: 'Parcialmente elétrico',
        full: 'Totalmente elétrico',
      },
    },
    energySources: {
      gasoline: 'Gasolina',
      electricity: 'Eletricidade',
      hydrogen: 'Hidrogênio',
    },
    items: {
      hev: {
        name: 'Veículo elétrico híbrido',
        summary: 'Motor a combustão com apoio elétrico',
        description:
          'Combina um motor a combustão com um motor elétrico. A pequena bateria é recarregada pelo próprio motor e pelas frenagens, nunca na tomada — o que economiza combustível, principalmente no trânsito de para e anda.',
        tailpipe: 'Menores que as de um carro convencional',
        refuel: 'Apenas no posto de combustível',
        bestFor: 'Quem não tem acesso a um ponto de recarga',
      },
      phev: {
        name: 'Veículo elétrico híbrido plug-in',
        summary: 'Elétrico nos trajetos curtos',
        description:
          'Tem uma bateria maior, recarregada na tomada, que permite fazer os trajetos do dia a dia só no modo elétrico. Em viagens mais longas, o motor a combustão assume.',
        tailpipe: 'Zero no modo elétrico',
        refuel: 'Tomada ou carregador, além do posto',
        bestFor: 'Trajetos diários curtos com viagens ocasionais',
      },
      bev: {
        name: 'Veículo elétrico a bateria',
        summary: '100% elétrico',
        description:
          'Funciona apenas com a eletricidade armazenada na bateria. Não há motor a combustão, tanque nem escapamento — só um motor elétrico, uma bateria e muito menos peças móveis.',
        tailpipe: 'Nenhuma',
        refuel: 'Carregador doméstico ou público',
        bestFor: 'Quem pode recarregar em casa ou no trabalho',
      },
      fcev: {
        name: 'Veículo elétrico a célula de combustível',
        summary: 'Eletricidade gerada a partir do hidrogênio',
        description:
          'Gera a própria eletricidade a bordo, combinando hidrogênio e oxigênio em uma célula de combustível. O abastecimento leva minutos e o único subproduto é água.',
        tailpipe: 'Apenas vapor d’água',
        refuel: 'Posto de hidrogênio',
        bestFor: 'Regiões com rede de abastecimento de hidrogênio',
      },
    },
    nextCta: 'Ver modelos reais',
  },
  examples: {
    eyebrow: 'Já nas ruas',
    title: 'Carros elétricos que você já pode dirigir',
    lead: 'De hatches urbanos a sedãs de luxo, os modelos elétricos a bateria já cobrem quase todos os segmentos do mercado.',
    listLabel: 'Modelos de carros elétricos',
    previous: 'Mostrar modelos anteriores',
    next: 'Mostrar próximos modelos',
    scrollHint: 'Deslize ou use as setas para navegar',
    badge: 'Elétrico a bateria',
    bodyStyles: {
      hatchback: 'Hatch',
      sedan: 'Sedã',
      crossover: 'Crossover',
      suv: 'SUV',
    },
    descriptions: {
      'byd-dolphin':
        'Um hatch compacto para a cidade, construído sobre a plataforma elétrica dedicada da BYD e equipado com a bateria Blade de lítio-ferro-fosfato (LFP).',
      'byd-seal':
        'Um sedã esportivo cuja bateria é integrada à própria estrutura da carroceria, reduzindo peso e aumentando a rigidez.',
      'kia-niro-ev':
        'Um crossover prático também vendido nas versões híbrida e híbrida plug-in — três dos quatro tipos em uma mesma linha.',
      'hyundai-kona-electric':
        'Um SUV compacto oferecido com motorização a combustão, híbrida e totalmente elétrica.',
      'tesla-model-s':
        'Lançado em 2012, ajudou a provar que carros elétricos podiam unir grande autonomia e alto desempenho.',
      'volkswagen-id4':
        'Um SUV construído sobre a plataforma MEB da Volkswagen, projetada desde o início para a propulsão elétrica.',
      'nissan-leaf':
        'Lançado em 2010, foi um dos primeiros carros elétricos produzidos em massa para o mercado global.',
    },
  },
  prosCons: {
    eyebrow: 'O quadro completo',
    title: 'Vantagens e desafios',
    lead: 'Carros elétricos resolvem problemas reais — e ainda enfrentam limites reais. Os dois lados importam na hora de decidir pela troca.',
    advantagesTitle: 'Vantagens',
    challengesTitle: 'Desafios',
    advantages: {
      'clean-air': {
        title: 'Ar mais limpo',
        text: 'Rodar com a bateria não gera emissões pelo escapamento, o que faz mais diferença nos centros urbanos mais densos.',
      },
      'running-costs': {
        title: 'Custo de uso menor',
        text: 'A eletricidade costuma custar menos por quilômetro que o combustível, e o sistema elétrico tem muito menos peças sujeitas a desgaste.',
      },
      quiet: {
        title: 'Ruas mais silenciosas',
        text: 'Motores elétricos são quase silenciosos em baixa velocidade, reduzindo o ruído que o trânsito leva aos bairros.',
      },
      efficiency: {
        title: 'Eficiência de projeto',
        text: 'Carros elétricos transformam mais de 77% da energia da rede em movimento nas rodas; carros a gasolina, apenas de 12% a 30%.',
      },
    },
    challenges: {
      'upfront-cost': {
        title: 'Preço de compra maior',
        text: 'Os modelos elétricos ainda costumam custar mais na compra do que carros a combustão equivalentes, embora a diferença venha diminuindo.',
      },
      'charging-network': {
        title: 'Rede de recarga desigual',
        text: 'Os carregadores públicos se concentram nas grandes cidades e nas principais rodovias, deixando lacunas no restante do território.',
      },
      'battery-lifecycle': {
        title: 'Impacto das baterias',
        text: 'A mineração dos materiais e a reciclagem das baterias usadas ainda levantam preocupações ambientais e sociais.',
      },
      range: {
        title: 'Autonomia e tempo de recarga',
        text: 'Alguns modelos percorrem distâncias menores por carga, e recarregar leva mais tempo do que encher um tanque.',
      },
    },
    interiorAlt:
      'Interior de um carro elétrico com painel digital amplo e iluminação ambiente azul',
    chargingAlt:
      'Motorista conectando um carro elétrico branco a uma estação pública de recarga rápida',
  },
  sources: {
    eyebrow: 'Referências',
    title: 'Fontes e leituras complementares',
    lead: 'As definições e os números desta página vêm de fontes públicas e primárias. Cada link abre o documento original (em inglês).',
    topics: {
      'fueleconomy-ev': 'Eficiência energética de carros elétricos e a gasolina',
      'afdc-benefits': 'Custos de uso, emissões e considerações práticas',
      'afdc-hev': 'Como funcionam os veículos híbridos',
      'afdc-phev': 'Como funcionam os híbridos plug-in',
      'afdc-bev': 'Como funcionam os veículos elétricos a bateria',
      'afdc-fcev': 'Como funcionam os veículos a célula de combustível',
      'eea-ev': 'Veículos elétricos sob a perspectiva ambiental europeia',
    },
  },
  footer: {
    tagline:
      'Um guia claro e com fontes sobre carros elétricos e sustentáveis — como funcionam, os principais tipos e as vantagens e desafios da troca.',
    exploreTitle: 'Explorar',
    connectTitle: 'Contato',
    sourcesLink: 'Fontes',
    academic: 'Projeto acadêmico ·',
    rights: (year) => `© ${year} Mateus Vincenzi. Todos os direitos reservados.`,
    backToTop: 'Voltar ao topo',
  },
  notFound: {
    eyebrow: 'Erro 404',
    title: 'Esta estrada não leva a lugar nenhum.',
    text: 'A página que você procura não existe ou pode ter mudado de endereço.',
    cta: 'Voltar ao guia',
  },
};
