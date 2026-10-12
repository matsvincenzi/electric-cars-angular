import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTesting } from '../../../testing/app-testing';
import { I18nStore } from '../../i18n/i18n-store';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  let fixture: ComponentFixture<SiteFooter>;
  let host: HTMLElement;

  const academicCredit = () => host.querySelector<HTMLElement>('.footer__academic');

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: provideAppTesting() });
    fixture = TestBed.createComponent(SiteFooter);
    host = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('links the academic credit to the university homepage', () => {
    const link = academicCredit()?.querySelector('a');

    expect(link?.href).toBe('https://ucb.catolica.edu.br/');
    expect(link?.textContent).toContain('Universidade Católica de Brasília');
    expect(link?.target).toBe('_blank');
  });

  it('translates the credit label but keeps the university name', async () => {
    TestBed.inject(I18nStore).setLocale('pt-BR');
    await fixture.whenStable();

    expect(academicCredit()?.textContent).toContain('Projeto acadêmico');
    expect(academicCredit()?.querySelector('a')?.textContent).toContain(
      'Universidade Católica de Brasília',
    );
  });
});
