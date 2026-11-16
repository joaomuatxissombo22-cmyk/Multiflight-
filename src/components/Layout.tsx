import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Globe,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sun,
  Moon,
  UserCheck,
  ArrowUpRight,
} from 'lucide-react';
import {
  INSTITUTIONAL_INFO,
  Language,
  PageRoute,
  SERVICES_DATA,
  TRANSLATIONS,
} from '../data/content.ts';
import { MultiflightLogo } from './VisualAssets.tsx';
import { AuthUser } from './PartnerPortalModal.tsx';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, preselectedService?: string) => void;
  lang: Language;
  onToggleLang: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  user: AuthUser | null;
  onOpenPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  lang,
  onToggleLang,
  darkMode,
  onToggleDarkMode,
  user,
  onOpenPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];
  const isServicesActive =
    currentRoute === 'services' || currentRoute.startsWith('service-');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (route: PageRoute, preselectedService?: string) => {
    onNavigate(route, preselectedService);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1769AA] text-white border-b border-white/15 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Official Corporate Brand Logo */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg cursor-pointer shrink-0"
          aria-label="Multiflight Angola - Início"
        >
          <MultiflightLogo variant="light" />
        </button>

        {/* Zone 2: Primary Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold" aria-label="Menu Principal">
          <button
            type="button"
            onClick={() => handleNav('home')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              currentRoute === 'home'
                ? 'border-[#D71920] text-white'
                : 'border-transparent text-white/90 hover:text-white hover:border-white/50'
            }`}
          >
            {t.nav.home}
          </button>

          <button
            type="button"
            onClick={() => handleNav('about')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              currentRoute === 'about'
                ? 'border-[#D71920] text-white'
                : 'border-transparent text-white/90 hover:text-white hover:border-white/50'
            }`}
          >
            {t.nav.about}
          </button>

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesDropdownOpen((prev) => !prev)}
              aria-expanded={servicesDropdownOpen}
              className={`inline-flex items-center gap-1.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                isServicesActive
                  ? 'border-[#D71920] text-white'
                  : 'border-transparent text-white/90 hover:text-white hover:border-white/50'
              }`}
            >
              <span>{t.nav.services}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  servicesDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {servicesDropdownOpen && (
              <div className="absolute left-0 mt-3 w-80 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1769AA] dark:text-sky-400">
                    {t.nav.services}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleNav('services')}
                    className="text-xs font-semibold text-[#D71920] hover:underline cursor-pointer"
                  >
                    {t.nav.allServices}
                  </button>
                </div>
                <div className="py-1">
                  {SERVICES_DATA.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleNav(service.id)}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-[#F3F5F7] dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                        currentRoute === service.id
                          ? 'text-[#1769AA] dark:text-sky-400 bg-[#F3F5F7]/70 dark:bg-slate-800/60'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span>
                        <span className="font-mono-tabular text-slate-400 mr-2">{service.code}.</span>
                        {service[lang].shortTitle}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleNav('safety')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              currentRoute === 'safety'
                ? 'border-[#D71920] text-white'
                : 'border-transparent text-white/90 hover:text-white hover:border-white/50'
            }`}
          >
            {t.nav.safety}
          </button>

          <button
            type="button"
            onClick={() => handleNav('gallery')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              currentRoute === 'gallery'
                ? 'border-[#D71920] text-white'
                : 'border-transparent text-white/90 hover:text-white hover:border-white/50'
            }`}
          >
            {t.nav.gallery}
          </button>

          <button
            type="button"
            onClick={() => handleNav('contact')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              currentRoute === 'contact'
                ? 'border-[#D71920] text-white'
                : 'border-transparent text-white/90 hover:text-white hover:border-white/50'
            }`}
          >
            {t.nav.contact}
          </button>
        </nav>

        {/* Zone 3: Language Switcher, Theme, Client Portal & Primary Proposal CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Bilingual Switcher PT / EN */}
          <div
            className="inline-flex items-center rounded-lg bg-white/10 p-0.5 border border-white/15"
            role="group"
            aria-label="Selector de Idioma / Language Selector"
          >
            <button
              type="button"
              onClick={() => onToggleLang('pt')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                lang === 'pt' ? 'bg-white text-[#1769AA]' : 'text-white/85 hover:text-white'
              }`}
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                lang === 'en' ? 'bg-white text-[#1769AA]' : 'text-white/85 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label={
              darkMode
                ? lang === 'pt'
                  ? 'Activar Modo Claro'
                  : 'Switch to Light Mode'
                : lang === 'pt'
                  ? 'Activar Modo Escuro'
                  : 'Switch to Dark Mode'
            }
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Corporate Portal Auth Button */}
          <button
            type="button"
            onClick={onOpenPortal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>{user ? user.fullName.split(' ')[0] : t.nav.partnerPortal}</span>
          </button>

          {/* Highlighted Action Button: SOLICITAR PROPOSTA */}
          <button
            type="button"
            onClick={() => handleNav('contact')}
            className="px-4 py-2.5 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs font-bold tracking-wide shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.requestProposal}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleLang(lang === 'pt' ? 'en' : 'pt')}
            className="px-2.5 py-1.5 rounded-lg bg-white/15 text-xs font-bold text-white cursor-pointer"
            aria-label="Alternar idioma"
          >
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-white/15 text-white cursor-pointer"
            aria-label="Alternar tema"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg bg-white/15 text-white hover:bg-white/25 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#115287] border-t border-white/15 px-4 pt-3 pb-6 space-y-2">
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10"
          >
            {t.nav.home}
          </button>
          <button
            type="button"
            onClick={() => handleNav('about')}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10"
          >
            {t.nav.about}
          </button>

          <div className="px-3 py-2 bg-white/5 rounded-lg space-y-1">
            <button
              type="button"
              onClick={() => handleNav('services')}
              className="block w-full text-left text-xs font-bold text-white/80 uppercase tracking-wider pb-1"
            >
              {t.nav.services}
            </button>
            {SERVICES_DATA.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => handleNav(service.id)}
                className="block w-full text-left py-1.5 pl-2 text-xs font-medium text-white/95 hover:text-white"
              >
                {service.code}. {service[lang].shortTitle}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleNav('safety')}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10"
          >
            {t.nav.safety}
          </button>
          <button
            type="button"
            onClick={() => handleNav('gallery')}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10"
          >
            {t.nav.gallery}
          </button>
          <button
            type="button"
            onClick={() => handleNav('contact')}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10"
          >
            {t.nav.contact}
          </button>

          <div className="pt-3 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="flex-1 py-2.5 px-4 rounded-lg bg-white/15 text-white text-xs font-bold text-center"
            >
              {user ? user.fullName : t.nav.partnerPortal}
            </button>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="flex-1 py-2.5 px-4 rounded-lg bg-[#D71920] text-white text-xs font-bold text-center"
            >
              {t.nav.requestProposal}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

interface FooterProps {
  onNavigate: (route: PageRoute, preselectedService?: string) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-[#1769AA] text-white border-t-4 border-[#D71920]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Column 1: Institutional Identity */}
          <div className="lg:col-span-4 space-y-4">
            <MultiflightLogo variant="light" />
            <p className="text-sm font-semibold text-white/95 leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-white/80 leading-relaxed">
              {lang === 'pt'
                ? 'Soluções especializadas em aviação privada, assistência aeroportuária, Ground Handling, supervisão e operações offshore, inshore e marítimas em Angola desde 2012.'
                : 'Specialized solutions in private aviation, airport assistance, Ground Handling, supervision, and offshore, inshore, and maritime operations in Angola since 2012.'}
            </p>
            <div className="pt-1 text-xs text-white/85 font-mono-tabular">
              NIF: {INSTITUTIONAL_INFO.nif}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold tracking-wide text-white">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-xs text-white/85">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('safety')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {t.nav.safety}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  {t.footer.privacyLink}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold tracking-wide text-white">
              {t.footer.servicesLinks}
            </h3>
            <ul className="space-y-2 text-xs text-white/85">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(service.id)}
                    className="hover:text-white hover:underline text-left cursor-pointer"
                  >
                    {service[lang].shortTitle}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Contacts & Operating Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold tracking-wide text-white">
              {t.footer.contactInfo}
            </h3>
            <ul className="space-y-2.5 text-xs text-white/90">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D71920] bg-white rounded-xs p-0.5 shrink-0 mt-0.5" />
                <a
                  href={`tel:${INSTITUTIONAL_INFO.phoneDial}`}
                  className="hover:underline font-mono-tabular"
                >
                  {INSTITUTIONAL_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D71920] bg-white rounded-xs p-0.5 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${INSTITUTIONAL_INFO.email}`}
                  className="hover:underline break-all"
                >
                  {INSTITUTIONAL_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D71920] bg-white rounded-xs p-0.5 shrink-0 mt-0.5" />
                <span>
                  {lang === 'pt' ? INSTITUTIONAL_INFO.addressPt : INSTITUTIONAL_INFO.addressEn}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D71920] bg-white rounded-xs p-0.5 shrink-0 mt-0.5" />
                <span>
                  {lang === 'pt' ? INSTITUTIONAL_INFO.hoursPt : INSTITUTIONAL_INFO.hoursEn}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/80">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <span>{INSTITUTIONAL_INFO.website.replace('https://', '')}</span>
            <span>·</span>
            <button
              type="button"
              onClick={() => onNavigate('privacy')}
              className="hover:text-white underline cursor-pointer"
            >
              {t.footer.privacyLink}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
