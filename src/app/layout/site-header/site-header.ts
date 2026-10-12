import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { EMPTY, distinctUntilChanged, fromEvent, map, startWith } from 'rxjs';
import { ActiveSection } from '../../core/navigation/active-section';
import { LANDING_SECTIONS } from '../../core/navigation/landing-sections';
import { I18nStore } from '../../i18n/i18n-store';
import { BrandMark } from '../../shared/brand-mark/brand-mark';
import { Icon } from '../../shared/icon/icon';
import { LanguageToggle } from '../language-toggle/language-toggle';

const SOLID_AFTER_PX = 24;
const DESKTOP_QUERY = '(min-width: 64rem)';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, BrandMark, Icon, LanguageToggle],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly destroyRef = inject(DestroyRef);
  private readonly menu = viewChild.required<ElementRef<HTMLDialogElement>>('menu');

  protected readonly t = inject(I18nStore).messages;
  protected readonly activeSection = inject(ActiveSection).current;
  protected readonly sections = LANDING_SECTIONS;
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = toSignal(this.pastTopOfPage(), { initialValue: false });

  constructor() {
    afterNextRender(() => {
      this.viewportScroller.setOffset(() => [0, this.host.nativeElement.offsetHeight]);
      this.closeMenuWhenLayoutBecomesDesktop();
    });
  }

  protected openMenu(): void {
    this.menu().nativeElement.showModal();
    this.menuOpen.set(true);
  }

  protected closeMenu(): void {
    this.menu().nativeElement.close();
  }

  protected onMenuClosed(): void {
    this.menuOpen.set(false);
  }

  private pastTopOfPage() {
    const view = this.window;
    if (!view) {
      return EMPTY;
    }
    return fromEvent(view, 'scroll', { passive: true }).pipe(
      startWith(null),
      map(() => view.scrollY > SOLID_AFTER_PX),
      distinctUntilChanged(),
    );
  }

  private closeMenuWhenLayoutBecomesDesktop(): void {
    const desktop = this.window?.matchMedia?.(DESKTOP_QUERY);
    if (!desktop) {
      return;
    }
    const closeIfDesktop = (event: MediaQueryListEvent) => {
      if (event.matches && this.menuOpen()) {
        this.closeMenu();
      }
    };
    desktop.addEventListener('change', closeIfDesktop);
    this.destroyRef.onDestroy(() => desktop.removeEventListener('change', closeIfDesktop));
  }
}
