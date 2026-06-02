# Screenshot Export

FrameBoard supports browser PNG export for rendered artboards.

Current support:

- export selected artboard
- export all states for the selected screen
- filenames use `screen-state-device-theme.png`

The export target is the artboard element, not the whole browser page.

React usage requires the package CSS:

```tsx
import "@frameboard/react/styles.css";
```

React Native / Expo web export requires the host route to run in a browser with DOM access. Native iOS and Android screenshot export is not implemented yet.

Future work:

- full product board export
- CI screenshot generation
- visual regression baselines
- diff reporting
