import { type Messages } from '../messages';

export const EN: Messages = {
  brand: 'Electric Cars',
  meta: {
    description:
      'A clear, bilingual guide to electric and sustainable cars: how they work, the four main types, models already on the road and the honest trade-offs of switching.',
    ogLocale: 'en_US',
    pageTitles: {
      landing: 'Electric Cars — A clear guide to sustainable mobility',
      notFound: 'Page not found — Electric Cars',
    },
  },
  a11y: {
    skipToContent: 'Skip to main content',
    opensInNewTab: '(opens in a new tab)',
  },
  nav: {
    ariaLabel: 'Main',
    home: 'Electric Cars — home',
    sections: {
      'what-is': 'What they are',
      'how-it-works': 'How they work',
      types: 'Types',
      examples: 'Examples',
      'pros-cons': 'Pros & cons',
    },
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuTitle: 'Navigation',
  },
  language: {
    label: 'Language',
  },
  hero: {
    eyebrow: 'Sustainable mobility, explained',
    titleLead: 'Sustainable driving,',
    titleAccent: 'clearly explained.',
    lead: 'How electric cars work, the four types you’ll find on the road, real models and the honest trade-offs — in one clear, well-sourced guide.',
    primaryCta: 'Start exploring',
    secondaryCta: 'Compare the types',
    facts: [
      { value: '4', label: 'types of electrified cars, compared side by side' },
      { value: '77%+', label: 'of grid energy reaches the wheels of an electric car' },
      { value: '0 g', label: 'tailpipe emissions when driving on battery power' },
    ],
    factsNote: 'Efficiency figure: U.S. Department of Energy & EPA.',
    factsNoteLink: 'See all sources',
  },
  whatIs: {
    eyebrow: 'The basics',
    title: 'What is a sustainable car?',
    lead: 'A sustainable car is designed to shrink its environmental footprint across its whole life — from the factory, through every kilometer driven, to what happens to its parts at the end.',
    pillars: {
      'clean-energy': {
        title: 'Cleaner energy',
        text: 'Runs on electricity or hydrogen instead of burning gasoline or diesel, so it releases little or nothing from the tailpipe.',
      },
      efficiency: {
        title: 'Efficient by design',
        text: 'Converts more of its stored energy into motion and recovers part of it every time it brakes.',
      },
      lifecycle: {
        title: 'Built for the whole lifecycle',
        text: 'Favors recyclable materials and plans for batteries to be reused or recycled instead of discarded.',
      },
      'healthier-cities': {
        title: 'Healthier cities',
        text: 'Less exhaust and less engine noise where people live, work and breathe.',
      },
    },
  },
  howItWorks: {
    eyebrow: 'Under the floor',
    title: 'How does an electric car work?',
    lead: 'Energy travels from the plug to the wheels in five steps. Select a component to see where it sits in the car.',
    diagramLabel: 'Top-down diagram of an electric car’s drivetrain',
    stepsLabel: 'Drivetrain components, in the order energy flows through them',
    parts: {
      'charge-port': {
        title: 'Charging port',
        text: 'Connects the car to a wall box at home or to a public charging station.',
      },
      'onboard-charger': {
        title: 'On-board charger',
        text: 'Converts alternating current (AC) from the grid into the direct current (DC) the battery stores. DC fast chargers bypass it.',
      },
      battery: {
        title: 'Battery pack',
        text: 'Hundreds of lithium-ion cells under the floor store the energy and keep the center of gravity low.',
      },
      inverter: {
        title: 'Inverter',
        text: 'Turns the battery’s DC back into AC for the motor and controls how much power it receives.',
      },
      motor: {
        title: 'Electric motor',
        text: 'Drives the wheels through a single-speed gearbox, delivering full torque from a standstill.',
      },
    },
    regeneration: {
      title: 'And when you brake?',
      text: 'The flow reverses. The motor works as a generator, slowing the car while sending energy back to the battery — this is regenerative braking.',
    },
    nextCta: 'See the four types',
  },
  types: {
    eyebrow: 'Know the difference',
    title: 'Four types of electrified cars',
    lead: 'Not every “electric” car works the same way. The difference is where the energy comes from and how much of the driving is done electrically.',
    tablistLabel: 'Electrified vehicle types',
    attributes: {
      energySources: 'Energy source',
      plugsIn: 'Plugs in to charge',
      tailpipe: 'Tailpipe emissions',
      refuel: 'How you refuel',
      bestFor: 'Best suited to',
    },
    yes: 'Yes',
    no: 'No',
    electricDrive: {
      label: 'Electric driving',
      levels: {
        assist: 'Electric assist',
        partial: 'Partly electric',
        full: 'Fully electric',
      },
    },
    energySources: {
      gasoline: 'Gasoline',
      electricity: 'Electricity',
      hydrogen: 'Hydrogen',
    },
    items: {
      hev: {
        name: 'Hybrid electric vehicle',
        summary: 'Engine first, electric assist',
        description:
          'Combines a combustion engine with an electric motor. The small battery is recharged by the engine and by braking, never from a socket — which saves fuel, especially in stop-and-go traffic.',
        tailpipe: 'Lower than a conventional car',
        refuel: 'Gas station only',
        bestFor: 'Drivers without access to charging',
      },
      phev: {
        name: 'Plug-in hybrid electric vehicle',
        summary: 'Electric for short trips',
        description:
          'Carries a larger battery that charges from an outlet, so daily commutes can be fully electric. On longer trips the combustion engine takes over.',
        tailpipe: 'Zero in electric mode',
        refuel: 'Outlet or charger, plus gas station',
        bestFor: 'Short daily trips with occasional long drives',
      },
      bev: {
        name: 'Battery electric vehicle',
        summary: '100% electric',
        description:
          'Runs entirely on electricity stored in its battery. There is no engine, no fuel tank and no exhaust — just a motor, a battery and far fewer moving parts.',
        tailpipe: 'None',
        refuel: 'Home or public charger',
        bestFor: 'Drivers who can charge at home or at work',
      },
      fcev: {
        name: 'Fuel cell electric vehicle',
        summary: 'Electricity made from hydrogen',
        description:
          'Generates its own electricity on board by combining hydrogen with oxygen in a fuel cell. Refueling takes minutes and the only by-product is water.',
        tailpipe: 'Water vapor only',
        refuel: 'Hydrogen station',
        bestFor: 'Regions with a hydrogen refueling network',
      },
    },
    nextCta: 'See real models',
  },
  examples: {
    eyebrow: 'On the road today',
    title: 'Electric cars you can already drive',
    lead: 'From city hatchbacks to luxury sedans, battery electric models now cover almost every segment of the market.',
    listLabel: 'Electric car models',
    previous: 'Show previous models',
    next: 'Show next models',
    scrollHint: 'Swipe or use the arrows to browse',
    badge: 'Battery electric',
    bodyStyles: {
      hatchback: 'Hatchback',
      sedan: 'Sedan',
      crossover: 'Crossover',
      suv: 'SUV',
    },
    descriptions: {
      'byd-dolphin':
        'A compact city hatchback built on BYD’s dedicated electric platform, with the brand’s Blade lithium iron phosphate (LFP) battery.',
      'byd-seal':
        'A sporty sedan whose battery is integrated into the body structure itself, saving weight and adding stiffness.',
      'kia-niro-ev':
        'A practical crossover also sold as a hybrid and a plug-in hybrid — three of the four types in one model line.',
      'hyundai-kona-electric':
        'A compact SUV offered with combustion, hybrid and fully electric drivetrains.',
      'tesla-model-s':
        'Launched in 2012, it helped prove that electric cars could combine long range with high performance.',
      'volkswagen-id4':
        'An SUV built on Volkswagen’s MEB platform, designed from the start for electric drive.',
      'nissan-leaf':
        'First launched in 2010, one of the first electric cars mass-produced for a global market.',
    },
  },
  prosCons: {
    eyebrow: 'The full picture',
    title: 'Advantages and challenges',
    lead: 'Electric cars solve real problems — and still face real limits. Both sides matter when deciding whether to make the switch.',
    advantagesTitle: 'Advantages',
    challengesTitle: 'Challenges',
    advantages: {
      'clean-air': {
        title: 'Cleaner air',
        text: 'Battery-electric driving produces no tailpipe emissions, which matters most in dense city centers.',
      },
      'running-costs': {
        title: 'Lower running costs',
        text: 'Electricity usually costs less per kilometer than fuel, and an electric drivetrain has far fewer parts that wear out.',
      },
      quiet: {
        title: 'Quieter streets',
        text: 'Electric motors are almost silent at low speeds, cutting the noise that traffic brings to neighborhoods.',
      },
      efficiency: {
        title: 'Efficient by design',
        text: 'EVs turn over 77% of grid energy into motion at the wheels, while gasoline cars manage only 12–30%.',
      },
    },
    challenges: {
      'upfront-cost': {
        title: 'Higher purchase price',
        text: 'Electric models still tend to cost more up front than comparable combustion cars, although the gap keeps narrowing.',
      },
      'charging-network': {
        title: 'Uneven charging network',
        text: 'Public chargers are concentrated in large cities and along main highways, leaving gaps elsewhere.',
      },
      'battery-lifecycle': {
        title: 'Battery footprint',
        text: 'Mining battery materials and recycling used packs still raise environmental and social concerns.',
      },
      range: {
        title: 'Range and charging time',
        text: 'Some models travel shorter distances per charge, and recharging takes longer than filling a tank.',
      },
    },
    interiorAlt:
      'Interior of an electric car with a wide digital dashboard and blue ambient lighting',
    chargingAlt: 'A driver plugging a white electric car into a public fast-charging station',
  },
  sources: {
    eyebrow: 'References',
    title: 'Sources and further reading',
    lead: 'Definitions and figures on this page come from public, primary sources. Each link opens the original document.',
    topics: {
      'fueleconomy-ev': 'Energy efficiency of electric vs. gasoline cars',
      'afdc-benefits': 'Running costs, emissions and practical considerations',
      'afdc-hev': 'How hybrid electric vehicles work',
      'afdc-phev': 'How plug-in hybrids work',
      'afdc-bev': 'How battery electric vehicles work',
      'afdc-fcev': 'How hydrogen fuel cell vehicles work',
      'eea-ev': 'Electric vehicles from a European environmental perspective',
    },
  },
  footer: {
    tagline:
      'A clear, sourced guide to electric and sustainable cars — how they work, the main types and the trade-offs of switching.',
    exploreTitle: 'Explore',
    connectTitle: 'Connect',
    sourcesLink: 'Sources',
    academic: 'Academic project · Universidade Católica de Brasília',
    rights: (year) => `© ${year} Mateus Vincenzi. All rights reserved.`,
    backToTop: 'Back to top',
  },
  notFound: {
    eyebrow: 'Error 404',
    title: 'This road doesn’t go anywhere.',
    text: 'The page you’re looking for doesn’t exist or may have moved.',
    cta: 'Back to the guide',
  },
};
