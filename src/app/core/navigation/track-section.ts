import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { ActiveSection } from './active-section';
import { type LandingSectionId } from './landing-sections';

@Directive({ selector: '[appTrackSection]' })
export class TrackSection {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly activeSection = inject(ActiveSection);
  private readonly destroyRef = inject(DestroyRef);

  readonly appTrackSection = input.required<LandingSectionId>();

  constructor() {
    afterNextRender(() => {
      const stopTracking = this.activeSection.track(this.element, this.appTrackSection());
      this.destroyRef.onDestroy(stopTracking);
    });
  }
}
