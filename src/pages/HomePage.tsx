import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  INSTITUTIONAL_INFO,
  Language,
  PageRoute,
  SERVICES_DATA,
  TRANSLATIONS,
} from '../data/content.ts';
import {
  OperationalScene,
  REAL_IMAGES,
  OFFICIAL_LOGO_URL,
} from '../components/VisualAssets.tsx';

interface HomePageProps {
  lang: Language;
  onNavigate: (
    route: PageRoute,
    preselectedService?: string,
    prefillLocation?: string,
    prefillDate?: string
  ) => void;
  onOpenPortal: () => void;
}

interface HeroSlide {
  id: string;
  image: string;
  targetRoute: PageRoute;
  serviceNamePt: string;
  pt: {
    kicker: string;
    title: string;
    subtitle: string;
    caption: string;
  };
  en: {
    kicker: string;
    title: string;
    subtitle: string;
    caption: string;
  };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-aviation',
    image: REAL_IMAGES.angolaExecutiveAviation,
    targetRoute: 'services',
    serviceNamePt: 'Aviation Services',
    pt: {
      kicker: 'MULTIFLIGHT ANGOLA · DESDE 2012',
      title: 'Connecting Aviation, Offshore and Maritime Operations.',
      subtitle:
        'Soluções especializadas em aviação, assistência aeroportuária, Ground Handling e operações offshore, inshore e marítimas. A excelência operacional começa com a escolha do parceiro certo.',
      caption: 'Aviação Executiva & Assistência Aeroportuária · Luanda, Angola',
    },
    en: {
      kicker: 'MULTIFLIGHT ANGOLA · SINCE 2012',
      title: 'Connecting Aviation, Offshore and Maritime Operations.',
      subtitle:
        'Specialized solutions in private aviation, airport assistance, Ground Handling, and offshore, inshore, and maritime operations. Operational excellence begins with choosing the right partner.',
      caption: 'Executive Aviation & Airport Assistance · Luanda, Angola',
    },
  },
  {
    id: 'slide-ground-handling',
    image: REAL_IMAGES.angolaGroundHandlingServices,
    targetRoute: 'service-ground-handling',
    serviceNamePt: 'Ground Handling Services',
    pt: {
      kicker: 'ASSISTÊNCIA EM TERRA · AEROPORTO DE LUANDA',
      title: 'Ground Handling Services de Padrão Internacional.',
      subtitle:
        'Coordenação completa de operações aeroportuárias, assistência a aeronaves em escala, embarque de passageiros, bagagens, serviços de rampa e apoio dedicado às tripulações em Angola.',
      caption: 'Ground Handling Services · Equipa de Rampa em Luanda',
    },
    en: {
      kicker: 'GROUND SUPPORT · LUANDA AIRPORT',
      title: 'International-Standard Ground Handling Services.',
      subtitle:
        'Full airport operations coordination, aircraft turnaround assistance, passenger boarding, baggage handling, ramp services, and dedicated flight crew support in Angola.',
      caption: 'Ground Handling Services · Luanda Ramp Operations',
    },
  },
  {
    id: 'slide-supervision',
    image: REAL_IMAGES.angolaGroundHandlingSupervision,
    targetRoute: 'service-ground-handling-supervision',
    serviceNamePt: 'Ground Handling Supervision',
    pt: {
      kicker: 'SUPERVISÃO TÉCNICA E CONTROLO OPERACIONAL',
      title: 'Ground Handling Supervision com Rigor e Segurança.',
      subtitle:
        'Supervisão presencial das actividades de assistência em terra, controlo de procedimentos, monitorização de qualidade e relatórios operacionais detalhados em cada escala.',
      caption: 'Ground Handling Supervision · Controlo de Placa em Luanda (LAD)',
    },
    en: {
      kicker: 'TECHNICAL OVERSIGHT & OPERATIONAL CONTROL',
      title: 'Ground Handling Supervision with Safety and Rigor.',
      subtitle:
        'On-site supervision of ground handling activities, procedural compliance control, quality monitoring, and comprehensive operational reporting on every turnaround.',
      caption: 'Ground Handling Supervision · Luanda (LAD) Apron Control',
    },
  },
  {
    id: 'slide-offshore',
    image: REAL_IMAGES.angolaOffshoreOperations,
    targetRoute: 'service-offshore',
    serviceNamePt: 'Offshore Operations',
    pt: {
      kicker: 'SECTORES PETROLÍFERO, GÁS E ENERGIA',
      title: 'Coordenação Logística e Operações Offshore Integradas.',
      subtitle:
        'Apoio especializado à mobilização de equipas e recursos, coordenação de transporte e suporte às operações de aviação e embarcações associadas a instalações offshore em Angola.',
      caption: 'Offshore Operations · Integração Aérea e Marítima em Angola',
    },
    en: {
      kicker: 'OIL, GAS & ENERGY SECTORS',
      title: 'Integrated Logistics Coordination & Offshore Operations.',
      subtitle:
        'Specialized support for crew and resource mobilization, transport coordination, and aviation and marine operations serving offshore installations in Angola.',
      caption: 'Offshore Operations · Air & Marine Synchronization in Angola',
    },
  },
  {
    id: 'slide-maritime',
    image: REAL_IMAGES.angolaMaritimeOperations,
    targetRoute: 'service-maritime',
    serviceNamePt: 'Maritime Operations',
    pt: {
      kicker: 'OPERAÇÕES MARÍTIMAS & INSHORE EM ANGOLA',
      title: 'Apoio Logístico Portuário, Costeiro e Supervisão Marítima.',
      subtitle:
        'Coordenação de embarcações, acompanhamento de transporte marítimo e suporte operacional contínuo a actividades portuárias, costeiras e águas interiores.',
      caption: 'Maritime & Inshore Operations · Logística Portuária em Angola',
    },
    en: {
      kicker: 'MARITIME & INSHORE OPERATIONS IN ANGOLA',
      title: 'Port Logistics, Coastal Support & Maritime Supervision.',
      subtitle:
        'Vessel coordination, marine transport monitoring, and continuous operational support across port terminals, coastal zones, and inland waters.',
      caption: 'Maritime & Inshore Operations · Port & Vessel Support in Angola',
    },
  },
  {
    id: 'slide-hangar',
    image: REAL_IMAGES.angolaAviationHangar,
    targetRoute: 'service-aviation',
    serviceNamePt: 'Aviation Services',
    pt: {
      kicker: 'GESTÃO DE FROTA, HELICÓPTEROS & CAMO',
      title: 'Gestão de Jatos Executivos, Helicópteros e Aeronavegabilidade.',
      subtitle:
        'Infraestruturas de primeira classe e engenheiros angolanos qualificados para gestão de aeronaves, intermediação, inspecção pré-compra, ambulância aérea e serviços CAMO.',
      caption: 'Aviation Services & CAMO · Engenharia e Manutenção em Angola',
    },
    en: {
      kicker: 'FLEET MANAGEMENT, HELICOPTERS & CAMO',
      title: 'Executive Jet, Helicopter & Continuing Airworthiness Management.',
      subtitle:
        'First-class facilities and qualified Angolan engineers for aircraft management, brokerage, pre-purchase inspection, air ambulance, and CAMO services.',
      caption: 'Aviation Services & CAMO · Engineering & Maintenance in Angola',
    },
  },
];

