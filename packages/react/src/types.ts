import { type ComponentType, type ReactNode } from 'react';
import {
  type FrameBoardAuditItem,
  type FrameBoardColors,
  type FrameBoardDevice,
  type FrameBoardParams,
  type FrameBoardState,
  type FrameBoardThemeMode,
} from '@frameboard/core';

export type FrameBoardReactScreen<TProps = unknown, TMeta = unknown> = {
  component: ComponentType<TProps>;
  description?: string;
  id: string;
  meta?: TMeta;
  name: string;
  stateCaption?: (state: FrameBoardState<TProps>) => string;
  states: FrameBoardState<TProps>[];
};

export type FrameBoardReactProps<TMeta = unknown> = {
  auditItems?: FrameBoardAuditItem[];
  colors?: FrameBoardColors;
  defaultDeviceId?: string;
  devices?: FrameBoardDevice[];
  isDark?: boolean;
  notes?: Array<{ color: string; detail: string; id: number; title: string }>;
  onParamsChange?: (params: FrameBoardParams) => void;
  onThemeModeChange?: (mode: FrameBoardThemeMode) => void;
  params?: FrameBoardParams;
  renderAppShell?: (input: {
    children: ReactNode;
    screen: FrameBoardReactScreen<any, TMeta>;
  }) => ReactNode;
  screens: FrameBoardReactScreen<any, TMeta>[];
  subtitle?: string;
  themeMode?: FrameBoardThemeMode;
  title?: string;
};
