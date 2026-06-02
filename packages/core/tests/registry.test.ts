import { describe, expect, it } from 'vitest';
import {
  defaultFrameBoardDevices,
  getFrameBoardScreenshotFilename,
  normalizeFrameBoardParams,
  validateFrameBoardConfig,
} from '../src';

describe('FrameBoard core registry', () => {
  it('normalizes selected device, screen, state, theme, and zoom', () => {
    const normalized = normalizeFrameBoardParams({
      currentThemeMode: 'light',
      defaultDeviceId: 'iphone-15',
      devices: defaultFrameBoardDevices,
      params: {
        device: 'responsive',
        galleryScreen: 'home',
        review: 'screen',
        state: 'empty',
        theme: 'dark',
        view: 'selected',
        zoom: '125',
      },
      screens: [
        {
          component: 'Home',
          id: 'home',
          name: 'Home',
          states: [
            { id: 'loading' },
            { id: 'empty' },
          ],
        },
      ],
    });

    expect(normalized.reviewMode).toBe('screen');
    expect(normalized.selectedDevice.id).toBe('responsive');
    expect(normalized.selectedScreen.id).toBe('home');
    expect(normalized.selectedState.id).toBe('empty');
    expect(normalized.showAllStates).toBe(false);
    expect(normalized.themeMode).toBe('dark');
    expect(normalized.zoomIndex).toBe(3);
  });

  it('falls back to the default device and first state', () => {
    const normalized = normalizeFrameBoardParams({
      currentThemeMode: 'system',
      defaultDeviceId: 'large-android',
      devices: defaultFrameBoardDevices,
      params: {
        device: 'missing',
        state: 'missing',
      },
      screens: [
        {
          component: 'Inbox',
          id: 'inbox',
          name: 'Inbox',
          states: [{ id: 'populated' }],
        },
      ],
    });

    expect(normalized.selectedDevice.id).toBe('large-android');
    expect(normalized.selectedState.id).toBe('populated');
    expect(normalized.themeMode).toBe('system');
  });

  it('applies URL dimensions to the responsive preset', () => {
    const normalized = normalizeFrameBoardParams({
      currentThemeMode: 'light',
      defaultDeviceId: 'responsive',
      devices: defaultFrameBoardDevices,
      params: {
        device: 'responsive',
        height: '720',
        width: '1280',
      },
      screens: [
        {
          component: 'Dashboard',
          id: 'dashboard',
          name: 'Dashboard',
          states: [{ id: 'ready' }],
        },
      ],
    });

    expect(normalized.selectedDevice.id).toBe('responsive');
    expect(normalized.selectedDevice.width).toBe(1280);
    expect(normalized.selectedDevice.height).toBe(720);
    expect(normalized.selectedDevice.detail).toBe('1280 x 720');
  });

  it('builds predictable screenshot filenames', () => {
    expect(
      getFrameBoardScreenshotFilename({
        device: defaultFrameBoardDevices[1],
        screenId: 'Document Detail',
        stateId: 'Due Soon',
        theme: 'system dark',
      }),
    ).toBe('document-detail-due-soon-iphone-15-system-dark.png');
  });

  it('reports invalid screen registrations', () => {
    expect(
      validateFrameBoardConfig({
        devices: [],
        screens: [
          {
            component: 'Broken',
            id: 'broken',
            name: '',
            states: [
              { id: 'empty' },
              { id: 'empty' },
            ],
          },
        ],
      }),
    ).toEqual([
      'FrameBoard requires at least one device preset.',
      'FrameBoard screen "broken" requires a display name.',
      'FrameBoard screen "broken" has duplicate state id "empty".',
    ]);
  });
});
