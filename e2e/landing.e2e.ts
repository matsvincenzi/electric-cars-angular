import { type Page, expect, test } from '@playwright/test';

async function openGuide(page: Page): Promise<void> {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}

test.describe('Landing page journeys', () => {
  test('a visitor can go from the hero straight to the types explorer', async ({ page }) => {
    await openGuide(page);

    await page.getByRole('link', { name: 'Compare the types' }).click();

    await expect(page).toHaveURL(/#types$/);
    const section = page.locator('section#types');
    await expect(section).toBeInViewport();
    await expect(section).toBeFocused();
  });

  test('the header highlights the section being read', async ({ page, isMobile }) => {
    test.skip(isMobile, 'The inline navigation is only shown on wide screens.');
    await openGuide(page);

    await page.locator('section#examples').scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 200);

    await expect(
      page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Examples' }),
    ).toHaveAttribute('aria-current', 'location');
  });

  test('the types explorer can be operated with the keyboard alone', async ({ page }) => {
    await openGuide(page);

    await page.getByRole('tab', { name: /BEV/ }).focus();
    await page.keyboard.press('ArrowRight');

    const hydrogen = page.getByRole('tab', { name: /FCEV/ });
    await expect(hydrogen).toHaveAttribute('aria-selected', 'true');
    await expect(hydrogen).toBeFocused();
    await expect(page.getByRole('tabpanel')).toContainText('Hydrogen station');
  });

  test('the models carousel moves one card at a time', async ({ page }) => {
    await openGuide(page);
    const previous = page.getByRole('button', { name: 'Show previous models' });
    const track = page.locator('#models-track');
    await track.scrollIntoViewIfNeeded();
    await expect(previous).toBeDisabled();

    await page.getByRole('button', { name: 'Show next models' }).click();

    await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    await expect(previous).toBeEnabled();
  });

  test('unknown addresses lead back to the guide', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'This road doesn’t go anywhere.',
    );
    await expect(page).toHaveTitle('Page not found — Electric Cars');

    await page.getByRole('link', { name: 'Back to the guide' }).click();

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Sustainable driving');
  });

  test('a full read-through produces no console errors or failed requests', async ({ page }) => {
    const problems: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') problems.push(message.text());
    });
    page.on('pageerror', (error) => problems.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400) problems.push(`${response.status()} ${response.url()}`);
    });

    await openGuide(page);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    });
    await page.waitForLoadState('networkidle');

    expect(problems).toEqual([]);
  });
});

test.describe('Language', () => {
  test('switching to Portuguese translates the page and is remembered', async ({
    page,
    isMobile,
  }) => {
    await openGuide(page);

    if (isMobile) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('dialog').getByRole('button', { name: /PT/ }).click();
      await page.getByRole('button', { name: 'Fechar menu' }).click();
    } else {
      await page.getByRole('banner').getByRole('button', { name: /PT/ }).click();
    }

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Direção sustentável');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page).toHaveTitle(/Carros Elétricos/);

    await page.reload();

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Direção sustentável');
  });

  test('first-time visitors get the language of their browser', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'pt-BR' });
    const page = await context.newPage();

    await openGuide(page);

    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await context.close();
  });
});

test.describe('Mobile navigation', () => {
  test.skip(({ isMobile }) => !isMobile, 'The menu dialog only exists on narrow screens.');

  test('the menu opens as a modal dialog and closes with Escape', async ({ page }) => {
    await openGuide(page);
    const toggle = page.getByRole('button', { name: 'Open menu' });

    await toggle.click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');

    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('choosing a destination closes the menu and lands on that section', async ({ page }) => {
    await openGuide(page);

    await page.getByRole('button', { name: 'Open menu' }).click();
    await page
      .getByRole('dialog')
      .getByRole('link', { name: /Pros & cons/ })
      .click();

    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page).toHaveURL(/#pros-cons$/);
    await expect(page.locator('section#pros-cons')).toBeInViewport();
  });
});
