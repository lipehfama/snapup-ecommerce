# Styling and Accessibility

## Styling layers

The rendered design combines three layers:

1. Bootstrap's compiled CSS and utility classes.
2. Global project styles from `src/assets/styles/main.scss`.
3. Scoped component/view styles loaded from same-named `.scss` files.

Bootstrap utilities such as `d-flex`, `py-5`, and `fw-semibold` provide common layout and text
rules. See [Bootstrap spacing utilities](https://getbootstrap.com/docs/5.3/utilities/spacing/) and
the [Bootstrap utility API](https://getbootstrap.com/docs/5.3/utilities/api/).

## Sass modules

The code uses Sass's module system rather than deprecated Sass imports:

```scss
@use "sass:color";
@use "../../assets/styles/variables" as *;
```

Color transformations use `color.adjust()`. References:

- [Sass `@use`](https://sass-lang.com/documentation/at-rules/use/)
- [Sass color module](https://sass-lang.com/documentation/modules/color/)

## Theme tokens

`src/assets/styles/variables.scss` defines the shared palette and typography. The primary brand
color is currently:

```scss
$clr-orange: #c9361f;
```

The project also defines global helpers including:

- `.text-orange` and `.bg-orange`;
- `.text-gray` and `.bg-whitesmoke`;
- `.font-poppins` and `.font-manrope`;
- `.grid`, `.img-cover`, and `.no-wrap`.

## Scoped styling convention

Every component/view stylesheet is loaded from a scoped SFC style block:

```vue
<style scoped lang="scss">
@use "./Product.scss";
</style>
```

Vue adds generated attributes so selectors apply only to that component. Global Bootstrap and
project utility classes remain available because they are imported by `src/main.ts`.

## Contrast work

The primary orange was darkened, section-heading text was strengthened, and stacked product-card
opacity was removed. The current important ratios are approximately:

| Combination | Ratio |
|---|---:|
| White on `#c9361f` | 5.21:1 |
| `#595959` heading on white | 7.00:1 |
| `#212529` product text on white | 15.43:1 |
| `#666666` muted text on white | 5.74:1 |

WCAG 2.2 Level AA requires at least 4.5:1 for normal text and 3:1 for qualifying large text. See
[WCAG 2.2, Success Criterion 1.4.3](https://www.w3.org/TR/WCAG22/#contrast-minimum).

## Search-field styling

`Navbar.scss` explicitly removes Bootstrap's input border and focus box shadow to preserve the
intended white search surface. When changing this, retain a visible keyboard-focus indicator on the
overall search control; removing every focus cue can create a different accessibility problem.

## Accessibility improvements still recommended

- Add a visible `:focus-visible` treatment for links, buttons, and the search control.
- Give the cart preview image meaningful alternative text instead of an empty string where useful.
- Disable or hide add-to-cart behavior when stock is zero.
- Use a form and submit button for search so keyboard behavior is predictable.
- Add an accessible name and current-state semantics to interactive navigation.
- Test at 200% zoom and across mobile breakpoints.
- Re-run automated checks after any palette or typography change.

Automated audits are helpful, but keyboard and screen-reader checks are still required because
automated tools cannot evaluate every accessibility requirement.
