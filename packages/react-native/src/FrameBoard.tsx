import { useMemo, useState, type ComponentType } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  type ScaledSize,
} from 'react-native';
import {
  Download,
  Frame,
  Grid3X3,
  Maximize2,
  Monitor,
  Minus,
  Moon,
  Plus,
  Search,
  Smartphone,
  StickyNote,
  Sun,
} from 'lucide-react-native';
import {
  defaultFrameBoardMobileDevices,
  frameBoardZoomLevels,
  getDefaultFrameBoardStateCaption,
  getFrameBoardArtboardId,
  getFrameBoardScreenshotFilename,
  humanizeFrameBoardStateName,
  normalizeFrameBoardParams,
  noteCountForFrameBoardState,
  type FrameBoardColors,
  type FrameBoardDevice,
  type FrameBoardParamSnapshot,
  type FrameBoardParams,
  type FrameBoardReviewMode,
  type FrameBoardState,
  type FrameBoardThemeMode,
  type NormalizedFrameBoardParams,
} from '@frameboard/core';
import { NativeDeviceFrame } from './NativeDeviceFrame';
import { exportElementAsPng } from './exportPng';
import {
  type FrameBoardNativeProps,
  type FrameBoardNativeScreen,
} from './types';

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
  {
    color: '#FF7A8A',
    detail: 'Search and error states should read faster than ordinary body copy.',
    id: 4,
    title: 'Decision speed',
  },
];

