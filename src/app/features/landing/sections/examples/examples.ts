import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  type ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, animationFrameScheduler, auditTime, fromEvent, merge, startWith } from 'rxjs';
import { srcsetFor } from '../../../../core/images/responsive-image-loader';
import { TrackSection } from '../../../../core/navigation/track-section';
import { I18nStore } from '../../../../i18n/i18n-store';
import { Icon } from '../../../../shared/icon/icon';
import { SectionHeading } from '../../../../shared/section-heading/section-heading';
import { EV_MODELS } from '../../data/ev-models';
import { INITIAL_SCROLL_STATE, measureScroll } from './scroll-state';

export type ScrollDirection = -1 | 1;

@Component({
  selector: 'app-examples',
  imports: [NgOptimizedImage, TrackSection, Icon, SectionHeading],
  templateUrl: './examples.html',
  styleUrl: './examples.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Examples {
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly destroyRef = inject(DestroyRef);
  private readonly track = viewChild.required<ElementRef<HTMLUListElement>>('track');

  protected readonly t = inject(I18nStore).messages;
  protected readonly models = EV_MODELS;
  protected readonly imageSrcset = srcsetFor('models');
  protected readonly scrollState = signal(INITIAL_SCROLL_STATE);

  constructor() {
    afterNextRender(() => this.followTrackScroll());
  }

  protected scrollByCard(direction: ScrollDirection): void {
    const track = this.track().nativeElement;
    const card = track.querySelector('li');
    if (!card) {
      return;
    }
    const gap = Number.parseFloat(this.window?.getComputedStyle(track).columnGap ?? '') || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap) });
  }

  private followTrackScroll(): void {
    const track = this.track().nativeElement;
    const resize$ = this.window ? fromEvent(this.window, 'resize') : EMPTY;
    merge(fromEvent(track, 'scroll', { passive: true }), resize$)
      .pipe(
        startWith(null),
        auditTime(0, animationFrameScheduler),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.scrollState.set(measureScroll(track)));
  }
}
