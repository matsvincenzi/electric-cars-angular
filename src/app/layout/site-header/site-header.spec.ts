import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTesting } from '../../../testing/app-testing';
import { ActiveSection } from '../../core/navigation/active-section';
import { type LandingSectionId } from '../../core/navigation/landing-sections';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  let fixture: ComponentFixture<SiteHeader>;
  let host: HTMLElement;
  const currentSection = signal<LandingSectionId | null>(null);

  const desktopLinks = () =>
    Array.from(host.querySelectorAll<HTMLAnchorElement>('.desktop-nav__link'));
  const menuButton = () => host.querySelector<HTMLButtonElement>('.header .menu-button');
  const dialog = () => host.querySelector<HTMLDialogElement>('dialog');

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
      this.open = true;
    };
    HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event('close'));
    };
  });

  beforeEach(async () => {
    currentSection.set(null);
    TestBed.configureTestingModule({
      providers: [
        provideAppTesting(),
        { provide: ActiveSection, useValue: { current: currentSection.asReadonly() } },
      ],
    });
    fixture = TestBed.createComponent(SiteHeader);
    host = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('links to every landing section by fragment, so it works from any route', () => {
    expect(desktopLinks().map((link) => link.getAttribute('href'))).toEqual([
      '/#what-is',
      '/#how-it-works',
      '/#types',
      '/#examples',
      '/#pros-cons',
    ]);
  });

  it('marks the section being read as the current location', async () => {
    currentSection.set('types');
    await fixture.whenStable();

    const current = desktopLinks().filter((link) => link.getAttribute('aria-current'));
    expect(current.map((link) => link.textContent?.trim())).toEqual(['Types']);
    expect(current[0]?.getAttribute('aria-current')).toBe('location');
  });

  it('opens the mobile menu as a modal dialog and reports it as expanded', async () => {
    menuButton()?.click();
    await fixture.whenStable();

    expect(dialog()?.open).toBe(true);
    expect(menuButton()?.getAttribute('aria-expanded')).toBe('true');
  });

  it('collapses again when the close button is used', async () => {
    menuButton()?.click();
    await fixture.whenStable();

    host.querySelector<HTMLButtonElement>('.mobile-menu .menu-button')?.click();
    await fixture.whenStable();

    expect(dialog()?.open).toBe(false);
    expect(menuButton()?.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the menu once a destination is chosen', async () => {
    menuButton()?.click();
    await fixture.whenStable();

    host.querySelector<HTMLAnchorElement>('.mobile-menu__link')?.click();
    await fixture.whenStable();

    expect(dialog()?.open).toBe(false);
  });
});
