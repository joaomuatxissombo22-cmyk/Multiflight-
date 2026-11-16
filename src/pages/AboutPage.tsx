import React from 'react';
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import {
  INSTITUTIONAL_INFO,
  Language,
  PageRoute,
  TRANSLATIONS,
} from '../data/content.ts';
import { OperationalScene } from '../components/VisualAssets.tsx';

interface AboutPageProps {
  lang: Language;
  onNavigate: (route: PageRoute, preselectedService?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-0">
      {/* Page Hero Banner */}
      <section className="bg-[#1769AA] text-white py-14 lg:py-20 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold tracking-widest text-white/85 uppercase">
              {t.about.kicker} · {INSTITUTIONAL_INFO.name}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t.about.title}
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Presentation & Visual */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <div className="text-xs font-mono-tabular text-[#1769AA] dark:text-sky-400 font-bold">
                FUNDAÇÃO EM 2012 · NIF {INSTITUTIONAL_INFO.nif}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
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
            </div>

            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col bg-[#F3F5F7] dark:bg-slate-900">
              <OperationalScene
                scene="executive-jet-apron"
                className="w-full h-64 lg:flex-1"
                title="Multiflight Angola Corporate Aviation"
              />
              <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <p className="text-xs font-mono-tabular text-slate-500 dark:text-slate-400">
                  {INSTITUTIONAL_INFO.addressPt}
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {lang === 'pt'
                    ? 'Aviação Privada · Ground Handling · Offshore, Inshore & Marítimo'
                    : 'Private Aviation · Ground Handling · Offshore, Inshore & Maritime'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section className="py-16 lg:py-20 bg-[#F3F5F7] dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-bold text-[#1769AA] dark:text-sky-400">
              2012 — PRESENTE
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.about.historyTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.timeline.map((step, index) => (
              <div
                key={step.year}
                className="rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span className="font-bold text-[#D71920]">0{index + 1}.</span>
                    <span className="font-semibold text-[#1769AA] dark:text-sky-400">
                      {step.year}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 3 Operational Pillars: Team, Infrastructure, Safety */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {t.about.pillars.map((pillar, i) => {
              const icons = [Users, Building2, ShieldCheck];
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={pillar.title}
                  className="rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1769AA]/10 dark:bg-sky-500/10 text-[#1769AA] dark:text-sky-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission, Vision & 7 Core Values */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-[#1769AA] text-white p-8 space-y-4 shadow-md">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-white/85">
                <Target className="w-4 h-4" />
                <span>{t.about.missionLabel}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                {t.about.missionText}
              </h2>
            </div>

            <div className="rounded-2xl bg-[#F3F5F7] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#1769AA] dark:text-sky-400">
                <Compass className="w-4 h-4" />
                <span>{t.about.visionLabel}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                {t.about.visionText}
              </h2>
            </div>
          </div>

          {/* 7 Values */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#D71920] uppercase tracking-wider">
                  MULTIFLIGHT ANGOLA
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {t.about.valuesLabel}
                </h2>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {t.about.values.map((val, idx) => (
                <div
                  key={val.name}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F3F5F7]/60 dark:bg-slate-900 p-5 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#1769AA] dark:text-sky-400 font-bold">
                    <span>0{idx + 1}.</span>
                    <CheckCircle2 className="w-4 h-4 text-[#D71920]" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {val.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
