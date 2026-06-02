import type { FrameBoardReactProps } from '@frameboard/react';

export type SiteRoute = 'home' | 'docs' | 'react' | 'react-native' | 'expo' | 'prompts' | 'library';

export type SiteScreenProps = {
  embedded?: boolean;
  loading?: boolean;
  route?: SiteRoute;
};

export type DemoFrameBoardParams = NonNullable<FrameBoardReactProps['params']>;
