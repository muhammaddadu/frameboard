import { Braces, LayoutDashboard, Sparkles, type LucideIcon } from 'lucide-react';

export const valueCards: Array<{ body: string; icon: LucideIcon; title: string }> = [
  {
    icon: Sparkles,
    title: 'Vibe coders keep momentum',
    body: 'Prompt your agent to install the board, discover valuable screens, and build fixtures without turning every UI pass into a manual QA maze.',
  },
  {
    icon: LayoutDashboard,
    title: 'UX designers review reality',
    body: 'Inspect rendered screens with app chrome, states, copy, density, dark mode, and viewport changes in one reviewable board.',
  },
  {
    icon: Braces,
    title: 'FE engineers standardize quality',
    body: 'Make edge cases durable with named fixtures, URL-addressable states, screenshot exports, and repeatable review targets.',
  },
];

export const workflowSteps = [
  'Register high-value product screens.',
  'Add fixture states for loading, empty, error, permission, success, processing, and long content.',
  'Review across phone, tablet, responsive, desktop, themes, app shell, and notes.',
  'Export artboards or link reviewers directly to the exact screen state.',
];

export const gettingStartedSteps = [
  {
    code: 'pnpm add @frameboard/react @frameboard/core',
    title: 'Install FrameBoard',
    body: 'Add the React renderer and core utilities to the app you want to review.',
  },
  {
    code: `import { FrameBoard } from '@frameboard/react';
import '@frameboard/react/styles.css';`,
    title: 'Create a review route',
    body: 'Add a private route such as /frameboard or /internal/review-board.',
  },
  {
    code: `const screens = [{
  id: 'checkout',
  name: 'Checkout',
  component: CheckoutScreen,
  states: [
    { id: 'loading', props: loadingFixture },
    { id: 'empty', props: emptyFixture },
    { id: 'error', props: errorFixture },
  ],
}];`,
    title: 'Register screen states',
    body: 'Start with states that expose real product risk: loading, empty, error, permission, success, and long content.',
  },
  {
    code: `export function ReviewBoard() {
  return <FrameBoard screens={screens} />;
}`,
    title: 'Render the board',
    body: 'Open the route, switch devices/themes, and share URLs for exact states.',
  },
];

export const docsSections = [
  {
    title: 'Core model',
    body: 'FrameBoard is organized around screens, states, devices, themes, app shell rendering, params, and exports.',
    code: `type FrameBoardScreen = {
  id: string;
  name: string;
  component: ComponentType<Props>;
  states: Array<{ id: string; name?: string; props?: Props }>;
};`,
  },
  {
    title: 'URL params',
    body: 'Every review mode is linkable. Use params to open a specific screen, state, viewport, theme, notes mode, or zoom.',
    code: `?review=screen
&galleryScreen=website
&state=docs
&device=responsive
&width=1280
&height=720
&theme=dark
&zoom=75`,
  },
  {
    title: 'Controls',
    body: 'Use controls to hide features that do not create value for a specific demo, internal review route, or customer-facing example.',
    code: `<FrameBoard
  screens={screens}
  controls={{
    export: false,
    notes: false,
    theme: true,
    devices: true,
  }}
/>`,
  },
];

export const reactGuide = [
  {
    title: 'Install',
    code: `pnpm add @frameboard/react @frameboard/core`,
  },
  {
    title: 'Create a review route',
    code: `import { FrameBoard } from '@frameboard/react';
import '@frameboard/react/styles.css';

export function ReviewBoard() {
  return <FrameBoard screens={screens} />;
}`,
  },
  {
    title: 'Register screens',
    code: `const screens = [{
  id: 'checkout',
  name: 'Checkout',
  component: CheckoutScreen,
  states: [
    { id: 'emptyCart', props: emptyCartFixture },
    { id: 'paymentError', props: paymentErrorFixture },
    { id: 'processing', props: processingFixture },
  ],
}];`,
  },
];

