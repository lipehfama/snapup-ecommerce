# SnapUp Ecommerce Wiki

This wiki documents the SnapUp codebase as reviewed on **August 10, 2026**. It explains what the
application does, how its parts communicate, how to run and deploy it, and which areas should be
improved next.

SnapUp is a frontend-only ecommerce demonstration built with Vue, TypeScript, Pinia, Vue Router,
Bootstrap, Sass, Vite, and Bun. Product data comes from DummyJSON, while cart data is stored in the
browser.

## Start here

1. [Project overview](01-project-overview.md)
2. [Architecture and data flow](02-architecture-and-data-flow.md)
3. [Folder structure and conventions](03-folder-structure.md)
4. [Components, pages, and routes](04-components-pages-and-routes.md)
5. [Styling and accessibility](05-styling-and-accessibility.md)
6. [Development, testing, PWA, and deployment](06-development-testing-and-deployment.md)
7. [Known issues and recommended roadmap](07-known-issues-and-roadmap.md)
8. [Official documentation references](08-references.md)

## Quick facts

| Area | Current implementation |
|---|---|
| Application type | Client-rendered single-page application (SPA) |
| Product source | DummyJSON REST API |
| Shared state | Pinia stores |
| Cart persistence | Browser `localStorage` |
| Routing | Vue Router with HTML5 history |
| Styling | Bootstrap utilities plus scoped Sass |
| Build tool | Vite |
| Package manager | Bun |
| Type checking | TypeScript 6.0.3 and `vue-tsc` |
| Tests | Vitest configured; no test suites currently exist |
| Deployment | Static Vite build configured for Vercel |
| Offline support | Generated service worker through `vite-plugin-pwa` |

## Run the project

```bash
bun install --frozen-lockfile
bun run dev
```

Before submitting or deploying a change:

```bash
bun run type-check
bun run build
```

The [Vue Single-File Component guide](https://vuejs.org/guide/scaling-up/sfc) explains the
`<script>`, `<template>`, and `<style>` structure used throughout the project. The
[Vite guide](https://vite.dev/guide/) explains the development server and production bundling.

## Documentation maintenance

Update this wiki whenever routes, stores, external APIs, deployment behavior, or major folder
conventions change. Keep links pointed at primary documentation whenever possible.
