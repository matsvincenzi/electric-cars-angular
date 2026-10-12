import { type LandingSectionId } from '../core/navigation/landing-sections';
import { type DrivetrainPartId } from '../features/landing/data/drivetrain';
import { type BodyStyle, type EvModelId } from '../features/landing/data/ev-models';
import {
  type ElectricDriveLevel,
  type EnergySource,
  type EvTypeId,
} from '../features/landing/data/ev-types';
import { type SourceId } from '../features/landing/data/sources';
import { type PillarId } from '../features/landing/data/sustainability';
import { type AdvantageId, type ChallengeId } from '../features/landing/data/trade-offs';

export type PageTitleKey = 'landing' | 'notFound';

export interface TitledText {
  readonly title: string;
  readonly text: string;
}

export interface SectionIntro {
  readonly eyebrow: string;
  readonly title: string;
  readonly lead: string;
}

export interface HeroFact {
  readonly value: string;
  readonly label: string;
}

export interface EvTypeCopy {
  readonly name: string;
  readonly summary: string;
  readonly description: string;
  readonly tailpipe: string;
  readonly refuel: string;
  readonly bestFor: string;
}

export interface Messages {
  readonly brand: string;
  readonly meta: {
    readonly description: string;
    readonly ogLocale: string;
    readonly pageTitles: Readonly<Record<PageTitleKey, string>>;
  };
  readonly a11y: {
    readonly skipToContent: string;
    readonly opensInNewTab: string;
  };
  readonly nav: {
    readonly ariaLabel: string;
    readonly home: string;
    readonly sections: Readonly<Record<LandingSectionId, string>>;
    readonly openMenu: string;
    readonly closeMenu: string;
    readonly menuTitle: string;
  };
  readonly language: {
    readonly label: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly titleLead: string;
    readonly titleAccent: string;
    readonly lead: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly facts: readonly HeroFact[];
    readonly factsNote: string;
    readonly factsNoteLink: string;
  };
  readonly whatIs: SectionIntro & {
    readonly pillars: Readonly<Record<PillarId, TitledText>>;
  };
  readonly howItWorks: SectionIntro & {
    readonly diagramLabel: string;
    readonly stepsLabel: string;
    readonly parts: Readonly<Record<DrivetrainPartId, TitledText>>;
    readonly regeneration: TitledText;
    readonly nextCta: string;
  };
  readonly types: SectionIntro & {
    readonly tablistLabel: string;
    readonly attributes: {
      readonly energySources: string;
      readonly plugsIn: string;
      readonly tailpipe: string;
      readonly refuel: string;
      readonly bestFor: string;
    };
    readonly yes: string;
    readonly no: string;
    readonly electricDrive: {
      readonly label: string;
      readonly levels: Readonly<Record<ElectricDriveLevel, string>>;
    };
    readonly energySources: Readonly<Record<EnergySource, string>>;
    readonly items: Readonly<Record<EvTypeId, EvTypeCopy>>;
    readonly nextCta: string;
  };
  readonly examples: SectionIntro & {
    readonly listLabel: string;
    readonly previous: string;
    readonly next: string;
    readonly scrollHint: string;
    readonly badge: string;
    readonly bodyStyles: Readonly<Record<BodyStyle, string>>;
    readonly descriptions: Readonly<Record<EvModelId, string>>;
  };
  readonly prosCons: SectionIntro & {
    readonly advantagesTitle: string;
    readonly challengesTitle: string;
    readonly advantages: Readonly<Record<AdvantageId, TitledText>>;
    readonly challenges: Readonly<Record<ChallengeId, TitledText>>;
    readonly interiorAlt: string;
    readonly chargingAlt: string;
  };
  readonly sources: SectionIntro & {
    readonly topics: Readonly<Record<SourceId, string>>;
  };
  readonly footer: {
    readonly tagline: string;
    readonly exploreTitle: string;
    readonly connectTitle: string;
    readonly sourcesLink: string;
    readonly academic: string;
    readonly rights: (year: number) => string;
    readonly backToTop: string;
  };
  readonly notFound: {
    readonly eyebrow: string;
    readonly title: string;
    readonly text: string;
    readonly cta: string;
  };
}
