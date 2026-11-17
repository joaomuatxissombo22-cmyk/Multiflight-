import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  Calendar,
  MapPin,
  RefreshCw,
  X,
  CheckCircle2,
  Newspaper,
} from 'lucide-react';
import { Language, PageRoute } from '../data/content.ts';
import { OperationalScene } from './VisualAssets.tsx';

export interface NewsLocaleContent {
  categoryLabel: string;
  title: string;
  excerpt: string;
  body: string[];
  highlights: string[];
}

export interface IndustryNewsArticle {
  id: string;
  code: string;
  category: 'aviation' | 'ground-handling' | 'offshore' | 'maritime';
  publishedAt: string;
  location: string;
  source: string;
  relatedService: string;
  sceneType: string;
  featured: boolean;
  pt: NewsLocaleContent;
  en: NewsLocaleContent;
}

const FALLBACK_NEWS: IndustryNewsArticle[] = [
  {
    id: 'news-angola-nbj-executive-2026',
    code: 'ANG-AV-01',
    category: 'aviation',
    publishedAt: '2026-11-15',
    location: 'Luanda (NBJ / LAD), Angola',
    source: 'Observatório de Aviação & Infraestruturas de Angola',
    relatedService: 'Aviation Services',
    sceneType: 'executive-jet-apron',
    featured: true,
    pt: {
      categoryLabel: 'Aviação & Infraestrutura Aeroportuária',
      title:
        'Expansão das Operações Executivas e de Carga no Hub Aeroportuário de Luanda Reforça Conectividade Regional',
      excerpt:
        'A coordenação entre o Aeroporto Internacional 4 de Fevereiro (LAD) e o Novo Aeroporto Internacional Dr. António Agostinho Neto (NBJ) impulsiona a eficiência nas escalas técnicas, aviação executiva e logística aérea na África Austral.',
      body: [
        'O sector da aviação civil e executiva em Angola regista um crescimento contínuo na movimentação de aeronaves corporativas, voos charter e operações de apoio logístico energético a partir de Luanda.',
        'A articulação operacional entre as infraestruturas aeroportuárias da capital angolana exige serviços especializados de assistência em escala, despacho operacional, coordenação de slots e gestão de aeronavegabilidade contínua (CAMO) com rigor internacional.',
        'A Multiflight Angola acompanha esta evolução disponibilizando assistência técnica 24/7 sob coordenação prévia, supervisão dedicada de placa e apoio integral às tripulações e passageiros executivos.',
      ],
      highlights: [
        'Optimização de tempos de turnaround em escalas técnicas e executivas em Luanda',
        'Reforço dos padrões de segurança operacional e conformidade regulamentar (ANAC Angola)',
        'Integração directa com rotas domésticas para Soyo, Cabinda e Catumbela',
      ],
    },
    en: {
      categoryLabel: 'Aviation & Airport Infrastructure',
      title:
        'Expansion of Executive and Cargo Operations at Luanda Airport Hub Strengthens Regional Connectivity',
      excerpt:
        'Operational coordination between 4 de Fevereiro International Airport (LAD) and Dr. António Agostinho Neto International Airport (NBJ) drives higher efficiency in technical stops, private aviation, and air logistics across Southern Africa.',
      body: [
        'Angola’s civil and executive aviation sector continues to record steady growth in corporate aircraft movements, charter flights, and energy logistics air support out of Luanda.',
        'Seamless coordination across Luanda’s airport infrastructure demands specialized ground support, flight dispatch, slot coordination, and Continuing Airworthiness Management (CAMO) aligned with international standards.',
        'Multiflight Angola supports this expansion by providing dedicated apron supervision, turnaround coordination, and comprehensive flight crew and VIP passenger assistance.',
      ],
      highlights: [
        'Optimized turnaround times for technical and executive stops in Luanda',
        'Strengthened operational safety and regulatory compliance (ANAC Angola)',
        'Direct synchronization with domestic air corridors serving Soyo, Cabinda, and Catumbela',
      ],
    },
  },
  {
    id: 'news-angola-ground-handling-2026',
    code: 'ANG-GH-02',
    category: 'ground-handling',
    publishedAt: '2026-11-12',
    location: 'Luanda (LAD), Angola',
    source: 'Boletim Operacional de Assistência em Terra',
    relatedService: 'Ground Handling Supervision',
    sceneType: 'supervision',
    featured: false,
    pt: {
      categoryLabel: 'Ground Handling & Supervisão',
      title:
        'Novos Protocolos de Supervisão de Rampa Elevam a Segurança e Pontualidade nas Escalas em Angola',
      excerpt:
        'A implementação de auditorias presenciais de rampa e listas de verificação digitalizadas reduz desvios operacionais e assegura o cumprimento rigoroso de SLA em voos privados e charters.',
      body: [
        'A exigência crescente de operadores internacionais e companhias de aviação executiva em Angola tem colocado a supervisão presencial de Ground Handling no centro da eficiência aeroportuária.',
        'O acompanhamento directo das operações de carregamento, abastecimento, GPU, limpeza técnica e assistência a passageiros garante que cada escala cumpra integralmente os manuais operacionais das companhias.',
        'As equipas de Ground Handling Services e Ground Handling Supervision da Multiflight Angola asseguram relatórios operacionais imediatos e interlocução única entre tripulação, autoridades aeroportuárias e prestadores.',
      ],
      highlights: [
        'Controlo presencial de segurança de placa (Ramp Safety) e GSE',
        'Coordenação rápida com alfândega, imigração e autoridades aeroportuárias',
        'Relatórios detalhados de escala (Turnaround Reports) em tempo real',
      ],
    },
    en: {
      categoryLabel: 'Ground Handling & Supervision',
      title:
        'New Ramp Supervision Protocols Elevate Turnaround Safety and Punctuality Across Angolan Airports',
      excerpt:
        'On-site apron audits and standardized turnaround checklists minimize operational delays and ensure strict SLA compliance for private and charter flights.',
      body: [
        'Rising standards among international operators and executive flight departments in Angola have positioned on-site Ground Handling Supervision at the core of airport efficiency.',
        'Direct oversight of loading, fueling, GPU hookup, cabin servicing, and passenger handling ensures every turnaround adheres strictly to operator flight manuals.',
        'Multiflight Angola’s Ground Handling Services and Supervision teams deliver immediate turnaround reporting and single-point coordination between flight crews, airport authorities, and service providers.',
      ],
      highlights: [
        'On-site Ramp Safety and Ground Support Equipment (GSE) oversight',
        'Streamlined customs, immigration, and airport authority clearance',
        'Real-time operational Turnaround Reports for flight departments',
      ],
    },
  },
  {
    id: 'news-angola-offshore-energy-2026',
    code: 'ANG-OF-03',
    category: 'offshore',
    publishedAt: '2026-11-08',
    location: 'Soyo & Bacia do Baixo Congo, Angola',
    source: 'Logística Energética & Offshore Angola',
    relatedService: 'Offshore Operations',
    sceneType: 'offshore',
    featured: false,
    pt: {
      categoryLabel: 'Logística Offshore & Energia',
      title:
        'Integração Multimodal Aérea e Marítima Acelera Mobilização de Equipas para Blocos Offshore em Angola',
      excerpt:
        'A sincronização entre transporte aéreo de passageiros/carga urgente, helicópteros offshore e embarcações de apoio reduz tempos de trânsito nas bases de Luanda, Soyo e Cabinda.',
      body: [
        'As campanhas de exploração, manutenção e produção nos blocos offshore da Bacia do Baixo Congo e Bacia do Kwanza dependem de cadeias logísticas ininterruptas entre aeroportos e terminais marítimos.',
        'A articulação integrada entre voos de ligação, operações de helicópteros e movimentação de embarcações de suporte (PSV/AHTS e crew boats) permite optimizar a rotação de pessoal técnico e o envio de componentes críticos.',
        'A divisão de Offshore Operations da Multiflight Angola coordena fluxos logísticos ponta-a-ponta com foco absoluto em normas internacionais de HSE.',
      ],
      highlights: [
        'Coordenação sincronizada de rotação de tripulações (Crew Change) em Luanda e Soyo',
        'Apoio dedicado a helicópteros e logística de carga crítica para plataformas',
        'Conformidade rigorosa com padrões de Saúde, Segurança e Ambiente (HSE)',
      ],
    },
    en: {
      categoryLabel: 'Offshore & Energy Logistics',
      title:
        'Multimodal Air and Marine Synchronization Accelerates Crew Mobilization for Angolan Offshore Blocks',
      excerpt:
        'Coordinating fixed-wing air transport, offshore helicopters, and support vessels cuts transit times across operational bases in Luanda, Soyo, and Cabinda.',
      body: [
        'Exploration, maintenance, and production campaigns across Angola’s Lower Congo and Kwanza Basin offshore blocks rely on uninterrupted logistics chains linking airports and marine terminals.',
        'Integrated scheduling between fixed-wing flights, rotary-wing transfers, and offshore support vessels (PSV/AHTS and crew boats) optimizes technical crew rotations and urgent spare-parts delivery.',
        'Multiflight Angola’s Offshore Operations division manages end-to-end mobilization workflows under strict international HSE standards.',
      ],
      highlights: [
        'Synchronized Crew Change coordination across Luanda and Soyo hubs',
        'Dedicated rotary-wing support and time-critical offshore cargo logistics',
        'Strict adherence to international Health, Safety, and Environment (HSE) protocols',
      ],
    },
  },
  {
    id: 'news-angola-maritime-inshore-2026',
    code: 'ANG-MA-04',
    category: 'maritime',
    publishedAt: '2026-11-03',
    location: 'Porto de Luanda & Corredor do Lobito, Angola',
    source: 'Actualidade Marítima & Portuária de Angola',
    relatedService: 'Maritime Operations',
    sceneType: 'maritime',
    featured: false,
    pt: {
      categoryLabel: 'Operações Marítimas & Inshore',
      title:
        'Modernização da Logística Portuária e Costeira Dinamiza Operações Inshore e Marítimas na Costa Angolana',
      excerpt:
        'O fortalecimento das operações nos terminais portuários de Luanda, Lobito e Namibe amplia a capacidade de resposta para assistência a embarcações e logística costeira.',
      body: [
        'O desenvolvimento dos corredores logísticos e terminais portuários ao longo da costa de Angola tem impulsionado a procura por serviços especializados de coordenação marítima e operações inshore.',
        'A gestão eficiente de escalas portuárias, abastecimento técnico, logística de cais e transporte em águas interiores requer acompanhamento operacional permanente no terreno.',
        'A Multiflight Angola disponibiliza equipas técnicas para supervisão portuária, coordenação de embarcações de apoio e integração entre logística marítima e aérea.',
      ],
      highlights: [
        'Apoio logístico e supervisão técnica nos principais portos angolanos',
        'Coordenação de operações Inshore em zonas costeiras e terminais fluviais',
        'Interligação directa entre operações portuárias e transporte aéreo executivo/carga',
      ],
    },
    en: {
      categoryLabel: 'Maritime & Inshore Operations',
      title:
        'Port and Coastal Logistics Modernization Boosts Inshore and Maritime Operations Along the Angolan Coast',
      excerpt:
        'Upgraded operational capacity across port terminals in Luanda, Lobito, and Namibe strengthens vessel support, quayside coordination, and coastal logistics.',
      body: [
        'Ongoing growth across Angola’s port terminals and logistics corridors has increased demand for specialized maritime coordination and inshore operational support.',
        'Efficient management of vessel port calls, technical provisioning, quayside logistics, and sheltered-water operations requires continuous on-site supervision.',
        'Multiflight Angola deploys dedicated technical teams for port supervision, support vessel coordination, and seamless air-to-sea logistics integration.',
      ],
      highlights: [
        'Technical supervision and logistics support across major Angolan ports',
        'Inshore operational coordination in coastal zones and sheltered terminals',
        'Direct integration between port operations and executive/cargo aviation',
      ],
    },
  },
];

