import { Injectable, signal } from '@angular/core';
import { type LandingSectionId } from './landing-sections';

const READING_LINE = '-40% 0px -59% 0px';

@Injectable({ providedIn: 'root' })
export class ActiveSection {
  private readonly currentSection = signal<LandingSectionId | null>(null);
  private readonly sectionIds = new WeakMap<Element, LandingSectionId>();
  private observer: IntersectionObserver | null = null;

  readonly current = this.currentSection.asReadonly();

  track(element: Element, id: LandingSectionId): () => void {
    const observer = this.ensureObserver();
    if (!observer) {
      return () => undefined;
    }
    this.sectionIds.set(element, id);
    observer.observe(element);
    return () => {
      observer.unobserve(element);
      if (this.currentSection() === id) {
        this.currentSection.set(null);
      }
    };
  }

  private ensureObserver(): IntersectionObserver | null {
    if (!this.observer && typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => this.update(entries), {
        rootMargin: READING_LINE,
      });
    }
    return this.observer;
  }

  private update(entries: readonly IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      const id = this.sectionIds.get(entry.target);
      if (!id) {
        continue;
      }
      if (entry.isIntersecting) {
        this.currentSection.set(id);
      } else if (this.currentSection() === id) {
        this.currentSection.set(null);
      }
    }
  }
}
