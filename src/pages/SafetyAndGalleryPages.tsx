import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  X,
  ZoomIn,
  MapPin,
} from 'lucide-react';
import {
  GALLERY_ITEMS,
  GalleryItem,
  INSTITUTIONAL_INFO,
  Language,
  PageRoute,
  TRANSLATIONS,
} from '../data/content.ts';
import { OperationalScene } from '../components/VisualAssets.tsx';

interface SafetyPageProps {
  lang: Language;
  onNavigate: (route: PageRoute, preselectedService?: string) => void;
}

export const SafetyPage: React.FC<SafetyPageProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="bg-[#1769AA] text-white py-14 lg:py-20 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold tracking-widest text-white/85 uppercase">
              {t.safety.kicker} · {INSTITUTIONAL_INFO.name}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t.safety.title}
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              {t.safety.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 7 Core Safety & Quality Pillars */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.safety.pillars.map((pillar) => (
              <article
                key={pillar.code}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F3F5F7]/60 dark:bg-slate-900 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tabular text-xs font-extrabold text-[#1769AA] dark:text-sky-400">
                      {pillar.code}. PILAR OPERACIONAL
                    </span>
                    <ShieldCheck className="w-5 h-5 text-[#D71920]" />
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Institutional Transparency & Regulatory Rigor Note */}
          <div className="rounded-2xl bg-[#F3F5F7] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="text-xs font-bold text-[#1769AA] dark:text-sky-400 uppercase tracking-wider">
                {INSTITUTIONAL_INFO.name}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {t.safety.complianceNoteTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.safety.complianceNoteText}
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>{t.nav.requestProposal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface GalleryPageProps {
  lang: Language;
  onNavigate: (route: PageRoute, preselectedService?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categoryKeys = Object.keys(t.gallery.categories) as Array<
    keyof typeof t.gallery.categories
  >;

  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.categoryKey === selectedCategory);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="bg-[#1769AA] text-white py-14 lg:py-20 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold tracking-widest text-white/85 uppercase">
              {t.gallery.kicker} · {INSTITUTIONAL_INFO.name}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t.gallery.title}
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              {t.gallery.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter & Grid */}
      <section className="py-14 lg:py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* 8-Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#1769AA] text-white'
                  : 'bg-[#F3F5F7] dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {t.gallery.filterAll}
            </button>
            {categoryKeys.map((catKey) => (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === catKey
                    ? 'bg-[#1769AA] text-white'
                    : 'bg-[#F3F5F7] dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {t.gallery.categories[catKey]}
              </button>
            ))}
          </div>

          {/* Gallery Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const info = item[lang];
              return (
                <article
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setLightboxItem(item);
                  }}
                  className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#1769AA] transition-all"
                >
                  <div>
                    <div className="h-48 relative overflow-hidden">
                      <OperationalScene
                        scene={item.visualScene}
                        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                        title={info.title}
                      />
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-slate-950/60 text-white flex items-center justify-center opacity-80 group-hover:opacity-100">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="text-xs text-[#1769AA] dark:text-sky-400 font-bold">
                        {info.categoryLabel} · {info.location}
                      </div>
                      <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                        {info.title}
                      </h2>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
            <div className="h-72 sm:h-96 relative">
              <OperationalScene
                scene={lightboxItem.visualScene}
                className="w-full h-full"
                title={lightboxItem[lang].title}
              />
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950/70 text-white hover:bg-slate-950 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#1769AA] dark:text-sky-400">
                  {lightboxItem[lang].categoryLabel} · {lightboxItem[lang].location}
                </p>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {lightboxItem[lang].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {lightboxItem[lang].description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLightboxItem(null);
                  onNavigate('contact');
                }}
                className="px-5 py-2.5 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.nav.requestProposal}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