export function FrameBoard<TMeta = unknown>({
  colors: colorsProp,
  defaultDeviceId = 'iphone-15',
  devices = defaultFrameBoardMobileDevices,
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
}: FrameBoardNativeProps<TMeta>) {
  const { width } = useWindowDimensions();
  const [localParams, setLocalParams] = useState<FrameBoardParams>({});
  const [localThemeMode, setLocalThemeMode] = useState<FrameBoardThemeMode>('light');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
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

  const isWide = width >= 900;
  const zoom = frameBoardZoomLevels[normalized.zoomIndex];
  const shownStates = normalized.showAllStates
    ? normalized.selectedScreen.states.filter((state) => state.id.toLowerCase().includes(normalized.searchQuery.toLowerCase()))
    : [normalized.selectedState];

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
    void onThemeModeChange?.(mode);
    setParams({ theme: mode });
  };

  const exportArtboard = async (
    screen: FrameBoardNativeScreen<unknown, TMeta>,
    state: FrameBoardState<unknown>,
  ) => {
    if (typeof document === 'undefined') return;
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

  return (
    <View style={{ backgroundColor: colors.background, flex: 1, flexDirection: isWide ? 'row' : 'column' }}>
      <Sidebar
        colors={colors}
        normalized={normalized}
        onParams={setParams}
        screens={screens}
        subtitle={subtitle}
        title={title}
      />
      <View style={{ flex: 1, minHeight: 0 }}>
        <Toolbar
          colors={colors}
          device={normalized.selectedDevice}
          devices={devices}
          isDark={isDark}
          onDevice={(device) => setParams({ device: device.id })}
          onExportScreen={() => {
            setParams({ review: 'screen', view: 'all' });
            setTimeout(() => {
              for (const state of normalized.selectedScreen.states) {
                void exportArtboard(normalized.selectedScreen, state);
              }
            }, 120);
          }}
          onExportSelected={() => {
            void exportArtboard(normalized.selectedScreen, normalized.selectedState);
          }}
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
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 40,
            paddingBottom: normalized.showReviewNotes ? 220 : 60,
            paddingHorizontal: 36,
            paddingTop: 96,
          }}
          horizontal={false}
          style={{
            backgroundColor: colors.background,
            minHeight: 0,
          }}
        >
          {normalized.reviewMode === 'board'
            ? screens.map((screen) => (
                <View key={screen.id} style={{ width: '100%' }}>
                  <Pressable
                    onPress={() => setCollapsed((current) => ({ ...current, [screen.id]: !current[screen.id] }))}
                    style={{ alignItems: 'center', flexDirection: 'row', gap: 10, marginBottom: 18 }}
                  >
                    <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800' }}>{screen.name}</Text>
                    <Text style={{ color: colors.muted }}>{screen.states.length} states</Text>
                  </Pressable>
                  {!collapsed[screen.id] ? (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 36 }}>
                      {screen.states.map((state) => (
                        <Artboard
                          active={screen.id === normalized.selectedScreen.id && state.id === normalized.selectedState.id}
                          colors={colors}
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
                    </View>
                  ) : null}
                </View>
              ))
            : shownStates.map((state) => (
                <Artboard
                  active={state.id === normalized.selectedState.id}
                  colors={colors}
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
        </ScrollView>
        {normalized.showReviewNotes ? (
          <View
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: 12,
              borderWidth: 1,
              bottom: 24,
              boxShadow: '0 12px 30px rgba(31, 29, 43, 0.16)',
              gap: 12,
              maxWidth: 360,
              padding: 16,
              position: 'absolute',
              right: 24,
            }}
          >
            <Text style={{ color: colors.text, fontSize: 14, fontWeight: '800' }}>Review Notes</Text>
            {notes.map((note) => (
              <View key={note.id} style={{ flexDirection: 'row', gap: 10 }}>
                <Text style={{ backgroundColor: note.color, borderRadius: 6, color: colors.text, fontWeight: '800', paddingHorizontal: 7, paddingVertical: 3 }}>{note.id}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.text, fontWeight: '800' }}>{note.title}</Text>
                  <Text style={{ color: colors.muted }}>{note.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

function Sidebar<TMeta>({
  colors,
  normalized,
  onParams,
  screens,
  subtitle,
  title,
}: {
  colors: FrameBoardColors;
  normalized: NormalizedFrameBoardParams<ComponentType<unknown>, unknown, TMeta>;
  onParams: (params: Partial<FrameBoardParamSnapshot>) => void;
  screens: FrameBoardNativeScreen<any, TMeta>[];
  subtitle: string;
  title: string;
}) {
  return (
    <View style={{ backgroundColor: colors.paper, borderColor: colors.border, borderRightWidth: 1, gap: 18, padding: 18, width: 300 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ alignItems: 'center', backgroundColor: colors.primary, borderRadius: 10, height: 34, justifyContent: 'center', width: 34 }}>
          <Frame color="#FFFFFF" size={18} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontSize: 19, fontWeight: '900' }}>{title}</Text>
          <Text style={{ color: colors.muted, fontSize: 12 }}>{subtitle}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: colors.card, borderColor: colors.border, borderRadius: 8, borderWidth: 1, flexDirection: 'row', gap: 8, padding: 9 }}>
        <Search color={colors.muted} size={14} />
        <TextInput
          onChangeText={(q) => onParams({ q })}
          placeholder="Search states"
          placeholderTextColor={colors.muted}
          style={{ color: colors.text, flex: 1, fontSize: 13, outlineStyle: 'none' } as never}
          value={normalized.searchQuery}
        />
      </View>
      <View style={{ gap: 4 }}>
        <Text style={{ color: colors.text, fontSize: 12, fontWeight: '900', marginBottom: 4, textTransform: 'uppercase' }}>Screens</Text>
        <SidebarRow
          active={normalized.reviewMode === 'board'}
          colors={colors}
          count={screens.reduce((sum, screen) => sum + screen.states.length, 0)}
          label="Product Board"
          onPress={() => onParams({ review: 'board', view: 'all' })}
        />
        {screens.map((screen) => (
          <SidebarRow
            active={normalized.reviewMode === 'screen' && normalized.selectedScreen.id === screen.id}
            colors={colors}
            count={screen.states.length}
            key={screen.id}
            label={screen.name}
            onPress={() => onParams({ galleryScreen: screen.id, review: 'screen', state: screen.states[0]?.id, view: 'all' })}
          />
        ))}
      </View>
      <View style={{ gap: 4 }}>
        <Text style={{ color: colors.text, fontSize: 12, fontWeight: '900', marginBottom: 4, textTransform: 'uppercase' }}>States</Text>
        {normalized.selectedScreen.states.map((state) => (
          <SidebarRow
            active={state.id === normalized.selectedState.id && !normalized.showAllStates}
            colors={colors}
            count={noteCountForFrameBoardState(state.id)}
            key={state.id}
            label={state.name ?? humanizeFrameBoardStateName(state)}
            onPress={() => onParams({ review: 'screen', state: state.id, view: 'selected' })}
          />
        ))}
      </View>
    </View>
  );
}

function SidebarRow({
  active,
  colors,
  count,
  label,
  onPress,
}: {
  active: boolean;
  colors: FrameBoardColors;
  count: number;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: active ? colors.selectedSoft : 'transparent',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 9,
      }}
    >
      <Text style={{ color: active ? colors.primary : colors.text, fontWeight: active ? '800' : '600' }}>{label}</Text>
      {count > 0 ? <Text style={{ color: colors.muted, fontSize: 12 }}>{count}</Text> : null}
    </Pressable>
  );
}

