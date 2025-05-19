import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
    private readonly page: Page;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    private readonly searchResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole('textbox', { name: 'Search..' });
        this.searchButton = page.getByRole('button', { name: '' });
        // even it is not recommended, the most robust locator for the result container is the ID
        this.searchResult = page.locator('id=result');
    }

    /* after this points are the reusable functions for the Check out Page page */

    async navigateToSearch() {
        await this.page.goto('/search');
    }
    async searchForItem(itemToSearch: string) {
        await this.searchInput.fill(itemToSearch)
        await this.searchButton.click()
    }

    async verifySuccessSearch(expectedResult: string) {
        const resultLocator = this.searchResult
        await expect.poll(async () => {
            return resultLocator.textContent();
        }, {
            // Poll for 10 seconds;
            timeout: 10000,
        }).toContain(expectedResult);
    }

    async verifyEmptySearch() {
        const resultLocator = this.searchResult
        await expect.poll(async () => {
            return resultLocator.textContent();
        }, {
            // Poll for 10 seconds;
            timeout: 10000,
        }).toBe('Please provide a search word.');
    }
}