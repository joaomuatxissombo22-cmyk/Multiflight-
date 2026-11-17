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

  const industryNews = [
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

  // GET /api/news — Returns recent Angolan aviation & logistics industry updates
  router.get('/news', (req: Request, res: Response) => {
    const category = sanitizeText(req.query.category, 40).toLowerCase();
    const filtered =
      category && category !== 'all'
        ? industryNews.filter((item) => item.category === category)
        : industryNews;

    res.json({
      status: 'ok',
      updatedAt: new Date().toISOString(),
      total: filtered.length,
      items: filtered,
    });
  });

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