function Toolbar({
  colors,
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
  colors: FrameBoardColors;
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
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', flexDirection: 'row', gap: 8, padding: 10 }}
      horizontal
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderRadius: 12,
        borderWidth: 1,
        boxShadow: '0 12px 30px rgba(31, 29, 43, 0.14)',
        left: 24,
        maxWidth: 'calc(100% - 48px)' as never,
        position: 'absolute',
        top: 16,
        zIndex: 5,
      }}
    >
      <ToolButton colors={colors} icon={<Maximize2 color={colors.text} size={15} />} onPress={() => onZoom(0)} />
      <ToolButton colors={colors} icon={<Download color={colors.text} size={15} />} onPress={onExportSelected} />
      <ToolButton active={reviewMode === 'screen'} colors={colors} label="Focus View" onPress={() => onReview('screen')} />
      <ToolButton active={reviewMode === 'board'} colors={colors} icon={<Grid3X3 color={reviewMode === 'board' ? colors.primary : colors.text} size={14} />} label="Product Board" onPress={() => onReview('board')} />
      <View style={{ alignItems: 'center', backgroundColor: colors.paper, borderColor: colors.border, borderRadius: 8, borderWidth: 1, flexDirection: 'row', gap: 8, paddingHorizontal: 8, paddingVertical: 7 }}>
        <Pressable onPress={() => onZoom(Math.max(0, zoomIndex - 1))}><Minus color={colors.text} size={14} /></Pressable>
        <Text style={{ color: colors.text, fontWeight: '800' }}>{Math.round(frameBoardZoomLevels[zoomIndex] * 100)}%</Text>
        <Pressable onPress={() => onZoom(Math.min(frameBoardZoomLevels.length - 1, zoomIndex + 1))}><Plus color={colors.text} size={14} /></Pressable>
      </View>
      {devices.map((nextDevice) => (
        <ToolButton
          active={nextDevice.id === device.id}
          colors={colors}
          icon={<DeviceIcon color={nextDevice.id === device.id ? colors.primary : colors.text} device={nextDevice} />}
          key={nextDevice.id}
          label={nextDevice.name}
          onPress={() => onDevice(nextDevice)}
        />
      ))}
      <ToolButton active={themeMode === 'light'} colors={colors} icon={<Sun color={themeMode === 'light' ? colors.primary : colors.text} size={14} />} label="Light" onPress={() => onMode('light')} />
      <ToolButton active={themeMode === 'dark'} colors={colors} icon={<Moon color={themeMode === 'dark' ? colors.primary : colors.text} size={14} />} label="Dark" onPress={() => onMode('dark')} />
      <ToolButton active={themeMode === 'system'} colors={colors} label={`System ${isDark ? 'dark' : 'light'}`} onPress={() => onMode('system')} />
      <ToolButton active={showAllStates} colors={colors} label={showAllStates ? 'All states' : 'Selected'} onPress={onStates} />
      <ToolButton active={showAppShell} colors={colors} label={showAppShell ? 'App shell' : 'Content'} onPress={onShell} />
      <ToolButton active={showReviewNotes} colors={colors} icon={<StickyNote color={showReviewNotes ? colors.primary : colors.text} size={14} />} label="Notes" onPress={onNotes} />
      <ToolButton colors={colors} label="Export screen" onPress={onExportScreen} />
    </ScrollView>
  );
}

