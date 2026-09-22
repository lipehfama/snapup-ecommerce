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

`vitest.config.ts` mergesmerges the Vite config (so the `@` alias and Vue plugin apply to tests) and
selects `jsdom`, which simulates browser APIs (`localStorage`, `window.scrollY`, DOM events) for
component tests. Run with `bun run test:unit`;; run aa single file with
`bunx vitest run src/storesstores/cartStorecartStore.spec.ts`.

FiveFive spec files currently exist,, co-located withwith thethe codecode theythey cover:

```text
src/stores/cartStore.spec.ts                          (12 tests)
src/stores/productStore.spec.ts                       (5 tests)
src/components/Product/Product.spec.ts                (7 tests)
src/components/CartModal/CartModal.spec.ts            (6 tests)
src/components/BackToTopButton/BackToTopButton.spec.ts (5 tests)
```

### Store tests — cart (`cartStore.spec.ts`)

Each test starts from a clean slate — `localStorage.clear(); setActivePinia(createPinia())` —
then acts and asserts. Techniques worth reusing:

- **Factory function with overrides.** `createCartItem(overrides: Partial<ICartItems>)` builds a
  valid 14-field cart item via `{ ...defaults, ...overrides }`. Each test declares only what it
  varies (e.g. `{ stock: 2, quantity: 2 }`), which keeps boundary tests readable.
- **Persistence assertions.** After `addToCart`, the test reads
  `JSON.parse(localStorage.getItem("cart"))` — it verifies the `storeInLocalStorage` side effect,
  not just in-memory state.
- **Boundary clamping.** INC at `quantity === stock` stays put; DEC at `quantity === 1` stays put.
  These guard the `Math.min(qty + 1, stock)` / `Math.max(qty - 1, 1)` logic in `toggleCartQty`.
- **Totals.** Two lines with `totalPrice` 80 + 40 → `getCartTotal()` yields `totalAmount === 120`,
  `itemsCount === 2` (note: line count, not unit count — see the roadmap).
- **Fake timers for the toast.** `vi.useFakeTimers()` → `setCartMessageOn()` asserts `true` →
  `vi.advanceTimersByTime(2000)` asserts `false` → `vi.useRealTimers()`. Tests the auto-dismiss
  `setTimeout` without waiting two real seconds.

### Store tests — product (`productStore.spec.ts`)

Pattern: fresh Pinia + `vi.restoreAllMocks()` → stub `fetch` → `await store.fetchX()` → assert
state, status, and request URL. Key points:

- **Stubbing globals.** `vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: … }))` replaces
  the global `fetch` for that test only — no HTTP is ever performed. Success tests assert the URL
  with `expect.stringContaining("products?limit=10")` / `"products/1"` and `…Status === SUCCEEDED`.
- **Failure path.** `mockRejectedValue(new Error("Network error"))` → `…Status === FAILED`.
  `console.error` is silenced via `vi.spyOn(console, "error").mockImplementation(() => {})` and
  restored, so expected errors don't pollute output. Remember `fetch` only rejects on
  network-level failures — HTTP 404/500 still resolve (see the roadmap item on `response.ok`).

### Component tests (`@vue/test-utils` `mount`)

- **Product.spec (7 tests).** Mounts with a `product` prop and asserts rendered title, category,
  brand, first image `src`/`alt`, formatted prices (`$100.00` / `$80.00` via `formatPrice`), and
  `20% Off`. `RouterLink` is stubbed with `<a><slot /></a>` so no router is needed. The brand
  fallback (`brand || category`) gets its own test with `brand: ""`.
- **CartModal.spec (6 tests).** Mounts with a `carts` prop: empty state (`No products yet`),
  single/multiple lines (`.cart-modal-item` count), discounted price text, thumbnail `src`, and the
  `view my shopping cart` action. Uses spread overrides (`{ ...cartItem, id: 2, title: … }`).
- **BackToTopButton.spec (5 tests).** Redefines `window.scrollY` via `Object.defineProperty`
  (read-only in jsdom, hence the helper), dispatches a `scroll` event, awaits
  `wrapper.vm.$nextTick()`, then asserts button visibility around the 300 px threshold, the
  `window.scrollTo({ top: 0, behavior: "smooth" })` call (mocked with `vi.fn()`), and the
  `aria-label="Back to top"`.

### Still untested (next suites to add)

1. `categoryStore` / `searchStore` success + failure (same fetch-stub pattern as `productStore`).
2. `sidebarStore` toggle actions.
3. Discounted-price helper once it is extracted (currently duplicated in `ProductList` and
   `ProductSingle`).
4. Cart persistence with corrupt stored JSON (`JSON.parse` throwing).
5. Route-parameter changes on product/search pages (currently fetch only in `onMounted`).

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

