# App Shells

An app shell lets a host app show tabs, headers, navigation bars, or other chrome around a fixture-rendered screen.

FrameBoard does not provide app-specific navigation. The host supplies a renderer:

```tsx
<FrameBoard
  renderAppShell={({ children }) => (
    <AppFrame>
      {children}
      <BottomTabs />
    </AppFrame>
  )}
  screens={screens}
/>
```

The toolbar can switch between app shell and content-only rendering.

Keep app shells passive. They should not trigger analytics, navigation side effects, repositories, camera access, file pickers, or storage writes.
