# SnapUp Ecommerce — Mobile

The SnapUp mobile application is built with Flutter and Dart.

[Repository overview](../README.md) · [Web app](../web/README.md) · [Mobile wiki](wiki/README.md)

## Requirements

To run the app on an Android device, install the following tools and enable **Developer options**
and **USB debugging** on the device:

- [Flutter](https://docs.flutter.dev/get-started/install) and the Android SDK;
- Android Platform Tools (`adb`), which Flutter uses to discover the device;
- [Fdemon](https://fdemon.dev/) for the Flutter development terminal;
- [scrcpy](https://github.com/Genymobile/scrcpy) to mirror and control the device from the computer;
- [Zed](https://zed.dev/) for the optional editor and debugger workflow.

Connect the phone by USB, accept its debugging prompt, then confirm that it is visible:

```bash
flutter doctor
adb devices
```

## Run with Flutter

From this directory:

```bash
flutter pub get
flutter run
```

When more than one device or emulator is connected, list them and choose the Android device
explicitly:

```bash
flutter devices
flutter run -d <device-id>
```

While `flutter run` is active, press `r` for hot reload, `R` for hot restart, or `q` to stop the
app.

## Mirror the device with scrcpy

Open a second terminal while the phone is connected and run:

```bash
scrcpy
```

This opens a window that mirrors the phone and allows mouse and keyboard interaction. If multiple
devices are connected, target the same device ID used by Flutter:

```bash
scrcpy -s <device-id>
```

`scrcpy` mirrors the device only; it does not install or run the Flutter app.

## Run with Fdemon

[Fdemon](https://fdemon.dev/docs) manages the Flutter process in a terminal interface. The shared
[`.fdemon/config.toml`](.fdemon/config.toml) watches Dart files in `lib/` and reloads the app after
changes. Start it from the `mobile/` directory:

```bash
fdemon .
```

Select the connected device in the Fdemon interface. Use `r` for hot reload, `R` for hot restart,
and `q` to quit. Do not run `flutter run` and `fdemon` for the same app session at the same time:
both tools manage the Flutter process.

## Run and debug from Zed

Open the `mobile/` directory as the Zed workspace:

```bash
zed .
```

In Zed's integrated terminal, start Fdemon with the port used by this project's
[`.zed/debug.json`](.zed/debug.json):

```bash
fdemon . --dap-port 46171
```

Then open Zed's Debug panel, start **Flutter Demon (TCP)**, and choose the connected device in
Fdemon. The debugger attaches to Fdemon at `127.0.0.1:46171`, allowing breakpoints, stepping, and
variable inspection while Fdemon remains responsible for the Flutter session.

## Useful commands

| Command | Purpose |
| --- | --- |
| `flutter run` | Run the app on a connected device or emulator. |
| `fdemon .` | Run the app through Fdemon with file watching and hot reload. |
| `scrcpy` | Mirror and control a connected Android device. |
| `flutter test` | Run the Flutter test suite. |
| `flutter analyze` | Analyze the Dart source for issues. |

## Learn Flutter

- [Flutter getting started guide](https://docs.flutter.dev/get-started/learn-flutter)
- [Flutter documentation](https://docs.flutter.dev/)
