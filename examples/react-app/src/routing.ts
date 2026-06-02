import { paramKeys, rootPath } from './siteConfig';
import type { DemoFrameBoardParams, SiteRoute, SiteScreenProps } from './types';

export function readParamsFromLocation(): DemoFrameBoardParams {
  if (typeof window === 'undefined') return {};

  const searchParams = new URLSearchParams(window.location.search);

  return paramKeys.reduce<DemoFrameBoardParams>((params, key) => {
    const value = searchParams.get(key);
    if (value) params[key] = value;
    return params;
  }, {});
}

export function writeParamsToLocation(params: DemoFrameBoardParams) {
  const searchParams = new URLSearchParams();

  for (const key of paramKeys) {
    const value = params[key];
    if (typeof value === 'string' && value.length > 0) {
      searchParams.set(key, value);
    }
  }

  const query = searchParams.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState(null, '', nextUrl);
}

export function routeFromPathname(pathname: string): SiteRoute {
  const normalized = pathname.replace(rootPath, '').replace(/^\/+|\/+$/g, '');

  if (normalized === 'docs/react') return 'react';
  if (normalized === 'docs/react-native') return 'react-native';
  if (normalized === 'docs/expo') return 'expo';
  if (normalized === 'docs/prompts') return 'prompts';
  if (normalized === 'docs/library') return 'library';
  if (normalized === 'docs') return 'docs';

  return 'home';
}

export function routeFromState(state: unknown): SiteRoute {
  const props = typeof state === 'object' && state && 'props' in state
    ? (state as { props?: SiteScreenProps }).props
    : undefined;

  return props?.route ?? 'home';
}
