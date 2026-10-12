import { type IconName } from '../../../shared/icon/icon-name';

export type PillarId = 'clean-energy' | 'efficiency' | 'lifecycle' | 'healthier-cities';

export interface Pillar {
  readonly id: PillarId;
  readonly icon: IconName;
}

export const PILLARS: readonly Pillar[] = [
  { id: 'clean-energy', icon: 'leaf' },
  { id: 'efficiency', icon: 'gauge' },
  { id: 'lifecycle', icon: 'recycle' },
  { id: 'healthier-cities', icon: 'wind' },
];
