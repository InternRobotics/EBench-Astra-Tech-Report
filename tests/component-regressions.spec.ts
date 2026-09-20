import { test, expect } from '@playwright/test';

test('shared icons stay compact and masthead actions do not wrap', async ({ page }) => {
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    const icons = page.locator('.hero-actions svg, .demonstration-card svg');
    await expect(icons).toHaveCount(3);
    for (const svg of await icons.all()) {
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
      const box = await svg.boundingBox();
      expect(box!.width).toBeGreaterThan(10);
      expect(box!.width).toBeLessThanOrEqual(24);
      expect(box!.height).toBeLessThanOrEqual(24);
    }
    await expect(page.locator('.hero-primary')).toHaveCSS('white-space', 'nowrap');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(1);
  }
});

test('overall table is static, the entire Astra row highlights, and summary sits lower', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.overall-comparison tbody tr')).toHaveCount(9);
  await expect(page.getByRole('heading', { name: 'Comparison across models' })).toHaveCount(0);
  await expect(page.locator('#overall-content button, #overall-content [data-chart]')).toHaveCount(
    0,
  );
  const colors = await page
    .locator('.overall-comparison .highlight > *')
    .evaluateAll((cells) => cells.map((cell) => getComputedStyle(cell).backgroundColor));
  expect(new Set(colors).size).toBe(1);
  expect(colors[0]).not.toBe('rgba(0, 0, 0, 0)');
  const summary = await page.locator('.overall-summary').boundingBox();
  const table = await page.locator('.overall-comparison').boundingBox();
  expect(summary!.y).toBeGreaterThan(table!.y + 20);
  await expect(page.locator('#comparison-note-ref')).toHaveText('1');
  await expect(page.locator('#comparison-note-ref')).toHaveAttribute('href', '#comparison-note');
});

test('seeking does not insert a buffering message or shift playback controls', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.execution-demo video')).toHaveCount(1);
  await expect(page.locator('.execution-demo [data-counter]')).toContainText('Interaction');
  const control = page.locator('.execution-demo .episode-controls');
  await control.scrollIntoViewIfNeeded();
  const before = await control.boundingBox();
  await page
    .locator('.execution-demo video')
    .evaluate((video) => video.dispatchEvent(new Event('waiting')));
  await expect(page.locator('.execution-demo .episode-caption')).toBeEmpty();
  const after = await control.boundingBox();
  expect(after!.y).toBeCloseTo(before!.y, 1);
  const stem = await page
    .locator('.episode-chapter')
    .first()
    .evaluate((e) => getComputedStyle(e, '::before').content);
  expect(['none', 'normal']).toContain(stem);
});
