import { type IconName } from '../../../shared/icon/icon-name';

export type EvTypeId = 'hev' | 'phev' | 'bev' | 'fcev';

export type ElectricDriveLevel = 'assist' | 'partial' | 'full';

export type EnergySource = 'gasoline' | 'electricity' | 'hydrogen';

export interface EvType {
  readonly id: EvTypeId;
  readonly acronym: string;
  readonly icon: IconName;
  readonly electricDrive: ElectricDriveLevel;
  readonly energySources: readonly EnergySource[];
  readonly plugsIn: boolean;
}

export const ELECTRIC_DRIVE_LEVELS: readonly ElectricDriveLevel[] = ['assist', 'partial', 'full'];

export const EV_TYPES: readonly EvType[] = [
  {
    id: 'hev',
    acronym: 'HEV',
    icon: 'fuel',
    electricDrive: 'assist',
    energySources: ['gasoline'],
    plugsIn: false,
  },
  {
    id: 'phev',
    acronym: 'PHEV',
    icon: 'plug-zap',
    electricDrive: 'partial',
    energySources: ['electricity', 'gasoline'],
    plugsIn: true,
  },
  {
    id: 'bev',
    acronym: 'BEV',
    icon: 'battery-charging',
    electricDrive: 'full',
    energySources: ['electricity'],
    plugsIn: true,
  },
  {
    id: 'fcev',
    acronym: 'FCEV',
    icon: 'droplets',
    electricDrive: 'full',
    energySources: ['hydrogen'],
    plugsIn: false,
  },
];
