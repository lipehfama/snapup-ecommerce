# Folder Structure and Conventions

## Repository tree

```text
snapup-ecommerce/
├── public/
│   ├── favicon.ico
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   ├── apple-touch-icon.png
│   ├── og-image.png
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── correct.png          # checkmark for toasts
│   │   │   ├── loader.svg           # spinner
│   │   │   ├── shopping_cart.png    # empty-cart illustration
│   │   │   ├── slider_img_1.jpg     # carousel slide 1
│   │   │   └── slider_img_2.jpg     # carousel slide 2
│   │   └── styles/
│   │       ├── main.scss            # resets, globals, utilities
│   │       └── variables.scss       # theme tokens (colors, fonts)
│   ├── components/                  # reusable presentational components
│   │   ├── BackToTopButton/
│   │   ├── CartMessage/
│   │   ├── CartModal/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── HeaderSlider/
│   │   ├── Loader/
│   │   ├── Navbar/
│   │   ├── Product/
│   │   ├── ProductList/
│   │   └── Sidebar/
│   │       ├── main.scss            # resets, globals, utilities
│   │       └── variables.scss       # theme tokens (colors, fonts)
│   ├── components/                  # reusable presentational components
│   │   ├── BackToTopButton/
│   │   ├── CartMessage/
│   │   ├── CartModal/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── HeaderSlider/
│   │   ├── Loader/
│   │   ├── Navbar/
│   │   ├── Product/
│   │   ├── ProductList/
│   │   └── Sidebar/
│   ├── router/
│   │   └── index.ts                 # 9 routes, 8 lazy-loaded
│   ├── stores/                      # Pinia stores (state + actions)
│   │   ├── cartStore.ts
│   │   ├── cartStore.spec.ts
│   │   ├── categoryStore.ts
│   │   ├── productStore.ts
│   │   ├── productStore.spec.ts
│   │   ├── searchStore.ts
│   │   ├── searchStore.spec.ts      # not yet implemented
│   │   ├── sidebarStore.ts
│   │   └── sidebarStore.spec.ts     # not yet implemented
│   ├── types/                       # TypeScript interfaces
│   │   ├── IProducts.ts
│   │   ├── ICarts.ts
│   │   └── IFilters.ts
│   ├── utils/                       # small pure helpers
│   │   ├── apiURL.ts
│   │   ├── helpers.ts               # formatPrice()
│   │   ├── images.ts                # imported asset URLs
│   │   └── status.ts                # STATUS enum (Object.freeze)
│   ├── views/                       # route-level pages
│   │   ├── Cart/
│   │   ├── CategoryProduct/
│   │   ├── Download/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── ProductSingle/
│   │   ├── Register/
│   │   ├── Search/
│   │   └── Support/
│   ├── App.vue                      # shell: Header + Sidebar + router-view + Footer + BackToTop
│   └── main.ts                      # entry: CSS, Pinia, Router, SW, mount
├── wiki/                            # this documentation
│   │   └── index.ts                 # 9 routes, 8 lazy-loaded
│   ├── stores/                      # Pinia stores (state + actions)
│   │   ├── cartStore.ts
│   │   ├── cartStore.spec.ts
│   │   ├── categoryStore.ts
│   │   ├── productStore.ts
│   │   ├── productStore.spec.ts
│   │   ├── searchStore.ts
│   │   ├── searchStore.spec.ts      # not yet implemented
│   │   ├── sidebarStore.ts
│   │   └── sidebarStore.spec.ts     # not yet implemented
│   ├── types/                       # TypeScript interfaces
│   │   ├── IProducts.ts
│   │   ├── ICarts.ts
│   │   └── IFilters.ts
│   ├── utils/                       # small pure helpers
│   │   ├── apiURL.ts
│   │   ├── helpers.ts               # formatPrice()
│   │   ├── images.ts                # imported asset URLs
│   │   └── status.ts                # STATUS enum (Object.freeze)
│   ├── views/                       # route-level pages
│   │   ├── Cart/
│   │   ├── CategoryProduct/
│   │   ├── Download/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── ProductSingle/
│   │   ├── Register/
│   │   ├── Search/
│   │   └── Support/
│   ├── App.vue                      # shell: Header + Sidebar + router-view + Footer + BackToTop
│   └── main.ts                      # entry: CSS, Pinia, Router, SW, mount
├── wiki/                            # this documentation
├── index.html
├── package.json
├── bun.lock
├── tsconfig*.json
├── vite.config.ts
├── vitest.config.ts
└── vercel.json
```

