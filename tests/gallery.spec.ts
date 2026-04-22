import { test, expect } from '@playwright/test';

test.describe('Gallery', () => {
  test('home page loads and has navigation', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Luci');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Work' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Gallery' })).toBeVisible();
  });

  test('work page loads with all images', async ({ page }) => {
    await page.goto('/work');

    await expect(page).toHaveTitle('Work | Luci');
    await expect(page.getByRole('heading', { name: 'Work' })).toBeVisible();

    // Check category tabs exist
    await expect(page.getByRole('link', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Digital' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Drawings' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Mixed Media' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Paintings' })).toBeVisible();

    // Check that artwork images are rendered
    const artworkButtons = page.locator('button').filter({ has: page.locator('img') });
    await expect(artworkButtons.first()).toBeVisible();

    // Should have multiple artworks
    const count = await artworkButtons.count();
    expect(count).toBeGreaterThan(10);
  });

  test('category pages load correct artworks', async ({ page }) => {
    // Test Digital page
    await page.goto('/work/digital');
    await expect(page).toHaveTitle('Digital | Luci');
    await expect(page.getByRole('heading', { name: 'Digital' })).toBeVisible();

    // Test Drawings page
    await page.goto('/work/drawings');
    await expect(page).toHaveTitle('Drawings | Luci');
    await expect(page.getByRole('heading', { name: 'Drawings' })).toBeVisible();

    // Test Mixed Media page
    await page.goto('/work/mixed-media');
    await expect(page).toHaveTitle('Mixed Media | Luci');
    await expect(page.getByRole('heading', { name: 'Mixed Media' })).toBeVisible();

    // Test Paintings page
    await page.goto('/work/paintings');
    await expect(page).toHaveTitle('Paintings | Luci');
    await expect(page.getByRole('heading', { name: 'Paintings' })).toBeVisible();
  });

  test('lightbox opens when clicking artwork', async ({ page }) => {
    await page.goto('/work');

    // Click first artwork
    const artworkButtons = page.locator('button').filter({ has: page.locator('img') });
    await artworkButtons.first().click();

    // Lightbox should be visible
    const lightbox = page.locator('.fixed.inset-0.z-50');
    await expect(lightbox).toBeVisible();

    // Should have close button
    await expect(page.getByLabel('Close lightbox')).toBeVisible();

    // Should display image counter
    await expect(page.getByText(/\d+ \/ \d+/)).toBeVisible();
  });

  test('lightbox navigation with arrows', async ({ page }) => {
    await page.goto('/work');

    // Open lightbox
    const artworkButtons = page.locator('button').filter({ has: page.locator('img') });
    await artworkButtons.first().click();

    // Get initial counter
    const counterText = page.getByText(/\d+ \/ \d+/);
    const initialCounter = await counterText.textContent();

    // Click next arrow
    await page.getByLabel('Next image').click();

    // Counter should change
    const newCounter = await counterText.textContent();
    expect(newCounter).not.toBe(initialCounter);

    // Click previous arrow
    await page.getByLabel('Previous image').click();

    // Should be back to initial
    const finalCounter = await counterText.textContent();
    expect(finalCounter).toBe(initialCounter);
  });

  test('lightbox keyboard navigation', async ({ page }) => {
    await page.goto('/work');

    // Open lightbox
    const artworkButtons = page.locator('button').filter({ has: page.locator('img') });
    await artworkButtons.first().click();

    const lightbox = page.locator('.fixed.inset-0.z-50');
    await expect(lightbox).toBeVisible();

    // Get initial counter
    const counterText = page.getByText(/\d+ \/ \d+/);
    const initialCounter = await counterText.textContent();

    // Navigate with arrow keys
    await page.keyboard.press('ArrowRight');
    const afterRight = await counterText.textContent();
    expect(afterRight).not.toBe(initialCounter);

    await page.keyboard.press('ArrowLeft');
    const afterLeft = await counterText.textContent();
    expect(afterLeft).toBe(initialCounter);

    // Close with Escape
    await page.keyboard.press('Escape');
    await expect(lightbox).not.toBeVisible();
  });

  test('lightbox closes when clicking close button', async ({ page }) => {
    await page.goto('/work');

    // Open lightbox
    const artworkButtons = page.locator('button').filter({ has: page.locator('img') });
    await artworkButtons.first().click();

    const lightbox = page.locator('.fixed.inset-0.z-50');
    await expect(lightbox).toBeVisible();

    // Click close button
    await page.getByLabel('Close lightbox').click();

    // Lightbox should be hidden
    await expect(lightbox).not.toBeVisible();
  });

  test('category tabs navigate between categories', async ({ page }) => {
    await page.goto('/work');

    // Click Digital tab
    await page.getByRole('link', { name: 'Digital' }).click();
    await expect(page).toHaveURL('/work/digital');
    await expect(page.getByRole('heading', { name: 'Digital' })).toBeVisible();

    // Click Paintings tab
    await page.getByRole('link', { name: 'Paintings' }).click();
    await expect(page).toHaveURL('/work/paintings');
    await expect(page.getByRole('heading', { name: 'Paintings' })).toBeVisible();

    // Click All tab
    await page.getByRole('link', { name: 'All' }).click();
    await expect(page).toHaveURL('/work');
    await expect(page.getByRole('heading', { name: 'Work' })).toBeVisible();
  });

  test('navigation dropdown shows work categories', async ({ page }) => {
    await page.goto('/');

    // Hover over Work link
    const workLink = page.getByRole('link', { name: 'Work' }).first();
    await workLink.hover();

    // Dropdown should appear with category links
    await expect(page.getByRole('link', { name: 'All Work' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Digital' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Drawings' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Mixed Media' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Paintings' })).toBeVisible();
  });

  test('artwork cards show metadata on hover', async ({ page }) => {
    await page.goto('/work');

    const artworkButton = page.locator('button').filter({ has: page.locator('img') }).first();

    // Hover over artwork
    await artworkButton.hover();

    // Metadata should be visible (title, year, etc.)
    const overlay = artworkButton.locator('.text-white');
    await expect(overlay).toBeVisible();
  });

  test('UNSURE ABOUT UPLOADING images are filtered out', async ({ page }) => {
    await page.goto('/work/paintings');

    // The "Grapefruit" image with "UNSURE ABOUT UPLOADING" should not appear
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toContain('UNSURE');
      expect(alt).not.toContain('Grapefruit');
    }
  });
});
