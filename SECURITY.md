# Percept Security Guide

## Current build

The downloadable build is a client-side demonstration. Authentication, posts, saves, and session state are simulated locally with browser storage so the application can run without external credentials.

**Do not treat the demo authentication as production authentication.** Do not store real passwords or sensitive personal information in this demo.

## Production security requirements

Before public launch, replace the demo session with a real authentication provider such as Supabase Auth. Enforce authorization on the server/database; never trust a client-side role or route guard.

### Secrets
- Never commit `.env` files.
- Never put service-role keys, private AI keys, or storage secrets in `VITE_*` variables.
- Keep server-only secrets in the deployment platform's secret manager.

### Database
- Enable PostgreSQL Row Level Security on every Supabase table.
- Users may access only their own private profile/session data.
- Public feeds should expose anonymous identities, never internal user IDs or email addresses.
- Use least-privilege database policies.

### Media
- Validate MIME type and file size server-side.
- Strip EXIF/GPS metadata before storing user media.
- Use private storage buckets for sensitive media and signed URLs where appropriate.
- Never trust a filename or browser-provided MIME type.

### AI
- AI keys must be server-side only.
- Moderate user content before publication where required.
- Do not send unnecessary personal information to AI providers.
- Log moderation decisions without storing more sensitive data than necessary.

### Anonymous identity
- Public pseudonyms must be decoupled from internal account IDs.
- Never expose email, IP address, device fingerprint, or internal database identifiers in public responses.
- Identity reveal must be explicit, mutual, and auditable.

### Abuse prevention
- Add server-side rate limits for signup, login, posts, responses, uploads, reports, and chat.
- Implement report/block/mute controls.
- Add account suspension and moderation queues.
- Use CAPTCHA or abuse controls when automated activity is detected.

### Privacy
- Provide account deletion and data export.
- Define retention periods for media, chats, logs, and reports.
- Avoid collecting precise location unless it is strictly required and explicitly consented to.

## Pre-launch checklist

- [ ] Real authentication enabled
- [ ] RLS enabled and tested
- [ ] Server-side authorization tested
- [ ] Secrets removed from source
- [ ] Upload validation and metadata stripping enabled
- [ ] AI moderation enabled
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Error messages do not leak internals
- [ ] Dependency audit completed
- [ ] Account deletion tested
- [ ] Backup/recovery process documented