export const nativeGuide = [
  {
    title: 'Install',
    code: `pnpm add @frameboard/react-native @frameboard/core`,
  },
  {
    title: 'Use responsive dimensions',
    code: `import { useResponsiveDimensions } from '@frameboard/react-native';

function InboxScreen() {
  const { width } = useResponsiveDimensions();
  return <InboxLayout compact={width < 390} />;
}`,
  },
  {
    title: 'Mobile devices by default',
    code: `import { defaultFrameBoardMobileDevices } from '@frameboard/core';

<FrameBoard
  devices={defaultFrameBoardMobileDevices}
  screens={screens}
/>;`,
  },
];

export const promptCards = [
  {
    audience: 'Preparation',
    outcome: 'React, Expo, or React Native screens refactored into Screen + View + fixtures.',
    title: 'Prepare screens for FrameBoard',
    body: 'Refactor this React / Expo React Native project so meaningful product screens can be rendered independently in FrameBoard. First inspect routing, providers, state management, API usage, theme system, design system, and screen files. Create docs/frameboard-screen-refactor.md, then refactor 2-3 representative screens into ScreenNameScreen.tsx containers, ScreenNameView.tsx presentational views, ScreenName.fixtures.ts deterministic fixture states, and index.ts exports. Route files should be thin wrappers. Views should accept data, loading, error, permission, empty-state, and action handlers through props, and should not directly use router hooks, API hooks, auth hooks, storage, analytics, notifications, camera, file picker, or native-only APIs. Preserve current UI and behavior, run lint/typecheck/tests/build, and list remaining screens to migrate.',
  },
  {
    audience: 'Setup',
    outcome: 'Private review route with first valuable screens registered.',
    title: 'Install and wire FrameBoard',
    body: 'Install FrameBoard in this project and add a private review board route. Register the highest-value screens first, include realistic fixture states, wrap screens in the app shell when chrome affects layout, and document how to add future states.',
  },
  {
    audience: 'Discovery',
    outcome: 'Prioritized screen/state map by product risk.',
    title: 'Audit valuable states',
    body: 'Review this app and list the screens that should be represented in FrameBoard. For each screen, propose loading, empty, error, permission, processing, success, long-content, responsive, and dark-mode states with the fixture data required.',
  },
  {
    audience: 'Quality',
    outcome: 'Sharper fixtures with useful edge cases and captions.',
    title: 'Improve fixture quality',
    body: 'Improve existing FrameBoard fixtures. Replace placeholder copy with realistic product data, add edge cases for long names and missing values, ensure state ids are stable, and add captions describing what each state validates.',
  },
];

export const docsFiles = [
  { group: 'Start', path: 'docs/start/getting-started.md', title: 'Getting Started' },
  { group: 'Renderers', path: 'docs/renderers/react.md', title: 'React' },
  { group: 'Renderers', path: 'docs/renderers/react-native.md', title: 'React Native' },
  { group: 'Renderers', path: 'docs/renderers/expo.md', title: 'Expo' },
  { group: 'Guides', path: 'docs/guides/fixtures.md', title: 'Fixtures' },
  { group: 'Guides', path: 'docs/guides/theming.md', title: 'Theming' },
  { group: 'Guides', path: 'docs/guides/app-shells.md', title: 'App Shells' },
  { group: 'Guides', path: 'docs/guides/screenshot-export.md', title: 'Screenshot Export' },
  { group: 'Website', path: 'docs/website/frameboard-screen-refactor-prompt.md', title: 'FrameBoard Screen Refactor Prompt' },
  { group: 'Reference', path: 'docs/reference/device-presets.md', title: 'Device Presets' },
  { group: 'Reference', path: 'docs/reference/responsive-dimensions.md', title: 'Responsive Dimensions' },
  { group: 'Project', path: 'docs/project/architecture.md', title: 'Architecture' },
  { group: 'Project', path: 'docs/project/contributing.md', title: 'Contributing' },
  { group: 'Project', path: 'docs/project/releasing.md', title: 'Releasing' },
  { group: 'Roadmap', path: 'docs/roadmap/visual-regression.md', title: 'Visual Regression' },
  { group: 'Roadmap', path: 'docs/roadmap/ai-audit.md', title: 'AI Audit' },
];
