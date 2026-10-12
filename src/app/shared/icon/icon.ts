import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { type IconName } from './icon-name';

@Component({
  selector: 'app-icon',
  template: `
    <svg aria-hidden="true" focusable="false" [attr.width]="size()" [attr.height]="size()">
      <use [attr.href]="href()" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);

  protected readonly href = computed(() => `icons.svg#${this.name()}`);
}
