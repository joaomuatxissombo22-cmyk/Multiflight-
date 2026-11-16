import { useEffect } from 'react';
import { Language, PageRoute, SERVICES_DATA } from '../data/content.ts';

const PAGE_SEO: Record<
  PageRoute,
  {
    path: string;
    pt: { title: string; description: string };
    en: { title: string; description: string };
  }
> = {
  home: {
    path: '/',
    pt: {
      title: 'Multiflight Angola — Aviation, Ground Handling, Offshore & Maritime Operations',
      description:
        'Soluções especializadas em aviação privada, assistência aeroportuária, Ground Handling, supervisão e operações offshore, inshore e marítimas em Luanda, Angola.',
    },
    en: {
      title: 'Multiflight Angola — Connecting Aviation, Offshore and Maritime Operations',
      description:
        'Specialized solutions in private aviation, airport assistance, Ground Handling, supervision, and offshore, inshore, and maritime operations in Angola.',
    },
  },
  about: {
    path: '/quem-somos',
    pt: {
      title: 'Quem Somos — Multiflight Angola | Aviação e Operações Marítimas desde 2012',
      description:
        'Conheça a história, missão, visão e valores da Multiflight Angola. Desde 2012 como referência na aviação privada, Ground Handling e operações offshore e marítimas.',
    },
    en: {
      title: 'About Us — Multiflight Angola | Aviation & Maritime Operations Since 2012',
      description:
        'Discover Multiflight Angola’s history, mission, vision, and values. Operating since 2012 in private aviation, Ground Handling, and offshore and maritime services.',
    },
  },
  services: {
    path: '/servicos',
    pt: {
      title: 'Serviços — Ground Handling, Offshore, Inshore, Marítimo e Aviação | Multiflight Angola',
      description:
        'Portefólio completo da Multiflight Angola: Ground Handling Services, Supervision, Offshore Operations, Inshore Operations, Maritime Operations e Serviços de Aviação.',
    },
    en: {
      title: 'Services — Ground Handling, Offshore, Inshore, Maritime & Aviation | Multiflight Angola',
      description:
        'Explore Multiflight Angola’s operational divisions: Ground Handling Services, Supervision, Offshore, Inshore, Maritime Operations, and Private Aviation Services.',
    },
  },
  'service-ground-handling': {
    path: '/servicos/ground-handling',
    pt: {
      title: 'Ground Handling Services Angola — Assistência Aeroportuária | Multiflight Angola',
      description:
        'Assistência e coordenação em terra às aeronaves em escala, passageiros, bagagens, rampa e apoio operacional às tripulações em Angola.',
    },
    en: {
      title: 'Ground Handling Services Angola — Turnaround & Ramp Support | Multiflight Angola',
      description:
        'Comprehensive aircraft ground assistance, ramp coordination, passenger and baggage handling, and flight crew support across Angola.',
    },
  },
  'service-ground-handling-supervision': {
    path: '/servicos/ground-handling-supervision',
    pt: {
      title: 'Ground Handling Supervision — Supervisão de Operações em Terra | Multiflight Angola',
      description:
        'Supervisão técnica de Ground Handling, controlo de execução de procedimentos, monitorização de qualidade e relatórios operacionais em Angola.',
    },
    en: {
      title: 'Ground Handling Supervision — Airport Operations Oversight | Multiflight Angola',
      description:
        'Technical Ground Handling supervision, procedural execution control, service quality monitoring, and operational reporting in Angola.',
    },
  },
  'service-offshore': {
    path: '/servicos/offshore-operations',
    pt: {
      title: 'Offshore Operations Angola — Logística para Petróleo e Gás | Multiflight Angola',
      description:
        'Coordenação logística de operações offshore, mobilização de equipas e recursos, e apoio às operações aéreas e marítimas associadas a instalações offshore.',
    },
    en: {
      title: 'Offshore Operations Angola — Oil, Gas & Energy Logistics | Multiflight Angola',
      description:
        'Logistics coordination for offshore operations, crew mobilization, and support for aviation and marine operations serving offshore installations.',
    },
  },
  'service-inshore': {
    path: '/servicos/inshore-operations',
    pt: {
      title: 'Inshore Operations Angola — Operações Costeiras e Portuárias | Multiflight Angola',
      description:
        'Coordenação de operações inshore, apoio logístico em águas interiores, zonas costeiras, terminais portuários e movimentação de embarcações.',
    },
    en: {
      title: 'Inshore Operations Angola — Coastal & Port Support | Multiflight Angola',
      description:
        'Inshore operations coordination, logistics support across inland waters, coastal zones, port areas, and vessel operations in Angola.',
    },
  },
  'service-maritime': {
    path: '/servicos/maritime-operations',
    pt: {
      title: 'Maritime Operations Angola — Apoio Logístico Portuário e Marítimo | Multiflight Angola',
      description:
        'Coordenação de operações marítimas, apoio logístico portuário, supervisão de embarcações e acompanhamento de transporte marítimo em Angola.',
    },
    en: {
      title: 'Maritime Operations Angola — Port Logistics & Vessel Coordination | Multiflight Angola',
      description:
        'Maritime operations coordination, port logistics support, vessel supervision, and marine transport monitoring in Angola.',
    },
  },
  'service-aviation': {
    path: '/servicos/aviation-services',
    pt: {
      title: 'Aviation Services Angola — Gestão de Aeronaves, Jatos, Helicópteros e CAMO | Multiflight',
      description:
        'Gestão de jatos executivos e helicópteros, intermediação e venda de aeronaves, inspecção pré-compra, ambulância aérea e CAMO em Angola.',
    },
    en: {
      title: 'Aviation Services Angola — Aircraft Management, Brokerage & CAMO | Multiflight Angola',
      description:
        'Executive jet and helicopter management, aircraft sales and brokerage, pre-purchase inspection, air ambulance, and CAMO services in Angola.',
    },
  },
  safety: {
    path: '/seguranca-qualidade',
    pt: {
      title: 'Segurança e Qualidade Operacional — Multiflight Angola',
      description:
        'Compromisso da Multiflight Angola com a segurança operacional, cumprimento de procedimentos, qualificação técnica e gestão de riscos na aviação e marítima.',
    },
    en: {
      title: 'Operational Safety & Quality — Multiflight Angola',
      description:
        'Multiflight Angola’s commitment to operational safety, procedural compliance, professional qualification, and risk management across aviation and marine sectors.',
    },
  },
  gallery: {
    path: '/galeria',
    pt: {
      title: 'Galeria Operacional — Aviação Executiva, Ground Handling e Offshore | Multiflight Angola',
      description:
        'Galeria institucional da Multiflight Angola: aviação executiva, helicópteros, operações aeroportuárias, Ground Handling, offshore, inshore e marítimas.',
    },
    en: {
      title: 'Operational Gallery — Executive Aviation, Ground Handling & Offshore | Multiflight Angola',
      description:
        'Corporate gallery of Multiflight Angola across executive aviation, helicopters, airport operations, Ground Handling, offshore, inshore, and maritime sectors.',
    },
  },
  contact: {
    path: '/contactos',
    pt: {
      title: 'Contactos e Solicitação de Propostas — Multiflight Angola (Luanda)',
      description:
        'Entre em contacto com a Multiflight Angola (+244 923 550 083 | geral@multiflightangola.com) em Luanda, Mártires de Kifangondo, Rua 16. Solicite uma proposta comercial.',
    },
    en: {
      title: 'Contact & Commercial Proposal Requests — Multiflight Angola (Luanda)',
      description:
        'Contact Multiflight Angola (+244 923 550 083 | geral@multiflightangola.com) in Luanda, Mártires de Kifangondo, Street 16. Request a tailored proposal.',
    },
  },
  privacy: {
    path: '/privacidade',
    pt: {
      title: 'Política de Privacidade e Protecção de Dados — Multiflight Angola',
      description:
        'Política de privacidade, tratamento de dados corporativos e segurança de informações submetidas através do website oficial da Multiflight Angola.',
    },
    en: {
      title: 'Privacy Policy & Data Protection — Multiflight Angola',
      description:
        'Privacy policy, corporate data handling, and security practices for inquiries submitted through Multiflight Angola’s official website.',
    },
  },
  'not-found': {
    path: '/404',
    pt: {
      title: 'Página Não Encontrada (404) — Multiflight Angola',
      description: 'A página solicitada não foi encontrada no portal institucional da Multiflight Angola.',
    },
    en: {
      title: 'Page Not Found (404) — Multiflight Angola',
      description: 'The requested page could not be found on Multiflight Angola’s corporate website.',
    },
  },
};

