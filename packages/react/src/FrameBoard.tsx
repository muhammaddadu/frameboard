import { useMemo, useState, type ComponentType } from 'react';
import {
  Download,
  Frame,
  Grid3X3,
  Maximize2,
  Minus,
  Moon,
  Plus,
  Search,
  Smartphone,
  StickyNote,
  Sun,
} from 'lucide-react';
import {
  defaultFrameBoardDevices,
  findFrameBoardZoomIndex,
  frameBoardZoomLevels,
  getDefaultFrameBoardStateCaption,
  getFrameBoardArtboardId,
  getFrameBoardScreenshotFilename,
  humanizeFrameBoardStateName,
  normalizeFrameBoardParams,
  noteCountForFrameBoardState,
  type FrameBoardColors,
  type FrameBoardDevice,
  type FrameBoardParams,
  type FrameBoardParamSnapshot,
  type FrameBoardReviewMode,
  type FrameBoardState,
  type FrameBoardThemeMode,
} from '@frameboard/core';
import { exportElementAsPng } from './exportPng';
import { type FrameBoardReactProps, type FrameBoardReactScreen } from './types';
import './styles.css';

const defaultColors: FrameBoardColors = {
  background: '#F6F4EF',
  border: '#D8D3C8',
  card: '#FFFFFF',
  muted: '#6D6878',
  paper: '#FFFCF7',
  primary: '#5B4BDB',
  selectedSoft: '#ECE8FF',
  text: '#1F1D2B',
};

const darkColors: FrameBoardColors = {
  background: '#16151D',
  border: '#33303F',
  card: '#1F1D2B',
  muted: '#A7A0B7',
  paper: '#211F2A',
  primary: '#A89BFF',
  selectedSoft: '#302C4A',
  text: '#F4F1FF',
};

const defaultNotes = [
  {
    color: '#9B8CFF',
    detail: 'Check whether the primary message has enough room before the first action.',
    id: 1,
    title: 'Opening hierarchy',
  },
  {
    color: '#FFCC66',
    detail: 'Dense stacks can feel tight on small devices. Scan each long state.',
    id: 2,
    title: 'Small-device fit',
  },
  {
    color: '#73D7B6',
    detail: 'Confirm empty and success states feel specific, not generic.',
    id: 3,
    title: 'State quality',
  },
];

