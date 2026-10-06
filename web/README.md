# SnapUp Ecommerce — Web

The SnapUp web app is a Vue progressive web application for browsing products and managing a
cart. Product data comes from [DummyJSON](https://dummyjson.com/), and cart data is persisted in
the browser.

[Repository overview](../README.md) · [Mobile app](../mobile/README.md) · [Web wiki](wiki/README.md)

## Screenshot

![SnapUp web application](public/snapup-ecommece-screenshot.png)

## Run the web app

From this directory:

```bash
bun install
bun run dev
```

## Available commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the Vite development server. |
| `bun run build` | Type-check and create a production build. |
| `bun run preview` | Preview the production build locally. |
| `bun run test:unit` | Run the Vitest unit tests. |
| `bun run lint` | Fix lint issues in the source files. |
| `bun run format` | Format source files with Prettier. |

## Recommended IDE setup

[VS Code](https://code.visualstudio.com/) with
[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Disable Vetur when using
Volar.

## Technologies

![Vue](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Pinia](https://img.shields.io/badge/pinia-%2335495e.svg?style=for-the-badge&logo=pinia&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Bun](https://img.shields.io/badge/bun-282a36?style=for-the-badge&logo=bun&logoColor=fbf0df)
![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)

## Project documentation

The [web wiki](wiki/README.md) covers architecture, folder conventions, data flow, development,
testing, deployment, known issues, and technical references.