function DeviceIcon({ color, device }: { color: string; device: FrameBoardDevice }) {
  return device.kind === 'desktop' || device.kind === 'responsive'
    ? <Monitor color={color} size={14} />
    : <Smartphone color={color} size={14} />;
}

function ToolButton({
  active = false,
  colors,
  icon,
  label,
  onPress,
}: {
  active?: boolean;
  colors: FrameBoardColors;
  icon?: React.ReactNode;
  label?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: active ? colors.selectedSoft : colors.paper,
        borderColor: active ? colors.primary : colors.border,
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
      }}
    >
      {icon}
      {label ? <Text style={{ color: active ? colors.primary : colors.text, fontWeight: '800' }}>{label}</Text> : null}
    </Pressable>
  );
}

function Artboard<TMeta>({
  active,
  colors,
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
  colors: FrameBoardColors;
  device: FrameBoardDevice;
  isDark: boolean;
  renderAppShell?: FrameBoardNativeProps<TMeta>['renderAppShell'];
  screen: FrameBoardNativeScreen<unknown, TMeta>;
  showAppShell: boolean;
  showReviewNotes: boolean;
  state: FrameBoardState<unknown>;
  themeMode: FrameBoardThemeMode;
  zoom: number;
}) {
  const Component = screen.component as ComponentType<Record<string, unknown>>;
  const dimensions: ScaledSize = {
    fontScale: 1,
    height: device.height,
    scale: 2,
    width: device.width,
  };
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
    <View id={artboardId} style={{ gap: 12 }}>
      <View style={{ gap: 3 }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 8 }}>
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: '900' }}>{screen.name}</Text>
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: '900' }}>/</Text>
          <Text style={{ color: colors.text, fontSize: 16, fontWeight: '900' }}>{humanizeFrameBoardStateName(state)}</Text>
          {active ? (
            <Text style={{ backgroundColor: colors.primary, borderRadius: 7, color: '#FFFFFF', fontWeight: '800', paddingHorizontal: 8, paddingVertical: 3 }}>Selected</Text>
          ) : null}
        </View>
        <Text style={{ color: colors.muted }}>{caption}</Text>
        <Text style={{ color: colors.muted, fontSize: 12 }}>{device.name} · {device.width} x {device.height} · {modeLabel} · {showAppShell ? 'App shell' : 'Content only'}</Text>
      </View>
      <View
        style={{
          borderColor: active ? colors.primary : 'transparent',
          borderRadius: device.id === 'tablet' ? 28 : 34,
          borderWidth: 2,
          height: device.height * zoom + 8,
          padding: 2,
          width: device.width * zoom + 8,
        }}
      >
        <View
          style={{
            height: device.height,
            transform: [{ scale: zoom }],
            transformOrigin: 'top left',
            width: device.width,
          } as never}
        >
          <NativeDeviceFrame colors={colors} device={device} dimensions={dimensions}>
            {showAppShell && renderAppShell
              ? renderAppShell({ children: rendered, screen })
              : rendered}
          </NativeDeviceFrame>
          {showReviewNotes ? (
            <Text style={{ backgroundColor: '#9B8CFF', borderRadius: 999, color: '#FFFFFF', fontWeight: '900', paddingHorizontal: 10, paddingVertical: 7, position: 'absolute', right: 8, top: 8 }}>1</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
