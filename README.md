
# SnapUp Ecommerce

This repository contains the SnapUp Ecommerce applications for web and mobile.

| Application | Stack | Documentation |
| --- | --- | --- |
| Web | Vue 3, TypeScript, Pinia, Vite, and Bun | [Web README](web/README.md) |
| Mobile | Flutter and Dart | [Mobile README](mobile/README.md) |

## Choose an application

### Web

The web app is a Vue progressive web application that uses DummyJSON for product data and
browser storage for the cart.

```bash
cd web
bun install --frozen-lockfile
bun run dev
```

Read the [web setup, commands, technologies, and documentation](web/README.md).

### Mobile

The mobile app is built with Flutter.

```bash
cd mobile
flutter pub get
flutter run
```

Read the [mobile setup and development instructions](mobile/README.md).

## Documentation

Each application maintains its own detailed documentation:

- [Web wiki](web/wiki/README.md)
- [Mobile wiki](mobile/wiki/README.md)

