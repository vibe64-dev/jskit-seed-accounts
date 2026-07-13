# App Blueprint

<!-- vibe64-blueprint-covered-commit: 014b9df81aeae4e25d648ebd23378b0caab8f123 -->

> Coverage: committed source through the marker above, plus the relevant uncommitted working-tree refinements present when this blueprint was created on 2026-07-14.

## Product foundation

**App** is a small JSKIT foundation for local username/password accounts. A person can register, sign in, reach a protected welcome screen, change a browser-local shell preference, and sign out.

Deliberate constraints:

- no database runtime or database-backed product data
- no `users-web` account model or `/account` surface
- no workspaces, Supabase, AI, uploads, payments, realtime, or mobile packaging
- no nested application directory; the repository root is the app root

The seed configuration is recorded in `vibe64.seed.json` and `vibe64.project.json`: authentication is local-file, tenancy is `none`, and database runtime is `none`.

## Runtime and ownership

- Node.js 22 and npm are the managed runtime.
- The server is Fastify; the client is Vue, Vite, Vuetify, Pinia, and Vue Router.
- `@jskit-ai/shell-web` owns the adaptive shell, placements, settings host, and drawer preference runtime.
- `@jskit-ai/auth-core`, `@jskit-ai/auth-web`, and `@jskit-ai/auth-provider-local-core` own authentication and file-backed local accounts.
- `@jskit-ai/http-runtime` and `@jskit-ai/kernel` provide shared runtime infrastructure.
- `@local/main` is lightweight composition glue only. Substantial server features must be generated into dedicated packages rather than added under `packages/main`.
- App-owned route wrappers, placement contributions, and narrow generated-page adaptations live under `src/`.

Use `npx jskit ...` from the repository root for JSKIT inspection, package additions, generators, helper-map updates, and verification. Do not hand-create JSKIT package glue, provider entrypoints, route infrastructure, or generated surfaces when a JSKIT command owns that work.

## Authentication and persistence

- Local registration and sign-in use the JSKIT `auth-local` bundle with file-backed account storage.
- The parent `/home` route carries `guard.policy = "authenticated"`, so its welcome and settings descendants are protected.
- Auth routes are app-owned wrappers at `/auth/login`, `/auth/reset-password`, and `/auth/signout` around JSKIT auth views.
- There is no application database. Do not add database runtimes, `users-web`, workspaces, persistent CRUD modules, or ad hoc JSON/filesystem product persistence without first changing Vibe64 project configuration.
- The drawer-default preference is browser-local, not server-owned or account-synchronized. JSKIT stores it under `jskit.shell-web.drawer-default-open` through `useShellLayoutState()`.
- Browser-local preferences are shared by accounts using the same browser profile and do not follow a person across devices.

## Surfaces, routes, and placements

Configured surfaces:

- `home`: default app surface; descendants are protected by the app-owned `/home` route guard
- `auth`: public authentication surface

Important routes:

- `/home`: minimal signed-in welcome screen with a 48px-or-taller Sign out action
- `/home/settings`: redirects to `/home/settings/general`
- `/home/settings/general`: starter JSKIT General settings page with the drawer-default switch

Navigation is placement-owned:

- Home and Settings use `shell.primary-nav`.
- General uses `page.section-nav` with owner `home-settings`.
- The authenticated avatar menu is `auth.profile-menu`.
- **User preferences** is an authenticated avatar-menu entry ordered before Sign out and links to `/home/settings/general`, reusing the JSKIT manual's existing drawer preference instead of duplicating it.

The settings host keeps its generated `ShellOutlet` and `RouterView` structure. Its redundant outer “Settings / Home settings” heading was removed; the General navigation control remains the visible content.

## Setup and commands

The foundation recipe is:

```bash
npx @jskit-ai/create-app app --target . --force --tenancy-mode none --title "App" --initial-bundles none
npm install
npx jskit add bundle auth-local
npm install
```

Routine checks:

```bash
npm run build
npm run verify
```

`tests/e2e/local-sign-in.spec.ts` requires `PLAYWRIGHT_BASE_URL`; it must point at the Vibe64-managed preview endpoint. In a Vibe64 session, start or recover that preview with `vibe64-preview ensure --wait --json` and never launch a second app server.

For browser-visible changes, run the focused Playwright command through:

```bash
npx jskit app verify-ui \
  --command "npx playwright test tests/e2e/local-sign-in.spec.ts" \
  --feature "<feature label>" \
  --auth-mode custom-local
```

Then confirm `.jskit/verification/ui.json` is fresh before `npm run verify`.

## Verification contract

The focused browser workflow covers:

- signed-out redirects for protected Home and Settings routes
- local account registration, sign-in, repeat sign-in, and sign-out
- the responsive protected welcome screen at phone, tablet, and desktop widths
- the authenticated avatar-menu **User preferences** entry
- the General drawer switch writing `jskit.shell-web.drawer-default-open`
- persistence of the changed preference after reload
- absence of horizontal overflow and preservation of 48px primary touch targets

The latest session completed the JSKIT review/deslop pass, refreshed the UI verification receipt, and passed `npm run verify` (lint, server tests, client tests, production build, and JSKIT doctor).

## Generated knowledge files

`.jskit/helper-map.md` and `.jskit/helper-map.json` are generated developer indexes. Refresh them with `npx jskit helper-map update` before relying on them after route, provider, or helper changes; they are not runtime configuration.
