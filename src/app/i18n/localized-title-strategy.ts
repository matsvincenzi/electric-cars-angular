import { Injectable, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { type RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { I18nStore } from './i18n-store';
import { type PageTitleKey } from './messages';

const PAGE_TITLE_KEYS: readonly PageTitleKey[] = ['landing', 'notFound'];

export function pageTitle(key: PageTitleKey): PageTitleKey {
  return key;
}

@Injectable()
export class LocalizedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18n = inject(I18nStore);
  private readonly currentPage = signal<PageTitleKey>('landing');

  constructor() {
    super();
    effect(() => {
      const text = this.i18n.messages().meta.pageTitles[this.currentPage()];
      this.title.setTitle(text);
      this.meta.updateTag({ property: 'og:title', content: text });
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const key = this.buildTitle(snapshot) ?? 'landing';
    if (!isPageTitleKey(key)) {
      throw new Error(`Route title "${key}" is not a known page title key.`);
    }
    this.currentPage.set(key);
  }
}

function isPageTitleKey(value: string): value is PageTitleKey {
  return (PAGE_TITLE_KEYS as readonly string[]).includes(value);
}
