import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import {
  INSTITUTIONAL_INFO,
  Language,
  PageRoute,
  SERVICES_DATA,
  ServiceDetail,
  TRANSLATIONS,
} from '../data/content.ts';
import { OperationalScene, REAL_IMAGES } from '../components/VisualAssets.tsx';

interface ServicesOverviewProps {
  lang: Language;
  onNavigate: (route: PageRoute, preselectedService?: string) => void;
}

export const ServicesOverviewPage: React.FC<ServicesOverviewProps> = ({
  lang,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang];
  const [filter, setFilter] = useState<'all' | 'ground' | 'maritime' | 'aviation'>('all');

  const filteredServices =
    filter === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === filter);

  return (
    <div className="space-y-0">
      {/* Hero with Angolan Operational Photography Backdrop */}
      <section className="relative bg-[#1769AA] text-white py-16 lg:py-24 border-b border-white/15 overflow-hidden">
        <img
          src={REAL_IMAGES.angolaGroundHandlingServices}
          alt="Multiflight Angola Ground Handling & Aviation Operations"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E4D]/95 via-[#1769AA]/85 to-slate-950/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold tracking-widest text-white/90 uppercase">
              {t.homeSections.servicesKicker} · {INSTITUTIONAL_INFO.name}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t.homeSections.servicesTitle}
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              {t.homeSections.servicesSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Service Cards */}
      <section className="py-14 lg:py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Interactive Category Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1 bg-[#F3F5F7] dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              {(
                [
                  {
                    id: 'all',
                    label: lang === 'pt' ? 'Todos os Serviços (6)' : 'All Services (6)',
                  },
                  {
                    id: 'ground',
                    label: lang === 'pt' ? 'Ground Handling & Supervisão' : 'Ground Handling & Supervision',
                  },
                  {
                    id: 'maritime',
                    label: lang === 'pt' ? 'Offshore, Inshore & Marítimo' : 'Offshore, Inshore & Maritime',
                  },
                  {
                    id: 'aviation',
                    label: lang === 'pt' ? 'Serviços de Aviação' : 'Aviation Services',
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    filter === tab.id
                      ? 'bg-[#1769AA] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{t.nav.requestProposal}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Detailed Photographic Service Cards */}
          <div className="space-y-8">
            {filteredServices.map((service) => {
              const content = service[lang];
              return (
                <article
                  key={service.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-xs"
                >
                  <div className="lg:col-span-5 min-h-[280px] relative">
                    <OperationalScene
                      scene={service.visualType}
                      className="w-full h-full"
                      title={content.title}
                    />
                  </div>

                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="text-xs font-mono-tabular text-[#1769AA] dark:text-sky-400 font-bold">
                        {service.code}. · MULTIFLIGHT ANGOLA
                      </div>
                      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        {content.title}
                      </h2>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {content.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {content.description}
                      </p>

                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {content.items.map((item, idx) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                          >
                            <span className="font-mono-tabular font-bold text-[#1769AA] dark:text-sky-400 shrink-0">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => onNavigate(service.id)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1769AA] hover:bg-[#115287] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <span>
                          {lang === 'pt'
                            ? 'Página Individual do Serviço'
                            : 'Individual Service Page'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onNavigate('contact', service.pt.title)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D71920] text-[#D71920] hover:bg-[#D71920] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <span>{content.ctaText}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

interface ServiceDetailPageProps {
  service: ServiceDetail;
  lang: Language;
  onNavigate: (route: PageRoute, preselectedService?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  lang,
  onNavigate,
}) => {
  const content = service[lang];

  return (
    <div className="space-y-0">
      {/* Service Header */}
      <section className="bg-[#1769AA] text-white py-12 lg:py-16 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-xs font-bold text-white/85 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {lang === 'pt' ? 'Voltar para Todos os Serviços' : 'Back to All Services'}
            </span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono-tabular text-white/85 font-bold">
                DIVISÃO OPERACIONAL {service.code} · MULTIFLIGHT ANGOLA
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                {content.title}
              </h1>
              <p className="text-base sm:text-lg text-white/95 font-medium leading-relaxed">
                {content.subtitle}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('contact', service.pt.title)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
                >
                  <span>{content.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`tel:${INSTITUTIONAL_INFO.phoneDial}`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold font-mono-tabular transition-colors"
                >
                  <span>{INSTITUTIONAL_INFO.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl aspect-16/10">
                <OperationalScene
                  scene={service.visualType}
                  className="w-full h-full"
                  title={content.title}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-[#F3F5F7] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.highlights.map((hl) => (
              <div
                key={hl.label}
                className="rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5"
              >
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {hl.label}
                </p>
                <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-1">
                  {hl.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Scope & Confirmed Operational Items */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {content.operationalScopeTitle}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {content.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.items.map((item, idx) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F3F5F7]/60 dark:bg-slate-900 p-4 flex items-start gap-3.5"
                  >
                    <span className="font-mono-tabular text-xs font-bold text-[#1769AA] dark:text-sky-400 mt-0.5">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {service.id === 'service-aviation' && (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F3F5F7] dark:bg-slate-900 p-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">
                    {lang === 'pt' ? 'Nota de Disponibilidade Operacional: ' : 'Operational Availability Note: '}
                  </strong>
                  {lang === 'pt'
                    ? 'Todos os serviços específicos de gestão de frota, intermediação, inspecção pré-compra, ambulância aérea e CAMO são estruturados mediante confirmação prévia de disponibilidade técnica e operacional pela equipa da Multiflight Angola.'
                    : 'All specific fleet management, brokerage, pre-purchase inspection, air ambulance, and CAMO services are arranged subject to prior technical and operational availability confirmation by Multiflight Angola.'}
                </div>
              )}
            </div>

            {/* Right Sidebar: Direct Commercial Dispatch & Other Services with Real Photo Thumbnails */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl bg-[#1769AA] text-white overflow-hidden shadow-md">
                <div className="h-36 relative">
                  <OperationalScene
                    scene={service.visualType}
                    className="w-full h-full"
                    title={content.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1769AA] via-[#1769AA]/30 to-transparent" />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-extrabold text-white">
                    {lang === 'pt'
                      ? 'Solicitar Proposta Comercial'
                      : 'Request Commercial Proposal'}
                  </h3>
                  <p className="text-xs text-white/90 leading-relaxed">
                    {lang === 'pt'
                      ? 'A nossa equipa analisa os requisitos da sua operação em Angola e responde com planeamento técnico e cotação detalhada.'
                      : 'Our operational desk reviews your mission requirements in Angola and responds with technical planning and a detailed quotation.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact', service.pt.title)}
                    className="w-full py-3 px-4 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {content.ctaText}
                  </button>
                  <div className="pt-3 border-t border-white/15 space-y-1 text-xs text-white/90">
                    <div className="font-mono-tabular">{INSTITUTIONAL_INFO.phone}</div>
                    <div>{INSTITUTIONAL_INFO.email}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F3F5F7] dark:bg-slate-900 p-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {lang === 'pt' ? 'Outras Divisões Operacionais' : 'Other Operational Divisions'}
                </h4>
                <div className="space-y-2">
                  {SERVICES_DATA.filter((s) => s.id !== service.id).map((other) => (
                    <button
                      key={other.id}
                      type="button"
                      onClick={() => onNavigate(other.id)}
                      className="w-full text-left p-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:text-[#1769AA] transition-colors flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-9 h-9 rounded-md overflow-hidden shrink-0">
                          <OperationalScene
                            scene={other.visualType}
                            className="w-full h-full"
                            title={other[lang].shortTitle}
                          />
                        </div>
                        <span className="truncate">
                          <span className="font-mono-tabular text-slate-400 mr-1">{other.code}.</span>
                          {other[lang].shortTitle}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
