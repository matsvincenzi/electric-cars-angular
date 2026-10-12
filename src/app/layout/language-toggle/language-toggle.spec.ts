import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideI18nTesting } from '../../../testing/i18n-testing';
import { I18nStore } from '../../i18n/i18n-store';
import { LanguageToggle } from './language-toggle';

describe('LanguageToggle', () => {
  let fixture: ComponentFixture<LanguageToggle>;
  let host: HTMLElement;

  const buttons = () => Array.from(host.querySelectorAll<HTMLButtonElement>('button'));
  const pressed = () => host.querySelector<HTMLButtonElement>('[aria-pressed="true"]');

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: provideI18nTesting() });
    fixture = TestBed.createComponent(LanguageToggle);
    host = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('offers both languages, each named in its own language', () => {
    expect(buttons().map((button) => button.textContent?.replace(/\s+/g, ' ').trim())).toEqual([
      'EN, English',
      'PT, Português (Brasil)',
    ]);
    expect(buttons().map((button) => button.lang)).toEqual(['en', 'pt-BR']);
  });

  it('marks the active language as pressed', () => {
    expect(pressed()?.lang).toBe('en');
  });

  it('switches the whole app to the chosen language', async () => {
    buttons()[1]?.click();
    await fixture.whenStable();

    expect(TestBed.inject(I18nStore).locale()).toBe('pt-BR');
    expect(pressed()?.lang).toBe('pt-BR');
    expect(host.querySelector('[role="group"]')?.getAttribute('aria-label')).toBe('Idioma');
  });
});
