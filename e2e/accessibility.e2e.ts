import AxeBuilder from '@axe-core/playwright';
import { type Page, expect, test } from '@playwright/test';

const WCAG_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function auditViolations(page: Page): Promise<string[]> {
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_AA).analyze();
  return violations.map(
    (violation) =>
      `${violation.id}: ${violation.help} → ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`,
  );
}

test.describe('Accessibility (axe, WCAG 2.2 AA)', () => {
  test.use({ reducedMotion: 'reduce' });

  test('the landing page has no detectable violations in English', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(await auditViolations(page)).toEqual([]);
  });

  test('the landing page has no detectable violations in Portuguese', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'pt-BR', reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(await auditViolations(page)).toEqual([]);
    await context.close();
  });

  test('every types panel stays accessible as it is revealed', async ({ page }) => {
    await page.goto('/');
    for (const name of [/^HEV/, /^PHEV/, /^FCEV/]) {
      await page.getByRole('tab', { name }).click();

      expect(await auditViolations(page)).toEqual([]);
    }
  });

  test('the open mobile menu has no detectable violations', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'The menu dialog only exists on narrow screens.');
    await page.goto('/');

    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    expect(await auditViolations(page)).toEqual([]);
  });

  test('the not-found page has no detectable violations', async ({ page }) => {
    await page.goto('/missing');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    expect(await auditViolations(page)).toEqual([]);
  });
});
