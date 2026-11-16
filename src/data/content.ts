export type Language = 'pt' | 'en';

export type PageRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'service-ground-handling'
  | 'service-ground-handling-supervision'
  | 'service-offshore'
  | 'service-inshore'
  | 'service-maritime'
  | 'service-aviation'
  | 'safety'
  | 'gallery'
  | 'contact'
  | 'privacy'
  | 'not-found';

export interface ServiceDetail {
  id: PageRoute;
  slug: string;
  code: string;
  category: 'aviation' | 'ground' | 'maritime';
  visualType:
    | 'ground-handling'
    | 'supervision'
    | 'offshore'
    | 'inshore'
    | 'maritime'
    | 'aviation';
  pt: {
    title: string;
    shortTitle: string;
    subtitle: string;
    description: string;
    operationalScopeTitle: string;
    items: string[];
    highlights: { label: string; value: string }[];
    ctaText: string;
  };
  en: {
    title: string;
    shortTitle: string;
    subtitle: string;
    description: string;
    operationalScopeTitle: string;
    items: string[];
    highlights: { label: string; value: string }[];
    ctaText: string;
  };
}

export interface GalleryItem {
  id: string;
  categoryKey:
    | 'executive-aviation'
    | 'aircraft-helicopters'
    | 'airport-operations'
    | 'ground-handling'
    | 'offshore-operations'
    | 'inshore-operations'
    | 'maritime-operations'
    | 'infrastructure';
  visualScene: string;
  pt: {
    title: string;
    categoryLabel: string;
    location: string;
    description: string;
  };
  en: {
    title: string;
    categoryLabel: string;
    location: string;
    description: string;
  };
}

