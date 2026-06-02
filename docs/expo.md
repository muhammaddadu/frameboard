# Expo

FrameBoard works well as a dev-only Expo web route.

## Example Route

```tsx
import { FrameBoard } from '@frameboard/react-native';

export default function ScreenGalleryRoute() {
  return <FrameBoard screens={screens} />;
}
```

## Recommended Setup

- Keep the route dev-only if it should not ship in production flows.
- Keep repositories, analytics, native pickers, scanner APIs, and storage outside fixture-rendered Views.
- Use fixture data instead of real app data.
- If using a locally linked package during development, build FrameBoard packages before starting Expo.

```bash
pnpm build
pnpm dev:native
```

## CI

Expo examples can be typechecked and web-bundled without iOS or Android simulators. Native simulator tests are not required for FrameBoard package CI.
