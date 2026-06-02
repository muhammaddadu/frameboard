# Device Presets

Device presets define the simulated artboard size.

Default presets:

| ID | Name | Size |
| --- | --- | --- |
| `iphone-se` | iPhone SE | 375 x 667 |
| `iphone-15` | iPhone 15 | 393 x 852 |
| `large-android` | Large Android | 412 x 915 |
| `tablet` | Tablet | 820 x 1180 |

## Custom Preset

```tsx
const devices = [
  ...defaultFrameBoardDevices,
  {
    id: 'foldable',
    name: 'Foldable',
    detail: '673 x 841',
    width: 673,
    height: 841,
  },
];

<FrameBoard devices={devices} screens={screens} />
```

Use presets that represent real audit targets. More devices are not automatically better.