export const INSTITUTIONAL_INFO = {
  name: 'MULTIFLIGHT ANGOLA',
  nif: '5417323659',
  website: 'https://multiflightangola.com',
  phone: '+244 923 550 083',
  phoneDial: '+244923550083',
  whatsappNumber: '244923550083',
  email: 'geral@multiflightangola.com',
  addressPt: 'Luanda, Mártires de Kifangondo, Rua 16, Angola.',
  addressEn: 'Luanda, Mártires de Kifangondo, Street 16, Angola.',
  hoursPt: 'Segunda a sexta-feira, das 08h00 às 18h00',
  hoursEn: 'Monday to Friday, 08:00 AM to 06:00 PM',
  foundedYear: 2012,
};

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'service-ground-handling',
    slug: '/servicos/ground-handling',
    code: '01',
    category: 'ground',
    visualType: 'ground-handling',
    pt: {
      title: 'Ground Handling Services',
      shortTitle: 'Ground Handling Services',
      subtitle: 'Assistência integral em terra às aeronaves, tripulações e passageiros.',
      description:
        'Disponibilizamos serviços completos de assistência e coordenação em terra, assegurando operações de escala ágeis, seguras e alinhadas com os procedimentos aeroportuários exigidos pela aviação executiva e corporativa em Angola.',
      operationalScopeTitle: 'Âmbito Operacional Efectivamente Disponibilizado',
      items: [
        'Assistência e coordenação em terra.',
        'Coordenação de operações aeroportuárias.',
        'Assistência às aeronaves em escala.',
        'Coordenação de embarque e desembarque.',
        'Assistência a passageiros.',
        'Coordenação de bagagens.',
        'Coordenação de serviços de rampa.',
        'Apoio operacional às tripulações.',
        'Coordenação com entidades e prestadores aeroportuários.',
        'Acompanhamento de chegadas e partidas.',
      ],
      highlights: [
        { label: 'Operação de Rampa', value: 'Coordenação dedicada em escala' },
        { label: 'Passageiros & Tripulação', value: 'Acompanhamento personalizado' },
        { label: 'Articulação Institucional', value: 'Ligação directa com autoridades aeroportuárias' },
      ],
      ctaText: 'Solicitar Proposta de Ground Handling',
    },
    en: {
      title: 'Ground Handling Services',
      shortTitle: 'Ground Handling Services',
      subtitle: 'Comprehensive ground support for aircraft, crews, and passengers.',
      description:
        'We provide end-to-end ground assistance and coordination services, ensuring agile, safe turnaround operations aligned with airport procedures required by executive and corporate aviation in Angola.',
      operationalScopeTitle: 'Confirmed Operational Scope',
      items: [
        'Ground assistance and coordination.',
        'Airport operations coordination.',
        'Turnaround aircraft assistance.',
        'Boarding and disembarkation coordination.',
        'Passenger assistance.',
        'Baggage handling coordination.',
        'Ramp services coordination.',
        'Operational support for flight crews.',
        'Liaison with airport authorities and service providers.',
        'Arrival and departure monitoring.',
      ],
      highlights: [
        { label: 'Ramp Operations', value: 'Dedicated turnaround coordination' },
        { label: 'Passengers & Crew', value: 'Personalized ground escort & support' },
        { label: 'Authority Liaison', value: 'Direct coordination with airport entities' },
      ],
      ctaText: 'Request Ground Handling Proposal',
    },
  },
  {
    id: 'service-ground-handling-supervision',
    slug: '/servicos/ground-handling-supervision',
    code: '02',
    category: 'ground',
    visualType: 'supervision',
    pt: {
      title: 'Ground Handling Supervision',
      shortTitle: 'Ground Handling Supervision',
      subtitle: 'Supervisão técnica, controlo de qualidade e acompanhamento rigoroso de operações em terra.',
      description:
        'Garantimos a supervisão presencial e documental de todas as etapas de assistência em terra, assegurando o cumprimento estrito dos procedimentos de segurança, pontualidade e padrões operacionais de cada operador aéreo.',
      operationalScopeTitle: 'Âmbito de Supervisão Operacional',
      items: [
        'Supervisão das actividades de Ground Handling.',
        'Acompanhamento das operações aeroportuárias.',
        'Controlo da execução de procedimentos.',
        'Coordenação entre equipas operacionais.',
        'Monitorização da qualidade dos serviços.',
        'Acompanhamento de procedimentos de segurança.',
        'Identificação e comunicação de irregularidades.',
        'Relatórios de supervisão operacional.',
      ],
      highlights: [
        { label: 'Controlo de Qualidade', value: 'Verificação contínua de procedimentos' },
        { label: 'Segurança de Placa', value: 'Mitigação proactiva de riscos operacionais' },
        { label: 'Reporte Técnico', value: 'Relatórios detalhados por operação' },
      ],
      ctaText: 'Solicitar Supervisão Operacional',
    },
    en: {
      title: 'Ground Handling Supervision',
      shortTitle: 'Ground Handling Supervision',
      subtitle: 'Technical supervision, quality control, and rigorous monitoring of ground operations.',
      description:
        'We provide on-site and documentary supervision across every stage of ground handling, ensuring strict compliance with safety protocols, flight punctuality, and each operator’s service standards.',
      operationalScopeTitle: 'Operational Supervision Scope',
      items: [
        'Supervision of Ground Handling activities.',
        'Monitoring of airport operations.',
        'Procedural execution control.',
        'Coordination across operational teams.',
        'Service quality monitoring.',
        'Safety procedure oversight.',
        'Identification and reporting of irregularities.',
        'Operational supervision reports.',
      ],
      highlights: [
        { label: 'Quality Control', value: 'Continuous procedural verification' },
        { label: 'Apron Safety', value: 'Proactive operational risk mitigation' },
        { label: 'Technical Reporting', value: 'Comprehensive post-flight reports' },
      ],
      ctaText: 'Request Operational Supervision',
    },
  },
  {
    id: 'service-offshore',
    slug: '/servicos/offshore-operations',
    code: '03',
    category: 'maritime',
    visualType: 'offshore',
    pt: {
      title: 'Offshore Operations',
      shortTitle: 'Offshore Operations',
      subtitle: 'Coordenação logística e apoio operacional dedicado aos sectores petrolífero e energético.',
      description:
        'A Multiflight Angola apoia operações offshore com soluções integradas de logística, mobilização de equipas e articulação entre meios aéreos e marítimos, respondendo com rigor às exigências da indústria de petróleo e gás.',
      operationalScopeTitle: 'Capacidades em Operações Offshore',
      items: [
        'Coordenação logística de operações offshore.',
        'Apoio à mobilização de equipas e recursos.',
        'Coordenação de operações de transporte.',
        'Apoio às operações de aviação associadas a instalações offshore.',
        'Coordenação de actividades marítimas.',
        'Acompanhamento operacional de missões.',
        'Apoio logístico a projectos de petróleo e gás.',
      ],
      highlights: [
        { label: 'Petróleo & Energia', value: 'Apoio logístico dedicado a projectos offshore' },
        { label: 'Integração Aérea-Marítima', value: 'Sincronização de helicópteros e embarcações' },
        { label: 'Mobilização Técnica', value: 'Gestão eficiente de equipas e recursos' },
      ],
      ctaText: 'Solicitar Apoio Offshore',
    },
    en: {
      title: 'Offshore Operations',
      shortTitle: 'Offshore Operations',
      subtitle: 'Logistics coordination and operational support tailored for the oil, gas, and energy sectors.',
      description:
        'Multiflight Angola supports offshore missions with integrated logistics, crew mobilization, and seamless synchronization between aviation and marine assets, meeting the rigorous demands of the oil and gas industry.',
      operationalScopeTitle: 'Offshore Operational Capabilities',
      items: [
        'Logistics coordination for offshore operations.',
        'Support for crew and resource mobilization.',
        'Transport operations coordination.',
        'Support for aviation operations linked to offshore installations.',
        'Coordination of maritime activities.',
        'Operational mission monitoring.',
        'Logistics support for oil and gas projects.',
      ],
      highlights: [
        { label: 'Oil & Energy Sector', value: 'Dedicated logistics for offshore projects' },
        { label: 'Air-Marine Sync', value: 'Coordination of helicopter & vessel movements' },
        { label: 'Technical Mobilization', value: 'Streamlined crew and resource dispatch' },
      ],
      ctaText: 'Request Offshore Support',
    },
  },
  {
    id: 'service-inshore',
    slug: '/servicos/inshore-operations',
    code: '04',
    category: 'maritime',
    visualType: 'inshore',
    pt: {
      title: 'Inshore Operations',
      shortTitle: 'Inshore Operations',
      subtitle: 'Coordenação e suporte operacional em águas interiores, zonas costeiras e áreas portuárias.',
      description:
        'Asseguramos o planeamento, acompanhamento e apoio logístico para operações inshore em zonas costeiras, terminais portuários e vias navegáveis interiores, garantindo eficiência na movimentação de embarcações e equipas.',
      operationalScopeTitle: 'Âmbito de Operações Inshore',
      items: [
        'Coordenação de operações inshore.',
        'Apoio logístico e operacional.',
        'Coordenação de actividades costeiras.',
        'Apoio às operações de embarcações.',
        'Coordenação de recursos e equipas.',
        'Acompanhamento de operações e movimentações.',
      ],
      highlights: [
        { label: 'Zonas Costeiras & Portos', value: 'Assistência contínua a operações junto à costa' },
        { label: 'Apoio a Embarcações', value: 'Coordenação de escalas e manobras locais' },
        { label: 'Controlo de Recursos', value: 'Alocação estruturada de equipas técnicas' },
      ],
      ctaText: 'Solicitar Coordenação Inshore',
    },
    en: {
      title: 'Inshore Operations',
      shortTitle: 'Inshore Operations',
      subtitle: 'Operational coordination and support in inland waters, coastal zones, and port areas.',
      description:
        'We provide planning, monitoring, and logistics support for inshore operations across coastal zones, port terminals, and inland waterways, ensuring safe and efficient vessel and crew movements.',
      operationalScopeTitle: 'Inshore Operational Scope',
      items: [
        'Coordination of inshore operations.',
        'Logistics and operational support.',
        'Coordination of coastal activities.',
        'Support for vessel operations.',
        'Resource and team coordination.',
        'Monitoring of operations and movements.',
      ],
      highlights: [
        { label: 'Coastal & Port Zones', value: 'Continuous near-shore operational support' },
        { label: 'Vessel Support', value: 'Coordination of local calls and maneuvers' },
        { label: 'Resource Control', value: 'Structured deployment of technical teams' },
      ],
      ctaText: 'Request Inshore Coordination',
    },
  },
  {
    id: 'service-maritime',
    slug: '/servicos/maritime-operations',
    code: '05',
    category: 'maritime',
    visualType: 'maritime',
    pt: {
      title: 'Maritime Operations',
      shortTitle: 'Maritime Operations',
      subtitle: 'Gestão integrada de operações marítimas, apoio logístico portuário e supervisão de embarcações.',
      description:
        'Prestamos suporte especializado a operações de transporte marítimo e actividades portuárias em Angola, articulando serviços, embarcações e equipas em estreita sinergia com missões offshore e inshore.',
      operationalScopeTitle: 'Serviços em Operações Marítimas',
      items: [
        'Coordenação de operações marítimas.',
        'Apoio logístico portuário.',
        'Coordenação de embarcações.',
        'Acompanhamento de operações de transporte marítimo.',
        'Apoio operacional a actividades offshore e inshore.',
        'Coordenação de serviços e recursos marítimos.',
        'Supervisão e acompanhamento de operações.',
      ],
      highlights: [
        { label: 'Logística Portuária', value: 'Assistência operacional em terminais marítimos' },
        { label: 'Frota & Embarcações', value: 'Acompanhamento de transporte e escalas' },
        { label: 'Supervisão Integrada', value: 'Rigor técnico em cada missão marítima' },
      ],
      ctaText: 'Solicitar Operações Marítimas',
    },
    en: {
      title: 'Maritime Operations',
      shortTitle: 'Maritime Operations',
      subtitle: 'Integrated maritime operations management, port logistics support, and vessel supervision.',
      description:
        'We deliver specialized support for maritime transport and port operations in Angola, coordinating vessels, marine resources, and technical crews in close synergy with offshore and inshore missions.',
      operationalScopeTitle: 'Maritime Operations Scope',
      items: [
        'Maritime operations coordination.',
        'Port logistics support.',
        'Vessel coordination.',
        'Maritime transport operations monitoring.',
        'Operational support for offshore and inshore activities.',
        'Coordination of maritime services and resources.',
        'Supervision and operational follow-up.',
      ],
      highlights: [
        { label: 'Port Logistics', value: 'Operational assistance at marine terminals' },
        { label: 'Fleet & Vessels', value: 'Transport and port call monitoring' },
        { label: 'Integrated Supervision', value: 'Technical rigor across every marine mission' },
      ],
      ctaText: 'Request Maritime Operations',
    },
  },
  {
    id: 'service-aviation',
    slug: '/servicos/aviation-services',
    code: '06',
    category: 'aviation',
    visualType: 'aviation',
    pt: {
      title: 'Aviation Services',
      shortTitle: 'Aviation Services',
      subtitle: 'Gestão de aeronaves, intermediação especializada, evacuação aeromédica e gestão de aeronavegabilidade.',
      description:
        'Com raízes consolidadas desde 2012 na aviação privada em Angola, a Multiflight Angola disponibiliza soluções completas para proprietários e operadores de jatos executivos e helicópteros, mediante confirmação de disponibilidade operacional.',
      operationalScopeTitle: 'Serviços Especializados de Aviação',
      items: [
        'Gestão de aeronaves.',
        'Gestão de jatos executivos.',
        'Gestão de helicópteros.',
        'Venda e intermediação de aeronaves.',
        'Helicópteros à venda.',
        'Inspecção pré-compra.',
        'Serviços de ambulância aérea.',
        'Continuing Airworthiness Management Organisation (CAMO).',
      ],
      highlights: [
        { label: 'Frota Executiva & Asa Rotativa', value: 'Gestão dedicada de jatos e helicópteros' },
        { label: 'Consultoria Técnica', value: 'Inspecção pré-compra e intermediação' },
        { label: 'Aeronavegabilidade & CAMO', value: 'Gestão contínua e missões aeromédicas' },
      ],
      ctaText: 'Consultar Disponibilidade de Aviação',
    },
    en: {
      title: 'Aviation Services',
      shortTitle: 'Aviation Services',
      subtitle: 'Aircraft management, specialized brokerage, air ambulance, and continuing airworthiness management.',
      description:
        'Building on our heritage established in 2012 as a private aviation center in Angola, Multiflight Angola delivers comprehensive solutions for executive jet and helicopter owners and operators, subject to operational availability confirmation.',
      operationalScopeTitle: 'Specialized Aviation Services',
      items: [
        'Aircraft management.',
        'Executive jet management.',
        'Helicopter management.',
        'Aircraft sales and brokerage.',
        'Helicopters for sale.',
        'Pre-purchase inspection.',
        'Air ambulance services.',
        'Continuing Airworthiness Management Organisation (CAMO).',
      ],
      highlights: [
        { label: 'Executive & Rotary Fleet', value: 'Dedicated jet and helicopter management' },
        { label: 'Technical Advisory', value: 'Pre-purchase inspection & brokerage' },
        { label: 'Airworthiness & CAMO', value: 'Continuing airworthiness & air ambulance' },
      ],
      ctaText: 'Inquire About Aviation Services',
    },
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    categoryKey: 'executive-aviation',
    visualScene: 'executive-jet-apron',
    pt: {
      title: 'Operações de Aviação Executiva em Escala',
      categoryLabel: 'Aviação executiva',
      location: 'Luanda, Angola',
      description: 'Posicionamento e assistência de placa a aeronaves executivas de longo curso com acompanhamento dedicado.',
    },
    en: {
      title: 'Executive Aviation Turnaround Operations',
      categoryLabel: 'Executive Aviation',
      location: 'Luanda, Angola',
      description: 'Apron positioning and ground servicing for long-range business jets with dedicated operational escort.',
    },
  },
  {
    id: 'gal-02',
    categoryKey: 'aircraft-helicopters',
    visualScene: 'rotary-wing-fleet',
    pt: {
      title: 'Frota de Helicópteros e Aeronaves Corporativas',
      categoryLabel: 'Aeronaves e helicópteros',
      location: 'Operações Angola',
      description: 'Coordenação técnica de helicópteros bimotores e aeronaves executivas para missões corporativas e energéticas.',
    },
    en: {
      title: 'Corporate Aircraft & Twin-Engine Helicopter Fleet',
      categoryLabel: 'Aircraft & Helicopters',
      location: 'Angola Operations',
      description: 'Technical coordination of twin-engine helicopters and business aircraft for corporate and energy missions.',
    },
  },
  {
    id: 'gal-03',
    categoryKey: 'airport-operations',
    visualScene: 'airport-dispatch-control',
    pt: {
      title: 'Coordenação de Operações Aeroportuárias',
      categoryLabel: 'Operações aeroportuárias',
      location: 'Terminal Executivo',
      description: 'Planeamento de chegadas, partidas e articulação directa com entidades aeroportuárias em tempo real.',
    },
    en: {
      title: 'Airport Operations & Dispatch Coordination',
      categoryLabel: 'Airport Operations',
      location: 'Executive Terminal',
      description: 'Arrival and departure flight planning and real-time liaison with airport authorities.',
    },
  },
  {
    id: 'gal-04',
    categoryKey: 'ground-handling',
    visualScene: 'ramp-handling-supervision',
    pt: {
      title: 'Assistência de Rampa e Supervisão Ground Handling',
      categoryLabel: 'Ground Handling',
      location: 'Placa Aeroportuária',
      description: 'Supervisão rigorosa de equipamentos de apoio no solo (GSE), embarque de passageiros e movimentação de bagagens.',
    },
    en: {
      title: 'Ramp Assistance & Ground Handling Supervision',
      categoryLabel: 'Ground Handling',
      location: 'Airport Apron',
      description: 'Rigorous oversight of ground support equipment (GSE), passenger boarding, and baggage handling.',
    },
  },
  {
    id: 'gal-05',
    categoryKey: 'offshore-operations',
    visualScene: 'offshore-platform-heli',
    pt: {
      title: 'Logística Integrada e Apoio a Instalações Offshore',
      categoryLabel: 'Operações offshore',
      location: 'Bacia Marítima de Angola',
      description: 'Coordenação de mobilização de equipas e suporte às operações de aviação e embarcações associadas a unidades offshore.',
    },
    en: {
      title: 'Integrated Logistics & Offshore Installation Support',
      categoryLabel: 'Offshore Operations',
      location: 'Angola Offshore Basin',
      description: 'Crew mobilization coordination and operational support for aviation and vessels serving offshore units.',
    },
  },
  {
    id: 'gal-06',
    categoryKey: 'inshore-operations',
    visualScene: 'inshore-coastal-terminal',
    pt: {
      title: 'Operações Costeiras e Apoio Logístico Inshore',
      categoryLabel: 'Operações inshore',
      location: 'Zona Costeira e Portuária',
      description: 'Acompanhamento de movimentações em águas interiores, canais de acesso e terminais de apoio costeiro.',
    },
    en: {
      title: 'Coastal Operations & Inshore Logistics Support',
      categoryLabel: 'Inshore Operations',
      location: 'Coastal & Port Zone',
      description: 'Monitoring of vessel movements across inland waters, access channels, and coastal support terminals.',
    },
  },
  {
    id: 'gal-07',
    categoryKey: 'maritime-operations',
    visualScene: 'maritime-supply-vessel',
    pt: {
      title: 'Coordenação de Embarcações e Transporte Marítimo',
      categoryLabel: 'Operações marítimas',
      location: 'Terminais Portuários de Angola',
      description: 'Supervisão de navios de apoio, logística portuária e sincronização de recursos marítimos.',
    },
    en: {
      title: 'Vessel Coordination & Maritime Transport Supervision',
      categoryLabel: 'Maritime Operations',
      location: 'Angola Port Terminals',
      description: 'Supervision of support vessels, port logistics, and synchronization of marine resources.',
    },
  },
  {
    id: 'gal-08',
    categoryKey: 'infrastructure',
    visualScene: 'corporate-hangar-facility',
    pt: {
      title: 'Infraestruturas de Apoio e Coordenação Operacional',
      categoryLabel: 'Infraestruturas e instalações',
      location: 'Luanda, Mártires de Kifangondo',
      description: 'Instalações preparadas para gestão técnica, planeamento operacional e atendimento executivo.',
    },
    en: {
      title: 'Operational Coordination & Support Infrastructure',
      categoryLabel: 'Infrastructure & Facilities',
      location: 'Luanda, Mártires de Kifangondo',
      description: 'Facilities equipped for technical management, operational dispatch planning, and executive client care.',
    },
  },
];

