# Known Issues and Recommended Roadmap

This page describes the reviewed state of the project. It is not a list of already completed
changes.

## Priority 1: correctness

### Fix repeated-product cart totals

`cartStore.addToCart()` calculates an existing line with the original `item.price`, while
`toggleCartQty()` uses `item.discountedPrice`. Adding the same product twice can therefore change
the pricing basis.

Recommended rule:

```text
line total = normalized quantity × discounted unit price
```

The store should apply that rule in one reusable calculation and enforce stock limits during both
add and increment operations.

### Prevent out-of-stock additions

The detail page displays “out of stock” but still initializes quantity to one and keeps the add
button active. Disable the control and make the handler refuse zero-stock products.

### Validate HTTP responses

Every API store should check `response.ok` before parsing a successful payload. `fetch()` does not
reject merely because the server returns 404 or 500. See
[MDN: Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) and
[`Response.ok`](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok).

### Correct the data types

`ICategory` currently extends `IProducts`, even though DummyJSON categories contain only `slug`,
`name`, and `url`. The category-product state is also typed as categories instead of products.

Recommended model:

```ts
interface Product { /* raw API fields */ }
interface DisplayProduct extends Product { discountedPrice: number }
interface CartItem extends DisplayProduct { quantity: number; totalPrice: number }
interface Category { slug: string; name: string; url: string }
```

The official response shapes are visible in
[DummyJSON Products](https://dummyjson.com/docs/products).

## Priority 2: reliability and user experience

### Avoid duplicate category requests

`Navbar`, `Sidebar`, and `Home` each request categories when mounted. Add a store guard that returns
existing data or shares an in-flight request.

### Render explicit error states

Stores already record `FAILED`, but most pages render an empty product list instead of explaining
that loading failed. Add an error component with retry behavior.

### React to product route changes

`ProductSingle` reads the route ID once and fetches only in `onMounted`. Watch the ID or use a route
update hook so navigation between reused product views always fetches the new product.

### Improve search

- Use `v-model` instead of waiting for the input `change` event.
- Submit a semantic `<form>`.
- Trim and URL-encode the term.
- Handle Enter consistently.
- Preserve the current term when returning to the search page.

### Harden cart persistence

Wrap `JSON.parse()` in validation and a fallback. Corrupt or outdated local data currently can stop
the cart store from initializing. Remember that Web Storage is synchronous and origin-scoped; see
[MDN Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

### Define cart-count semantics

`itemsCount` currently equals the number of distinct cart lines. Decide whether the badge should
show unique products or the sum of quantities, then name and test the value accordingly.

## Priority 3: complete unfinished features

- Implement or remove “Buy now” and “Check Out.”
- Turn the cart modal's “view cart” text into a real link.
- Add real seller, download, support, registration, login, privacy, terms, and about routes.
- Add a not-found route.
- Make product thumbnails change the primary image.
- Replace placeholder footer year/content as appropriate.

## Priority 4: PWA and configuration

### Correct the manifest icon

The repository contains `public/icon-512x512.png`, but the manifest currently references
`icons/icon-512x512.png`. Point the manifest at the real public path.

### Revisit runtime caching

The image-cache regular expression is tightly coupled to one historical DummyJSON URL structure.
Confirm it against the URLs returned by the current API and avoid caching failed responses.

### Review automatic reload behavior

Automatic service-worker updates can reload open tabs. If SnapUp gains checkout or account forms,
consider a user-controlled update prompt. The tradeoff is described in the
[Vite PWA automatic update guide](https://vite-pwa-org.netlify.app/guide/auto-update).

## Priority 5: consistency and maintainability

- Convert remaining Options API components to `<script setup>` if one API style is desired.
- Bring root `App.vue` into the same script/template/style convention.
- Remove commented-out debugging code and unused imports/parameters.
- Consider a `services/` layer for fetch behavior and response validation.
- Replace string request statuses with a typed union or enum.
- Rename singular entity interfaces (`Product`, `CartItem`) rather than plural `IProducts`.
- Update the root README as functionality changes.

## Priority 6: tests

There are no current test files. Begin with cart-store unit tests because incorrect totals directly
affect user-visible behavior, followed by API-store and route-reactivity tests. See
[Vitest's feature guide](https://vitest.dev/guide/features.html) for mocks, DOM environments,
coverage, and Vue component testing.