export function routeFromPathname(pathname: string): PageRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  switch (clean) {
    case '/':
      return 'home';
    case '/quem-somos':
    case '/about':
      return 'about';
    case '/servicos':
    case '/services':
      return 'services';
    case '/servicos/ground-handling':
      return 'service-ground-handling';
    case '/servicos/ground-handling-supervision':
      return 'service-ground-handling-supervision';
    case '/servicos/offshore-operations':
      return 'service-offshore';
    case '/servicos/inshore-operations':
      return 'service-inshore';
    case '/servicos/maritime-operations':
      return 'service-maritime';
    case '/servicos/aviation-services':
      return 'service-aviation';
    case '/seguranca-qualidade':
    case '/safety':
      return 'safety';
    case '/galeria':
    case '/gallery':
      return 'gallery';
    case '/contactos':
    case '/contact':
      return 'contact';
    case '/privacidade':
    case '/privacy':
      return 'privacy';
    default:
      return 'not-found';
  }
}

export function pathnameFromRoute(route: PageRoute): string {
  const foundService = SERVICES_DATA.find((s) => s.id === route);
  if (foundService) return foundService.slug;
  return PAGE_SEO[route]?.path || '/';
}

export function usePageSEO(route: PageRoute, lang: Language) {
  useEffect(() => {
    const seo = PAGE_SEO[route] || PAGE_SEO.home;
    const meta = seo[lang];

    document.title = meta.title;
    document.documentElement.lang = lang;

    const setMetaContent = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);

    const canonicalUrl = `https://multiflightangola.com${seo.path === '/' ? '/' : seo.path}`;
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', canonicalUrl);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
  }, [route, lang]);
}
