# TypeScript and JavaScript Concepts in This Codebase

Concrete language patterns used in SnapUp, each tied to the file that demonstrates it. For
canonical background, see the [references](08-references.md).

## Frozen status constants

`src/utils/status.ts` builds the request-status enum with `Object.freeze`:

```ts
export const STATUS = Object.freeze({ IDLE: "IDLE", FAILED: "FAILED", LOADING: "LOADING", SUCCEEDED: "SUCCEEDED" });
```

Freezing prevents reassignment of the status strings at runtime. Stores assign
`…Status = STATUS.LOADING / SUCCEEDED / FAILED` and views branch with
`status === STATUS.LOADING`. (Roadmap: replace the strings with a typed union or enum so a
typo becomes a compile error instead of a silent mismatch.)

Reference: [MDN `Object.freeze()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

## Interface extension for domain models

`src/types/` keeps one core model and extends it instead of repeating fields:

```ts
interface IProducts { id, title, price, discountPercentage, discountedPrice, rating, stock, brand, category, thumbnail, images }
interface ICartItems extends IProducts { quantity: number; totalPrice: number }
interface ICategory extends IProducts { slug: string; name: string; url: string }
```

Note the known wart: `ICategory extends IProducts` is wrong — DummyJSON categories only carry
`slug`, `name`, `url` — and `discountedPrice` is client-computed, not API data. The roadmap
recommends splitting raw `Product`, `DisplayProduct` (+ `discountedPrice`), `CartItem`, and a
standalone `Category`.

Reference: [TypeScript interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html).

## Type-only imports (erased at compile time)

Stores and components import types with `import type { IProducts } from "@/types/IProducts"`.
Type-only imports are guaranteed to be erased from the emitted JavaScript — no runtime cost, no
circular-import risk.

## Props typed with a factory cast

`ProductList.vue` types an array prop while satisfying Vue's runtime validation (which needs a
constructor):

```ts
props: { products: { type: Array as () => IProducts[], required: true } }
```

`Array as () => IProducts[]` tells TypeScript the element type without changing runtime behavior.

## `<script setup>` + Composition API vs Options API

Most views use `<script setup lang="ts">` with `ref`, `computed`, `watch`, `onMounted`
auto-exposed to the template. A few older components (`ProductList`) still use
`defineComponent({ … setup() … })`. Both are valid; `<script setup>` is the recommended form and
unifying on it is a roadmap item.

References: [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html),
[Reactivity fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html).

## `storeToRefs` preserves reactivity when destructuring

`Cart.vue` does:

```ts
const { carts, itemsCount, totalAmount } = storeToRefs(cartStore);
```

Plain destructuring (`const { carts } = cartStore`) would detach the values from the store.
`storeToRefs` wraps each in a `ref` that stays linked, so the template keeps updating.

Reference: [`storeToRefs`](https://pinia.vuejs.org/api/modules/pinia.html#storetorefs).

## `computed` derived data vs methods

Discount mapping (`ProductList.vue`), thumbnails and price (`ProductSingle.vue`), and category
sections (`Home.vue`) use `computed`. Computed values are **cached** and re-evaluate only when a
dependency changes — unlike a method call in the template, which re-runs on every render.

Reference: [Computed properties](https://vuejs.org/guide/essentials/computed.html).

## `watch` for async arrival

`Home.vue` watches the store's product list and shuffles it once data arrives:

```ts
watch(products, (newProducts) => { /* Fisher-Yates-ish shuffle into tempProducts */ });
```

Reference: [Watchers](https://vuejs.org/guide/essentials/watchers.html).

## Fetch-on-mount lifecycle

Home, Sidebar, ProductSingle, and Cart fetch in `onMounted`. This is correct for a pure SPA
(no SSR), but `ProductSingle` reads the route ID only once — navigating product → product reuses
the view without refetching. The fix is watching the route param (roadmap item).

Reference: [Lifecycle hooks](https://vuejs.org/guide/essentials/lifecycle.html).

## `async/await` with status transitions

Every API action follows the same shape: set `LOADING` → `await fetch()` → `await
response.json()` → assign + `SUCCEEDED`, or `catch` → log + `FAILED`. Errors are contained in
the store; nothing is thrown to the UI. Missing: a `response.ok` check before parsing (roadmap).

Reference: [MDN Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

Note: `authStore.login()` and `restoreSession()` already check `response.ok` before parsing — use
them as the reference implementation for the catalog stores (see the
[authentication guide](10-authentication.md#post-authlogin)).

## `localStorage` is string-only and synchronous

`cartStore.ts` serializes with `JSON.stringify` on every mutation and parses once at store
creation. Two consequences: (1) only strings are stored, so objects need the JSON round-trip;
(2) a corrupt value makes `JSON.parse` throw and the store never initializes — wrap it in
`try/catch` with a `[]` fallback (roadmap).

Reference: [MDN Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

## Clamping quantities with `Math.min` / `Math.max`

```ts
quantity = Math.min(quantity + 1, item.stock); // INC capped by stock
quantity = Math.max(quantity - 1, 1);          // DEC floored at 1
```

The same clamp appears in `ProductSingle`'s local qty selector. Tested on both boundaries in
`cartStore.spec.ts`.

## Optional chaining / nullish coalescing for pre-fetch state

`productSingle` starts as `{} as IProducts`, so the template guards with
`product?.images?.[0] || ''` and `product.value?.stock ?? Infinity`. Without these, the first
render (before the fetch resolves) would throw on `undefined`.

Reference: [MDN Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).

## `setTimeout` auto-dismiss toast

`setCartMessageOn()` sets `isCartMessageOn = true` then schedules `setCartMessageOff()` after
2000 ms. Covered with Vitest fake timers (`vi.useFakeTimers()` +
`vi.advanceTimersByTime(2000)`) so the test runs in milliseconds.

## Dynamic `import()` route splitting

`router/index.ts` eagerly imports `Home` but lazy-loads the other eight views:

```ts
component: () => import("@/views/Cart/Cart.vue")
```

Each becomes a separate chunk loaded on first navigation — smaller initial bundle.

Reference: [Vue Router lazy loading](https://router.vuejs.org/guide/advanced/lazy-loading).

## Object destructuring + rest properties (token split)

`src/stores/authStore.ts` separates tokens from the persisted user in one statement:

```ts
const { accessToken, refreshToken, ...user } = data; // data: ILoginResponse
this.user = user; // IAuthUser — no password, no tokens
```

Destructuring binds the two named tokens; the rest element (`...user`) collects the remaining
properties. WHY: the password never reaches `state.user` and tokens get their own storage keys, so
each can be cleared independently. See the
[authentication guide](10-authentication.md#why-password-should-not-be-stored-in-pinia-or-sessionstorage).

## `typeof` narrowing for query and error values

`src/views/Login/Login.vue` narrows the redirect query before navigating:

```ts
const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/";
```

`route.query.redirect` is typed `string | string[] | null | undefined`; the `typeof` guard narrows
it to `string` so `router.push()` type-checks. The same narrowing family appears in
`authStore.login()` via `error instanceof Error ? error.message : "Something went wrong."` — only
`Error` is guaranteed to carry `.message`.

Reference: [TypeScript documentation](https://www.typescriptlang.org/docs/).

## `Promise<boolean>` returns for UI branching

`authStore.login()` is typed `async login(credentials: ILoginCredentials): Promise<boolean>`.
`Login.vue` awaits it and returns early on `false`, leaving `authStore.error` rendered, and only
calls `router.push()` on `true`. WHY a boolean instead of throwing: the failure case is an expected
user-facing state (wrong credentials), not an exceptional crash, so the caller branches rather than
catches.

## `try/catch/finally` for loading + error states

```ts
this.isLoading = true; this.error = null;
try { /* fetch, response.ok check, persist */ return true; }
catch (error) { this.error = /* narrowed message */; return false; }
finally { this.isLoading = false; }
```

`finally` guarantees the submit button leaves its `Logging in...` state even when the request
throws — otherwise a network failure would freeze the form. `getStoredUser()` uses a smaller
`try/catch` around `JSON.parse` so corrupt `sessionStorage` falls back to `null` instead of
crashing store setup.

## `ref()`, `v-model`, and `@submit.prevent` (Login form)

`Login.vue` holds form state in `ref("")` (`username`, `password`), binds inputs with
`v-model="username"`, and handles `<form @submit.prevent="handleLogin">`:

- `ref()` (see [Reactivity fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html))
  makes each keystroke reactive without manual DOM reads; `.value` in script, auto-unwrapped in
  template.
- `v-model` is two-way binding sugar over `:value` + `@input`.
- `@submit.prevent` stops the native full-page submit so the SPA handles login in place, while
  keeping Enter-key submission and `required` validation.

Full example in the [authentication guide](10-authentication.md#login-form-mechanics).

## `sessionStorage` vs `localStorage`

`cartStore` uses `localStorage` (persists across sessions); `authStore` uses `sessionStorage`
(cleared when the tab session ends) for `snapup-user`, `snapup-access-token`, and
`snapup-refresh-token`. Rule of thumb applied here: low-risk convenience data (cart) favors
persistence; credentials favor a shorter exposure window. Both are synchronous, string-only, and
origin-scoped — hence the `JSON.stringify`/`JSON.parse` round-trip.

References: [MDN sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage),
[MDN Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

## `Partial<T>` + spread factory in tests

`createCartItem(overrides: Partial<ICartItems> = {})` returns `{ ...defaults, ...overrides }`.
`Partial` makes every field optional for the caller while the result stays a full `ICartItems` —
a pattern worth reusing for any future fixture.

---

## Next steps

- [Components, pages & routes](04-components-pages-and-routes.md) — see these patterns in context
- [Development, testing & deployment](06-development-testing-and-deployment.md) — test patterns
- [Known issues & roadmap](07-known-issues-and-roadmap.md) — where these patterns need fixes
- [References](08-references.md) — official docs for each concept
