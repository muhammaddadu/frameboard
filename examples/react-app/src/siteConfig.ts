import type { SiteRoute } from './types';

export const paramKeys = [
  'chrome',
  'device',
  'galleryScreen',
  'height',
  'notes',
  'q',
  'review',
  'screen',
  'state',
  'theme',
  'view',
  'width',
  'zoom',
] as const;

export const rootPath = import.meta.env.BASE_URL;
export const demoPath = `${rootPath}examples/react/`;
export const githubUrl = 'https://github.com/muhammaddadu/frameboard';
export const heroImageUrl = `${rootPath}images/frameboard-hero.png`;

export const navItems: Array<{ label: string; route?: SiteRoute; href: string }> = [
  { href: `${rootPath}docs/`, label: 'Docs', route: 'docs' },
  { href: demoPath, label: 'Examples' },
  { href: `${rootPath}docs/react/`, label: 'Guides', route: 'react' },
  { href: `${rootPath}docs/library/`, label: 'API', route: 'library' },
  { href: `${githubUrl}/releases`, label: 'Changelog' },
];

export const docsNavItems: Array<{ label: string; route: SiteRoute; href: string }> = [
  { href: `${rootPath}docs/`, label: 'Overview', route: 'docs' },
  { href: `${rootPath}docs/react/`, label: 'React', route: 'react' },
  { href: `${rootPath}docs/react-native/`, label: 'React Native', route: 'react-native' },
  { href: `${rootPath}docs/expo/`, label: 'Expo', route: 'expo' },
  { href: `${rootPath}docs/prompts/`, label: 'Prompts', route: 'prompts' },
  { href: `${rootPath}docs/library/`, label: 'Markdown Library', route: 'library' },
];