## Directory conventions

| Directory | What belongs here | Naming |
|---|---|---|
| `components/` | Reusable UI pieces used by multiple views | `PascalCase/` with `Name.vue` + `Name.scss` |
| `views/` | Route-level pages (one per route) | Same convention as components |
| `stores/` | Pinia stores — one file per domain | `featureStore.ts` + `featureStore.spec.ts` |
| `types/` | Shared interfaces | Singular, PascalCase (`IProducts.ts`) |
| `utils/` | Pure functions / constants | camelCase (`helpers.ts`, `status.ts`) |
| `assets/styles/` | Global Sass (variables, resets, utilities) | kebab-case |
| `assets/images/` | Imported images processed by Vite | — |

## `public/`

Files in `public/` are copied to the build output without transformation. They are appropriate for
fixed-name assets such as the favicon, PWA icons, `robots.txt`, and social-sharing metadata.

## `src/assets/`

Imported assets live here and are processed by Vite:

- `images/` contains the carousel, loader, empty-cart, and confirmation graphics.
- `styles/variables.scss` defines theme tokens such as colors and fonts.
- `styles/main.scss` defines resets and shared utility classes.

## `src/components/`

Reusable presentation and interaction units live here. Each component owns a directory containing
a same-named Vue and Sass file:

```text
Navbar/
├── Navbar.vue
└── Navbar.scss
```

The Vue component loads its scoped stylesheet with:

```vue
<style scoped lang="scss">
@use "./Navbar.scss";
</style>
```

Component tests (when present) live alongside as `Component.spec.ts`.

## `src/views/`

Views are route-level components. They use the same folder and naming convention as reusable
components:

```text
ProductSingle/
├── ProductSingle.vue
└── ProductSingle.scss
```

Views may coordinate stores and reusable components. Reusable components should not import views.

## Vue block convention

Files under `components/` and `views/` use this order:

```vue
<script setup lang="ts">
// state, imports, computed values, and handlers
</script>

<template>
  <!-- semantic markup and component composition -->
</template>

<style scoped lang="scss">
@use "./Component.scss";
</style>
```

Some older components still use the Options API inside a regular `<script>` block. Both forms are
valid, although [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html) is the recommended
Composition API syntax and would make the project more consistent.

The root `App.vue` currently does not follow this order and has no local stylesheet. If the
convention is intended to cover every SFC, it should be standardized separately.

## `src/stores/`

Pinia stores own state shared across multiple pages or components. Network calls and cart
persistence are performed here rather than directly in product cards.

Each store file exports a single `useXStore` function created by `defineStore`. State, getters,
and actions follow the Options-style API. Tests live as `XStore.spec.ts` in the same folder.

## `src/types/`

Interfaces document API and application data. Future types should distinguish:

- raw API products;
- display products with calculated discounts;
- cart lines; and
- categories.

This avoids requiring calculated fields on data that does not yet contain them.

## `src/utils/`

Small shared constants and pure helpers live here. This is the correct location for reusable
formatting or endpoint helpers, but larger API behavior would be clearer in a dedicated
`services/` layer if the application grows.

## Root configuration

- `vite.config.ts`: Vue, devtools, PWA, Sass, and the `@` alias.
- `vitest.config.ts`: reuses Vite configuration and enables `jsdom`.
- `tsconfig*.json`: browser, Node, and test TypeScript projects.
- `vercel.json`: rewrites SPA URLs to `index.html`.
- `bun.lock`: reproducible dependency resolution; Bun recommends committing it. See
  [Bun lockfiles](https://bun.sh/docs/pm/lockfile).

---

## Next steps

- [Architecture & data flow](02-architecture-and-data-flow.md) — how the pieces connect
- [Components, pages & routes](04-components-pages-and-routes.md) — UI inventory
- [Styling & accessibility](05-styling-and-accessibility.md) — Sass structure & tokens
- [TS/JS concepts](09-typescript-javascript-concepts.md) — patterns by file location