const INDICATOR_PHOTOS = [
  REAL_IMAGES.angolaExecutiveAviation,
  REAL_IMAGES.angolaGroundHandlingServices,
  REAL_IMAGES.angolaGroundHandlingSupervision,
  REAL_IMAGES.angolaOffshoreOperations,
];

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  onOpenPortal,
}) => {
  const t = TRANSLATIONS[lang];

  // Dynamic Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Interactive Operational Dispatch Bar State
  const [activeTab, setActiveTab] = useState<
    'ground' | 'supervision' | 'offshore' | 'maritime' | 'aviation'
  >('ground');
  const [missionMode, setMissionMode] = useState<'scheduled' | 'urgent' | 'continuous'>(
    'scheduled'
  );
  const [baseLocation, setBaseLocation] = useState('Luanda (LAD / NBJ)');
  const [targetDate, setTargetDate] = useState('2026-11-28');

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const getSelectedServiceName = () => {
    switch (activeTab) {
      case 'ground':
        return 'Ground Handling Services';
      case 'supervision':
        return 'Ground Handling Supervision';
      case 'offshore':
        return 'Offshore Operations';
      case 'maritime':
        return 'Maritime Operations';
      case 'aviation':
        return 'Aviation Services';
    }
  };

  const handleDispatchLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('contact', getSelectedServiceName(), baseLocation, targetDate);
  };

  const slide = HERO_SLIDES[currentSlide];
  const slideContent = slide[lang];

  return (
    <div className="space-y-0">
      {/* 1. DYNAMIC FULL-BLEED PHOTOGRAPHIC HERO CAROUSEL IN TRANSITION */}
      <section
        className="relative bg-slate-950 text-white overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label={
          lang === 'pt'
            ? 'Destaques Operacionais Multiflight Angola'
            : 'Multiflight Angola Operational Highlights'
        }
      >
        <div className="relative min-h-[560px] lg:min-h-[640px] w-full flex items-center">
          {HERO_SLIDES.map((s, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={s.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={s.image}
                  alt={s[lang].caption}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-7000 ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E4D]/95 via-[#1769AA]/75 to-slate-950/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/25" />
              </div>
            );
          })}

          {/* Foreground Hero Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 pb-28 lg:pt-14 lg:pb-36">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-extrabold tracking-widest uppercase text-white/95">
                  <span className="font-mono-tabular text-[#D71920] bg-white px-2 py-0.5 rounded-xs">
                    0{currentSlide + 1} / 0{HERO_SLIDES.length}
                  </span>
                  <span>{slideContent.kicker}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-white">
                  {slideContent.title}
                </h1>

                <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
                  {slideContent.subtitle}
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate(slide.targetRoute)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs sm:text-sm font-extrabold tracking-wide shadow-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>{t.hero.ctaServices}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact', slide.serviceNamePt)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white text-[#1769AA] hover:bg-[#F3F5F7] text-xs sm:text-sm font-extrabold tracking-wide shadow-md transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>{t.hero.ctaProposal}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Official Emblem Card & Slide Switcher Controls */}
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-6">
                <div className="w-full max-w-sm rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-5 shadow-2xl border border-white/20 text-slate-900 dark:text-white space-y-4">
                  <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center justify-center">
                    <img
                      src={OFFICIAL_LOGO_URL}
                      alt="MULTIFLIGHT, LDA (fazemos o tempo)"
                      referrerPolicy="no-referrer"
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-xs font-bold text-[#1769AA] dark:text-sky-400">
                      {slideContent.caption}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono-tabular">
                      NIF {INSTITUTIONAL_INFO.nif} · {INSTITUTIONAL_INFO.phone}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {HERO_SLIDES.map((s, idx) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setCurrentSlide(idx)}
                          aria-label={`Slide ${idx + 1}`}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            idx === currentSlide
                              ? 'w-7 bg-[#D71920]'
                              : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-[#1769AA]'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={prevSlide}
                        aria-label={lang === 'pt' ? 'Slide anterior' : 'Previous slide'}
                        className="p-1.5 rounded-lg bg-[#F3F5F7] dark:bg-slate-800 hover:bg-[#1769AA] hover:text-white text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        aria-label={lang === 'pt' ? 'Próximo slide' : 'Next slide'}
                        className="p-1.5 rounded-lg bg-[#F3F5F7] dark:bg-slate-800 hover:bg-[#1769AA] hover:text-white text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING INTERACTIVE OPERATIONAL DISPATCH & PROPOSAL BAR */}
      <section className="relative z-30 -mt-16 lg:-mt-20 pb-8 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
                {(
                  [
                    {
                      id: 'ground',
                      label: t.dispatchBar.tabs.ground,
                      thumb: REAL_IMAGES.angolaGroundHandlingServices,
                    },
                    {
                      id: 'supervision',
                      label: t.dispatchBar.tabs.supervision,
                      thumb: REAL_IMAGES.angolaGroundHandlingSupervision,
                    },
                    {
                      id: 'offshore',
                      label: t.dispatchBar.tabs.offshore,
                      thumb: REAL_IMAGES.angolaOffshoreOperations,
                    },
                    {
                      id: 'maritime',
                      label: t.dispatchBar.tabs.maritime,
                      thumb: REAL_IMAGES.angolaMaritimeOperations,
                    },
                    {
                      id: 'aviation',
                      label: t.dispatchBar.tabs.aviation,
                      thumb: REAL_IMAGES.angolaAviationHangar,
                    },
                  ] as const
                ).map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#1769AA] text-white shadow-xs'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-[#F3F5F7] dark:hover:bg-slate-800'
                      }`}
                    >
                      <img
                        src={tab.thumb}
                        alt={tab.label}
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-sm object-cover shrink-0"
                      />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                {(
                  [
                    { id: 'scheduled', label: t.dispatchBar.modes.scheduled },
                    { id: 'urgent', label: t.dispatchBar.modes.urgent },
                    { id: 'continuous', label: t.dispatchBar.modes.continuous },
                  ] as const
                ).map((mode) => (
                  <label
                    key={mode.id}
                    className="inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <input
                      type="radio"
                      name="missionMode"
                      checked={missionMode === mode.id}
                      onChange={() => setMissionMode(mode.id)}
                      className="accent-[#1769AA] w-3.5 h-3.5"
                    />
                    <span>{mode.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleDispatchLaunch}
              className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end"
            >
              <div className="lg:col-span-3">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  {t.dispatchBar.baseLabel}
                </label>
                <select
                  value={baseLocation}
                  onChange={(e) => setBaseLocation(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F3F5F7] dark:bg-slate-800 px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:border-[#1769AA] focus:outline-none"
                >
                  <option value="Luanda (LAD / NBJ)">Luanda (Aeroporto / Porto)</option>
                  <option value="Soyo (SOQ / Base Offshore)">Soyo (SOQ / Base Offshore)</option>
                  <option value="Cabinda (CAB / Terminal)">Cabinda (CAB / Terminal)</option>
                  <option value="Lobito / Benguela">Lobito / Corredor Marítimo</option>
                  <option value="Namibe / Costa Sul">Namibe / Operações Costeiras</option>
                </select>
              </div>

              <div className="lg:col-span-4">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  {t.dispatchBar.scopeLabel}
                </label>
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F3F5F7] dark:bg-slate-800 px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {getSelectedServiceName()}
                </div>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  {t.dispatchBar.dateLabel}
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F3F5F7] dark:bg-slate-800 px-3 py-2.5 text-xs sm:text-sm font-bold font-mono-tabular text-slate-900 dark:text-white focus:border-[#1769AA] focus:outline-none"
                />
              </div>

              <div className="lg:col-span-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs sm:text-sm font-extrabold tracking-wide transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-sm"
                >
                  <span>{t.dispatchBar.actionBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DIVISIONS PHOTOGRAPHIC SHOWCASE + CORPORATE PORTAL BOX */}
      <section className="py-12 lg:py-18 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 4 Real Photo Operational Cards (8 cols) */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-[#1769AA] dark:text-sky-400">
                    {t.homeSections.servicesKicker}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {lang === 'pt'
                      ? 'Principais Áreas de Actividade Operacional em Angola'
                      : 'Core Operational Activity Divisions in Angola'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="text-xs sm:text-sm font-bold text-[#1769AA] dark:text-sky-400 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {t.nav.allServices}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
                {SERVICES_DATA.slice(0, 4).map((service) => (
                  <div
                    key={service.id}
                    onClick={() => onNavigate(service.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') onNavigate(service.id);
                    }}
                    className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all cursor-pointer min-h-[260px] flex flex-col justify-end"
                  >
                    <OperationalScene
                      scene={service.visualType}
                      className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
                      title={service[lang].title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
                    <div className="relative p-4 flex items-end justify-between gap-2 text-white">
                      <div>
                        <span className="text-[11px] font-mono-tabular text-white/80">
                          {service.code} · ANGOLA
                        </span>
                        <h3 className="text-sm font-extrabold leading-snug text-white mt-0.5">
                          {service[lang].shortTitle}
                        </h3>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-white text-[#1769AA] group-hover:bg-[#D71920] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Corporate Partner & Direct Dispatch Box with Real Angolan Photo Header */}
            <div className="lg:col-span-4 rounded-2xl bg-[#1769AA] text-white overflow-hidden flex flex-col justify-between shadow-lg border border-white/10">
              <div>
                <div className="h-36 relative overflow-hidden">
                  <img
                    src={REAL_IMAGES.angolaExecutiveAviation}
                    alt="Multiflight Angola Executive Operations"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1769AA] via-[#1769AA]/30 to-transparent" />
                  <span className="absolute bottom-2 left-6 text-[11px] font-bold tracking-wider uppercase text-white/95">
                    MULTIFLIGHT ANGOLA · LUANDA
                  </span>
                </div>

                <div className="px-6 pt-3 space-y-3">
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                    {lang === 'pt'
                      ? 'Coordenação Operacional & Portal Corporativo'
                      : 'Operational Coordination & Corporate Portal'}
                  </h3>
                  <ul className="space-y-2 text-xs text-white/90">
                    <li>
                      ·{' '}
                      {lang === 'pt'
                        ? 'Assistência em escala e supervisão aeroportuária dedicada'
                        : 'Dedicated turnaround assistance and airport supervision'}
                    </li>
                    <li>
                      ·{' '}
                      {lang === 'pt'
                        ? 'Apoio logístico integrado a operações Offshore, Inshore e Marítimas'
                        : 'Integrated logistics for Offshore, Inshore, and Maritime missions'}
                    </li>
                    <li>
                      ·{' '}
                      {lang === 'pt'
                        ? 'Gestão de jatos executivos, helicópteros e serviços CAMO'
                        : 'Executive jet, helicopter management, and CAMO services'}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3 px-4 rounded-lg bg-white text-[#1769AA] hover:bg-[#F3F5F7] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.hero.ctaProposal}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-white/85 flex items-center justify-between pt-1">
                  <span>
                    {lang === 'pt' ? 'Parceiro registado?' : 'Registered partner?'}
                  </span>
                  <button
                    type="button"
                    onClick={onOpenPortal}
                    className="font-bold text-white underline hover:text-white/90 cursor-pointer"
                  >
                    {lang === 'pt' ? 'Aceder ao Portal' : 'Access Portal'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INSTITUTIONAL INDICATORS STRIP WITH REAL ANGOLAN OPERATIONAL PHOTO THUMBNAILS */}
      <section className="bg-[#F3F5F7] dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.indicators.map((ind, idx) => {
              const thumbSrc = INDICATOR_PHOTOS[idx % INDICATOR_PHOTOS.length];
              return (
                <div key={ind.label} className="flex items-start gap-4">
                  <img
                    src={thumbSrc}
                    alt={ind.label}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs"
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {ind.label}
                    </p>
                    <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5 font-mono-tabular">
                      {ind.value}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {ind.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. INSTITUTIONAL PRESENTATION & HISTORY */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <p className="text-xs font-bold text-[#1769AA] dark:text-sky-400 tracking-wide">
                {t.homeSections.introKicker} · {INSTITUTIONAL_INFO.foundedYear}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.homeSections.introTitle}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{t.homeSections.introP1}</p>
                <p>{t.homeSections.introP2}</p>
                <p>{t.homeSections.introP3}</p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {t.homeSections.introP4}
                </p>
              </div>
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1769AA] hover:bg-[#115287] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  <span>
                    {lang === 'pt'
                      ? 'Conhecer a Nossa História e Valores'
                      : 'Discover Our History & Values'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('safety')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-[#1769AA] text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  <span>{t.nav.safety}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#F3F5F7] dark:bg-slate-900 shadow-md">
              <OperationalScene
                scene="aviation"
                className="w-full h-72 lg:flex-1"
                title="Multiflight Angola Hangar & Fleet Infrastructure"
              />
              <div className="p-6 space-y-2 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>MULTIFLIGHT ANGOLA</span>
                  <span className="font-mono-tabular">NIF {INSTITUTIONAL_INFO.nif}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {lang === 'pt'
                    ? 'Sede Operacional em Luanda, Angola'
                    : 'Operational Headquarters in Luanda, Angola'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {lang === 'pt'
                    ? INSTITUTIONAL_INFO.addressPt
                    : INSTITUTIONAL_INFO.addressEn}{' '}
                  · {lang === 'pt' ? INSTITUTIONAL_INFO.hoursPt : INSTITUTIONAL_INFO.hoursEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPLETE 6 SERVICES PORTFOLIO GRID WITH REAL ANGOLAN PHOTOGRAPHY */}
      <section className="py-16 lg:py-24 bg-[#F3F5F7] dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-bold text-[#1769AA] dark:text-sky-400">
                {t.homeSections.servicesKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.homeSections.servicesTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                {t.homeSections.servicesSubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{t.hero.ctaProposal}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((service) => {
              const content = service[lang];
              return (
                <article
                  key={service.id}
                  className="group rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between transition-all hover:border-[#1769AA] shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="h-56 relative overflow-hidden">
                      <OperationalScene
                        scene={service.visualType}
                        className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                        title={content.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-4 text-xs font-mono-tabular font-bold text-white">
                        {service.code} · MULTIFLIGHT ANGOLA
                      </span>
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                        {content.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {content.description}
                      </p>
                      <ul className="pt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {content.items.slice(0, 4).map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-[#D71920] font-bold">·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate(service.id)}
                      className="text-xs font-bold text-[#1769AA] dark:text-sky-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>
                        {lang === 'pt' ? 'Ver Especificações Técnicas' : 'View Technical Scope'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('contact', service.pt.title)}
                      className="text-xs font-bold text-[#D71920] hover:underline cursor-pointer"
                    >
                      {lang === 'pt' ? 'Solicitar' : 'Inquire'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SPOTLIGHT: OFFSHORE, INSHORE & MARITIME OPERATIONS */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 min-h-[360px] relative shadow-md">
              <OperationalScene
                scene="offshore"
                className="w-full h-full"
                title="Offshore, Inshore & Maritime Operations Angola"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-6 text-white">
                <p className="text-xs font-mono-tabular text-white/80">
                  OFFSHORE · INSHORE · MARITIME
                </p>
                <p className="text-sm sm:text-base font-bold mt-0.5">
                  {lang === 'pt'
                    ? 'Sincronização entre meios aéreos, plataformas offshore e operações portuárias em Angola'
                    : 'Synchronization across aviation assets, offshore platforms, and port operations in Angola'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
              <p className="text-xs font-bold text-[#D71920] tracking-wide">
                {t.homeSections.offshoreKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.homeSections.offshoreTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.homeSections.offshoreDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {SERVICES_DATA.filter((s) => s.category === 'maritime').map((marineService) => (
                  <div
                    key={marineService.id}
                    className="rounded-xl overflow-hidden bg-[#F3F5F7] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-28 relative">
                        <OperationalScene
                          scene={marineService.visualType}
                          className="w-full h-full"
                          title={marineService[lang].shortTitle}
                        />
                      </div>
                      <div className="p-3.5">
                        <span className="text-xs font-mono-tabular text-[#1769AA] dark:text-sky-400 font-bold">
                          {marineService.code}.
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          {marineService[lang].shortTitle}
                        </h3>
                      </div>
                    </div>
                    <div className="px-3.5 pb-3.5">
                      <button
                        type="button"
                        onClick={() => onNavigate(marineService.id)}
                        className="text-xs font-bold text-[#1769AA] dark:text-sky-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>{lang === 'pt' ? 'Explorar' : 'Explore'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SAFETY & QUALITY + COMMERCIAL CTA BANNER */}
      <section className="py-16 lg:py-20 bg-[#1769AA] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-bold tracking-widest text-white/85">
                {t.homeSections.safetyKicker}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {t.homeSections.ctaBannerTitle}
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
                {t.homeSections.ctaBannerSubtitle}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-white/90">
                <span className="font-mono-tabular">{INSTITUTIONAL_INFO.phone}</span>
                <span>·</span>
                <span>{INSTITUTIONAL_INFO.email}</span>
                <span>·</span>
                <span>Luanda, Angola</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-6 py-4 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                {t.hero.ctaProposal}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('safety')}
                className="px-6 py-4 rounded-lg bg-white text-[#1769AA] hover:bg-[#F3F5F7] text-xs sm:text-sm font-bold tracking-wide transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                {t.nav.safety}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
