import React, { useState, useEffect } from 'react';
import { X, Lock, Building2, CheckCircle2, FileText, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../data/content.ts';

export interface AuthUser {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  role: 'partner' | 'supervisor';
}

export interface SubmissionItem {
  id: string;
  referenceCode: string;
  fullName: string;
  company: string;
  email: string;
  service: string;
  subject: string;
  description: string;
  location?: string;
  targetDate?: string;
  status: 'received' | 'in_review' | 'dispatched';
  createdAt: string;
}

interface PartnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  user: AuthUser | null;
  token: string | null;
  onAuthSuccess: (user: AuthUser, token: string) => void;
  onLogout: () => void;
  onNewProposalClick: () => void;
}

export const PartnerPortalModal: React.FC<PartnerPortalModalProps> = ({
  isOpen,
  onClose,
  lang,
  user,
  token,
  onAuthSuccess,
  onLogout,
  onNewProposalClick,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('operacoes@parceiro-aviacao.ao');
  const [password, setPassword] = useState('Multiflight2026!');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Angola');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  useEffect(() => {
    if (isOpen && user && token) {
      setLoadingSubmissions(true);
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          if (Array.isArray(data.submissions)) {
            setSubmissions(data.submissions);
          }
        })
        .catch(() => {
          // Ignore silent fetch error
        })
        .finally(() => setLoadingSubmissions(false));
    }
  }, [isOpen, user, token]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload =
        mode === 'login'
          ? { email, password }
          : { fullName, company, email, phone, country, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(lang === 'pt' ? data.error || 'Erro na autenticação.' : data.errorEn || 'Authentication error.');
      } else {
        onAuthSuccess(data.user, data.token);
      }
    } catch {
      setError(
        lang === 'pt'
          ? 'Não foi possível comunicar com o servidor de autenticação.'
          : 'Unable to reach the authentication server.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status: SubmissionItem['status']) => {
    if (lang === 'pt') {
      if (status === 'dispatched') return 'Proposta Enviada / Operação Confirmada';
      if (status === 'in_review') return 'Em Análise Técnica';
      return 'Recebido pela Direcção Operacional';
    }
    if (status === 'dispatched') return 'Proposal Sent / Operation Confirmed';
    if (status === 'in_review') return 'Under Technical Review';
    return 'Received by Operations Desk';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-modal-title"
    >
      <div className="relative w-full max-w-2xl rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#1769AA] px-6 py-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-white shrink-0" />
            <div>
              <h2 id="portal-modal-title" className="text-lg font-bold tracking-tight">
                {lang === 'pt'
                  ? 'Portal Corporativo Multiflight Angola'
                  : 'Multiflight Angola Corporate Portal'}
              </h2>
              <p className="text-xs text-white/80">
                {lang === 'pt'
                  ? 'Acompanhamento de solicitações de Ground Handling, Aviação e Operações Marítimas'
                  : 'Track Ground Handling, Aviation, and Maritime Operational Requests'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={lang === 'pt' ? 'Fechar modal' : 'Close modal'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {user ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {lang === 'pt' ? 'Conta Corporativa Autenticada' : 'Authenticated Corporate Account'}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {user.fullName}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {user.company} · <span className="font-mono-tabular">{user.email}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNewProposalClick();
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#D71920] hover:bg-[#B51218] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {lang === 'pt' ? 'Nova Solicitação' : 'New Request'}
                  </button>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {lang === 'pt' ? 'Terminar Sessão' : 'Sign Out'}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1769AA]" />
                  {lang === 'pt'
                    ? 'Histórico de Solicitações e Propostas Operacionais'
                    : 'Operational Requests & Proposals History'}
                </h4>

                {loadingSubmissions ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
                    {lang === 'pt' ? 'A carregar registo operacional...' : 'Loading operational records...'}
                  </p>
                ) : submissions.length === 0 ? (
                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-6 text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {lang === 'pt'
                        ? 'Ainda não existem solicitações associadas a esta conta.'
                        : 'No operational requests linked to this account yet.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {submissions.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-[#F3F5F7]/60 dark:bg-slate-800/50"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                          <span className="font-mono-tabular font-semibold text-[#1769AA] dark:text-sky-400">
                            {item.referenceCode}
                          </span>
                          <span>·</span>
                          <span>{item.service}</span>
                          {item.targetDate && (
                            <>
                              <span>·</span>
                              <span className="font-mono-tabular">{item.targetDate}</span>
                            </>
                          )}
                        </div>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                          {item.subject}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="mt-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs">
                          <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA]" />
                            {getStatusLabel(item.status)}
                          </span>
                          {item.location && (
                            <span className="text-slate-500 dark:text-slate-400">{item.location}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Mode Switcher */}
              <div className="flex items-center gap-2 p-1 bg-[#F3F5F7] dark:bg-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className={`flex-1 py-2 px-4 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    mode === 'login'
                      ? 'bg-[#1769AA] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lang === 'pt' ? 'Iniciar Sessão Corporativa' : 'Corporate Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError('');
                    setEmail('');
                    setPassword('');
                  }}
                  className={`flex-1 py-2 px-4 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    mode === 'register'
                      ? 'bg-[#1769AA] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lang === 'pt' ? 'Registar Parceiro / Cliente' : 'Register Partner Account'}
                </button>
              </div>

              {mode === 'login' && (
                <div className="rounded-lg bg-[#F3F5F7] dark:bg-slate-800/70 p-3.5 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {lang === 'pt' ? 'Credenciais de Demonstração:' : 'Demo Partner Credentials:'}
                    </span>{' '}
                    <span className="font-mono-tabular">operacoes@parceiro-aviacao.ao</span> /{' '}
                    <span className="font-mono-tabular">Multiflight2026!</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('operacoes@parceiro-aviacao.ao');
                      setPassword('Multiflight2026!');
                    }}
                    className="px-2.5 py-1 text-xs font-semibold text-[#1769AA] dark:text-sky-400 hover:underline shrink-0 cursor-pointer"
                  >
                    {lang === 'pt' ? 'Preencher' : 'Auto-fill'}
                  </button>
                </div>
              )}

              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 p-3.5 text-xs font-medium text-[#D71920] dark:text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {lang === 'pt' ? 'Nome completo *' : 'Full name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:outline-none"
                        placeholder={lang === 'pt' ? 'Nome do responsável' : 'Contact person name'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {lang === 'pt' ? 'Empresa / Operador *' : 'Company / Operator *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:outline-none"
                        placeholder={lang === 'pt' ? 'Nome da organização' : 'Organization name'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {lang === 'pt' ? 'Telefone *' : 'Phone *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:outline-none"
                        placeholder="+244 923 550 083"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {lang === 'pt' ? 'País *' : 'Country *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'pt' ? 'Email profissional *' : 'Corporate email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:outline-none"
                    placeholder="nome@empresa.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'pt' ? 'Palavra-passe *' : 'Password *'}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#1769AA] focus:outline-none"
                    placeholder="••••••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-5 rounded-lg bg-[#1769AA] hover:bg-[#115287] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Lock className="w-4 h-4" />
                  {loading
                    ? lang === 'pt'
                      ? 'A autenticar...'
                      : 'Authenticating...'
                    : mode === 'login'
                      ? lang === 'pt'
                        ? 'Aceder ao Portal Corporativo'
                        : 'Sign In to Corporate Portal'
                      : lang === 'pt'
                        ? 'Criar Conta Corporativa'
                        : 'Create Corporate Account'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
