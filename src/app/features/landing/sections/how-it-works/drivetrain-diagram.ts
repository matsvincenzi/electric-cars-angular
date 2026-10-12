import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { type DrivetrainPartId } from '../../data/drivetrain';

@Component({
  selector: 'app-drivetrain-diagram',
  templateUrl: './drivetrain-diagram.html',
  styleUrl: './drivetrain-diagram.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrivetrainDiagram {
  readonly highlighted = input.required<DrivetrainPartId>();
  readonly label = input.required<string>();

  protected readonly batteryCells = Array.from({ length: 18 }, (_, index) => ({
    x: 220 + (index % 6) * 34.5,
    y: 124 + Math.floor(index / 6) * 40,
  }));

  protected stateOf(part: DrivetrainPartId): 'active' | 'idle' {
    return this.highlighted() === part ? 'active' : 'idle';
  }
}
