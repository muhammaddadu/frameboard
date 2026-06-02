# Contributing Notes

The canonical contributor guide is [../CONTRIBUTING.md](../CONTRIBUTING.md).

Use this page as a short package-boundary reminder:

- `@frameboard/core` must stay framework-agnostic.
- `@frameboard/react` owns DOM React rendering.
- `@frameboard/react-native` owns React Native and Expo support.
- examples should demonstrate usage without leaking example-only code into packages.
- docs must change when public APIs, setup, commands, or workflows change.
