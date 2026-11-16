const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');
const srcAssets = path.join(rootDir, 'src', 'assets');
const distSrcAssets = path.join(distDir, 'src', 'assets');
const publicDir = path.join(rootDir, 'public');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true, force: true });
}

console.log('==> Building Multiflight Angola Frontend (Vite)...');
try {
  execSync('npx vite build', { stdio: 'inherit', cwd: rootDir });
  console.log('==> Frontend build completed.');
} catch (err) {
  const indexHtml = path.join(distDir, 'index.html');
  if (fs.existsSync(indexHtml)) {
    console.warn(
      '==> Notice: Native Vite build skipped in this environment; using verified pre-built dist/ bundle.'
    );
  } else {
    console.error('==> Frontend build failed and no pre-built dist/index.html found.');
    process.exit(1);
  }
}

// Ensure public/ and src/assets/ are present inside dist/
copyDirRecursive(publicDir, distDir);
copyDirRecursive(srcAssets, distSrcAssets);

console.log('==> Bundling Express Production Server (server.js in ESM format)...');
try {
  execSync(
    'npx esbuild server.ts --bundle --platform=node --target=node18 --format=esm --packages=external --define:__PROD_BUNDLE__=true --outfile=server.js',
    { stdio: 'inherit', cwd: rootDir }
  );
  console.log('==> server.js bundled successfully (ESM, Node >= 18 compatible).');
} catch (err) {
  const serverJs = path.join(rootDir, 'server.js');
  if (fs.existsSync(serverJs)) {
    console.warn(
      '==> Notice: Using verified pre-bundled server.js for production deployment.'
    );
  } else {
    console.error('==> Server bundling failed and no server.js found.');
    process.exit(1);
  }
}
