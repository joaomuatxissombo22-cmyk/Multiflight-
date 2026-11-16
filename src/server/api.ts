import crypto from 'crypto';
import express, { Request, Response, NextFunction } from 'express';

export interface UserAccount {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  role: 'partner' | 'supervisor';
  passwordHash: string;
  createdAt: string;
}

export interface ProposalSubmission {
  id: string;
  referenceCode: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  subject: string;
  description: string;
  location?: string;
  targetDate?: string;
  status: 'received' | 'in_review' | 'dispatched';
  recipientEmail: string;
  createdAt: string;
  userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'multiflight-angola-corporate-secret-2026';
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'geral@multiflightangola.com';

export function hashPassword(password: string, salt = 'mfa_salt_2026'): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

export function createJwtToken(payload: { sub: string; email: string; role: string; company: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyJwtToken(token: string): { sub: string; email: string; role: string; company: string; exp: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');
    if (sig !== expectedSig) return null;
    const decoded = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function sanitizeText(input: unknown, maxLength = 2000): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^[+\d\s()-]{7,25}$/.test(phone);
}

export function createApiRouter() {
  const router = express.Router();
  router.use(express.json({ limit: '256kb' }));

  // In-memory store with pre-seeded corporate partner & sample operational submissions
  const users: Map<string, UserAccount> = new Map();
  const submissions: ProposalSubmission[] = [];
  const rateLimitMap: Map<string, { count: number; resetAt: number }> = new Map();
  const revokedTokens: Set<string> = new Set();

  const partnerUser: UserAccount = {
    id: 'usr-partner-01',
    fullName: 'Carlos Mendes',
    company: 'Atlantic Energy & Aviation Logistics',
    email: 'operacoes@parceiro-aviacao.ao',
    phone: '+244 923 550 083',
    country: 'Angola',
    role: 'partner',
    passwordHash: hashPassword('Multiflight2026!'),
    createdAt: '2026-01-15T09:00:00.000Z',
  };

  const supervisorUser: UserAccount = {
    id: 'usr-supervisor-01',
    fullName: 'Direcção de Operações Multiflight',
    company: 'Multiflight Angola',
    email: 'geral@multiflightangola.com',
    phone: '+244 923 550 083',
    country: 'Angola',
    role: 'supervisor',
    passwordHash: hashPassword('MultiflightAdmin2026!'),
    createdAt: '2026-01-01T08:00:00.000Z',
  };

  users.set(partnerUser.email.toLowerCase(), partnerUser);
  users.set(supervisorUser.email.toLowerCase(), supervisorUser);

  submissions.push(
    {
      id: 'sub-initial-01',
      referenceCode: 'MFA-2026-8412',
      fullName: 'Carlos Mendes',
      company: 'Atlantic Energy & Aviation Logistics',
      email: 'operacoes@parceiro-aviacao.ao',
      phone: '+244 923 550 083',
      country: 'Angola',
      service: 'Ground Handling Services',
      subject: 'Assistência em Escala — Voo Executivo Luanda (LAD)',
      description: 'Coordenação completa de rampa, assistência a passageiros e tripulação para aeronave executiva Bombardier Global em escala técnica e pernoita em Luanda.',
      location: 'Luanda (LAD / NBJ)',
      targetDate: '2026-11-24',
      status: 'in_review',
      recipientEmail: RECIPIENT_EMAIL,
      createdAt: '2026-11-14T14:20:00.000Z',
      userId: partnerUser.id,
    },
    {
      id: 'sub-initial-02',
      referenceCode: 'MFA-2026-8490',
      fullName: 'Carlos Mendes',
      company: 'Atlantic Energy & Aviation Logistics',
      email: 'operacoes@parceiro-aviacao.ao',
      phone: '+244 923 550 083',
      country: 'Angola',
      service: 'Offshore Operations',
      subject: 'Apoio Logístico e Mobilização de Equipa — Bacia do Congo (Soyo)',
      description: 'Coordenação integrada de mobilização aérea e apoio marítimo para rotação de equipa técnica offshore a partir de Luanda e Soyo.',
      location: 'Soyo (SOQ) / Offshore',
      targetDate: '2026-12-02',
      status: 'dispatched',
      recipientEmail: RECIPIENT_EMAIL,
      createdAt: '2026-11-15T10:05:00.000Z',
      userId: partnerUser.id,
    }
  );

  // Middleware to extract optional user from Authorization header
  function getAuthenticatedUser(req: Request): UserAccount | null {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    const token = authHeader.slice(7).trim();
    if (revokedTokens.has(token)) return null;
    const payload = verifyJwtToken(token);
    if (!payload) return null;
    return users.get(payload.email.toLowerCase()) || null;
  }

  // Health & Institutional Info
  router.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      company: 'MULTIFLIGHT ANGOLA',
      nif: '5417323659',
      website: 'https://multiflightangola.com',
      phone: '+244 923 550 083',
      email: RECIPIENT_EMAIL,
      address: 'Luanda, Mártires de Kifangondo, Rua 16, Angola',
      hours: '08:00 - 18:00 (Mon-Fri)',
    });
  });

  // POST /api/auth/login
  router.post('/auth/login', (req: Request, res: Response) => {
    const email = sanitizeText(req.body?.email, 160).toLowerCase();
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!email || !password) {
      res.status(400).json({
        error: 'Credenciais incompletas. Informe o email profissional e a palavra-passe.',
        errorEn: 'Incomplete credentials. Please provide both corporate email and password.',
      });
      return;
    }

    const user = users.get(email);
    if (!user || user.passwordHash !== hashPassword(password)) {
      res.status(401).json({
        error: 'Email ou palavra-passe inválidos.',
        errorEn: 'Invalid email or password.',
      });
      return;
    }

    const token = createJwtToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      company: user.company,
    });

    res.json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        company: user.company,
        email: user.email,
        phone: user.phone,
        country: user.country,
        role: user.role,
      },
    });
  });

  // POST /api/auth/register
  router.post('/auth/register', (req: Request, res: Response) => {
    const fullName = sanitizeText(req.body?.fullName, 120);
    const company = sanitizeText(req.body?.company, 140);
    const email = sanitizeText(req.body?.email, 160).toLowerCase();
    const phone = sanitizeText(req.body?.phone, 40);
    const country = sanitizeText(req.body?.country || 'Angola', 80);
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!fullName || !company || !email || !phone || !password) {
      res.status(400).json({
        error: 'Preencha todos os campos obrigatórios para registar a conta corporativa.',
        errorEn: 'Please complete all required fields to register your corporate account.',
      });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({
        error: 'Formato de email profissional inválido.',
        errorEn: 'Invalid corporate email address format.',
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        error: 'A palavra-passe deve conter pelo menos 8 caracteres.',
        errorEn: 'Password must be at least 8 characters long.',
      });
      return;
    }

    if (users.has(email)) {
      res.status(409).json({
        error: 'Já existe uma conta registada com este email profissional.',
        errorEn: 'An account with this corporate email already exists.',
      });
      return;
    }

    const newUser: UserAccount = {
      id: `usr-${crypto.randomBytes(4).toString('hex')}`,
      fullName,
      company,
      email,
      phone,
      country,
      role: 'partner',
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    users.set(email, newUser);

    const token = createJwtToken({
      sub: newUser.id,
      email: newUser.email,
      role: newUser.role,
      company: newUser.company,
    });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        company: newUser.company,
        email: newUser.email,
        phone: newUser.phone,
        country: newUser.country,
        role: newUser.role,
      },
    });
  });

  // GET /api/auth/me
  router.get('/auth/me', (req: Request, res: Response) => {
    const user = getAuthenticatedUser(req);
    if (!user) {
      res.status(401).json({
        error: 'Sessão não autenticada ou expirada.',
        errorEn: 'Session unauthenticated or expired.',
      });
      return;
    }

    const userSubmissions =
      user.role === 'supervisor'
        ? submissions
        : submissions.filter(
            (s) => s.userId === user.id || s.email.toLowerCase() === user.email.toLowerCase()
          );

    res.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        company: user.company,
        email: user.email,
        phone: user.phone,
        country: user.country,
        role: user.role,
      },
      submissions: userSubmissions,
    });
  });

  // POST /api/auth/logout
  router.post('/auth/logout', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      revokedTokens.add(authHeader.slice(7).trim());
    }
    res.json({ success: true });
  });

  // POST /api/contact (Handles both Contact Inquiries & Commercial Proposals)
  router.post('/contact', (req: Request, res: Response) => {
    const clientIp = (req.ip || req.socket.remoteAddress || 'unknown').toString();
    const now = Date.now();
    const rateRecord = rateLimitMap.get(clientIp);

    if (rateRecord && now < rateRecord.resetAt) {
      if (rateRecord.count >= 15) {
        res.status(429).json({
          error: 'Limite de submissões atingido. Por favor aguarde alguns minutos ou contacte +244 923 550 083.',
          errorEn: 'Submission rate limit reached. Please wait a few minutes or call +244 923 550 083.',
        });
        return;
      }
      rateRecord.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetAt: now + 10 * 60 * 1000 });
    }

    // Anti-spam honeypot check
    const honeypot = req.body?.website_url || req.body?.honeypot;
    if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
      res.status(400).json({
        error: 'Submissão bloqueada pelo filtro anti-spam.',
        errorEn: 'Submission blocked by anti-spam protection.',
      });
      return;
    }

    const fullName = sanitizeText(req.body?.fullName, 120);
    const company = sanitizeText(req.body?.company, 140);
    const email = sanitizeText(req.body?.email, 160);
    const phone = sanitizeText(req.body?.phone, 40);
    const country = sanitizeText(req.body?.country, 80);
    const service = sanitizeText(req.body?.service, 120);
    const subject = sanitizeText(req.body?.subject, 200);
    const description = sanitizeText(req.body?.description, 3000);
    const location = sanitizeText(req.body?.location, 120);
    const targetDate = sanitizeText(req.body?.targetDate, 40);

    if (!fullName || !company || !email || !phone || !country || !service || !subject || !description) {
      res.status(400).json({
        error: 'Todos os campos obrigatórios devem ser preenchidos.',
        errorEn: 'All required fields must be completed.',
      });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({
        error: 'Por favor introduza um endereço de email profissional válido.',
        errorEn: 'Please provide a valid corporate email address.',
      });
      return;
    }

    if (!isValidPhone(phone)) {
      res.status(400).json({
        error: 'Por favor introduza um número de telefone válido.',
        errorEn: 'Please provide a valid phone number.',
      });
      return;
    }

    if (description.length < 10) {
      res.status(400).json({
        error: 'A descrição da solicitação deve conter pelo menos 10 caracteres.',
        errorEn: 'The request description must contain at least 10 characters.',
      });
      return;
    }

    const authUser = getAuthenticatedUser(req);
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `MFA-2026-${randomDigits}`;

    const newSubmission: ProposalSubmission = {
      id: `sub-${crypto.randomBytes(4).toString('hex')}`,
      referenceCode,
      fullName,
      company,
      email,
      phone,
      country,
      service,
      subject,
      description,
      location: location || undefined,
      targetDate: targetDate || undefined,
      status: 'received',
      recipientEmail: RECIPIENT_EMAIL,
      createdAt: new Date().toISOString(),
      userId: authUser?.id,
    };

    submissions.unshift(newSubmission);

    res.status(201).json({
      success: true,
      referenceCode,
      recipientEmail: RECIPIENT_EMAIL,
      submission: newSubmission,
      messagePt: `A sua solicitação (${referenceCode}) foi registada e encaminhada para ${RECIPIENT_EMAIL}. A nossa equipa operacional entrará em contacto brevemente.`,
      messageEn: `Your request (${referenceCode}) has been registered and routed to ${RECIPIENT_EMAIL}. Our operational team will contact you shortly.`,
    });
  });

  // Error handler
  router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({
      error: 'Erro interno no processamento da solicitação.',
      errorEn: 'Internal server error while processing request.',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  });

  return router;
}
