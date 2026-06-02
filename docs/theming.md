# Theming

FrameBoard supports `light`, `dark`, and `system` theme modes at the board level.

The host app can provide:

- `themeMode`
- `isDark`
- `onThemeModeChange`
- custom `colors`

The board does not own the host app theme. If screen fixtures need a provider, wrap FrameBoard in the host provider or use `renderAppShell`.

Example:

```tsx
<FrameBoard
  colors={{
    background: "#F6F4EF",
    border: "#D8D3C8",
    card: "#FFFFFF",
    muted: "#6D6878",
    paper: "#FFFCF7",
    primary: "#5B4BDB",
    selectedSoft: "#ECE8FF",
    text: "#1F1D2B",
  }}
  isDark={theme === "dark"}
  themeMode={theme}
  onThemeModeChange={setTheme}
  screens={screens}
/>
```
