# Development, Testing, PWA, and Deployment

## Requirements

- Bun compatible with the committed `bun.lock`.
- A modern browser.
- Network access to DummyJSON and Google Fonts.

Install exactly the dependency versions recorded in the lockfile:

```bash
bun install --frozen-lockfile
```

Bun documents reproducible installs in
[`bun install`](https://bun.sh/docs/pm/cli/install) and recommends committing
[`bun.lock`](https://bun.sh/docs/pm/lockfile).

## Commands

| Command | Purpose |
|---|---|
| `bun run dev` | Start the Vite development server |
| `bun run type-check` | Type-check TypeScript and Vue templates |
| `bun run build-only` | Create the Vite production bundle |
| `bun run build` | Run type-check and production build in parallel |
| `bun run preview` | Preview the generated `dist/` locally |
| `bun run test:unit` | Start Vitest |
| `bun run lint` | Run ESLint with automatic fixes |
| `bun run format` | Format `src/` with Prettier |

`lint` and `format` modify files. Review their diffs before committing.

## TypeScript compatibility

TypeScript is pinned to `6.0.3` because the currently installed `vue-tsc` resolves a compiler path
that TypeScript 7 no longer exports. Do not casually change that exact version without running:

```bash
bun install
bun run type-check
bun run build
```

The `@/*` TypeScript path mapping resolves relative to `tsconfig.app.json`. TypeScript documents
this behavior in the [`paths` option](https://www.typescriptlang.org/tsconfig/paths.html).

## Testing

`vitest.config.ts` reuses the Vite configuration and selects `jsdom`, which simulates browser APIs
for component tests. Vitest supports Vue component tests, TypeScript, mocks, coverage, and DOM
environments; see [Vitest features](https://vitest.dev/guide/features.html).

No tests currently exist. The first useful suites would cover:

1. discounted-price calculation;
2. adding a new cart line;
3. merging a repeated cart line;
4. stock limits and decrement limits;
5. cart persistence and invalid stored JSON;
6. product/category/search store success and failure states; and
7. route-parameter changes on product and search pages.

## Production build

Vite uses `index.html` as its entry and writes optimized static assets to `dist/`. See
[Building for Production](https://vite.dev/guide/build) and
[Deploying a Static Site](https://vite.dev/guide/static-deploy.html).

Recommended local release check:

```bash
bun run type-check
bun run build
bun run preview
```

## PWA behavior

`vite.config.ts` configures `vite-plugin-pwa` with:

- `registerType: "autoUpdate"`;
- a web app manifest;
- installable icons;
- generated service-worker precaching; and
- runtime caching for product images.

`src/main.ts` imports `registerSW` from `virtual:pwa-register`. References:

- [Registering the service worker](https://vite-pwa-org.netlify.app/guide/register-service-worker)
- [Automatic updates](https://vite-pwa-org.netlify.app/guide/auto-update)
- [Service-worker precaching](https://vite-pwa-org.netlify.app/guide/service-worker-precache)

Because a service worker can serve cached assets, use a hard refresh or clear site data when
debugging a style that appears not to update.

## Vercel deployment

`vercel.json` rewrites every request to `/index.html`. This is necessary for deep links such as
`/product/12`: Vercel serves the SPA entry, then Vue Router selects the view.

This configuration matches Vercel's documented
[Vite SPA deep-linking setup](https://vercel.com/docs/frameworks/frontend/vite) and
[rewrite behavior](https://vercel.com/docs/routing/rewrites).

Vercel should use:

```text
Build command: bun run build
Output directory: dist
```

Commit `package.json`, `bun.lock`, TypeScript configuration, and application changes together so
production installs the same dependency graph tested locally.
