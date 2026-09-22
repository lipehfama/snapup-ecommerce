# Styling and Accessibility

## Styling layers

The rendered design combines three layers:

1. Bootstrap's compiled CSS and utility classes.
2. Global project styles from `src/assets/styles/main.scss`.
3. Scoped component/view styles loaded from same-named `.scss` files.

Bootstrap utilities such as `d-flex`, `py-5`, and `fw-semibold` provide common layout and text
rules. See [Bootstrap spacing utilities](https://getbootstrap.com/docs/5.3/utilities/spacing/) and
the [Bootstrap utility API](https://getbootstrap.com/docs/5.3/utilities/api/).

## Sass module structuremodule structure

The code uses Sass's module system (`@use`) rather than deprecated `@import``@import`:

```scss
// In component scss files:
@use "sass:color";
@use "sass:math";
@use "../../assets/styles/variables" as *;

// In main.scss:
@use "sass:color";
@use "sass:math";
@use "./variables" as *;
```

Color transformations use `color.adjust()`, `color.scale()`, `color.mix()`. References:

- [Sass `@use`](https://sass-lang.com/documentation/at-rules/use/)
- [Sass color module](https://sass-lang.com/documentation/modules/color/)
- [Sass math module](https://sass-lang.com/documentation/modules/math/)

## Theme tokens ( (`src/assets/styles/variables.scss`))

```scss
// Colors
$clr-orange:       #c9361f;
$clr-orange-light: #e85d3a;
$clr-orange-dark:  #a02a18;
$clr-white:        #ffffff;
$clr-black:        #000000;
$clr-gray-100:     #f8f9fa;
$clr-gray-200:     #e9ecef;
$clr-gray-300:     #dee2e6;
$clr-gray-400:     #ced4da;
$clr-gray-500:     #adb5bd;
$clr-gray-600:     #6c757d;
$clr-gray-700:     #495057;
$clr-gray-800:     #343a40;
$clr-gray-900:     #212529;

// Typography
$font-primary:    'Poppins', sans-serif;
$font-secondary:  'Manrope', sans-serif;
$font-mono:       'Fira Code', monospace;

// Spacing scale (rem)
$space-1:  0.25rem;
$space-2:  0.5rem;
$space-3:  1rem;
$space-4:  1.5rem;
$space-5:  2rem;
$space-6:  3rem;

// Breakpoints (mirror Bootstrap)
$bp-sm: 576px;
$bp-md: 768px;
$bp-lg: 992px;
$bp-xl: 1200px;
$bp-xxl: 1400px;

// Transitions
$transition-fast:  150ms ease;
$transition-base:  250ms ease;
$transition-slow:  350ms ease;

// Z-index layers
$z-dropdown:   1000;
$z-sticky:     1020;
$z-fixed:      1030;
$z-modal:      1050;
$z-popover:    1060;
$z-tooltip:    1070;
$z-toast:      1080;
// Colors
$clr-orange:       #c9361f;
$clr-orange-light: #e85d3a;
$clr-orange-dark:  #a02a18;
$clr-white:        #ffffff;
$clr-black:        #000000;
$clr-gray-100:     #f8f9fa;
$clr-gray-200:     #e9ecef;
$clr-gray-300:     #dee2e6;
$clr-gray-400:     #ced4da;
$clr-gray-500:     #adb5bd;
$clr-gray-600:     #6c757d;
$clr-gray-700:     #495057;
$clr-gray-800:     #343a40;
$clr-gray-900:     #212529;

// Typography
$font-primary:    'Poppins', sans-serif;
$font-secondary:  'Manrope', sans-serif;
$font-mono:       'Fira Code', monospace;

// Spacing scale (rem)
$space-1:  0.25rem;
$space-2:  0.5rem;
$space-3:  1rem;
$space-4:  1.5rem;
$space-5:  2rem;
$space-6:  3rem;

// Breakpoints (mirror Bootstrap)
$bp-sm: 576px;
$bp-md: 768px;
$bp-lg: 992px;
$bp-xl: 1200px;
$bp-xxl: 1400px;

// Transitions
$transition-fast:  150ms ease;
$transition-base:  250ms ease;
$transition-slow:  350ms ease;

// Z-index layers
$z-dropdown:   1000;
$z-sticky:     1020;
$z-fixed:      1030;
$z-modal:      1050;
$z-popover:    1060;
$z-tooltip:    1070;
$z-toast:      1080;
```

#### GlobalGlobal helpers (`src/assets/styles/main.scss`)(`src/assets/styles/main.scss`)

```scss
// Utility classes generated from variables
.text-orange   { color: $clr-orange; }
.bg-orange     { background-color: $clr-orange; }
.text-gray     { color: $clr-gray-600; }
.bg-whitesmoke { background-color: $clr-gray-100; }

.font-poppins  { font-family: $font-primary; }
.font-manrope  { font-family: $font-secondary; }

.grid          { display: grid; }
.img-cover     { width: 100%; height: 100%; object-fit: cover; }
.no-wrap       { white-space: nowrap; }

// Focus visible utility (add to elements needing keyboard focus)
.focus-ring {
  &:focus-visible {
    outline: 2px solid $clr-orange;
    outline-offset: 2px;
  }
}
```
```scss
// Utility classes generated from variables
.text-orange   { color: $clr-orange; }
.bg-orange     { background-color: $clr-orange; }
.text-gray     { color: $clr-gray-600; }
.bg-whitesmoke { background-color: $clr-gray-100; }

.font-poppins  { font-family: $font-primary; }
.font-manrope  { font-family: $font-secondary; }

.grid          { display: grid; }
.img-cover     { width: 100%; height: 100%; object-fit: cover; }
.no-wrap       { white-space: nowrap; }

// Focus visible utility (add to elements needing keyboard focus)
.focus-ring {
  &:focus-visible {
    outline: 2px solid $clr-orange;
    outline-offset: 2px;
  }
}
```

## Scoped styling convention

Every component/view stylesheet is loaded from a scoped SFC style block:

```vue
<style scoped lang="scss">
@use "./Product.scss";
</style>
```

Vue adds generated attributes (`data-v-xxxxx`) so selectors apply only to that component. Global
Bootstrap and project utility classes remain available because they are imported by `src/main.ts`.

## Component-specific styling examples

### Product card (`Product.scss`)

```scss
.product-card {
  @include grid;
  gap: $space-3;
  padding: $space-3;
  background: $clr-white;
  border-radius: 0.5rem;
  transition: box-shadow $transition-base;

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba($clr-black, 0.15);
  }
}

.product-img {
  aspect-ratio: 1;
  border-radius: 0.375rem;
  overflow: hidden;
}

.discount-badge {
  @extend .bg-orange;
  @extend .text-white;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
}
```

### Cart table (`Cart.scss`)

Uses CSS grid for responsive column layout:

```scss
.cart-ctable {
  @include grid;
  grid-template-columns: 40px 1fr 120px 120px 140px 100px;
  gap: $space-2;

  @media (max-width: $bp-md) {
    grid-template-columns: 1fr;
    .cart-cth { display: none; } // hide headers on mobile
  }
}
```
Vue adds generated attributes (`data-v-xxxxx`) so selectors apply only to that component. Global
Bootstrap and project utility classes remain available because they are imported by `src/main.ts`.

## Contrast work

The primary orange was darkened, section-heading text was strengthened, and stacked product-card
opacity was removed. The current important ratios are approximately:

| Combination | Ratio | WCAG AA |
|---|---:|:---:|
| White on `#c9361f` | 5.21:1 | ✅ Normal & Large |
| `#595959` heading on white | 7.00:1 | ✅ Normal & Large |
| `#212529` product text on white | 15.43:1 | ✅ Normal & Large |
| `#666666` muted text on white | 5.74:1 | ✅ Normal & Large |

WCAG 2.2 Level AA requires at least 4.5:1 for normal text and 3:1 for qualifying large text. See
[WCAG 2.2, Success Criterion 1.4.3](https://www.w3.org/TR/WCAG22/#contrast-minimum).

## Search-field styling

`Navbar.scss` explicitly removes Bootstrap's input border and focus box shadow to preserve the
intended white search surface. When changing this, retain a visible keyboard-focus indicator on the
overall search control; removing every focus cue can create a different accessibility problem.

## Accessibility statusstatus

### ✅ Implemented

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `footer`, `aside`)
- `aria-label` on icon-only links (social, cart, search)
- `alt` text on product images (`product.title`)
- Sufficient color contrast ratios (see table above)
- `lang="en"` on `<html>`
- Responsive viewport meta tag

### ⚠️ Needs improvement

| Issue | Location | Fix |
|---|---|---|
| Missing `:focus-visible` styles | Global (links, buttons, inputs) | Add `.focus-ring` utility and apply |
| Empty `alt` on cart preview images | `CartModal.vue`, `Cart.vue` | Use product title or `alt="Product thumbnail"` |
| Add-to-cart enabled when `stock === 0` | `ProductSingle.vue` | Disable button, show "Out of stock" |
| Search uses `change` event, not form submit | `Navbar.vue` | Wrap in `<form @submit.prevent>` |
| No `aria-current` on active nav link | `Navbar.vue`, `Sidebar.vue` | Add `aria-current="page"` on active route |
| Sidebar drawer not trapped | `Sidebar.vue` | Add focus trap when open |
| Cart modal not keyboard accessible | `CartModal.vue` | Add `tabindex`, ESC to close |
| Product thumbnail keyboard nav | `ProductSingle.vue` | Arrow keys to switch thumbnails |

### 🔧 Recommended automated checks

- Add `axe-core` or `@axe-core/vue` to Vitest for CI accessibility tests
- Run `npm run lint` — `eslint-plugin-jsx-a11y` catches many issues
- Test at 200% zoom and across mobile breakpoints
- Re-run automated checks after any palette or typography change

------

#### NextNext stepssteps

- [Components, pages & routes](04-components-pages-and-routes.md) — component structure
- [Architecture & data flow](02-architecture-and-data-flow.md) — shell layout
- [Known issues & roadmap](07-known-issues-and-roadmap.md) — styling/accessibility fixes
- [References](08-references.md) — Sass, Bootstrap, WCAG docs
- [Components, pages & routes](04-components-pages-and-routes.md) — component structure
- [Architecture & data flow](02-architecture-and-data-flow.md) — shell layout
- [Known issues & roadmap](07-known-issues-and-roadmap.md) — styling/accessibility fixes
- [References](08-references.md) — Sass, Bootstrap, WCAG docs
