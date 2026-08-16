# Web + Mobile Plan

## Desktop web

- Persistent left sidebar
- Sticky top bar
- Multi-column feed
- Large Perspective Map
- Keyboard shortcuts
- Hover interactions

## Mobile web / PWA

- Bottom navigation
- Touch-friendly controls
- Single-column feed
- Full-screen create composer
- Mobile chat
- Safe-area-aware navigation
- Installable PWA

## Native application later

Recommended stack: Expo + React Native.

Suggested shared packages:

- `packages/types` — TypeScript models
- `packages/api` — API client
- `packages/validation` — Zod schemas
- `packages/design-tokens` — Percept colors, spacing, typography
- `apps/web` — current Vite web app
- `apps/mobile` — future Expo app

This allows Percept to have one backend and two polished interfaces instead of maintaining two independent products.
