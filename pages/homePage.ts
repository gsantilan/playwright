// pages/homePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    private readonly welcomeHeader: Locator

    constructor(page: Page) {
        /* For this page is possible to use Xpath to locate elements,but Playwright does not recommend this approach.
        Is prefereable to use user-visible locators like text or accessible role instead of using XPath that is tied to the implementation and easily break when the page changes.
        https://playwright.dev/docs/other-locators#xpath-locator */
        this.welcomeHeader = page.getByRole('heading', { name: 'Welcome!' });

    }

    /* after this points are the reusable functions for the Home page */


    async verifyWelcomePage() {
        await expect(this.welcomeHeader).toBeVisible();
    }

}
