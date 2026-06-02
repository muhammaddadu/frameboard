import { type FrameBoardDevice, type FrameBoardScreen } from './types';

export function validateFrameBoardConfig<TComponent, TProps, TMeta>({
  devices,
  screens,
}: {
  devices: FrameBoardDevice[];
  screens: FrameBoardScreen<TComponent, TProps, TMeta>[];
}): string[] {
  const issues: string[] = [];

  if (devices.length === 0) {
    issues.push('FrameBoard requires at least one device preset.');
  }

  if (screens.length === 0) {
    issues.push('FrameBoard requires at least one registered screen.');
  }

  for (const screen of screens) {
    if (!screen.id.trim()) {
      issues.push('FrameBoard screen ids must be non-empty.');
    }

    if (!screen.name.trim()) {
      issues.push(`FrameBoard screen "${screen.id || 'unknown'}" requires a display name.`);
    }

    if (screen.states.length === 0) {
      issues.push(`FrameBoard screen "${screen.id}" requires at least one state.`);
    }

    const stateIds = new Set<string>();

    for (const state of screen.states) {
      if (!state.id.trim()) {
        issues.push(`FrameBoard screen "${screen.id}" has a state with an empty id.`);
      }

      if (stateIds.has(state.id)) {
        issues.push(`FrameBoard screen "${screen.id}" has duplicate state id "${state.id}".`);
      }

      stateIds.add(state.id);
    }
  }

  return issues;
}

export function assertValidFrameBoardConfig<TComponent, TProps, TMeta>(input: {
  devices: FrameBoardDevice[];
  screens: FrameBoardScreen<TComponent, TProps, TMeta>[];
}): void {
  const issues = validateFrameBoardConfig(input);

  if (issues.length > 0) {
    throw new Error(issues.join('\n'));
  }
}
