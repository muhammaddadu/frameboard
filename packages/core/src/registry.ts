import {
  type FrameBoardDevice,
  type FrameBoardParams,
  type FrameBoardReviewMode,
  type FrameBoardScreen,
  type FrameBoardState,
  type FrameBoardThemeMode,
  type NormalizedFrameBoardParams,
} from './types';

export const frameBoardZoomLevels = [0.5, 0.75, 1, 1.25] as const;

export function readFrameBoardParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function isFrameBoardThemeMode(value: string | undefined): value is FrameBoardThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function findFrameBoardDevice(
  devices: FrameBoardDevice[],
  deviceId: string | undefined,
  defaultDeviceId?: string,
): FrameBoardDevice {
  return (
    devices.find((device) => device.id === deviceId) ??
    devices.find((device) => device.id === defaultDeviceId) ??
    devices[1] ??
    devices[0] ??
    { id: 'default', name: 'Default', width: 393, height: 852 }
  );
}

export function findFrameBoardZoomIndex(zoomParam: string | undefined, fallbackIndex = 1): number {
  const nextIndex = frameBoardZoomLevels.findIndex(
    (zoomLevel) => String(Math.round(zoomLevel * 100)) === zoomParam,
  );

  return nextIndex >= 0 ? nextIndex : fallbackIndex;
}

export function normalizeFrameBoardParams<TComponent, TProps, TMeta>({
  currentThemeMode,
  defaultDeviceId,
  devices,
  params,
  screens,
}: {
  currentThemeMode: FrameBoardThemeMode;
  defaultDeviceId?: string;
  devices: FrameBoardDevice[];
  params: FrameBoardParams;
  screens: FrameBoardScreen<TComponent, TProps, TMeta>[];
}): NormalizedFrameBoardParams<TComponent, TProps, TMeta> {
  const selectedScreen =
    screens.find((screen) => screen.id === (readFrameBoardParam(params.galleryScreen) ?? readFrameBoardParam(params.screen))) ??
    screens[0];

  if (!selectedScreen) {
    throw new Error('FrameBoard requires at least one screen.');
  }

  const requestedStateId = readFrameBoardParam(params.state);
  const selectedState =
    selectedScreen.states.find((state) => state.id === requestedStateId) ??
    selectedScreen.states[0];

  if (!selectedState) {
    throw new Error(`FrameBoard screen "${selectedScreen.id}" requires at least one state.`);
  }

  const themeParam = readFrameBoardParam(params.theme);
  const reviewMode: FrameBoardReviewMode =
    readFrameBoardParam(params.review) === 'screen' ? 'screen' : 'board';

  return {
    reviewMode,
    searchQuery: readFrameBoardParam(params.q) ?? '',
    selectedDevice: findFrameBoardDevice(
      devices,
      readFrameBoardParam(params.device),
      defaultDeviceId,
    ),
    selectedScreen,
    selectedState,
    showAllStates: readFrameBoardParam(params.view) !== 'selected',
    showAppShell: readFrameBoardParam(params.chrome) !== 'content',
    showReviewNotes: readFrameBoardParam(params.notes) !== 'hide',
    themeMode: isFrameBoardThemeMode(themeParam) ? themeParam : currentThemeMode,
    zoomIndex: findFrameBoardZoomIndex(readFrameBoardParam(params.zoom), reviewMode === 'board' ? 0 : 1),
  };
}

export function humanizeFrameBoardStateName(state: FrameBoardState | string): string {
  const value = typeof state === 'string' ? state : state.name ?? state.id;
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getDefaultFrameBoardStateCaption<TComponent, TProps, TMeta>(
  screen: FrameBoardScreen<TComponent, TProps, TMeta>,
  state: FrameBoardState<TProps>,
): string {
  if (state.caption) return state.caption;
  if (screen.stateCaption) return screen.stateCaption(state);

  const normalized = state.id.toLowerCase();

  if (normalized.includes('loading')) return 'Waiting state before data is ready.';
  if (normalized.includes('error') || normalized.includes('failed')) return 'Recovery state for failed loading or processing.';
  if (normalized.includes('empty') || normalized.includes('nodocuments')) return 'Zero-data state for first-time or cleared accounts.';
  if (normalized.includes('long')) return 'Stress test for wrapping, scroll depth, and dense content.';
  if (normalized.includes('search') || normalized.includes('filtered')) return 'Filtered list state for scanning results and hierarchy.';
  if (normalized.includes('permission')) return 'Blocked permission state with fallback guidance.';
  if (normalized.includes('processing') || normalized.includes('busy') || normalized.includes('saving')) {
    return 'In-progress state for disabled actions and status feedback.';
  }
  if (normalized.includes('delete')) return 'Destructive confirmation state contained inside the artboard.';
  if (normalized.includes('tablet') || normalized.includes('split')) return 'Wide layout check for tablet-specific composition.';
  if (normalized.includes('due') || normalized.includes('reminder')) {
    return 'Reminder timing state for urgency, dates, and follow-up copy.';
  }

  return screen.description ?? 'Registered FrameBoard state.';
}

export function noteCountForFrameBoardState(stateId: string): number {
  if (/error|failed/i.test(stateId)) return 2;
  if (/empty|noDocuments|allCaughtUp/i.test(stateId)) return 1;
  if (/long|search|filtered/i.test(stateId)) return 3;
  if (/tablet/i.test(stateId)) return 1;
  return 0;
}
