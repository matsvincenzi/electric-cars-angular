import { type IconName } from '../../../shared/icon/icon-name';

export type AdvantageId = 'clean-air' | 'running-costs' | 'quiet' | 'efficiency';

export type ChallengeId = 'upfront-cost' | 'charging-network' | 'battery-lifecycle' | 'range';

export interface TradeOff<Id extends string> {
  readonly id: Id;
  readonly icon: IconName;
}

export const ADVANTAGES: readonly TradeOff<AdvantageId>[] = [
  { id: 'clean-air', icon: 'wind' },
  { id: 'running-costs', icon: 'wallet' },
  { id: 'quiet', icon: 'volume-x' },
  { id: 'efficiency', icon: 'gauge' },
];

export const CHALLENGES: readonly TradeOff<ChallengeId>[] = [
  { id: 'upfront-cost', icon: 'banknote' },
  { id: 'charging-network', icon: 'map-pin' },
  { id: 'battery-lifecycle', icon: 'factory' },
  { id: 'range', icon: 'route' },
];
