import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type FlagCode = 'br' | 'us';

@Component({
  selector: 'app-flag',
  template: `
    <svg viewBox="0 0 640 480" aria-hidden="true" focusable="false">
      <use [attr.href]="href()" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      width: 1.25rem;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      border-radius: 3px;
      box-shadow: 0 0 0 1px rgb(255 255 255 / 0.18);
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Flag {
  readonly code = input.required<FlagCode>();

  protected readonly href = computed(() => `icons.svg#flag-${this.code()}`);
}
