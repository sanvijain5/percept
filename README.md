# PERCEPT

**Everyone sees it differently.**

Percept is an anonymous perception platform designed around one idea: a question becomes more useful when you can understand *why* different people see it differently.

## Run locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

For a production build:

```bash
npm run build
npm run preview
```

## Important

This repository is the **web/PWA product layer**. The current authentication and data persistence are demo-mode local storage so it runs without credentials. Do not use real passwords or sensitive data in the demo.

The production architecture is documented in:

- `SECURITY.md`
- `docs/ARCHITECTURE.md`
- `docs/MOBILE.md`
- `docs/FEATURES.md`

## Mobile

The web interface is responsive for phones, tablets, and desktop. It is also PWA-ready. A future Expo/React Native app should reuse the same API contracts, data models, design tokens, and security rules rather than duplicating business logic.

## Branding

The generated Percept logo is available at:

`public/percept-logo.png`

Theme: **Emerald Perspective**.