interface LatestNewsSectionProps {
  lang: Language;
  onNavigate: (
    route: PageRoute,
    preselectedService?: string,
    prefillLocation?: string
  ) => void;
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({
  lang,
  onNavigate,
}) => {
  const [articles, setArticles] = useState<IndustryNewsArticle[]>(FALLBACK_NEWS);
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'aviation' | 'ground-handling' | 'offshore' | 'maritime'
  >('all');
  const [loading, setLoading] = useState(false);
  const [activeArticle, setActiveArticle] = useState<IndustryNewsArticle | null>(null);

  const fetchNews = useCallback(async (categoryFilter: string) => {
    setLoading(true);
    try {
      const query =
        categoryFilter && categoryFilter !== 'all'
          ? `?category=${encodeURIComponent(categoryFilter)}`
          : '';
      const res = await fetch(`/api/news${query}`);
      if (!res.ok) throw new Error('Failed to fetch news');
      const data = await res.json();
      if (Array.isArray(data.items) && data.items.length > 0) {
        setArticles(data.items);
      } else {
        setArticles(
          categoryFilter === 'all'
            ? FALLBACK_NEWS
            : FALLBACK_NEWS.filter((item) => item.category === categoryFilter)
        );
      }
    } catch {
      setArticles(
        categoryFilter === 'all'
          ? FALLBACK_NEWS
          : FALLBACK_NEWS.filter((item) => item.category === categoryFilter)
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory, fetchNews]);

  const categories = [
    {
      id: 'all' as const,
      labelPt: 'Todas as Actualizações',
      labelEn: 'All Industry Updates',
    },
    {
      id: 'aviation' as const,
      labelPt: 'Aviação & Aeroportos',
      labelEn: 'Aviation & Airports',
    },
    {
      id: 'ground-handling' as const,
      labelPt: 'Ground Handling & Supervisão',
      labelEn: 'Ground Handling & Supervision',
    },
    {
      id: 'offshore' as const,
      labelPt: 'Logística Offshore',
      labelEn: 'Offshore Logistics',
    },
    {
      id: 'maritime' as const,
      labelPt: 'Marítimo & Inshore',
      labelEn: 'Maritime & Inshore',
    },
  ];

  const featuredArticle = articles[0] || FALLBACK_NEWS[0];
  const secondaryArticles = articles.slice(1);

  return (
    <section
      className="py-16 lg:py-24 bg-[#F3F5F7] dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
      aria-labelledby="latest-news-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header + Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D71920] tracking-wider uppercase">
              <Newspaper className="w-3.5 h-3.5" />
              <span>
                {lang === 'pt'
                  ? 'OBSERVATÓRIO OPERACIONAL · ANGOLA'
                  : 'OPERATIONAL INDUSTRY BRIEFINGS · ANGOLA'}
              </span>
            </div>
            <h2
              id="latest-news-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              {lang === 'pt'
                ? 'Últimas Notícias de Aviação e Logística em Angola'
                : 'Latest Aviation & Logistics News in Angola'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'pt'
                ? 'Acompanhe as mais recentes actualizações sobre infraestruturas aeroportuárias, assistência em escala, operações offshore e corredores marítimos em Angola.'
                : 'Stay informed on recent developments across airport infrastructure, ground handling supervision, offshore operations, and maritime logistics corridors in Angola.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-end">
            <button
              type="button"
              onClick={() => fetchNews(selectedCategory)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-[#1769AA] transition-colors cursor-pointer"
              title={lang === 'pt' ? 'Actualizar notícias' : 'Refresh updates'}
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-[#1769AA] ${loading ? 'animate-spin' : ''}`}
              />
              <span>{lang === 'pt' ? 'Actualizar Feed' : 'Refresh Feed'}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#1769AA] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#1769AA]'
                }`}
              >
                {lang === 'pt' ? cat.labelPt : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Featured Lead Story + Secondary Grid */}
        {featuredArticle && (
          <div className="space-y-8">
            {/* Lead Story Card */}
            <article className="rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-[380px] overflow-hidden">
                <OperationalScene
                  scene={featuredArticle.sceneType}
                  className="w-full h-full transition-transform duration-500 hover:scale-105"
                  title={featuredArticle[lang].title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#D71920] text-white px-3 py-1 rounded-xs text-[11px] font-extrabold tracking-wider uppercase">
                  {lang === 'pt' ? 'DESTAQUE DO SECTOR' : 'FEATURED INDUSTRY BRIEFING'}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-mono-tabular">
                  <span>{featuredArticle.code}</span>
                  <span>{featuredArticle.location}</span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-[#1769AA] dark:text-sky-400">
                      {featuredArticle[lang].categoryLabel}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 font-mono-tabular">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredArticle.publishedAt}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D71920]" />
                      {featuredArticle.location}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {featuredArticle[lang].title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {featuredArticle[lang].excerpt}
                  </p>

                  <ul className="pt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {featuredArticle[lang].highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#D71920] font-bold">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveArticle(featuredArticle)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1769AA] hover:bg-[#115287] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                  >
                    <span>
                      {lang === 'pt' ? 'Ler Análise Completa' : 'Read Full Briefing'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onNavigate(
                        'contact',
                        featuredArticle.relatedService,
                        featuredArticle.location
                      )
                    }
                    className="text-xs font-bold text-[#D71920] hover:underline cursor-pointer"
                  >
                    {lang === 'pt'
                      ? 'Solicitar Apoio Operacional →'
                      : 'Request Operational Support →'}
                  </button>
                </div>
              </div>
            </article>

            {/* Secondary News Cards Grid */}
            {secondaryArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {secondaryArticles.map((article) => {
                  const content = article[lang];
                  return (
                    <article
                      key={article.id}
                      className="group rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between transition-all hover:border-[#1769AA] shadow-xs hover:shadow-md"
                    >
                      <div>
                        <div className="h-48 relative overflow-hidden">
                          <OperationalScene
                            scene={article.sceneType}
                            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                            title={content.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                          <span className="absolute bottom-3 left-4 text-[11px] font-mono-tabular font-bold text-white">
                            {article.code} · {article.publishedAt}
                          </span>
                        </div>

                        <div className="p-6 space-y-3">
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="font-bold text-[#1769AA] dark:text-sky-400">
                              {content.categoryLabel}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                            {content.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                            {content.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveArticle(article)}
                          className="text-xs font-bold text-[#1769AA] dark:text-sky-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>
                            {lang === 'pt' ? 'Ler Comunicado' : 'Read Update'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                          {article.location}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 sm:h-72">
              <OperationalScene
                scene={activeArticle.sceneType}
                className="w-full h-full"
                title={activeArticle[lang].title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950/70 hover:bg-[#D71920] text-white transition-colors cursor-pointer"
                aria-label={lang === 'pt' ? 'Fechar artigo' : 'Close article'}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-white/85">
                  <span className="bg-[#D71920] text-white px-2 py-0.5 rounded-xs font-bold">
                    {activeArticle.code}
                  </span>
                  <span>{activeArticle[lang].categoryLabel}</span>
                  <span>·</span>
                  <span>{activeArticle.publishedAt}</span>
                </div>
                <h3
                  id="news-modal-title"
                  className="text-xl sm:text-2xl font-extrabold leading-snug text-white"
                >
                  {activeArticle[lang].title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-[#D71920]" />
                  {activeArticle.location}
                </span>
                <span>{activeArticle.source}</span>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeArticle[lang].body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="rounded-xl bg-[#F3F5F7] dark:bg-slate-800/70 p-5 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1769AA] dark:text-sky-400">
                  {lang === 'pt'
                    ? 'Pontos-Chave Operacionais em Angola'
                    : 'Key Operational Highlights in Angola'}
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  {activeArticle[lang].highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const service = activeArticle.relatedService;
                    const loc = activeArticle.location;
                    setActiveArticle(null);
                    onNavigate('contact', service, loc);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  <span>
                    {lang === 'pt'
                      ? `Solicitar Proposta — ${activeArticle.relatedService}`
                      : `Request Proposal — ${activeArticle.relatedService}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {lang === 'pt' ? 'Fechar' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
