# MULTIFLIGHT ANGOLA — Website Institucional Oficial

Website institucional bilingue (Português / Inglês) desenvolvido para a **MULTIFLIGHT ANGOLA** (`https://multiflightangola.com`), vocacionado para os sectores de **Aviação Privada, Assistência Aeroportuária, Ground Handling Services, Ground Handling Supervision, e Operações Offshore, Inshore e Marítimas**.

---

## 1. Identidade Institucional Confirmada

- **Entidade:** MULTIFLIGHT ANGOLA
- **NIF:** `5417323659`
- **Domínio Oficial:** `https://multiflightangola.com`
- **Telefone / WhatsApp:** `+244 923 550 083`
- **Email Oficial:** `geral@multiflightangola.com`
- **Endereço:** Luanda, Mártires de Kifangondo, Rua 16, Angola.
- **Horário de Funcionamento:** Segunda a sexta-feira, das 08h00 às 18h00.

---

## 2. Arquitectura e Tecnologias

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Lucide Icons
- **Backend / API:** Node.js + Express (`server.ts` e `src/server/api.ts`)
- **Suporte Bilingue:** Português (idioma predefinido) e Inglês, com persistência automática em `localStorage` (`mfa_lang`).
- **Suporte de Tema Visual:** Modo Claro corporativo (`#1769AA`, `#D71920`, `#FFFFFF`, `#F3F5F7`) e Modo Escuro (`Dark Mode`).
- **Portal Corporativo & Autenticação:** API JWT (`/api/auth/login`, `/api/auth/register`, `/api/auth/me`, `/api/auth/logout`) para acompanhamento de propostas e solicitações operacionais.
- **Formulário de Propostas & Contactos:** Validação completa dos 8 campos obrigatórios, protecção anti-spam (honeypot + rate limiting + sanitização XSS) e encaminhamento estruturado para `geral@multiflightangola.com` (`/api/contact`).
- **SEO Técnico:** Metadados dinâmicos por página, Open Graph, Twitter Cards, dados estruturados `Schema.org` (JSON-LD), `public/sitemap.xml` e `public/robots.txt`.

---

## 3. Instruções para Execução Local

### Pré-requisitos
- **Node.js** v20 ou superior
- **npm** v9 ou superior

### Passos
1. Clonar o repositório:
   ```bash
   git clone https://github.com/sua-organizacao/multiflight-angola.git
   cd multiflight-angola
   ```
2. Instalar as dependências:
   ```bash
   npm install
   ```
3. Configurar as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
4. Iniciar o servidor de desenvolvimento (Frontend + API Express na porta `3000`):
   ```bash
   npm run dev
   ```
5. Executar os testes automatizados:
   ```bash
   npm test
   ```
6. Gerar a compilação de produção (`dist/`):
   ```bash
   npm run build
   ```

---

## 4. Fluxo de Integração e Publicação: Google AI Studio → GitHub → Hostinger

### Como resolver o erro: *"Não foi possível encontrar o arquivo package.json"* na Hostinger

Quando a Hostinger exibe a mensagem **"Não foi possível encontrar o arquivo package.json. Verifique se está incluído no seu repositório e se o formato do arquivo é válido"**, isso acontece por um dos seguintes motivos (e como resolver em segundos):

1. **Ficheiros dentro de uma subpasta no GitHub ou no ficheiro `.zip`:**
   - **Causa:** Ao enviar o projecto para o GitHub ou fazer upload do `.zip` na Hostinger, os ficheiros ficaram dentro de uma pasta intermédia (ex.: `meu-projeto/package.json` em vez de `/package.json` na raiz).
   - **Solução:**
     - **Se usar GitHub:** Certifique-se de que o ficheiro `package.json` está **directamente na raiz** do repositório GitHub (ao abrir o repositório no GitHub, deverá ver imediatamente `package.json`, `index.html`, `vite.config.ts` e a pasta `src/` na lista principal, e não uma única pasta).
     - **Se fizer Upload de ficheiro `.zip` na Hostinger:** Ao comprimir o projecto no seu computador, seleccione **todos os ficheiros e pastas dentro do projecto** (`package.json`, `index.html`, `src/`, `public/`, `vite.config.ts`, etc.) e crie o `.zip` directamente a partir deles — **não comprima a pasta-mãe por fora**.

2. **Repositório GitHub ainda sem commit ou Branch incorrecta:**
   - **Causa:** O repositório foi criado no GitHub, mas o código do Google AI Studio ainda não foi sincronizado, ou a Hostinger está configurada para procurar na branch `master` quando o código está na branch `main`.
   - **Solução:** No painel da Hostinger, confirme que a branch seleccionada é a `main` e que o ficheiro `package.json` já aparece no GitHub.

3. **Configuração actualizada neste `package.json`:**
   - O ficheiro `/package.json` na raiz deste projecto já se encontra formatado e validado segundo os requisitos da Hostinger:
     - `"name": "multiflight-angola"`
     - `"version": "1.0.0"`
     - `"engines": { "node": ">=18.0.0", "npm": ">=9.0.0" }`
     - `"scripts": { "build": "vite build", "start": "tsx server.ts" }`

---

### Passo a Passo para Hospedar na Hostinger

#### Método A: Importar Repositório GitHub ou `.zip` (Hostinger Node.js / Vite Web App)
1. Exporte o projecto do **Google AI Studio** para o seu **GitHub** (ou descarregue o `.zip` e certifique-se de que `package.json` está na raiz do `.zip`).
2. No **hPanel da Hostinger**, aceda a **Websites → Adicionar Website → Aplicação Web Node.js** (ou **Importar via Git**).
3. Seleccione o repositório GitHub (branch `main`) ou carregue o ficheiro `.zip` com `package.json` na raiz.
4. A Hostinger irá detectar automaticamente:
   - **Framework:** Vite / React
   - **Comando de compilação (Build):** `npm run build`
   - **Directório de saída (Output directory):** `dist`
5. Clique em **Implementar (Deploy)**.

#### Método B: Alojamento Partilhado Hostinger (`public_html` via Gestor de Ficheiros)
Se o seu plano Hostinger for de alojamento partilhado tradicional (Apache/LiteSpeed sem construtor Node.js):
1. No seu computador, dentro da pasta do projecto, execute:
   ```bash
   npm install
   npm run build
   ```
2. Será criada a pasta **`dist/`** contendo o site pronto para produção (incluindo `.htaccess`, `index.html`, `sitemap.xml`, `robots.txt` e todas as imagens).
3. No **hPanel da Hostinger → Ficheiros → Gestor de Ficheiros**, abra a pasta **`public_html`**.
4. Carregue todos os ficheiros que estão **dentro da pasta `dist/`** directamente para dentro de **`public_html`**.

### Etapa C: Configuração do Domínio e SSL (`https://multiflightangola.com`)
1. No **hPanel → Domínios**, aponte os registos DNS (`A` e `CNAME`) de `multiflightangola.com` e `www.multiflightangola.com` para o servidor da Hostinger.
2. Em **Segurança → SSL**, active o certificado **SSL Gratuito (Let's Encrypt)** e active a opção **Forçar HTTPS** para garantir encriptação em todas as páginas e submissões de formulários.

