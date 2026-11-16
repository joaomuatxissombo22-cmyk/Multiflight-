// server.ts
import dotenv from "dotenv";
import express2 from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// src/server/api.ts
import crypto from "crypto";
import express from "express";
var JWT_SECRET = process.env.JWT_SECRET || "multiflight-angola-corporate-secret-2026";
var RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "geral@multiflightangola.com";
function hashPassword(password, salt = "mfa_salt_2026") {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}
function createJwtToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const exp = Math.floor(Date.now() / 1e3) + 60 * 60 * 24 * 7;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}
function verifyJwtToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const expectedSig = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
    if (sig !== expectedSig) return null;
    const decoded = JSON.parse(Buffer.from(body, "base64url").toString("utf-8"));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1e3)) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}
function sanitizeText(input, maxLength = 2e3) {
  if (typeof input !== "string") return "";
  return input.replace(/[<>]/g, "").trim().slice(0, maxLength);
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^[+\d\s()-]{7,25}$/.test(phone);
}
function createApiRouter() {
  const router = express.Router();
  router.use(express.json({ limit: "256kb" }));
  const users = /* @__PURE__ */ new Map();
  const submissions = [];
  const rateLimitMap = /* @__PURE__ */ new Map();
  const revokedTokens = /* @__PURE__ */ new Set();
  const partnerUser = {
    id: "usr-partner-01",
    fullName: "Carlos Mendes",
    company: "Atlantic Energy & Aviation Logistics",
    email: "operacoes@parceiro-aviacao.ao",
    phone: "+244 923 550 083",
    country: "Angola",
    role: "partner",
    passwordHash: hashPassword("Multiflight2026!"),
    createdAt: "2026-01-15T09:00:00.000Z"
  };
  const supervisorUser = {
    id: "usr-supervisor-01",
    fullName: "Direc\xE7\xE3o de Opera\xE7\xF5es Multiflight",
    company: "Multiflight Angola",
    email: "geral@multiflightangola.com",
    phone: "+244 923 550 083",
    country: "Angola",
    role: "supervisor",
    passwordHash: hashPassword("MultiflightAdmin2026!"),
    createdAt: "2026-01-01T08:00:00.000Z"
  };
  users.set(partnerUser.email.toLowerCase(), partnerUser);
  users.set(supervisorUser.email.toLowerCase(), supervisorUser);
  submissions.push(
    {
      id: "sub-initial-01",
      referenceCode: "MFA-2026-8412",
      fullName: "Carlos Mendes",
      company: "Atlantic Energy & Aviation Logistics",
      email: "operacoes@parceiro-aviacao.ao",
      phone: "+244 923 550 083",
      country: "Angola",
      service: "Ground Handling Services",
      subject: "Assist\xEAncia em Escala \u2014 Voo Executivo Luanda (LAD)",
      description: "Coordena\xE7\xE3o completa de rampa, assist\xEAncia a passageiros e tripula\xE7\xE3o para aeronave executiva Bombardier Global em escala t\xE9cnica e pernoita em Luanda.",
      location: "Luanda (LAD / NBJ)",
      targetDate: "2026-11-24",
      status: "in_review",
      recipientEmail: RECIPIENT_EMAIL,
      createdAt: "2026-11-14T14:20:00.000Z",
      userId: partnerUser.id
    },
    {
      id: "sub-initial-02",
      referenceCode: "MFA-2026-8490",
      fullName: "Carlos Mendes",
      company: "Atlantic Energy & Aviation Logistics",
      email: "operacoes@parceiro-aviacao.ao",
      phone: "+244 923 550 083",
      country: "Angola",
      service: "Offshore Operations",
      subject: "Apoio Log\xEDstico e Mobiliza\xE7\xE3o de Equipa \u2014 Bacia do Congo (Soyo)",
      description: "Coordena\xE7\xE3o integrada de mobiliza\xE7\xE3o a\xE9rea e apoio mar\xEDtimo para rota\xE7\xE3o de equipa t\xE9cnica offshore a partir de Luanda e Soyo.",
      location: "Soyo (SOQ) / Offshore",
      targetDate: "2026-12-02",
      status: "dispatched",
      recipientEmail: RECIPIENT_EMAIL,
      createdAt: "2026-11-15T10:05:00.000Z",
      userId: partnerUser.id
    }
  );
  function getAuthenticatedUser(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.slice(7).trim();
    if (revokedTokens.has(token)) return null;
    const payload = verifyJwtToken(token);
    if (!payload) return null;
    return users.get(payload.email.toLowerCase()) || null;
  }
  router.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      company: "MULTIFLIGHT ANGOLA",
      nif: "5417323659",
      website: "https://multiflightangola.com",
      phone: "+244 923 550 083",
      email: RECIPIENT_EMAIL,
      address: "Luanda, M\xE1rtires de Kifangondo, Rua 16, Angola",
      hours: "08:00 - 18:00 (Mon-Fri)"
    });
  });
  router.post("/auth/login", (req, res) => {
    const email = sanitizeText(req.body?.email, 160).toLowerCase();
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!email || !password) {
      res.status(400).json({
        error: "Credenciais incompletas. Informe o email profissional e a palavra-passe.",
        errorEn: "Incomplete credentials. Please provide both corporate email and password."
      });
      return;
    }
    const user = users.get(email);
    if (!user || user.passwordHash !== hashPassword(password)) {
      res.status(401).json({
        error: "Email ou palavra-passe inv\xE1lidos.",
        errorEn: "Invalid email or password."
      });
      return;
    }
    const token = createJwtToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      company: user.company
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
        role: user.role
      }
    });
  });
  router.post("/auth/register", (req, res) => {
    const fullName = sanitizeText(req.body?.fullName, 120);
    const company = sanitizeText(req.body?.company, 140);
    const email = sanitizeText(req.body?.email, 160).toLowerCase();
    const phone = sanitizeText(req.body?.phone, 40);
    const country = sanitizeText(req.body?.country || "Angola", 80);
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!fullName || !company || !email || !phone || !password) {
      res.status(400).json({
        error: "Preencha todos os campos obrigat\xF3rios para registar a conta corporativa.",
        errorEn: "Please complete all required fields to register your corporate account."
      });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({
        error: "Formato de email profissional inv\xE1lido.",
        errorEn: "Invalid corporate email address format."
      });
      return;
    }
    if (password.length < 8) {
      res.status(400).json({
        error: "A palavra-passe deve conter pelo menos 8 caracteres.",
        errorEn: "Password must be at least 8 characters long."
      });
      return;
    }
    if (users.has(email)) {
      res.status(409).json({
        error: "J\xE1 existe uma conta registada com este email profissional.",
        errorEn: "An account with this corporate email already exists."
      });
      return;
    }
    const newUser = {
      id: `usr-${crypto.randomBytes(4).toString("hex")}`,
      fullName,
      company,
      email,
      phone,
      country,
      role: "partner",
      passwordHash: hashPassword(password),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    users.set(email, newUser);
    const token = createJwtToken({
      sub: newUser.id,
      email: newUser.email,
      role: newUser.role,
      company: newUser.company
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
        role: newUser.role
      }
    });
  });
  router.get("/auth/me", (req, res) => {
    const user = getAuthenticatedUser(req);
    if (!user) {
      res.status(401).json({
        error: "Sess\xE3o n\xE3o autenticada ou expirada.",
        errorEn: "Session unauthenticated or expired."
      });
      return;
    }
    const userSubmissions = user.role === "supervisor" ? submissions : submissions.filter(
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
        role: user.role
      },
      submissions: userSubmissions
    });
  });
  router.post("/auth/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      revokedTokens.add(authHeader.slice(7).trim());
    }
    res.json({ success: true });
  });
  router.post("/contact", (req, res) => {
    const clientIp = (req.ip || req.socket.remoteAddress || "unknown").toString();
    const now = Date.now();
    const rateRecord = rateLimitMap.get(clientIp);
    if (rateRecord && now < rateRecord.resetAt) {
      if (rateRecord.count >= 15) {
        res.status(429).json({
          error: "Limite de submiss\xF5es atingido. Por favor aguarde alguns minutos ou contacte +244 923 550 083.",
          errorEn: "Submission rate limit reached. Please wait a few minutes or call +244 923 550 083."
        });
        return;
      }
      rateRecord.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetAt: now + 10 * 60 * 1e3 });
    }
    const honeypot = req.body?.website_url || req.body?.honeypot;
    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      res.status(400).json({
        error: "Submiss\xE3o bloqueada pelo filtro anti-spam.",
        errorEn: "Submission blocked by anti-spam protection."
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
    const description = sanitizeText(req.body?.description, 3e3);
    const location = sanitizeText(req.body?.location, 120);
    const targetDate = sanitizeText(req.body?.targetDate, 40);
    if (!fullName || !company || !email || !phone || !country || !service || !subject || !description) {
      res.status(400).json({
        error: "Todos os campos obrigat\xF3rios devem ser preenchidos.",
        errorEn: "All required fields must be completed."
      });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({
        error: "Por favor introduza um endere\xE7o de email profissional v\xE1lido.",
        errorEn: "Please provide a valid corporate email address."
      });
      return;
    }
    if (!isValidPhone(phone)) {
      res.status(400).json({
        error: "Por favor introduza um n\xFAmero de telefone v\xE1lido.",
        errorEn: "Please provide a valid phone number."
      });
      return;
    }
    if (description.length < 10) {
      res.status(400).json({
        error: "A descri\xE7\xE3o da solicita\xE7\xE3o deve conter pelo menos 10 caracteres.",
        errorEn: "The request description must contain at least 10 characters."
      });
      return;
    }
    const authUser = getAuthenticatedUser(req);
    const randomDigits = Math.floor(1e3 + Math.random() * 9e3);
    const referenceCode = `MFA-2026-${randomDigits}`;
    const newSubmission = {
      id: `sub-${crypto.randomBytes(4).toString("hex")}`,
      referenceCode,
      fullName,
      company,
      email,
      phone,
      country,
      service,
      subject,
      description,
      location: location || void 0,
      targetDate: targetDate || void 0,
      status: "received",
      recipientEmail: RECIPIENT_EMAIL,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      userId: authUser?.id
    };
    submissions.unshift(newSubmission);
    res.status(201).json({
      success: true,
      referenceCode,
      recipientEmail: RECIPIENT_EMAIL,
      submission: newSubmission,
      messagePt: `A sua solicita\xE7\xE3o (${referenceCode}) foi registada e encaminhada para ${RECIPIENT_EMAIL}. A nossa equipa operacional entrar\xE1 em contacto brevemente.`,
      messageEn: `Your request (${referenceCode}) has been registered and routed to ${RECIPIENT_EMAIL}. Our operational team will contact you shortly.`
    });
  });
  router.use((err, _req, res, _next) => {
    res.status(500).json({
      error: "Erro interno no processamento da solicita\xE7\xE3o.",
      errorEn: "Internal server error while processing request.",
      details: process.env.NODE_ENV === "development" ? err.message : void 0
    });
  });
  return router;
}

// server.ts
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express2();
  const port = Number(process.env.PORT) || 3e3;
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });
  app.use("/api", createApiRouter());
  const distPath = path.resolve(__dirname, "dist");
  const isRunningCompiledServerJs = __filename.endsWith("server.js");
  const isProd = (process.env.NODE_ENV === "production" || isRunningCompiledServerJs) && fs.existsSync(distPath);
  if (isProd) {
    app.use(express2.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(port, "0.0.0.0", () => {
    console.log(`Multiflight Angola Server running on http://0.0.0.0:${port}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
