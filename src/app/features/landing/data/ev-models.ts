export type EvModelId =
  | 'byd-dolphin'
  | 'byd-seal'
  | 'kia-niro-ev'
  | 'hyundai-kona-electric'
  | 'tesla-model-s'
  | 'volkswagen-id4'
  | 'nissan-leaf';

export type BodyStyle = 'hatchback' | 'sedan' | 'crossover' | 'suv';

export interface EvModel {
  readonly id: EvModelId;
  readonly name: string;
  readonly bodyStyle: BodyStyle;
}

export const EV_MODELS: readonly EvModel[] = [
  { id: 'byd-dolphin', name: 'BYD Dolphin', bodyStyle: 'hatchback' },
  { id: 'byd-seal', name: 'BYD Seal', bodyStyle: 'sedan' },
  { id: 'kia-niro-ev', name: 'Kia Niro EV', bodyStyle: 'crossover' },
  { id: 'hyundai-kona-electric', name: 'Hyundai Kona Electric', bodyStyle: 'suv' },
  { id: 'tesla-model-s', name: 'Tesla Model S', bodyStyle: 'sedan' },
  { id: 'volkswagen-id4', name: 'Volkswagen ID.4', bodyStyle: 'suv' },
  { id: 'nissan-leaf', name: 'Nissan Leaf', bodyStyle: 'hatchback' },
];
