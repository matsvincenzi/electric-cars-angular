import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTesting } from '../../../../../testing/app-testing';
import { I18nStore } from '../../../../i18n/i18n-store';
import { EvTypes } from './ev-types';

describe('EvTypes', () => {
  let fixture: ComponentFixture<EvTypes>;
  let host: HTMLElement;

  const tabs = () => Array.from(host.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const selectedTab = () => host.querySelector<HTMLButtonElement>('[aria-selected="true"]');
  const visiblePanels = () =>
    Array.from(host.querySelectorAll<HTMLElement>('[role="tabpanel"]')).filter((p) => !p.hidden);

  async function press(key: string): Promise<void> {
    document.activeElement?.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    await fixture.whenStable();
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: provideAppTesting() });
    fixture = TestBed.createComponent(EvTypes);
    host = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('names each tab by its acronym and a short summary', () => {
    expect(tabs().map((tab) => tab.textContent?.trim())).toEqual([
      'HEV, Engine first, electric assist',
      'PHEV, Electric for short trips',
      'BEV, 100% electric',
      'FCEV, Electricity made from hydrogen',
    ]);
  });

  it('opens on the battery electric type with exactly one visible panel', () => {
    expect(selectedTab()?.id).toBe('type-tab-bev');
    expect(visiblePanels()).toHaveLength(1);
    expect(visiblePanels()[0]?.getAttribute('aria-labelledby')).toBe('type-tab-bev');
  });

  it('keeps only the selected tab in the keyboard tab order', () => {
    expect(tabs().map((tab) => tab.tabIndex)).toEqual([-1, -1, 0, -1]);
  });

  it('wires every tab to a panel that actually exists', () => {
    for (const tab of tabs()) {
      const panelId = tab.getAttribute('aria-controls') ?? '';
      expect(host.querySelector(`#${panelId}`)).not.toBeNull();
    }
  });

  it('shows the panel of a clicked tab', async () => {
    tabs()[0]?.click();
    await fixture.whenStable();

    expect(selectedTab()?.id).toBe('type-tab-hev');
    expect(visiblePanels()[0]?.textContent).toContain('Hybrid electric vehicle');
    expect(visiblePanels()[0]?.textContent).toContain('Gas station only');
  });

  it('moves selection and focus with the arrow keys, wrapping at the ends', async () => {
    tabs()[2]?.focus();

    await press('ArrowRight');
    expect(selectedTab()?.id).toBe('type-tab-fcev');
    expect(document.activeElement).toBe(selectedTab());

    await press('ArrowRight');
    expect(selectedTab()?.id).toBe('type-tab-hev');

    await press('ArrowLeft');
    expect(selectedTab()?.id).toBe('type-tab-fcev');
  });

  it('jumps to the first and last tab with Home and End', async () => {
    tabs()[2]?.focus();

    await press('Home');
    expect(selectedTab()?.id).toBe('type-tab-hev');

    await press('End');
    expect(selectedTab()?.id).toBe('type-tab-fcev');
  });

  it('ignores keys that are not part of the tabs pattern', async () => {
    tabs()[2]?.focus();

    await press('Enter');

    expect(selectedTab()?.id).toBe('type-tab-bev');
  });

  it('states plainly whether a type plugs in', async () => {
    const plugsInOf = () =>
      visiblePanels()[0]?.querySelector('.spec__boolean')?.textContent?.trim();

    expect(plugsInOf()).toBe('Yes');

    tabs()[3]?.click();
    await fixture.whenStable();

    expect(plugsInOf()).toBe('No');
  });

  it('translates the open panel when the language changes', async () => {
    TestBed.inject(I18nStore).setLocale('pt-BR');
    await fixture.whenStable();

    expect(visiblePanels()[0]?.textContent).toContain('Veículo elétrico a bateria');
  });
});
