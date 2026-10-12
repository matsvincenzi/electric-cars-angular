import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTesting } from '../../../../../testing/app-testing';
import { HowItWorks } from './how-it-works';

function accessibleText(element: Element): string {
  const clone = element.cloneNode(true) as Element;
  clone.querySelectorAll('[aria-hidden="true"]').forEach((hidden) => hidden.remove());
  return clone.textContent?.trim() ?? '';
}

describe('HowItWorks', () => {
  let fixture: ComponentFixture<HowItWorks>;
  let host: HTMLElement;

  const stepButtons = () => Array.from(host.querySelectorAll<HTMLButtonElement>('.step__trigger'));
  const activeDiagramParts = () => host.querySelectorAll('.part[data-state="active"]');
  const activePartLabel = () =>
    host.querySelector('.part[data-state="active"] .badge-label')?.textContent?.trim();

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: provideAppTesting() });
    fixture = TestBed.createComponent(HowItWorks);
    host = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('lists the five drivetrain components in energy-flow order', () => {
    expect(host.querySelector('ol')?.getAttribute('aria-label')).toContain('order energy flows');
    expect(stepButtons().map((button) => accessibleText(button))).toEqual([
      'Charging port',
      'On-board charger',
      'Battery pack',
      'Inverter',
      'Electric motor',
    ]);
  });

  it('starts with the charging port selected and highlighted in the diagram', () => {
    expect(stepButtons()[0]?.getAttribute('aria-pressed')).toBe('true');
    expect(activeDiagramParts()).toHaveLength(1);
    expect(activePartLabel()).toBe('1');
  });

  it('highlights the matching component when a step is selected', async () => {
    stepButtons()[2]?.click();
    await fixture.whenStable();

    expect(stepButtons().map((b) => b.getAttribute('aria-pressed'))).toEqual([
      'false',
      'false',
      'true',
      'false',
      'false',
    ]);
    expect(activePartLabel()).toBe('3');
  });

  it('keeps a single active step and diagram part after several selections', async () => {
    stepButtons()[4]?.click();
    stepButtons()[1]?.click();
    await fixture.whenStable();

    expect(host.querySelectorAll('.step.is-active')).toHaveLength(1);
    expect(activeDiagramParts()).toHaveLength(1);
    expect(activePartLabel()).toBe('2');
  });
});
