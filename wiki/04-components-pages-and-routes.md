# Components, Pages, and Routes

## Route map

| Path | Name | View | Responsibility |
|---|---|---|---|
| `/` | `home` | `Home.vue` | Carousel, shuffled catalog, first four categories |
| `/product/:id` | `product` | `ProductSingle.vue` | Product details, quantity, add to cart |
| `/category/:category` | `category` | `CategoryProduct.vue` | Category-specific catalog |
| `/cart` | `cart` | `Cart.vue` | Cart table, quantity controls, totals |
| `/search/:searchTerm` | `search` | `Search.vue` | Search results or empty state |

The application does not currently define a 404/not-found route.

## Persistent components

### Header

`Header.vue` contains the top links and embeds `Navbar`. Several links—seller, download, login,
registration, and support—are visual placeholders rather than completed flows.

### Navbar

`Navbar.vue` coordinates three shared areas:

- opening the category sidebar;
- searching and displaying category shortcuts; and
- showing the cart count and preview.

It watches cart state deeply and asks the cart store to recalculate totals after changes.

### Sidebar

`Sidebar.vue` reads all categories from the category store and creates category routes. The sidebar
store controls whether it is translated on-screen.

### Footer

`Footer.vue` contains policy/about links. They currently route to `/` and should eventually be
replaced by real pages or external documents.

## Catalog components

### ProductList

`ProductList.vue` accepts products as a prop, calculates `discountedPrice`, and renders one
`Product` component per entry.

### Product

`Product.vue` is a clickable product card. It displays:

- category;
- image;
- brand;
- title;
- original price;
- discounted price; and
- discount percentage.

### ProductSingle

`ProductSingle.vue` requests one product based on the route ID, derives its discounted price,
limits the quantity control to stock, and creates the cart payload.

The thumbnails are display-only, and the “Buy now” button has no handler.

## Cart components

### CartModal

`CartModal.vue` previews cart lines when hovering over the navbar cart. The “view my shopping cart”
element is currently a paragraph rather than a navigable link.

### CartMessage

`CartMessage.vue` shows a confirmation overlay for two seconds after a product is added.

### Cart view

The cart page has two states:

- an empty-cart illustration with a return-to-shopping link; or
- a table containing product lines, quantities, prices, delete controls, and totals.

“Check Out” is currently a placeholder button.

## Supporting components

- `HeaderSlider.vue` uses Bootstrap's carousel behavior for two local images.
- `Loader.vue` displays a local SVG while API data is loading.

Bootstrap component and utility behavior is documented in the
[Bootstrap 5.3 documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/).

## Component communication patterns

| Pattern | Example |
|---|---|
| Props down | `ProductList` passes a product to `Product` |
| Store access | `Navbar`, `Sidebar`, and views read Pinia stores |
| Route parameters | Product, category, and search views read `useRoute()` |
| Local component state | Product quantity and navbar search term use `ref()` |
| Computed derivation | Discount price, thumbnails, categories, and store selectors |
| Watchers | Category/search route changes and cart changes |

Vue Router documents route-driven data loading in
[Data Fetching](https://router.vuejs.org/guide/advanced/data-fetching.html).
