import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  template: `
    <p class="eyebrow">{{ eyebrow() }}</p>
    <h2 class="title" [id]="headingId()">{{ title() }}</h2>
    @if (lead(); as lead) {
      <p class="lead">{{ lead }}</p>
    }
  `,
  styleUrl: './section-heading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly headingId = input.required<string>();
  readonly lead = input<string>();
}
