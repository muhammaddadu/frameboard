# FrameBoard Screen Refactor Prompt

Use this prompt in an existing React, Expo, or React Native project before adding FrameBoard. The goal is to prepare screens so they can be rendered independently with deterministic fixture states.

```text
Refactor this React / Expo React Native project so meaningful product screens can be rendered independently in FrameBoard.

Do not add FrameBoard yet unless the project is already structurally ready. The goal of this stage is architectural preparation.

First, inspect the project structure, routing, providers, state management, API usage, theme system, design system, and screen files.

Then create a short implementation plan in docs/frameboard-screen-refactor.md before changing code.

Refactor towards this standard:

1. Route files should be thin wrappers only.
   - For React Router, Next.js, Remix, TanStack Router, or file-based routes, route files should import and render screen containers.
   - For Expo Router, route files should import and render screen containers.
   - Route files should not contain business logic, API calls, complex state, or large UI trees.

2. Each meaningful screen should have:
   - ScreenNameScreen.tsx for route-connected container logic.
   - ScreenNameView.tsx for pure presentational UI.
   - ScreenName.fixtures.ts for FrameBoard fixture states.
   - index.ts for clean exports.

3. Presentational screen views must:
   - Accept data, loading, error, permission, empty-state, and action handlers through props.
   - Avoid direct use of router hooks, API hooks, auth hooks, storage, analytics, notifications, camera, file picker, or native-only APIs.
   - Use the existing design-system components and platform primitives.
   - In React DOM projects, use semantic HTML and existing layout primitives.
   - In React Native / Expo projects, use React Native primitives and existing native design-system components.
   - Keep current visual behavior unchanged unless a bug is clearly found.

4. Container screens may:
   - Use router params and navigation.
   - Use app state, API hooks, mutations, auth, storage, native APIs, and analytics.
   - Adapt app data into view props.
   - Pass callbacks to the view without forcing the view to know where those callbacks came from.

5. Create or improve shared providers:
   - AppProviders for the real app.
   - FrameBoardProviders, MockAppProviders, or ScreenHarness for FrameBoard rendering.
   - The harness should support theme, safe area where relevant, mock navigation, mock auth, mock data, and app shell chrome.

6. Add fixtures for important screen states:
   - loading
   - empty
   - success
   - error
   - long content
   - permission denied where relevant
   - first-time or onboarding states where relevant
   - responsive layout states where relevant
   - dark mode where relevant

7. Prepare FrameBoard integration:
   - Create a screens registry shape that can be passed to FrameBoard later.
   - Use stable screen ids and state ids.
   - Ensure each fixture is deterministic and does not fetch, mutate storage, navigate, or trigger native capabilities during render.
   - Identify whether screens should render with the real app shell, a simplified shell, or no shell.
   - Document which toolbar controls should be enabled for this project, such as devices, theme, notes, export, responsive dimensions, and app shell.

8. Keep behavior safe:
   - Do not break existing navigation.
   - Do not rename routes unless absolutely necessary.
   - Do not remove features.
   - Keep TypeScript strict.
   - Run lint, typecheck, tests, and the app build after changes.
   - If tests do not exist, add lightweight render tests for one or two refactored screens.

9. Document the pattern:
   - Update docs/frameboard-screen-refactor.md with the final structure.
   - Add examples showing how to add a new screen using Screen + View + fixtures.
   - Add a future section for installing FrameBoard and exposing a private review route.

Important:
- Work incrementally.
- Start with 2-3 representative screens only, ideally Home, Onboarding, and one complex detail or workflow screen.
- Once the pattern is proven, list remaining screens to migrate.
- Preserve current UI and behavior unless explicitly improving structure.
- Make small changes that are easy to review.
```

## Follow-up Prompt

After the screen pattern is proven, use this follow-up prompt to install FrameBoard:

```text
Install FrameBoard in this project.
Use the existing Screen + View + fixtures pattern.
Create a private FrameBoard route that registers the representative screens and fixture states.
Wrap screens in the project harness or app shell where that changes layout.
Enable the controls that matter for this project, such as devices, responsive dimensions, theme, notes, export, and app shell.
Add docs explaining how future screens should be added to the FrameBoard registry.
Run lint, typecheck, tests, and build.
```