export const TRANSLATIONS = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Quem Somos',
      services: 'Serviços',
      safety: 'Segurança e Qualidade',
      gallery: 'Galeria',
      contact: 'Contactos',
      requestProposal: 'SOLICITAR PROPOSTA',
      partnerPortal: 'Portal do Cliente',
      allServices: 'Ver Todos os Serviços',
    },
    hero: {
      badge: 'MULTIFLIGHT ANGOLA',
      title: 'Connecting Aviation, Offshore and Maritime Operations.',
      subtitle:
        'Soluções especializadas em aviação, assistência aeroportuária, Ground Handling e operações offshore, inshore e marítimas.',
      tagline: 'A excelência operacional começa com a escolha do parceiro certo.',
      ctaServices: 'CONHEÇA OS NOSSOS SERVIÇOS',
      ctaProposal: 'SOLICITE UMA PROPOSTA',
    },
    dispatchBar: {
      tabs: {
        ground: 'Ground Handling',
        supervision: 'Supervisão',
        offshore: 'Offshore',
        maritime: 'Inshore & Marítimo',
        aviation: 'Aviação Executiva',
      },
      baseLabel: 'Base / Local de Operação',
      scopeLabel: 'Âmbito do Serviço',
      dateLabel: 'Data Prevista',
      categoryLabel: 'Tipo de Missão',
      actionBtn: 'Iniciar Solicitação',
      modes: {
        scheduled: 'Operação Programada',
        urgent: 'Escala Prioritária',
        continuous: 'Contrato Contínuo',
      },
    },
    indicators: [
      {
        label: 'Tradição e Experiência',
        value: 'Desde 2012',
        detail: 'Centro de referência na aviação privada e assistência operacional em Angola.',
      },
      {
        label: 'Actuação Integrada',
        value: '6 Divisões',
        detail: 'Ground Handling, Supervisão, Offshore, Inshore, Operações Marítimas e Aviação.',
      },
      {
        label: 'Cultura Operacional',
        value: 'Rigor & Segurança',
        detail: 'Cumprimento estrito de procedimentos operacionais e gestão preventiva de riscos.',
      },
      {
        label: 'Sede Corporativa',
        value: 'Luanda, Angola',
        detail: 'Atendimento personalizado de segunda a sexta-feira, das 08h00 às 18h00.',
      },
    ],
    homeSections: {
      introKicker: 'Apresentação Institucional',
      introTitle: 'Infraestruturas de Primeira Classe e Capacidade Técnica Multissetorial',
      introP1:
        'A Multiflight Angola abriu as suas portas em 2012 como um centro de aviação em Angola. Desde então, tem vindo a consolidar a sua reputação como uma referência na prestação de serviços e disponibilização de infraestruturas de primeira classe no sector da aviação privada.',
      introP2:
        'Destacamo-nos num sector exigente e dinâmico, contando com profissionais altamente qualificados, instalações de excelência e uma ampla gama de serviços de qualidade, concebidos para superar as expectativas dos nossos clientes.',
      introP3:
        'Actualmente, a Multiflight Angola reforça a sua capacidade de prestação de serviços, alargando a sua actuação aos segmentos de Ground Handling, Ground Handling Supervision e operações Offshore, Inshore e Marítimas.',
      introP4:
        'A nossa prioridade é proporcionar soluções eficientes, seguras e personalizadas, respondendo às exigências de um mercado cada vez mais dinâmico e especializado.',
      servicesKicker: 'Áreas de Actividade',
      servicesTitle: 'Soluções Operacionais Integradas',
      servicesSubtitle:
        'Da assistência aeroportuária em placa à coordenação logística offshore e marítima, asseguramos rigor técnico em cada operação.',
      offshoreKicker: 'Expansão Estratégica',
      offshoreTitle: 'Operações Offshore, Inshore e Marítimas',
      offshoreDesc:
        'Respondemos às exigências dos sectores petrolífero, energético e portuário com coordenação logística integrada entre operações aéreas, zonas costeiras e transporte marítimo.',
      safetyKicker: 'Compromisso Inegociável',
      safetyTitle: 'Segurança Operacional e Excelência na Execução',
      safetyDesc:
        'Cada missão é conduzida por profissionais qualificados, sob rigorosos procedimentos de controlo operacional, prevenção de riscos e melhoria contínua.',
      ctaBannerTitle: 'Prepare a Sua Próxima Operação com a Multiflight Angola',
      ctaBannerSubtitle:
        'Solicite uma proposta comercial personalizada para serviços de Ground Handling, supervisão aeroportuária, aviação privada ou operações offshore e marítimas.',
    },
    about: {
      kicker: 'Quem Somos',
      title: 'Mais de uma Década de Excelência na Aviação e Operações em Angola',
      subtitle:
        'Fundada em 2012 em Luanda, a Multiflight Angola combina experiência comprovada na aviação executiva com capacidade operacional alargada para os sectores aeroportuário, offshore, inshore e marítimo.',
      historyTitle: 'A Nossa História e Evolução',
      timeline: [
        {
          year: '2012',
          title: 'Fundação e Início de Actividade',
          text: 'A Multiflight Angola abre as suas portas em Luanda como um centro especializado de aviação, focado em disponibilizar infraestruturas e suporte de primeira classe à aviação privada.',
        },
        {
          year: 'Consolidação',
          title: 'Referência na Aviação Privada e Executiva',
          text: 'Desenvolvimento contínuo de competências na gestão de aeronaves, jatos executivos, helicópteros, inspecções técnicas e apoio especializado a operadores exigentes.',
        },
        {
          year: 'Expansão Aeroportuária',
          title: 'Ground Handling Services & Supervision',
          text: 'Reforço da estrutura operacional em terra com serviços dedicados de assistência em escala, coordenação de rampa, apoio a tripulações e supervisão rigorosa de procedimentos.',
        },
        {
          year: 'Actualidade',
          title: 'Integração Offshore, Inshore e Marítima',
          text: 'Alargamento estratégico às operações offshore, costeiras e marítimas, oferecendo ao sector energético, petrolífero e logístico um parceiro único de coordenação aérea e marítima.',
        },
      ],
      pillars: [
        {
          title: 'Equipa e Qualificação Profissional',
          text: 'Contamos com quadros técnicos e operacionais altamente qualificados, com profundo conhecimento das normas aeroportuárias, aviação executiva e logística marítima em Angola.',
        },
        {
          title: 'Instalações e Infraestruturas',
          text: 'Operamos a partir de Luanda (Mártires de Kifangondo, Rua 16) com infraestruturas preparadas para coordenação de voos, planeamento de missões e suporte dedicado a clientes corporativos.',
        },
        {
          title: 'Compromisso com Segurança e Qualidade',
          text: 'A segurança operacional constitui o alicerce de todas as nossas decisões, garantindo conformidade procedimental, transparência e fiabilidade em cada serviço prestado.',
        },
      ],
      missionLabel: 'Missão',
      missionText:
        'Disponibilizar soluções especializadas nos sectores da aviação e operações marítimas, assegurando qualidade, segurança, eficiência e excelência no atendimento.',
      visionLabel: 'Visão',
      visionText:
        'Consolidar a Multiflight Angola como uma referência nacional e regional na prestação de serviços integrados de aviação, assistência aeroportuária e operações marítimas.',
      valuesLabel: 'Os Nossos Valores',
      values: [
        { name: 'Segurança', desc: 'Prioridade absoluta na protecção de vidas, activos e operações.' },
        { name: 'Integridade', desc: 'Actuação ética, transparente e rigorosa em todas as relações.' },
        { name: 'Profissionalismo', desc: 'Competência técnica, disciplina e postura de padrão internacional.' },
        { name: 'Excelência', desc: 'Superação consistente das expectativas dos nossos clientes.' },
        { name: 'Responsabilidade', desc: 'Cumprimento rigoroso de compromissos e normas do sector.' },
        { name: 'Eficiência', desc: 'Optimização de tempos de resposta, recursos e coordenação.' },
        { name: 'Compromisso com o cliente', desc: 'Soluções personalizadas para cada necessidade operacional.' },
      ],
    },
    safety: {
      kicker: 'Segurança e Qualidade',
      title: 'Cultura de Segurança, Rigor Procedimental e Eficiência Operacional',
      subtitle:
        'Na Multiflight Angola, a segurança e a qualidade não são apenas requisitos regulamentares — constituem o princípio orientador de cada operação aérea, terrestre e marítima.',
      pillars: [
        {
          code: '01',
          title: 'Segurança como Prioridade',
          description:
            'Nenhuma urgência comercial ou operacional se sobrepõe à segurança. Todas as actividades de assistência em terra, aviação e coordenação marítima seguem protocolos preventivos estritos.',
        },
        {
          code: '02',
          title: 'Cumprimento de Procedimentos Operacionais',
          description:
            'Execução padronizada e verificável de listas de verificação (checklists), manuais de operações e instruções técnicas aplicáveis a cada tipologia de aeronave ou embarcação.',
        },
        {
          code: '03',
          title: 'Qualificação dos Profissionais',
          description:
            'Selecção criteriosa e actualização técnica permanente das equipas de Ground Handling, supervisores de placa, coordenadores logísticos e especialistas de aviação.',
        },
        {
          code: '04',
          title: 'Gestão de Riscos Operacionais',
          description:
            'Identificação antecipada de perigos, avaliação sistemática de fatores operacionais e implementação imediata de medidas de controlo e mitigação.',
        },
        {
          code: '05',
          title: 'Melhoria Contínua',
          description:
            'Avaliação regular do desempenho operacional, análise de relatórios de supervisão e aperfeiçoamento constante dos processos de atendimento e coordenação.',
        },
        {
          code: '06',
          title: 'Responsabilidade e Rigor',
          description:
            'Rastreabilidade documental completa, comunicação transparente de qualquer irregularidade e responsabilização directa em todas as fases da missão.',
        },
        {
          code: '07',
          title: 'Compromisso com os Requisitos do Sector',
          description:
            'Alinhamento permanente com as normas e directrizes emanadas pelas autoridades aeronáuticas, portuárias e marítimas aplicáveis à nossa actividade.',
        },
      ],
      complianceNoteTitle: 'Transparência e Rigor Institucional',
      complianceNoteText:
        'A Multiflight Angola pauta a sua actuação pela verdade técnica e conformidade operacional, trabalhando em estreita articulação com as entidades reguladoras e operadores certificados dos sectores da aviação e marítimo.',
    },
    gallery: {
      kicker: 'Galeria Institucional',
      title: 'Operações, Frota e Infraestruturas em Destaque',
      subtitle:
        'Explore as áreas de actuação da Multiflight Angola através das nossas categorias operacionais de aviação executiva, Ground Handling e operações offshore, inshore e marítimas.',
      filterAll: 'Todas as Categorias',
      categories: {
        'executive-aviation': 'Aviação executiva',
        'aircraft-helicopters': 'Aeronaves e helicópteros',
        'airport-operations': 'Operações aeroportuárias',
        'ground-handling': 'Ground Handling',
        'offshore-operations': 'Operações offshore',
        'inshore-operations': 'Operações inshore',
        'maritime-operations': 'Operações marítimas',
        infrastructure: 'Infraestruturas e instalações',
      },
    },
    contact: {
      kicker: 'Contactos & Propostas',
      title: 'Fale com a Nossa Equipa Operacional e Comercial',
      subtitle:
        'Estamos disponíveis para analisar as suas necessidades e apresentar propostas personalizadas para operações de aviação, Ground Handling, Offshore, Inshore e Marítimas.',
      directActions: {
        call: 'Efectuar Chamada Telefónica',
        email: 'Enviar Email Directo',
        whatsapp: 'Contactar via WhatsApp',
      },
      infoLabels: {
        company: 'Entidade Corporativa',
        nif: 'NIF',
        phone: 'Telefone Oficial',
        email: 'Email Corporativo',
        address: 'Endereço Sede',
        hours: 'Horário de Funcionamento',
      },
      formTitle: 'Formulário de Solicitação de Informações e Propostas Comerciais',
      formSubtitle:
        'Preencha os dados abaixo. A sua solicitação será validada e encaminhada directamente para geral@multiflightangola.com.',
      fields: {
        fullName: 'Nome completo',
        fullNamePlaceholder: 'Ex.: Eng. João Silva',
        company: 'Empresa',
        companyPlaceholder: 'Nome da empresa ou organização',
        email: 'Email profissional',
        emailPlaceholder: 'nome@empresa.com',
        phone: 'Número de telefone',
        phonePlaceholder: '+244 9XX XXX XXX',
        country: 'País',
        countryPlaceholder: 'Ex.: Angola',
        service: 'Serviço pretendido',
        serviceSelectPrompt: 'Seleccione o serviço pretendido',
        subject: 'Assunto',
        subjectPlaceholder: 'Ex.: Solicitação de Ground Handling em Luanda',
        description: 'Descrição da solicitação',
        descriptionPlaceholder:
          'Descreva os detalhes da operação (tipo de aeronave/embarcação, datas previstas, local, necessidades específicas)...',
        submitBtn: 'ENVIAR SOLICITAÇÃO DE PROPOSTA',
        submittingBtn: 'A ENVIAR SOLICITAÇÃO...',
      },
    },
    footer: {
      tagline: 'Aviation | Ground Handling | Offshore | Inshore | Maritime Operations.',
      quickLinks: 'Links Rápidos',
      servicesLinks: 'Os Nossos Serviços',
      contactInfo: 'Contactos Oficiais',
      privacyLink: 'Política de Privacidade',
      rights: '© Multiflight Angola. Todos os direitos reservados.',
    },
    cookies: {
      title: 'Privacidade e Consentimento de Cookies',
      text: 'Utilizamos cookies essenciais para guardar a sua preferência de idioma, tema visual e garantir a segurança das submissões neste website institucional.',
      accept: 'Aceitar Cookies',
      essentialOnly: 'Apenas Essenciais',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      safety: 'Safety & Quality',
      gallery: 'Gallery',
      contact: 'Contact',
      requestProposal: 'REQUEST PROPOSAL',
      partnerPortal: 'Client Portal',
      allServices: 'View All Services',
    },
    hero: {
      badge: 'MULTIFLIGHT ANGOLA',
      title: 'Connecting Aviation, Offshore and Maritime Operations.',
      subtitle:
        'Specialized solutions in private aviation, airport assistance, Ground Handling, and offshore, inshore, and maritime operations.',
      tagline: 'Operational excellence begins with choosing the right partner.',
      ctaServices: 'EXPLORE OUR SERVICES',
      ctaProposal: 'REQUEST A PROPOSAL',
    },
    dispatchBar: {
      tabs: {
        ground: 'Ground Handling',
        supervision: 'Supervision',
        offshore: 'Offshore',
        maritime: 'Inshore & Maritime',
        aviation: 'Aviation Services',
      },
      baseLabel: 'Base / Operating Location',
      scopeLabel: 'Service Scope',
      dateLabel: 'Target Date',
      categoryLabel: 'Mission Profile',
      actionBtn: 'Start Request',
      modes: {
        scheduled: 'Scheduled Operation',
        urgent: 'Priority Turnaround',
        continuous: 'Long-Term Contract',
      },
    },
    indicators: [
      {
        label: 'Heritage & Experience',
        value: 'Since 2012',
        detail: 'Established benchmark in private aviation and operational support in Angola.',
      },
      {
        label: 'Integrated Scope',
        value: '6 Divisions',
        detail: 'Ground Handling, Supervision, Offshore, Inshore, Maritime Operations, and Aviation.',
      },
      {
        label: 'Operational Culture',
        value: 'Safety & Rigor',
        detail: 'Strict compliance with operational procedures and proactive risk management.',
      },
      {
        label: 'Corporate Headquarters',
        value: 'Luanda, Angola',
        detail: 'Dedicated assistance Monday through Friday, from 08:00 AM to 06:00 PM.',
      },
    ],
    homeSections: {
      introKicker: 'Corporate Overview',
      introTitle: 'First-Class Infrastructure and Multi-Sector Technical Capability',
      introP1:
        'Multiflight Angola opened its doors in 2012 as an aviation center in Angola. Since then, it has consolidated its reputation as a benchmark in delivering first-class services and infrastructure within the private aviation sector.',
      introP2:
        'We stand out in a demanding and dynamic industry, relying on highly qualified professionals, premier facilities, and a comprehensive portfolio of quality services designed to exceed client expectations.',
      introP3:
        'Today, Multiflight Angola strengthens its service capability by expanding its operations into Ground Handling, Ground Handling Supervision, and Offshore, Inshore, and Maritime operations.',
      introP4:
        'Our priority is to deliver efficient, safe, and tailored solutions that meet the demands of an increasingly dynamic and specialized market.',
      servicesKicker: 'Core Divisions',
      servicesTitle: 'Integrated Operational Solutions',
      servicesSubtitle:
        'From apron ground handling to offshore and maritime logistics coordination, we ensure technical precision across every mission.',
      offshoreKicker: 'Strategic Expansion',
      offshoreTitle: 'Offshore, Inshore and Maritime Operations',
      offshoreDesc:
        'We meet the demands of the oil, gas, energy, and port sectors with integrated logistics coordination across aviation assets, coastal zones, and maritime transport.',
      safetyKicker: 'Uncompromising Commitment',
      safetyTitle: 'Operational Safety and Execution Excellence',
      safetyDesc:
        'Every mission is led by qualified professionals under strict operational control procedures, proactive risk prevention, and continuous improvement.',
      ctaBannerTitle: 'Plan Your Next Operation with Multiflight Angola',
      ctaBannerSubtitle:
        'Request a tailored commercial proposal for Ground Handling services, airport supervision, private aviation, or offshore and maritime operations.',
    },
    about: {
      kicker: 'About Us',
      title: 'Over a Decade of Excellence in Aviation and Maritime Operations in Angola',
      subtitle:
        'Founded in 2012 in Luanda, Multiflight Angola combines proven executive aviation expertise with expanded operational capability across the airport, offshore, inshore, and maritime sectors.',
      historyTitle: 'Our History and Evolution',
      timeline: [
        {
          year: '2012',
          title: 'Foundation and Commencement of Operations',
          text: 'Multiflight Angola opens its doors in Luanda as a specialized aviation center focused on providing first-class infrastructure and support for private aviation.',
        },
        {
          year: 'Consolidation',
          title: 'Benchmark in Private and Executive Aviation',
          text: 'Continuous capability growth in aircraft management, executive jets, helicopters, technical inspections, and specialized support for demanding operators.',
        },
        {
          year: 'Airport Expansion',
          title: 'Ground Handling Services & Supervision',
          text: 'Strengthening of our ground operational structure with dedicated turnaround assistance, ramp coordination, crew support, and rigorous procedural supervision.',
        },
        {
          year: 'Present Day',
          title: 'Offshore, Inshore and Maritime Integration',
          text: 'Strategic expansion into offshore, coastal, and maritime operations, offering the energy, oil & gas, and logistics sectors a single partner for air and marine coordination.',
        },
      ],
      pillars: [
        {
          title: 'Team and Professional Qualification',
          text: 'We rely on highly qualified technical and operational staff with deep expertise in airport regulations, executive aviation, and maritime logistics in Angola.',
        },
        {
          title: 'Facilities and Infrastructure',
          text: 'Operating from Luanda (Mártires de Kifangondo, Street 16) with infrastructure designed for flight coordination, mission planning, and dedicated corporate support.',
        },
        {
          title: 'Commitment to Safety and Quality',
          text: 'Operational safety is the cornerstone of every decision we make, ensuring procedural compliance, transparency, and reliability in every service delivered.',
        },
      ],
      missionLabel: 'Mission',
      missionText:
        'To provide specialized solutions in the aviation and maritime operations sectors, ensuring quality, safety, efficiency, and service excellence.',
      visionLabel: 'Vision',
      visionText:
        'To consolidate Multiflight Angola as a national and regional benchmark in delivering integrated aviation, airport assistance, and maritime operations services.',
      valuesLabel: 'Our Core Values',
      values: [
        { name: 'Safety', desc: 'Absolute priority in protecting lives, assets, and operations.' },
        { name: 'Integrity', desc: 'Ethical, transparent, and rigorous conduct across all relationships.' },
        { name: 'Professionalism', desc: 'Technical competence, discipline, and international-standard execution.' },
        { name: 'Excellence', desc: 'Consistently exceeding our clients’ operational expectations.' },
        { name: 'Responsibility', desc: 'Strict adherence to commitments and industry regulations.' },
        { name: 'Efficiency', desc: 'Optimized response times, resource allocation, and coordination.' },
        { name: 'Client Commitment', desc: 'Tailored solutions engineered for each specific operational requirement.' },
      ],
    },
    safety: {
      kicker: 'Safety & Quality',
      title: 'Safety Culture, Procedural Rigor, and Operational Efficiency',
      subtitle:
        'At Multiflight Angola, safety and quality are not merely regulatory requirements—they are the guiding principle behind every air, ground, and maritime operation.',
      pillars: [
        {
          code: '01',
          title: 'Safety as Top Priority',
          description:
            'No commercial or operational urgency ever overrides safety. All ground handling, aviation, and maritime coordination activities follow strict preventive protocols.',
        },
        {
          code: '02',
          title: 'Compliance with Operational Procedures',
          description:
            'Standardized, verifiable execution of checklists, operations manuals, and technical directives applicable to every aircraft or vessel category.',
        },
        {
          code: '03',
          title: 'Professional Qualification',
          description:
            'Rigorous selection and continuous technical training for Ground Handling teams, apron supervisors, logistics coordinators, and aviation specialists.',
        },
        {
          code: '04',
          title: 'Operational Risk Management',
          description:
            'Proactive hazard identification, systematic assessment of operational factors, and immediate implementation of control and mitigation measures.',
        },
        {
          code: '05',
          title: 'Continuous Improvement',
          description:
            'Regular evaluation of operational performance, analysis of supervision reports, and constant refinement of service and coordination processes.',
        },
        {
          code: '06',
          title: 'Responsibility and Rigor',
          description:
            'Complete documentary traceability, transparent reporting of any irregularity, and direct accountability at every stage of the mission.',
        },
        {
          code: '07',
          title: 'Commitment to Sector Requirements',
          description:
            'Continuous alignment with the standards and directives issued by aviation, port, and maritime authorities governing our scope of activity.',
        },
      ],
      complianceNoteTitle: 'Institutional Transparency and Technical Rigor',
      complianceNoteText:
        'Multiflight Angola conducts its operations with technical accuracy and operational compliance, working closely with regulatory bodies and certified operators across the aviation and maritime sectors.',
    },
    gallery: {
      kicker: 'Corporate Gallery',
      title: 'Operations, Fleet, and Infrastructure Spotlight',
      subtitle:
        'Explore Multiflight Angola’s operational footprint across executive aviation, Ground Handling, and offshore, inshore, and maritime operations.',
      filterAll: 'All Categories',
      categories: {
        'executive-aviation': 'Executive Aviation',
        'aircraft-helicopters': 'Aircraft & Helicopters',
        'airport-operations': 'Airport Operations',
        'ground-handling': 'Ground Handling',
        'offshore-operations': 'Offshore Operations',
        'inshore-operations': 'Inshore Operations',
        'maritime-operations': 'Maritime Operations',
        infrastructure: 'Infrastructure & Facilities',
      },
    },
    contact: {
      kicker: 'Contact & Proposals',
      title: 'Connect with Our Operational and Commercial Team',
      subtitle:
        'We are ready to review your operational requirements and prepare tailored proposals for aviation, Ground Handling, Offshore, Inshore, and Maritime services.',
      directActions: {
        call: 'Place Phone Call',
        email: 'Send Direct Email',
        whatsapp: 'Contact via WhatsApp',
      },
      infoLabels: {
        company: 'Corporate Entity',
        nif: 'Tax ID (NIF)',
        phone: 'Official Phone',
        email: 'Corporate Email',
        address: 'Headquarters Address',
        hours: 'Operating Hours',
      },
      formTitle: 'Information & Commercial Proposal Request Form',
      formSubtitle:
        'Complete the fields below. Your request will be validated and routed directly to geral@multiflightangola.com.',
      fields: {
        fullName: 'Full name',
        fullNamePlaceholder: 'e.g., John Silva',
        company: 'Company',
        companyPlaceholder: 'Company or organization name',
        email: 'Corporate email',
        emailPlaceholder: 'name@company.com',
        phone: 'Phone number',
        phonePlaceholder: '+244 9XX XXX XXX',
        country: 'Country',
        countryPlaceholder: 'e.g., Angola',
        service: 'Requested service',
        serviceSelectPrompt: 'Select the requested service',
        subject: 'Subject',
        subjectPlaceholder: 'e.g., Ground Handling Request in Luanda',
        description: 'Request description',
        descriptionPlaceholder:
          'Describe your operation details (aircraft/vessel type, target dates, location, specific requirements)...',
        submitBtn: 'SUBMIT PROPOSAL REQUEST',
        submittingBtn: 'SUBMITTING REQUEST...',
      },
    },
    footer: {
      tagline: 'Aviation | Ground Handling | Offshore | Inshore | Maritime Operations.',
      quickLinks: 'Quick Links',
      servicesLinks: 'Our Services',
      contactInfo: 'Official Contacts',
      privacyLink: 'Privacy Policy',
      rights: '© Multiflight Angola. All rights reserved.',
    },
    cookies: {
      title: 'Privacy & Cookie Consent',
      text: 'We use essential cookies to store your language preference, visual theme, and ensure security for form submissions on this institutional website.',
      accept: 'Accept Cookies',
      essentialOnly: 'Essential Only',
    },
  },
};
