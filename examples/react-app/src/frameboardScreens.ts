import type { FrameBoardReactScreen } from '@frameboard/react';
import { WebsitePage } from './SitePages';
import type { SiteScreenProps } from './types';

export const screens: FrameBoardReactScreen<SiteScreenProps>[] = [
  {
    component: WebsitePage,
    description: 'The value-first landing page and getting-started flow.',
    id: 'value-getting-started',
    name: 'Value + Getting Started',
    states: [
      { id: 'loading', name: 'Loading', props: { loading: true, route: 'home' } },
      { id: 'home', name: 'Home', props: { route: 'home' } },
    ],
  },
  {
    component: WebsitePage,
    description: 'Detailed library documentation, params, controls, and best practices.',
    id: 'developer-docs',
    name: 'Developer Docs',
    states: [
      { id: 'loading', name: 'Loading', props: { loading: true, route: 'docs' } },
      { id: 'docs', name: 'Docs Overview', props: { route: 'docs' } },
    ],
  },
  {
    component: WebsitePage,
    description: 'React renderer installation, screen registration, and responsive params.',
    id: 'react-guide',
    name: 'React Guide',
    states: [
      { id: 'loading', name: 'Loading', props: { loading: true, route: 'react' } },
      { id: 'react', name: 'React Guide', props: { route: 'react' } },
    ],
  },
  {
    component: WebsitePage,
    description: 'React Native and Expo renderer setup, dimensions, and mobile presets.',
    id: 'native-guides',
    name: 'Native Guides',
    states: [
      { id: 'loading', name: 'Loading', props: { loading: true, route: 'react-native' } },
      { id: 'reactNative', name: 'React Native', props: { route: 'react-native' } },
      { id: 'expo', name: 'Expo', props: { route: 'expo' } },
    ],
  },
  {
    component: WebsitePage,
    description: 'Prompts and markdown documentation library.',
    id: 'resources',
    name: 'Resources',
    states: [
      { id: 'loading', name: 'Loading', props: { loading: true, route: 'prompts' } },
      { id: 'prompts', name: 'Prompts', props: { route: 'prompts' } },
      { id: 'library', name: 'Docs Library', props: { route: 'library' } },
    ],
  },
];
