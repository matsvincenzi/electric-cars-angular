import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-brand-mark',
  imports: [RouterLink, Icon],
  template: `
    <a class="brand" routerLink="/" [attr.aria-label]="homeLabel()">
      <span class="mark"><app-icon name="zap" [size]="18" /></span>
      <span class="wordmark">{{ name() }}</span>
    </a>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      color: var(--color-on-dark);
      text-decoration: none;
      border-radius: var(--radius-sm);
    }

    .mark {
      display: grid;
      place-items: center;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 0.7rem;
      background: var(--color-cobalt-600);
      color: var(--color-spark-300);
      box-shadow:
        inset 0 1px 0 rgb(255 255 255 / 0.22),
        0 6px 18px -6px rgb(59 118 255 / 0.7);
      transition: transform var(--duration-base) var(--ease-out);
    }

    .brand:hover .mark {
      transform: rotate(-8deg) scale(1.05);
    }

    .wordmark {
      font-family: var(--font-display);
      font-size: 1.0625rem;
      font-weight: 650;
      letter-spacing: -0.02em;
      white-space: nowrap;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandMark {
  readonly name = input.required<string>();
  readonly homeLabel = input.required<string>();
}
