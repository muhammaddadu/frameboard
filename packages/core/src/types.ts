export type FrameBoardReviewMode = 'board' | 'screen';
export type FrameBoardThemeMode = 'light' | 'dark' | 'system';
export type FrameBoardViewMode = 'all' | 'selected';
export type FrameBoardChromeMode = 'app' | 'content';
export type FrameBoardNotesMode = 'show' | 'hide';

export type FrameBoardDimensions = {
  width: number;
  height: number;
  scale?: number;
  fontScale?: number;
};

export type FrameBoardDevice = {
  id: string;
  name: string;
  detail?: string;
  width: number;
  height: number;
};

export type FrameBoardState<TProps = unknown> = {
  id: string;
  name?: string;
  caption?: string;
  props?: TProps;
};

export type FrameBoardScreen<TComponent = unknown, TProps = unknown, TMeta = unknown> = {
  component: TComponent;
  description?: string;
  id: string;
  meta?: TMeta;
  name: string;
  stateCaption?: (state: FrameBoardState<TProps>) => string;
  states: FrameBoardState<TProps>[];
};

export type FrameBoardColors = {
  background: string;
  border: string;
  card: string;
  muted: string;
  paper: string;
  primary: string;
  selectedSoft: string;
  text: string;
};

export type FrameBoardNote = {
  color: string;
  detail: string;
  id: number;
  title: string;
};

export type FrameBoardAuditItem = {
  id: string;
  label: string;
};

export type FrameBoardParams = {
  chrome?: string | string[];
  device?: string | string[];
  galleryScreen?: string | string[];
  notes?: string | string[];
  q?: string | string[];
  review?: string | string[];
  screen?: string | string[];
  state?: string | string[];
  theme?: string | string[];
  view?: string | string[];
  zoom?: string | string[];
};

export type FrameBoardParamSnapshot = {
  chrome: FrameBoardChromeMode;
  device: string;
  galleryScreen: string;
  notes: FrameBoardNotesMode;
  q?: string;
  review: FrameBoardReviewMode;
  state: string;
  theme: FrameBoardThemeMode;
  view: FrameBoardViewMode;
  zoom: string;
};

export type NormalizedFrameBoardParams<TComponent = unknown, TProps = unknown, TMeta = unknown> = {
  reviewMode: FrameBoardReviewMode;
  searchQuery: string;
  selectedDevice: FrameBoardDevice;
  selectedScreen: FrameBoardScreen<TComponent, TProps, TMeta>;
  selectedState: FrameBoardState<TProps>;
  showAllStates: boolean;
  showAppShell: boolean;
  showReviewNotes: boolean;
  themeMode: FrameBoardThemeMode;
  zoomIndex: number;
};

export type FrameBoardExportTarget = {
  device: FrameBoardDevice;
  screenId: string;
  stateId: string;
  theme: string;
};
