export const LANDING_SECTIONS = [
  'what-is',
  'how-it-works',
  'types',
  'examples',
  'pros-cons',
] as const;

export type LandingSectionId = (typeof LANDING_SECTIONS)[number];

export const SOURCES_SECTION = 'sources';