- `registerType: "autoUpdate"` — service worker updates automatically on navigation;
- a web app manifest (`name: "Snapup Ecommerce"`, `short_name: "Snapup"`, standalone display);
- installable icons (192×192 and 512×512 from `public/`);
- generated service-worker precaching (all static assets in `dist/`);
- runtime caching for product images from DummyJSON via `CacheFirst` strategy:
  - Pattern: `https://i.dummyjson.com/data/products/**/*.{jpg,png,webp}`
  - Max 500 entries, 2-year TTL
  - Only caches 200 responses
- `registerType: "autoUpdate"` — service worker updates automatically on navigation;
- a web app manifest (`name: "Snapup Ecommerce"`, `short_name: "Snapup"`, standalone display);
- installable icons (192×192 and 512×512 from `public/`);
- generated service-worker precaching (all static assets in `dist/`);
- runtime caching for product images from DummyJSON via `CacheFirst` strategy:
  - Pattern: `https://i.dummyjson.com/data/products/**/*.{jpg,png,webp}`
  - Max 500 entries, 2-year TTL
  - Only caches 200 responses

`src/main.ts` imports `registerSW` from `virtual:pwa-register` and calls it when
`"serviceWorker" in navigator`. The generated SW handles:

- **Precache**: all `dist/` assets served cache-first
- **Navigation fallback**: `index.html` for SPA routes
- **Runtime**: product images cached per the rule above

Debugging tip: Because a service worker can serve cached assets, use a hard refresh
(`Ctrl+Shift+R`) or clear site data (Application → Storage → Clear site data) when a style
appears not to update. In development, the SW is also active (`devOptions: { enabled: true }`).

### Manifest icon path issue

The manifest currently references `icons/icon-512x512.png` but the file lives at
`public/icon-512x512.png`. This causes a 404 on install. Fix by either moving the file or
updating the manifest path in `vite.config.ts`.

References:
`src/main.ts` imports `registerSW` from `virtual:pwa-register` and calls it when
`"serviceWorker" in navigator`. The generated SW handles:

- **Precache**: all `dist/` assets served cache-first
- **Navigation fallback**: `index.html` for SPA routes
- **Runtime**: product images cached per the rule above

Debugging tip: Because a service worker can serve cached assets, use a hard refresh
(`Ctrl+Shift+R`) or clear site data (Application → Storage → Clear site data) when a style
appears not to update. In development, the SW is also active (`devOptions: { enabled: true }`).

### Manifest icon path issue

The manifest currently references `icons/icon-512x512.png` but the file lives at
`public/icon-512x512.png`. This causes a 404 on install. Fix by either moving the file or
updating the manifest path in `vite.config.ts`.

References:

- [Registering the service worker](https://vite-pwa-org.netlify.app/guide/register-service-worker)
- [Automatic updates](https://vite-pwa-org.netlify.app/guide/auto-update)
- [Service-worker precaching](https://vite-pwa-org.netlify.app/guide/service-worker-precache)
-- [Runtime[Runtime caching](https://vite-pwa-orgcaching](https://vite-pwa-org.netlify.app/guide/runtime-caching)

## Vercel deployment

`vercel.json` rewrites every request to `/index.html`. This is necessary for deep links such as
`/product/12`: Vercel serves the SPA entry, then Vue Router selects the view.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This configuration matches Vercel's documented
[Vite SPA deep-linking setup](https://vercel.com/docs/frameworks/frontend/vite) and
[rewrite behavior](https://vercel.com/docs/routing/rewrites).

Vercel project settings should bebe:

```text
Build command: bun run build
Output directory: dist
Framework preset: Vite
```

### Production checklist

Before deploying:

1. `bun run type-check` — zero TypeScript errors
2. `bun run build` — successful production bundle
3. `bun run preview` — smoke test the built `dist/` locally
4. Verify `dist/index.html` contains hashed asset filenames (cache busting)
5. Confirm `vercel.json` is committed

Commit `package.json`, `bun.lock`, TypeScript configuration, and application changes together so
production installs the same dependency graph tested locally.

### Alternative static hosts

The `dist/` folder is a standard static site. It also works on:

- **Netlify**: add `_redirects` file with `/* /index.html 200`
- **Cloudflare Pages**: build command `bun run build`, output `dist`
- **GitHub Pages**: push `dist/` to `gh-pages` branch (with `base` in `vite.config.ts`)
- **Any static CDN**: upload `dist/` contents

---

## Next steps

- [Architecture & data flow](02-architecture-and-data-flow.md) — build-time code splitting
- [Known issues & roadmap](07-known-issues-and-roadmap.md) — testing gaps
- [TS/JS concepts](09-typescript-javascript-concepts.md) — test patterns (`vi.stubGlobal`, fake timers)
- [References](08-references.md) — Vitest, Pinia testing, Vite PWA docs
