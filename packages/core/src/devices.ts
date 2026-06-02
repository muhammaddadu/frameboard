import { type FrameBoardDevice } from './types';

export const defaultFrameBoardDevices: FrameBoardDevice[] = [
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    detail: '375 x 667',
    kind: 'mobile',
    width: 375,
    height: 667,
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    detail: '393 x 852',
    kind: 'mobile',
    width: 393,
    height: 852,
  },
  {
    id: 'large-android',
    name: 'Large Android',
    detail: '412 x 915',
    kind: 'mobile',
    width: 412,
    height: 915,
  },
  {
    id: 'tablet',
    name: 'Tablet',
    detail: '820 x 1180',
    kind: 'tablet',
    width: 820,
    height: 1180,
  },
  {
    id: 'responsive',
    name: 'Responsive',
    detail: '1024 x 768',
    kind: 'responsive',
    width: 1024,
    height: 768,
  },
  {
    id: 'desktop',
    name: 'Desktop',
    detail: '1440 x 900',
    kind: 'desktop',
    width: 1440,
    height: 900,
  },
];

export const defaultFrameBoardMobileDevices: FrameBoardDevice[] = defaultFrameBoardDevices.filter(
  (device) => device.kind === 'mobile' || device.kind === 'tablet',
);
