# Percept Architecture

## Current web application

Percept is a responsive Vite + React + TypeScript application with a TanStack Router shell. The current build intentionally keeps the core experience dependency-light and runnable without a backend.

### Layers

- UI: React components + Tailwind/shadcn primitives
- Application state: React state and browser persistence for demo mode
- Routing: TanStack Router
- Visual system: Emerald Perspective design tokens in `src/styles.css`
- PWA: web manifest + service worker

## Production target

The intended production architecture is:

Browser / PWA / React Native app
→ API / Edge Functions
→ Supabase Auth + PostgreSQL + Storage + Realtime
→ AI service for moderation, embeddings, clustering, summarization

The client should never call privileged AI/database services directly.

## Mobile strategy

The current interface is responsive and PWA-installable. For a native mobile app later, keep the product logic and API contracts platform-neutral and move shared business logic into a package. Rebuild the presentation layer in React Native/Expo while preserving:

- anonymous identity rules
- post/response models
- perspective map data model
- moderation contracts
- connection/reveal states
- notification types

Do not create separate product logic for web and mobile.
