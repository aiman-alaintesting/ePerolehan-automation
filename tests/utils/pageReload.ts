// pageUtils.ts
import { Page } from '@playwright/test';

/**
 * Navigates to a URL with a timeout, and retries by refreshing the page if it times out.
 * @param page The Playwright page instance.
 * @param url The URL to navigate to.
 * @param timeout The navigation timeout in milliseconds (default: 15000).
 */
export async function navigateWithTimeoutRetry(page: Page, url: string, timeout: number = 15000): Promise<void> {
  try {
    // Attempt to go to the URL with a specific timeout
    await page.goto(url, { timeout });
    console.log('Successfully navigated to the website.');
  } catch (error) {
    // Check if the error is specifically a Playwright TimeoutError
    if (error instanceof Error && error.name === 'TimeoutError') {
      console.warn(`Navigation timed out after ${timeout / 1000}s. Refreshing page...`);

      // Refresh the page
      await page.reload();

      // Wait for the page to reach a stable state after the reload
      await page.waitForLoadState('domcontentloaded');

      console.log('Page refreshed and ready. Proceeding with the test.');
    } else {
      // If it's a different kind of error, re-throw it to fail the test
      throw error;
    }
  }
}