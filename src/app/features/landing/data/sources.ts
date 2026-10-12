export type SourceId =
  | 'fueleconomy-ev'
  | 'afdc-benefits'
  | 'afdc-hev'
  | 'afdc-phev'
  | 'afdc-bev'
  | 'afdc-fcev'
  | 'eea-ev';

export interface Source {
  readonly id: SourceId;
  readonly title: string;
  readonly publisher: string;
  readonly url: string;
}

export const SOURCES: readonly Source[] = [
  {
    id: 'fueleconomy-ev',
    title: 'All-Electric Vehicles',
    publisher: 'U.S. Department of Energy & EPA — fueleconomy.gov',
    url: 'https://www.fueleconomy.gov/feg/evtech.shtml',
  },
  {
    id: 'afdc-benefits',
    title: 'Electric Vehicle Benefits and Considerations',
    publisher: 'U.S. Department of Energy — Alternative Fuels Data Center',
    url: 'https://afdc.energy.gov/fuels/electricity-benefits',
  },
  {
    id: 'afdc-hev',
    title: 'How Do Hybrid Electric Cars Work?',
    publisher: 'U.S. Department of Energy — Alternative Fuels Data Center',
    url: 'https://afdc.energy.gov/vehicles/how-do-hybrid-electric-cars-work',
  },
  {
    id: 'afdc-phev',
    title: 'How Do Plug-In Hybrid Electric Cars Work?',
    publisher: 'U.S. Department of Energy — Alternative Fuels Data Center',
    url: 'https://afdc.energy.gov/vehicles/how-do-plug-in-hybrid-electric-cars-work',
  },
  {
    id: 'afdc-bev',
    title: 'How Do All-Electric Cars Work?',
    publisher: 'U.S. Department of Energy — Alternative Fuels Data Center',
    url: 'https://afdc.energy.gov/vehicles/how-do-all-electric-cars-work',
  },
  {
    id: 'afdc-fcev',
    title: 'How Do Fuel Cell Electric Vehicles Work Using Hydrogen?',
    publisher: 'U.S. Department of Energy — Alternative Fuels Data Center',
    url: 'https://afdc.energy.gov/vehicles/how-do-fuel-cell-electric-cars-work',
  },
  {
    id: 'eea-ev',
    title: 'Electric vehicles',
    publisher: 'European Environment Agency (EEA)',
    url: 'https://www.eea.europa.eu/en/topics/in-depth/electric-vehicles',
  },
];
