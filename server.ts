import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { createApiRouter } from './src/server/api.ts';

dotenv.config();

declare const __PROD_BUNDLE__: boolean | undefined;

const rootDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd();
const app = express();

// Trust reverse proxies (Hostinger LiteSpeed / Passenger / Cloud Run / Nginx)
app.set('trust proxy', 1);

// Security & Cross-Device Compatibility Headers (Desktop + Mobile + WebView)
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (_req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  next();
});

// Readiness / Liveness probe to prevent 503 on load balancers
app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'multiflight-angola' });
});

// Mount API routes
app.use('/api', createApiRouter());

function resolveDistPath(): string {
  const candidates = [
    path.resolve(rootDir, 'dist'),
    path.resolve(process.cwd(), 'dist'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, 'index.html'))) {
      return candidate;
    }
  }
  return candidates[0];
}

const distPath = resolveDistPath();
const isCompiledProd =
  typeof __PROD_BUNDLE__ !== 'undefined' && __PROD_BUNDLE__ === true;
const hasBuiltIndex = fs.existsSync(path.join(distPath, 'index.html'));
const isProd =
  isCompiledProd ||
  (process.env.NODE_ENV === 'production' && hasBuiltIndex);
const isAiStudioContainer = Boolean(
  process.env.CONTROL_PLANE_PORT || process.env.DEFAULT_APP_PORT
);

if (isProd) {
  // Synchronous production setup for Hostinger LiteSpeed (lsnode.js), Passenger & Node.js
  app.use(
    express.static(distPath, {
      maxAge: '1h',
      etag: true,
      index: false,
    })
  );

  const publicDir = path.resolve(rootDir, 'public');
  if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir, { maxAge: '1h', etag: true }));
  }

  const srcAssetsDir = path.resolve(rootDir, 'src/assets');
  if (fs.existsSync(srcAssetsDir)) {
    app.use('/src/assets', express.static(srcAssetsDir, { maxAge: '1h', etag: true }));
  }

  // SPA Fallback for all client routes on desktop and mobile
  app.get('*', (_req, res) => {
    const indexFile = path.join(distPath, 'index.html');
    if (fs.existsSync(indexFile)) {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(indexFile);
    } else {
      res.status(200).send(
        '<!doctype html><html lang="pt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Multiflight Angola</title></head><body><h1>Multiflight Angola</h1><p>Servidor operacional activo.</p></body></html>'
      );
    }
  });

  const rawPort = process.env.PORT ? process.env.PORT.trim() : '';
  const listenTarget: string | number = isAiStudioContainer
    ? Number(process.env.DEFAULT_APP_PORT) || 3000
    : rawPort && /^\d+$/.test(rawPort)
      ? Number(rawPort)
      : rawPort || 3000;

  // Call app.listen(listenTarget, callback) synchronously without host IP
  // so LiteSpeed lsnode.js / Passenger intercepts http.Server.prototype.listen cleanly
  const server = app.listen(listenTarget, () => {
    console.log(`Multiflight Angola Production Server listening on ${listenTarget}`);
  });
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
  server.on('error', (err: NodeJS.ErrnoException) => {
    console.error('Production server listen error:', err.message);
  });
} else {
  // Development mode (AI Studio Vite middleware on port 3000)
  async function startDevServer() {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    const devPort = Number(process.env.DEFAULT_APP_PORT) || 3000;
    app.listen(devPort, '0.0.0.0', () => {
      console.log(`Multiflight Angola Dev Server running on http://0.0.0.0:${devPort}`);
    });
  }

  startDevServer().catch((err) => {
    console.error('Failed to start dev server:', err);
  });
}

export default app;
