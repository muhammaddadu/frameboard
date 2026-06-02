# Device Presets

Device presets define the simulated artboard size and device category shown in the toolbar.

Default presets:

| ID | Name | Kind | Size |
| --- | --- | --- | --- |
| `iphone-se` | iPhone SE | `mobile` | 375 x 667 |
| `iphone-15` | iPhone 15 | `mobile` | 393 x 852 |
| `large-android` | Large Android | `mobile` | 412 x 915 |
| `tablet` | Tablet | `tablet` | 820 x 1180 |
| `responsive` | Responsive | `responsive` | 1024 x 768 |
| `desktop` | Desktop | `desktop` | 1440 x 900 |

`defaultFrameBoardDevices` includes every preset. `defaultFrameBoardMobileDevices` includes only `mobile` and `tablet` presets for mobile app review boards.

The `responsive` preset can be resized by URL params in supported renderers:

```text
?device=responsive&width=1280&height=720
```

## Custom Preset

```tsx
import { defaultFrameBoardMobileDevices } from '@frameboard/core';

const devices = [
  ...defaultFrameBoardMobileDevices,
  {
    id: 'foldable',
    name: 'Foldable',
    detail: '673 x 841',
    kind: 'mobile',
    width: 673,
    height: 841,
  },
];

<FrameBoard devices={devices} screens={screens} />
```

`kind` is optional, but setting it lets renderers choose the right icon and frame treatment. Use `mobile`, `tablet`, `responsive`, or `desktop`.

Use presets that represent real audit targets. More devices are not automatically better.
