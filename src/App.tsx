/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Language,
  PageRoute,
  SERVICES_DATA,
  TRANSLATIONS,
} from './data/content.ts';
import {
  pathnameFromRoute,
  routeFromPathname,
  usePageSEO,
} from './utils/seo.ts';
import { Header, Footer } from './components/Layout.tsx';
import { AuthUser, PartnerPortalModal } from './components/PartnerPortalModal.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ServicesOverviewPage, ServiceDetailPage } from './pages/ServicesPages.tsx';
import { SafetyPage, GalleryPage } from './pages/SafetyAndGalleryPages.tsx';
import {
  ContactPage,
  PrivacyPage,
  NotFoundPage,
} from './pages/ContactAndLegalPages.tsx';

export default function App() {
  // 1. Bilingual state (Portuguese default, stored in localStorage)
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('mfa_lang');
      return saved === 'en' ? 'en' : 'pt';
    } catch {
      return 'pt';
    }
  });

  // 2. Dark Mode state (Light default for luminous corporate identity, toggleable to Dark Mode)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mfa_theme') === 'dark';
    } catch {
      return false;
    }
  });

  // 3. URL Routing state
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    routeFromPathname(window.location.pathname)
  );
  const [preselectedService, setPreselectedService] = useState<string | undefined>(
    undefined
  );
  const [prefillLocation, setPrefillLocation] = useState<string | undefined>(undefined);
  const [prefillDate, setPrefillDate] = useState<string | undefined>(undefined);

  // 4. Corporate Portal Authentication State
  const [portalOpen, setPortalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('mfa_auth_token');
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem('mfa_auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // 5. Cookie Consent State
  const [cookieConsent, setCookieConsent] = useState<string | null>(() => {
    try {
      return localStorage.getItem('mfa_cookie_consent');
    } catch {
      return 'accepted';
    }
  });

  // Sync Dark Mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('mfa_theme', darkMode ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  }, [darkMode]);

  // Sync Language preference
  const handleToggleLang = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('mfa_lang', newLang);
    } catch {
      // Ignore storage errors
    }
  };

  // Verify existing auth token on mount
  useEffect(() => {
    if (!token) return;
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        setToken(null);
        setUser(null);
        try {
          localStorage.removeItem('mfa_auth_token');
          localStorage.removeItem('mfa_auth_user');
        } catch {
          // Ignore
        }
      });
  }, [token]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      setCurrentRoute(routeFromPathname(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Update dynamic SEO metadata per page and language
  usePageSEO(currentRoute, lang);

  const handleNavigate = (
    route: PageRoute,
    serviceName?: string,
    location?: string,
    date?: string
  ) => {
    if (serviceName) setPreselectedService(serviceName);
    if (location) setPrefillLocation(location);
    if (date) setPrefillDate(date);

    const targetPath = pathnameFromRoute(route);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (authedUser: AuthUser, jwtToken: string) => {
    setUser(authedUser);
    setToken(jwtToken);
    try {
      localStorage.setItem('mfa_auth_token', jwtToken);
      localStorage.setItem('mfa_auth_user', JSON.stringify(authedUser));
    } catch {
      // Ignore
    }
  };

  const handleLogout = () => {
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('mfa_auth_token');
      localStorage.removeItem('mfa_auth_user');
    } catch {
      // Ignore
    }
  };

  const handleAcceptCookies = (choice: 'accepted' | 'essential') => {
    setCookieConsent(choice);
    try {
      localStorage.setItem('mfa_cookie_consent', choice);
    } catch {
      // Ignore
    }
  };

  const renderPage = () => {
    if (currentRoute.startsWith('service-')) {
      const matched = SERVICES_DATA.find((s) => s.id === currentRoute);
      if (matched) {
        return (
          <ServiceDetailPage
            service={matched}
            lang={lang}
            onNavigate={handleNavigate}
          />
        );
      }
    }

    switch (currentRoute) {
      case 'home':
        return (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            onOpenPortal={() => setPortalOpen(true)}
          />
        );
      case 'about':
        return <AboutPage lang={lang} onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesOverviewPage lang={lang} onNavigate={handleNavigate} />;
      case 'safety':
        return <SafetyPage lang={lang} onNavigate={handleNavigate} />;
      case 'gallery':
        return <GalleryPage lang={lang} onNavigate={handleNavigate} />;
      case 'contact':
        return (
          <ContactPage
            lang={lang}
            preselectedService={preselectedService}
            prefillLocation={prefillLocation}
            prefillDate={prefillDate}
            user={user}
            token={token}
          />
        );
      case 'privacy':
        return <PrivacyPage lang={lang} onNavigate={handleNavigate} />;
      default:
        return <NotFoundPage lang={lang} onNavigate={handleNavigate} />;
    }
  };

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={handleToggleLang}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        user={user}
        onOpenPortal={() => setPortalOpen(true)}
      />

      <main className="flex-1 w-full">{renderPage()}</main>

      <Footer onNavigate={handleNavigate} lang={lang} />

      {/* Corporate Partner Authentication & Proposal Tracking Modal */}
      <PartnerPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        lang={lang}
        user={user}
        token={token}
        onAuthSuccess={handleAuthSuccess}
        onLogout={handleLogout}
        onNewProposalClick={() => handleNavigate('contact')}
      />

      {/* Non-intrusive Cookie Consent Notice */}
      {!cookieConsent && (
        <div
          role="region"
          aria-label={t.cookies.title}
          className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md z-30 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-3"
        >
          <div className="space-y-1">
            <h2 className="text-xs font-extrabold text-slate-900 dark:text-white">
              {t.cookies.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.cookies.text}
            </p>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleAcceptCookies('essential')}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {t.cookies.essentialOnly}
            </button>
            <button
              type="button"
              onClick={() => handleAcceptCookies('accepted')}
              className="px-3.5 py-1.5 rounded-lg bg-[#1769AA] hover:bg-[#115287] text-white text-xs font-bold cursor-pointer"
            >
              {t.cookies.accept}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