export function FrameBoard<TMeta = unknown>({
  colors: colorsProp,
  defaultDeviceId = 'iphone-15',
  devices = defaultFrameBoardDevices,
  isDark = false,
  notes = defaultNotes,
  onParamsChange,
  onThemeModeChange,
  params,
  renderAppShell,
  screens,
  subtitle = 'See every screen and state of your app in one place.',
  themeMode: controlledThemeMode,
  title = 'FrameBoard',
}: FrameBoardReactProps<TMeta>) {
  const [localParams, setLocalParams] = useState<FrameBoardParams>({});
  const [localThemeMode, setLocalThemeMode] = useState<FrameBoardThemeMode>('light');
  const activeParams = params ?? localParams;
  const themeMode = controlledThemeMode ?? localThemeMode;
  const colors = colorsProp ?? (isDark || themeMode === 'dark' ? darkColors : defaultColors);
  const normalized = useMemo(
    () => normalizeFrameBoardParams({
      currentThemeMode: themeMode,
      defaultDeviceId,
      devices,
      params: activeParams,
      screens,
    }),
    [activeParams, defaultDeviceId, devices, screens, themeMode],
  );
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const setParams = (nextParams: Partial<FrameBoardParamSnapshot>) => {
    const merged: FrameBoardParamSnapshot = {
      chrome: normalized.showAppShell ? 'app' : 'content',
      device: normalized.selectedDevice.id,
      galleryScreen: normalized.selectedScreen.id,
      notes: normalized.showReviewNotes ? 'show' : 'hide',
      q: normalized.searchQuery || undefined,
      review: normalized.reviewMode,
      state: normalized.selectedState.id,
      theme: normalized.themeMode,
      view: normalized.showAllStates ? 'all' : 'selected',
      zoom: String(Math.round(frameBoardZoomLevels[normalized.zoomIndex] * 100)),
      ...nextParams,
    };
    setLocalParams(merged);
    onParamsChange?.(merged);
  };

  const setThemeMode = (mode: FrameBoardThemeMode) => {
    setLocalThemeMode(mode);
    onThemeModeChange?.(mode);
    setParams({ theme: mode });
  };

  const exportArtboard = async (
    screen: FrameBoardReactScreen<any, TMeta>,
    state: FrameBoardState<unknown>,
  ) => {
    const theme = normalized.themeMode === 'system'
      ? `system-${isDark ? 'dark' : 'light'}`
      : normalized.themeMode;
    const target = {
      device: normalized.selectedDevice,
      screenId: screen.id,
      stateId: state.id,
      theme,
    };
    const element = document.getElementById(getFrameBoardArtboardId(target));
    if (!element) return;
    await exportElementAsPng(element, getFrameBoardScreenshotFilename(target));
  };

  const exportSelected = () => {
    void exportArtboard(normalized.selectedScreen, normalized.selectedState);
  };

  const exportScreenStates = () => {
    setParams({
      galleryScreen: normalized.selectedScreen.id,
      q: undefined,
      review: 'screen',
      state: normalized.selectedState.id,
      view: 'all',
    });

    window.setTimeout(() => {
      for (const state of normalized.selectedScreen.states) {
        void exportArtboard(normalized.selectedScreen, state);
      }
    }, 120);
  };

  const zoom = frameBoardZoomLevels[normalized.zoomIndex];
  const shownStates = normalized.showAllStates
    ? normalized.selectedScreen.states.filter((state) => state.id.toLowerCase().includes(normalized.searchQuery.toLowerCase()))
    : [normalized.selectedState];

  return (
    <div
      className='fb-root'
      style={{
        '--fb-background': colors.background,
        '--fb-border': colors.border,
        '--fb-card': colors.card,
        '--fb-muted': colors.muted,
        '--fb-paper': colors.paper,
        '--fb-primary': colors.primary,
        '--fb-selected': colors.selectedSoft,
        '--fb-text': colors.text,
      } as React.CSSProperties}
    >
      <aside className='fb-sidebar'>
        <div className='fb-brand'>
          <div className='fb-logo'><Frame size={18} /></div>
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </div>
        <section className='fb-panel'>
          <h2>Screens</h2>
          <div className='fb-search'><Search size={14} /> Search screens...</div>
          <button
            className={normalized.reviewMode === 'board' ? 'fb-row fb-row-active' : 'fb-row'}
            onClick={() => setParams({ review: 'board', view: 'all' })}
            type='button'
          >
            <span>Product Board</span>
            <small>{screens.reduce((sum, screen) => sum + screen.states.length, 0)} states</small>
          </button>
          {screens.map((screen) => (
            <button
              className={normalized.reviewMode === 'screen' && normalized.selectedScreen.id === screen.id ? 'fb-row fb-row-active' : 'fb-row'}
              key={screen.id}
              onClick={() => setParams({ galleryScreen: screen.id, review: 'screen', state: screen.states[0]?.id, view: 'all' })}
              type='button'
            >
              <span>{screen.name}</span>
              <small>{screen.states.length} states</small>
            </button>
          ))}
        </section>
        <section className='fb-panel'>
          <h2>States - {normalized.selectedScreen.name}</h2>
          {normalized.selectedScreen.states.map((state) => (
            <button
              className={state.id === normalized.selectedState.id && !normalized.showAllStates ? 'fb-state fb-row-active' : 'fb-state'}
              key={state.id}
              onClick={() => setParams({ state: state.id, view: 'selected', review: 'screen' })}
              type='button'
            >
              <span>{state.name ?? state.id}</span>
              {noteCountForFrameBoardState(state.id) > 0 ? <small>{noteCountForFrameBoardState(state.id)}</small> : null}
            </button>
          ))}
        </section>
      </aside>
      <main className='fb-canvas'>
        <Toolbar
          device={normalized.selectedDevice}
          devices={devices}
          isDark={isDark}
          onDevice={(device) => setParams({ device: device.id })}
          onExportScreen={exportScreenStates}
          onExportSelected={exportSelected}
          onMode={setThemeMode}
          onNotes={() => setParams({ notes: normalized.showReviewNotes ? 'hide' : 'show' })}
          onReview={(review) => setParams({ review, view: review === 'board' ? 'all' : normalized.showAllStates ? 'all' : 'selected' })}
          onShell={() => setParams({ chrome: normalized.showAppShell ? 'content' : 'app' })}
          onStates={() => setParams({ review: 'screen', view: normalized.showAllStates ? 'selected' : 'all' })}
          onZoom={(index) => setParams({ zoom: String(Math.round(frameBoardZoomLevels[index] * 100)) })}
          reviewMode={normalized.reviewMode}
          showAllStates={normalized.showAllStates}
          showAppShell={normalized.showAppShell}
          showReviewNotes={normalized.showReviewNotes}
          themeMode={normalized.themeMode}
          zoomIndex={normalized.zoomIndex}
        />
        <div className='fb-scroll'>
          {normalized.reviewMode === 'board' ? (
            <div className='fb-board'>
              {screens.map((screen) => (
                <section className='fb-section' key={screen.id}>
                  <div className='fb-section-head'>
                    <button onClick={() => setCollapsed((current) => ({ ...current, [screen.id]: !current[screen.id] }))} type='button'>
                      {collapsed[screen.id] ? '+' : '-'}
                    </button>
                    <div>
                      <h2>{screen.name}</h2>
                      <p>{screen.states.length} states · {screen.description}</p>
                    </div>
                  </div>
                  {!collapsed[screen.id] ? (
                    <div className='fb-artboard-grid'>
                      {screen.states.map((state) => (
                        <Artboard
                          active={screen.id === normalized.selectedScreen.id && state.id === normalized.selectedState.id}
                          device={normalized.selectedDevice}
                          isDark={isDark}
                          key={`${screen.id}:${state.id}`}
                          renderAppShell={renderAppShell}
                          screen={screen}
                          showAppShell={normalized.showAppShell}
                          showReviewNotes={normalized.showReviewNotes}
                          state={state}
                          themeMode={normalized.themeMode}
                          zoom={zoom}
                        />
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
          ) : (
            <div className='fb-artboard-grid'>
              {shownStates.map((state) => (
                <Artboard
                  active={state.id === normalized.selectedState.id}
                  device={normalized.selectedDevice}
                  isDark={isDark}
                  key={`${normalized.selectedScreen.id}:${state.id}`}
                  renderAppShell={renderAppShell}
                  screen={normalized.selectedScreen}
                  showAppShell={normalized.showAppShell}
                  showReviewNotes={normalized.showReviewNotes}
                  state={state}
                  themeMode={normalized.themeMode}
                  zoom={zoom}
                />
              ))}
            </div>
          )}
        </div>
        {normalized.showReviewNotes ? (
          <div className='fb-notes'>
            <h2>Notes</h2>
            {notes.map((note) => (
              <div className='fb-note' key={note.id}>
                <span style={{ background: note.color }}>{note.id}</span>
                <div>
                  <strong>{note.title}</strong>
                  <p>{note.detail}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}

function Toolbar({
  device,
  devices,
  isDark,
  onDevice,
  onExportScreen,
  onExportSelected,
  onMode,
  onNotes,
  onReview,
  onShell,
  onStates,
  onZoom,
  reviewMode,
  showAllStates,
  showAppShell,
  showReviewNotes,
  themeMode,
  zoomIndex,
}: {
  device: FrameBoardDevice;
  devices: FrameBoardDevice[];
  isDark: boolean;
  onDevice: (device: FrameBoardDevice) => void;
  onExportScreen: () => void;
  onExportSelected: () => void;
  onMode: (mode: FrameBoardThemeMode) => void;
  onNotes: () => void;
  onReview: (mode: FrameBoardReviewMode) => void;
  onShell: () => void;
  onStates: () => void;
  onZoom: (index: number) => void;
  reviewMode: FrameBoardReviewMode;
  showAllStates: boolean;
  showAppShell: boolean;
  showReviewNotes: boolean;
  themeMode: FrameBoardThemeMode;
  zoomIndex: number;
}) {
  return (
    <div className='fb-toolbar'>
      <button aria-label='Fit board' onClick={() => onZoom(0)} type='button'><Maximize2 size={15} /></button>
      <button aria-label='Export selected artboard' onClick={onExportSelected} type='button'><Download size={15} /></button>
      <button className={reviewMode === 'screen' ? 'active' : ''} onClick={() => onReview('screen')} type='button'>Focus View</button>
      <button className={reviewMode === 'board' ? 'active' : ''} onClick={() => onReview('board')} type='button'><Grid3X3 size={14} /> Product Board</button>
      <div className='fb-zoom'>
        <button onClick={() => onZoom(Math.max(0, zoomIndex - 1))} type='button'><Minus size={14} /></button>
        <span>{Math.round(frameBoardZoomLevels[zoomIndex] * 100)}%</span>
        <button onClick={() => onZoom(Math.min(frameBoardZoomLevels.length - 1, zoomIndex + 1))} type='button'><Plus size={14} /></button>
      </div>
      {devices.map((nextDevice) => (
        <button className={nextDevice.id === device.id ? 'active' : ''} key={nextDevice.id} onClick={() => onDevice(nextDevice)} type='button'>
          <Smartphone size={14} /> {nextDevice.name}
        </button>
      ))}
      <button className={themeMode === 'light' ? 'active' : ''} onClick={() => onMode('light')} type='button'><Sun size={14} /> Light</button>
      <button className={themeMode === 'dark' ? 'active' : ''} onClick={() => onMode('dark')} type='button'><Moon size={14} /> Dark</button>
      <button className={themeMode === 'system' ? 'active' : ''} onClick={() => onMode('system')} type='button'>System {isDark ? 'dark' : 'light'}</button>
      <button className={showAllStates ? 'active' : ''} onClick={onStates} type='button'>{showAllStates ? 'Show all states' : 'Selected state'}</button>
      <button className={showAppShell ? 'active' : ''} onClick={onShell} type='button'>{showAppShell ? 'App shell' : 'Content only'}</button>
      <button className={showReviewNotes ? 'active' : ''} onClick={onNotes} type='button'><StickyNote size={14} /> Notes</button>
      <button onClick={onExportScreen} type='button'>Export screen states</button>
    </div>
  );
}

function Artboard<TMeta>({
  active,
  device,
  isDark,
  renderAppShell,
  screen,
  showAppShell,
  showReviewNotes,
  state,
  themeMode,
  zoom,
}: {
  active: boolean;
  device: FrameBoardDevice;
  isDark: boolean;
  renderAppShell?: FrameBoardReactProps<TMeta>['renderAppShell'];
  screen: FrameBoardReactScreen<any, TMeta>;
  showAppShell: boolean;
  showReviewNotes: boolean;
  state: FrameBoardState<unknown>;
  themeMode: FrameBoardThemeMode;
  zoom: number;
}) {
  const Component = screen.component as ComponentType<Record<string, unknown>>;
  const readableState = humanizeFrameBoardStateName(state);
  const caption = getDefaultFrameBoardStateCaption(screen, state);
  const modeLabel = themeMode === 'system' ? `system ${isDark ? 'dark' : 'light'}` : themeMode;
  const artboardId = getFrameBoardArtboardId({
    device,
    screenId: screen.id,
    stateId: state.id,
    theme: modeLabel.replace(/\s+/g, '-'),
  });
  const stateProps = state.props && typeof state.props === 'object'
    ? state.props as Record<string, unknown>
    : {};
  const rendered = <Component {...stateProps} />;

  return (
    <div className='fb-artboard' id={artboardId}>
      <div className='fb-artboard-label'>
        <h3>{screen.name}</h3>
        <h4>{readableState}</h4>
        {active ? <span>Selected</span> : null}
        <p>{caption}</p>
        <small>{device.name} · {device.detail ?? `${device.width} x ${device.height}`} · {modeLabel} · {showAppShell ? 'App shell' : 'Content only'}</small>
      </div>
      <div
        className={active ? 'fb-device-outline active' : 'fb-device-outline'}
        style={{ height: device.height * zoom + 4, width: device.width * zoom + 4 }}
      >
        <div
          className='fb-device-scale'
          style={{
            height: device.height,
            transform: `scale(${zoom})`,
            width: device.width,
          }}
        >
          <div className='fb-device-frame'>
            <div className='fb-device-screen'>
              {showAppShell && renderAppShell
                ? renderAppShell({ children: rendered, screen })
                : rendered}
            </div>
          </div>
          {showReviewNotes ? <span className='fb-pin'>1</span> : null}
        </div>
      </div>
    </div>
  );
}
