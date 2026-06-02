import { type FrameBoardExportTarget } from './types.js';

export function slugFrameBoardPart(value: string): string {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'frameboard';
}

export function getFrameBoardArtboardId(target: FrameBoardExportTarget): string {
  return [
    'frameboard-artboard',
    slugFrameBoardPart(target.screenId),
    slugFrameBoardPart(target.stateId),
    slugFrameBoardPart(target.device.id),
    slugFrameBoardPart(target.theme),
  ].join('__');
}

export function getFrameBoardScreenshotFilename(target: FrameBoardExportTarget): string {
  return [
    slugFrameBoardPart(target.screenId),
    slugFrameBoardPart(target.stateId),
    slugFrameBoardPart(target.device.id),
    slugFrameBoardPart(target.theme),
  ].join('-') + '.png';
}
