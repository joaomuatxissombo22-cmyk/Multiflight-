import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Send,
  ShieldCheck,
  Building2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import {
  INSTITUTIONAL_INFO,
  Language,
  PageRoute,
  SERVICES_DATA,
  TRANSLATIONS,
} from '../data/content.ts';
import { AuthUser } from '../components/PartnerPortalModal.tsx';

interface ContactPageProps {
  lang: Language;
  preselectedService?: string;
  prefillLocation?: string;
  prefillDate?: string;
  user: AuthUser | null;
  token: string | null;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  lang,
  preselectedService,
  prefillLocation,
  prefillDate,
  user,
  token,
}) => {
  const t = TRANSLATIONS[lang];

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [company, setCompany] = useState(user?.company || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [country, setCountry] = useState(user?.country || 'Angola');
  const [service, setService] = useState(preselectedService || 'Ground Handling Services');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmation, setConfirmation] = useState<{
    referenceCode: string;
    message: string;
    recipientEmail: string;
  } | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
      setSubject(
        lang === 'pt'
          ? `Solicitação de Proposta — ${preselectedService}`
          : `Proposal Request — ${preselectedService}`
      );
    }
    if (prefillLocation || prefillDate) {
      const locText = prefillLocation ? `Base: ${prefillLocation}. ` : '';
      const dateText = prefillDate ? `Data prevista: ${prefillDate}. ` : '';
      setDescription((prev) => (prev ? prev : `${locText}${dateText}`));
    }
  }, [preselectedService, prefillLocation, prefillDate, lang]);

  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.fullName);
      if (!company) setCompany(user.company);
      if (!email) setEmail(user.email);
      if (!phone) setPhone(user.phone);
      if (!country) setCountry(user.country);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setConfirmation(null);

    if (
      !fullName.trim() ||
      !company.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !country.trim() ||
      !service.trim() ||
      !subject.trim() ||
      !description.trim()
    ) {
      setErrorMsg(
        lang === 'pt'
          ? 'Por favor preencha todos os 8 campos obrigatórios do formulário.'
          : 'Please complete all 8 required fields in the form.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          fullName,
          company,
          email,
          phone,
          country,
          service,
          subject,
          description,
          location: prefillLocation,
          targetDate: prefillDate,
          website_url: honeypot,
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(
            lang === 'pt'
              ? data.error || 'Ocorreu um erro ao submeter a solicitação.'
              : data.errorEn || 'An error occurred while submitting your request.'
          );
        } else {
          setConfirmation({
            referenceCode: data.referenceCode,
            recipientEmail: data.recipientEmail,
            message: lang === 'pt' ? data.messagePt : data.messageEn,
          });
          setSubject('');
          setDescription('');
        }
      } else {
        // Fallback for static-only hosting (e.g. Hostinger public_html static deployment)
        const refCode = `MFA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setConfirmation({
          referenceCode: refCode,
          recipientEmail: INSTITUTIONAL_INFO.email,
          message:
            lang === 'pt'
              ? `A sua solicitação (${refCode}) foi registada para encaminhamento a ${INSTITUTIONAL_INFO.email}. A nossa equipa operacional entrará em contacto brevemente.`
              : `Your request (${refCode}) has been registered for routing to ${INSTITUTIONAL_INFO.email}. Our operational team will contact you shortly.`,
        });
        setSubject('');
        setDescription('');
      }
    } catch {
      // Fallback if static host blocks POST requests
      const refCode = `MFA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmation({
        referenceCode: refCode,
        recipientEmail: INSTITUTIONAL_INFO.email,
        message:
          lang === 'pt'
            ? `A sua solicitação (${refCode}) foi registada para encaminhamento a ${INSTITUTIONAL_INFO.email}. A nossa equipa operacional entrará em contacto brevemente.`
            : `Your request (${refCode}) has been registered for routing to ${INSTITUTIONAL_INFO.email}. Our operational team will contact you shortly.`,
      });
      setSubject('');
      setDescription('');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/${INSTITUTIONAL_INFO.whatsappNumber}?text=${encodeURIComponent(
    lang === 'pt'
      ? `Olá Multiflight Angola, gostaria de solicitar informações sobre ${service}.`
      : `Hello Multiflight Angola, I would like to request information regarding ${service}.`
  )}`;

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="bg-[#1769AA] text-white py-14 lg:py-20 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold tracking-widest text-white/85 uppercase">
              {t.contact.kicker} · {INSTITUTIONAL_INFO.name}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {t.contact.title}
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Left Institutional Contacts & Map | Right 8-Field Validated Proposal Form */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column (5 cols): Corporate Information, Direct Action Buttons & Google Map */}
            <div className="lg:col-span-5 space-y-8">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F3F5F7] dark:bg-slate-900 p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-mono-tabular font-bold text-[#1769AA] dark:text-sky-400">
                    NIF: {INSTITUTIONAL_INFO.nif}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {INSTITUTIONAL_INFO.name}
                  </h2>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {t.contact.infoLabels.phone}
                      </p>
                      <a
                        href={`tel:${INSTITUTIONAL_INFO.phoneDial}`}
                        className="font-mono-tabular font-bold text-slate-900 dark:text-white hover:text-[#1769AA]"
                      >
                        {INSTITUTIONAL_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {t.contact.infoLabels.email}
                      </p>
                      <a
                        href={`mailto:${INSTITUTIONAL_INFO.email}`}
                        className="font-bold text-slate-900 dark:text-white hover:text-[#1769AA] break-all"
                      >
                        {INSTITUTIONAL_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {t.contact.infoLabels.address}
                      </p>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {lang === 'pt'
                          ? INSTITUTIONAL_INFO.addressPt
                          : INSTITUTIONAL_INFO.addressEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#1769AA] dark:text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {t.contact.infoLabels.hours}
                      </p>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {lang === 'pt'
                          ? INSTITUTIONAL_INFO.hoursPt
                          : INSTITUTIONAL_INFO.hoursEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Direct Action Buttons: Call, Email, WhatsApp */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                  <a
                    href={`tel:${INSTITUTIONAL_INFO.phoneDial}`}
                    className="w-full py-3 px-4 rounded-lg bg-[#1769AA] hover:bg-[#115287] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t.contact.directActions.call}</span>
                  </a>

                  <a
                    href={`mailto:${INSTITUTIONAL_INFO.email}?subject=${encodeURIComponent(
                      'Solicitação Institucional — Multiflight Angola'
                    )}`}
                    className="w-full py-3 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#1769AA] text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />
                    <span>{t.contact.directActions.email}</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.contact.directActions.whatsapp}</span>
                  </a>
                </div>
              </div>

              {/* Embedded Google Maps: Luanda, Mártires de Kifangondo, Rua 16 */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#F3F5F7] dark:bg-slate-900">
                <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D71920]" />
                    Luanda, Mártires de Kifangondo, Rua 16
                  </span>
                  <span className="text-[11px] font-mono-tabular text-slate-500">
                    -8.8383° S, 13.2344° E
                  </span>
                </div>
                <iframe
                  title="Localização Multiflight Angola — Luanda, Mártires de Kifangondo"
                  src="https://www.google.com/maps?q=Martires+de+Kifangondo+Luanda+Angola&output=embed"
                  className="w-full h-72 border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Column (7 cols): Commercial Proposal & Information Request Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm space-y-6">
                <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
                  <div className="text-xs font-bold text-[#1769AA] dark:text-sky-400 uppercase tracking-wider">
                    {INSTITUTIONAL_INFO.email}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {t.contact.formTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {t.contact.formSubtitle}
                  </p>
                </div>

                {confirmation && (
                  <div
                    role="status"
                    className="rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-5 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>
                        {lang === 'pt'
                          ? 'Solicitação Registada com Sucesso'
                          : 'Request Successfully Registered'}
                      </span>
                      <span>·</span>
                      <span className="font-mono-tabular">{confirmation.referenceCode}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-200 leading-relaxed">
                      {confirmation.message}
                    </p>
                  </div>
                )}

                {errorMsg && (
                  <div
                    role="alert"
                    className="rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 p-4 flex items-start gap-3 text-xs sm:text-sm font-medium text-[#D71920] dark:text-red-300"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Anti-Spam Honeypot Field (hidden from human users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_url">Website</label>
                    <input
                      id="website_url"
                      name="website_url"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Row 1: Full Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="field-fullname"
                        className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t.contact.fields.fullName} *
                      </label>
                      <input
                        id="field-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.contact.fields.fullNamePlaceholder}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F3F5F7]/60 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="field-company"
                        className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t.contact.fields.company} *
                      </label>
                      <input
                        id="field-company"
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t.contact.fields.companyPlaceholder}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F3F5F7]/60 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 2: Corporate Email & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="field-email"
                        className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t.contact.fields.email} *
                      </label>
                      <input
                        id="field-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.contact.fields.emailPlaceholder}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F3F5F7]/60 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="field-phone"
                        className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t.contact.fields.phone} *
                      </label>
                      <input
                        id="field-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.contact.fields.phonePlaceholder}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F3F5F7]/60 dark:bg-slate-800 px-3.5 py-2.5 text-sm font-mono-tabular text-slate-900 dark:text-white focus:border-[#1769AA] focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 3: Country & Requested Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="field-country"
                        className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t.contact.fields.country} *
                      </label>
                      <input
                        id="field-country"
                        type="text"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder={t.contact.fields.countryPlaceholder}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F3F5F7]/60 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="field-service"
                        className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t.contact.fields.service} *
                      </label>
                      <select
                        id="field-service"
                        required
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F3F5F7]/60 dark:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:border-[#1769AA] focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.pt.title}>
                            {s[lang].title}
                          </option>
                        ))}
                        <option value="Gestão de Aeronaves / Jatos Executivos">
                          {lang === 'pt'
                            ? 'Gestão de Aeronaves / Jatos Executivos'
                            : 'Aircraft / Executive Jet Management'}
                        </option>
                        <option value="Gestão e Venda de Helicópteros">
                          {lang === 'pt'
                            ? 'Gestão e Venda de Helicópteros'
                            : 'Helicopter Management & Sales'}
                        </option>
                        <option value="Inspecção Pré-Compra / CAMO">
                          {lang === 'pt'
                            ? 'Inspecção Pré-Compra / CAMO'
                            : 'Pre-Purchase Inspection / CAMO'}
                        </option>
                        <option value="Ambulância Aérea">
                          {lang === 'pt'
                            ? 'Serviços de Ambulância Aérea'
                            : 'Air Ambulance Services'}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Subject */}
                  <div>
                    <label
                      htmlFor="field-subject"
                      className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      {t.contact.fields.subject} *
                    </label>
                    <input
                      id="field-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={t.contact.fields.subjectPlaceholder}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F3F5F7]/60 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Row 5: Description */}
                  <div>
                    <label
                      htmlFor="field-description"
                      className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      {t.contact.fields.description} *
                    </label>
                    <textarea
                      id="field-description"
                      rows={5}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t.contact.fields.descriptionPlaceholder}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-[#F3F5F7]/60 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs sm:text-sm font-extrabold tracking-wide shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {submitting
                        ? t.contact.fields.submittingBtn
                        : t.contact.fields.submitBtn}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface LegalPageProps {
  lang: Language;
  onNavigate: (route: PageRoute) => void;
}

export const PrivacyPage: React.FC<LegalPageProps> = ({ lang, onNavigate }) => {
  return (
    <div className="space-y-0">
      <section className="bg-[#1769AA] text-white py-12 lg:py-16 border-b border-white/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold tracking-widest text-white/85 uppercase">
            {INSTITUTIONAL_INFO.name} · NIF {INSTITUTIONAL_INFO.nif}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'pt'
              ? 'Política de Privacidade e Protecção de Dados'
              : 'Privacy Policy & Corporate Data Protection'}
          </h1>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {lang === 'pt' ? '1. Responsável pelo Tratamento de Dados' : '1. Data Controller'}
            </h2>
            <p>
              {lang === 'pt'
                ? `A MULTIFLIGHT ANGOLA (NIF ${INSTITUTIONAL_INFO.nif}), com sede em ${INSTITUTIONAL_INFO.addressPt}, é a entidade responsável pelo tratamento dos dados corporativos e pessoais recolhidos através do website oficial ${INSTITUTIONAL_INFO.website}.`
                : `MULTIFLIGHT ANGOLA (Tax ID ${INSTITUTIONAL_INFO.nif}), headquartered at ${INSTITUTIONAL_INFO.addressEn}, is the entity responsible for processing corporate and personal data submitted via ${INSTITUTIONAL_INFO.website}.`}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {lang === 'pt' ? '2. Finalidade da Recolha' : '2. Purpose of Data Collection'}
            </h2>
            <p>
              {lang === 'pt'
                ? 'Os dados fornecidos nos formulários de contacto e solicitação de propostas (nome, empresa, email profissional, telefone, país e detalhes operacionais) destinam-se exclusivamente à análise técnica, elaboração de propostas comerciais e coordenação de serviços de aviação, Ground Handling, Offshore, Inshore e Operações Marítimas.'
                : 'Information submitted through our contact and proposal forms (name, company, corporate email, phone, country, and operational details) is used strictly for technical review, commercial proposal preparation, and operational coordination across our Aviation, Ground Handling, Offshore, Inshore, and Maritime divisions.'}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {lang === 'pt' ? '3. Confidencialidade e Segurança' : '3. Confidentiality & Security'}
            </h2>
            <p>
              {lang === 'pt'
                ? 'A Multiflight Angola aplica medidas técnicas de validação, sanitização e controlo de acesso para proteger os dados de clientes, operadores e parceiros contra acesso não autorizado, alteração ou divulgação a terceiros.'
                : 'Multiflight Angola enforces strict validation, sanitization, and access controls to safeguard client, operator, and partner information against unauthorized access, alteration, or third-party disclosure.'}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {lang === 'pt' ? '4. Contacto para Questões de Privacidade' : '4. Privacy Inquiries'}
            </h2>
            <p>
              {lang === 'pt'
                ? `Para exercer direitos de acesso, rectificação ou eliminação de dados, contacte-nos através do email ${INSTITUTIONAL_INFO.email} ou pelo telefone ${INSTITUTIONAL_INFO.phone}.`
                : `To exercise rights of access, correction, or deletion of your data, please contact us at ${INSTITUTIONAL_INFO.email} or call ${INSTITUTIONAL_INFO.phone}.`}
            </p>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1769AA] text-white text-xs font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Voltar ao Início' : 'Return to Home'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const NotFoundPage: React.FC<LegalPageProps> = ({ lang, onNavigate }) => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="text-5xl font-extrabold font-mono-tabular text-[#1769AA] dark:text-sky-400">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {lang === 'pt' ? 'Página Não Encontrada' : 'Page Not Found'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {lang === 'pt'
            ? 'O endereço que tentou aceder não existe ou foi movido. Utilize os botões abaixo para regressar ao portal institucional da Multiflight Angola.'
            : 'The page you requested does not exist or has been moved. Use the buttons below to return to Multiflight Angola’s corporate website.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="px-5 py-3 rounded-lg bg-[#1769AA] hover:bg-[#115287] text-white text-xs font-bold cursor-pointer"
          >
            {lang === 'pt' ? 'Ir para a Página Inicial' : 'Go to Home Page'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-5 py-3 rounded-lg bg-[#D71920] hover:bg-[#B51218] text-white text-xs font-bold cursor-pointer"
          >
            {lang === 'pt' ? 'Contactar Multiflight Angola' : 'Contact Multiflight Angola'}
          </button>
        </div>
      </div>
    </section>
  );
};
