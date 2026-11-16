import assert from 'node:assert/strict';
import http from 'node:http';
import { describe, it, before, after } from 'node:test';
import express from 'express';
import { createApiRouter, verifyJwtToken, sanitizeText } from '../src/server/api.ts';
import {
  INSTITUTIONAL_INFO,
  SERVICES_DATA,
  GALLERY_ITEMS,
  TRANSLATIONS,
} from '../src/data/content.ts';
import { routeFromPathname, pathnameFromRoute } from '../src/utils/seo.ts';

describe('Multiflight Angola — Institutional Website & API Automated Suite', () => {
  let server: http.Server;
  let baseUrl = '';

  before(async () => {
    const app = express();
    app.use('/api', createApiRouter());
    await new Promise<void>((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        const addr = server.address();
        if (addr && typeof addr === 'object') {
          baseUrl = `http://127.0.0.1:${addr.port}`;
        }
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise<void>((resolve) => {
      if (server) server.close(() => resolve());
      else resolve();
    });
  });

  it('verifies institutional identity constants and bilingual completeness', () => {
    assert.equal(INSTITUTIONAL_INFO.name, 'MULTIFLIGHT ANGOLA');
    assert.equal(INSTITUTIONAL_INFO.nif, '5417323659');
    assert.equal(INSTITUTIONAL_INFO.phone, '+244 923 550 083');
    assert.equal(INSTITUTIONAL_INFO.email, 'geral@multiflightangola.com');
    assert.equal(SERVICES_DATA.length, 6);
    assert.equal(GALLERY_ITEMS.length, 8);
    assert.equal(TRANSLATIONS.pt.about.values.length, 7);
    assert.equal(TRANSLATIONS.en.about.values.length, 7);
  });

  it('maps friendly URLs to PageRoutes and back accurately', () => {
    assert.equal(routeFromPathname('/'), 'home');
    assert.equal(routeFromPathname('/quem-somos'), 'about');
    assert.equal(routeFromPathname('/servicos/ground-handling'), 'service-ground-handling');
    assert.equal(
      routeFromPathname('/servicos/ground-handling-supervision'),
      'service-ground-handling-supervision'
    );
    assert.equal(routeFromPathname('/servicos/offshore-operations'), 'service-offshore');
    assert.equal(routeFromPathname('/servicos/inshore-operations'), 'service-inshore');
    assert.equal(routeFromPathname('/servicos/maritime-operations'), 'service-maritime');
    assert.equal(routeFromPathname('/servicos/aviation-services'), 'service-aviation');
    assert.equal(routeFromPathname('/seguranca-qualidade'), 'safety');
    assert.equal(routeFromPathname('/galeria'), 'gallery');
    assert.equal(routeFromPathname('/contactos'), 'contact');
    assert.equal(routeFromPathname('/privacidade'), 'privacy');
    assert.equal(routeFromPathname('/rota-inexistente'), 'not-found');
    assert.equal(pathnameFromRoute('service-offshore'), '/servicos/offshore-operations');
  });

  it('GET /api/health returns confirmed institutional details', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'ok');
    assert.equal(body.nif, '5417323659');
    assert.equal(body.email, 'geral@multiflightangola.com');
  });

  it('POST /api/auth/login authenticates valid corporate partner and rejects wrong password', async () => {
    const failRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'operacoes@parceiro-aviacao.ao',
        password: 'wrong-password',
      }),
    });
    assert.equal(failRes.status, 401);

    const okRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'operacoes@parceiro-aviacao.ao',
        password: 'Multiflight2026!',
      }),
    });
    assert.equal(okRes.status, 200);
    const data = await okRes.json();
    assert.ok(data.token);
    assert.equal(data.user.email, 'operacoes@parceiro-aviacao.ao');

    const verified = verifyJwtToken(data.token);
    assert.ok(verified);
    assert.equal(verified?.email, 'operacoes@parceiro-aviacao.ao');

    // Verify /api/auth/me returns user profile and operational submissions
    const meRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    assert.equal(meRes.status, 200);
    const meData = await meRes.json();
    assert.ok(Array.isArray(meData.submissions));
    assert.ok(meData.submissions.length >= 2);
  });

  it('POST /api/auth/register creates a new corporate partner account', async () => {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Eng. Mateus Neto',
        company: 'Sonangol Logistics Partner',
        email: 'mateus.neto@energia.ao',
        phone: '+244 923 111 222',
        country: 'Angola',
        password: 'StrongPassword2026!',
      }),
    });
    assert.equal(res.status, 201);
    const data = await res.json();
    assert.ok(data.token);
    assert.equal(data.user.company, 'Sonangol Logistics Partner');
  });

  it('POST /api/contact validates 8 required fields, blocks spam honeypot, and creates proposal reference', async () => {
    // 1. Reject incomplete submission
    const badRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'Incomplete' }),
    });
    assert.equal(badRes.status, 400);

    // 2. Reject honeypot spam submission
    const spamRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Bot Spammer',
        company: 'Spam Corp',
        email: 'bot@spam.com',
        phone: '+244 923 550 083',
        country: 'Angola',
        service: 'Ground Handling Services',
        subject: 'Spam',
        description: 'Automated spam payload',
        website_url: 'http://malicious-bot-link.com',
      }),
    });
    assert.equal(spamRes.status, 400);

    // 3. Accept valid 8-field commercial proposal submission
    const validRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: ' Comandante Pedro Silva ',
        company: 'Luanda Executive Jets',
        email: 'pedro.silva@luandajets.ao',
        phone: '+244 923 550 083',
        country: 'Angola',
        service: 'Ground Handling Supervision',
        subject: 'Supervisão de Escala Técnica em Luanda',
        description:
          'Solicitamos proposta para supervisão completa de Ground Handling e apoio à tripulação em Luanda.',
      }),
    });
    assert.equal(validRes.status, 201);
    const validData = await validRes.json();
    assert.equal(validData.success, true);
    assert.match(validData.referenceCode, /^MFA-2026-\d{4}$/);
    assert.equal(validData.recipientEmail, 'geral@multiflightangola.com');
  });

  it('sanitizes HTML angle brackets from user inputs', () => {
    const cleaned = sanitizeText('<script>alert("xss")</script>Multiflight');
    assert.ok(!cleaned.includes('<'));
    assert.ok(!cleaned.includes('>'));
  });
});
