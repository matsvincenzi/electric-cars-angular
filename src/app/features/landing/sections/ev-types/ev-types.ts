import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrackSection } from '../../../../core/navigation/track-section';
import { I18nStore } from '../../../../i18n/i18n-store';
import { Icon } from '../../../../shared/icon/icon';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';
import {
  ELECTRIC_DRIVE_LEVELS,
  EV_TYPES,
  type ElectricDriveLevel,
  type EvTypeId,
} from '../../data/ev-types';

const NAVIGATION_KEYS: Readonly<Record<string, (index: number, count: number) => number>> = {
  ArrowRight: (index, count) => (index + 1) % count,
  ArrowDown: (index, count) => (index + 1) % count,
  ArrowLeft: (index, count) => (index - 1 + count) % count,
  ArrowUp: (index, count) => (index - 1 + count) % count,
  Home: () => 0,
  End: (_, count) => count - 1,
};

@Component({
  selector: 'app-ev-types',
  imports: [RouterLink, TrackSection, Icon, SectionHeading],
  templateUrl: './ev-types.html',
  styleUrl: './ev-types.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvTypes {
  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');

  protected readonly t = inject(I18nStore).messages;
  protected readonly types = EV_TYPES;
  protected readonly driveLevels = ELECTRIC_DRIVE_LEVELS;
  protected readonly selectedId = signal<EvTypeId>('bev');
  protected readonly selectedIndex = computed(() =>
    this.types.findIndex((type) => type.id === this.selectedId()),
  );

  protected select(id: EvTypeId): void {
    this.selectedId.set(id);
  }

  protected onTabKeydown(event: KeyboardEvent): void {
    const nextIndexFor = NAVIGATION_KEYS[event.key];
    if (!nextIndexFor) {
      return;
    }
    event.preventDefault();
    const nextIndex = nextIndexFor(this.selectedIndex(), this.types.length);
    const next = this.types[nextIndex];
    if (next) {
      this.select(next.id);
      this.tabs()[nextIndex]?.nativeElement.focus();
    }
  }

  protected isLevelReached(level: ElectricDriveLevel, current: ElectricDriveLevel): boolean {
    return this.driveLevels.indexOf(level) <= this.driveLevels.indexOf(current);
  }
}
