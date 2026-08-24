# VELMORA AUTOMOBILES — Production Deployment Guide

This project is a modern, high-performance web application built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS 4**.

---

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - 1 Click)
1. Push this project to a **GitHub / GitLab / Bitbucket** repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset: **Vite**
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

---

### Option 2: Netlify (Drag & Drop or Git)
1. **Direct Drag & Drop**:
   - Run `npm install` and `npm run build`.
   - Drag the resulting `dist` folder into the Netlify dashboard.
2. **Git Connected**:
   - Connect your GitHub repository.
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Click **Deploy Site**.

---

### Option 3: Cloudflare Pages
1. Log in to the Cloudflare Dashboard and select **Workers & Pages**.
2. Connect your Git repository.
3. Select the **Vite** preset:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Save and deploy.

---

### Option 4: Docker / Cloud Run / VPS (Containerized)
A standard `Dockerfile` or static server can be used:

```dockerfile
# Build step
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production static serving
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🛠️ Local Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs on http://localhost:3000)
npm run dev

# 3. Create production optimized build
npm run build

# 4. Preview the production build locally
npm run preview

# 5. Type-check & lint
npm run lint
```

---

## 📧 Dealership Contact & Configuration
- **Official Dealer Email**: `velmoraautomobiles@gmail.com`
- **Dealer WhatsApp Desk**: `https://wa.me/message/CF6AEOLZUEDVJ1`
- **Currencies**: Dual USD ($) and GBP (£) support.
- **Regions Supported**: US, UK, Canada, Australia, Monaco, Germany, Saudi Arabia.

---
© 2026 VELMORA AUTOMOBILES. All Rights Reserved.
