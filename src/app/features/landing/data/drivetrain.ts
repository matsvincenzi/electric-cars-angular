import { type IconName } from '../../../shared/icon/icon-name';

export type DrivetrainPartId = 'charge-port' | 'onboard-charger' | 'battery' | 'inverter' | 'motor';

export interface DrivetrainPart {
  readonly id: DrivetrainPartId;
  readonly icon: IconName;
}

export const DRIVETRAIN_PARTS: readonly DrivetrainPart[] = [
  { id: 'charge-port', icon: 'plug-zap' },
  { id: 'onboard-charger', icon: 'cable' },
  { id: 'battery', icon: 'battery-charging' },
  { id: 'inverter', icon: 'cpu' },
  { id: 'motor', icon: 'cog' },
];
