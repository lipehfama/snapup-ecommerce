# Architecture and Data Flow

## High-level architecture

```mermaid
flowchart TD
    Browser[Browser] --> Main[src/main.ts]
    Main --> App[src/App.vue]
    App --> Shell[Header + Sidebar + Footer]
    App --> Router[router-view]
    Router --> Views[Route-level views]
    Views --> Components[Reusable components]
    Views --> Stores[Pinia stores]
    Components --> Stores
    Stores --> API[DummyJSON API]
    Stores --> Storage[localStorage]
```

This is a client-side SPA. Vue Router changes the component shown inside `router-view` without
requesting a new HTML document for every navigation. Vue Router is Vue's official client-side
routing solution; see the [Vue Router guide](https://router.vuejs.org/guide/).

## Startup sequence

[`src/main.ts`](../src/main.ts) is the entry point:

1. Bootstrap CSS, Bootstrap Icons, Bootstrap JavaScript, and global Sass are loaded.
2. `createApp(App)` creates the Vue application.
3. Pinia and the router are installed.
4. The PWA registration helper is invoked when service workers are supported.
5. Vue mounts to the `#app` element in `index.html`.

[`src/App.vue`](../src/App.vue) owns the persistent shell:

```text
Header
Sidebar
router-view
Footer
```

## Routing

[`src/router/index.ts`](../src/router/index.ts) uses `createWebHistory`. Home is imported eagerly;
the other pages use dynamic imports and therefore become separate build chunks. This follows Vue
Router's [lazy-loading route pattern](https://router.vuejs.org/guide/advanced/lazy-loading).

## Pinia stores

Pinia separates shared state from rendering. Its concepts are documented in the
[official Pinia documentation](https://pinia.vuejs.org/core-concepts/).

| Store | State owned | External dependency |
|---|---|---|
| `productStore` | Product list, selected product, request statuses | DummyJSON |
| `categoryStore` | Categories, selected category products, statuses | DummyJSON |
| `searchStore` | Search results and request status | DummyJSON |
| `cartStore` | Cart lines, totals, item count, confirmation visibility | `localStorage` |
| `sidebarStore` | Sidebar open/closed state | None |

The API stores use four status strings from `src/utils/status.ts`:

```text
IDLE → LOADING → SUCCEEDED
                 or FAILED
```

Views use `LOADING` to show `Loader`. Stores expose error state, but the current pages generally do
not render a dedicated error message.

## Catalog data flow

```mermaid
sequenceDiagram
    participant View
    participant Store as Pinia store
    participant API as DummyJSON
    participant List as ProductList
    participant Card as Product

    View->>Store: call fetch action
    Store->>Store: status = LOADING
    Store->>API: fetch products/categories/search
    API-->>Store: JSON response
    Store->>Store: save data; status = SUCCEEDED
    Store-->>View: reactive update
    View->>List: products prop
    List->>List: calculate discountedPrice
    List->>Card: normalized product prop
```

The API endpoints are documented in
[DummyJSON Products](https://dummyjson.com/docs/products). Note that `fetch()` only rejects on
network-level failures; HTTP errors such as 404 still resolve. Production-quality fetch actions
should check `response.ok`, as explained in
[Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

## Cart data flow

```mermaid
sequenceDiagram
    participant Detail as ProductSingle
    participant Cart as cartStore
    participant Storage as localStorage
    participant Navbar
    participant CartPage as Cart view

    Detail->>Cart: addToCart(product, quantity, prices)
    Cart->>Storage: persist serialized cart
    Cart-->>Navbar: reactive cart update
    Navbar->>Cart: recalculate totals
    Cart-->>CartPage: lines, count, total
```

Only the cart is persistent. Product, category, search, and sidebar state are recreated after a
reload.

## Type and utility layers

- `src/types/IProducts.ts` describes product fields.
- `src/types/ICarts.ts` adds cart quantity and line total fields.
- `src/types/IFilters.ts` describes category data, although its current inheritance should be
  corrected; see the [roadmap](07-known-issues-and-roadmap.md).
- `src/utils/apiURL.ts` contains the DummyJSON base URL.
- `src/utils/helpers.ts` formats prices in US dollars.
- `src/utils/images.ts` centralizes imported image assets.
- `src/utils/status.ts` centralizes request status values.
