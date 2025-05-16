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
        for (let i = 0; i < 10; i++) {
            const resultText = await resultLocator.textContent();
            if (resultText && resultText.trim() !== "searching..." && resultText.trim() !== "") {
                expect(resultText.trim()).toContain(expectedResult);
                return;
            }
            await this.page.waitForTimeout(500);
        }
    }

    async verifyEmptySearch() {
        
         for (let i = 0; i < 10; i++) {
            const actualResult = await this.searchResult.textContent();
            if (actualResult && actualResult.trim() !== "searching..." && actualResult.trim() !== "") {
                expect(actualResult.trim()).toBe('Please provide a search word.');
                return;
            }
            await this.page.waitForTimeout(500);
        }
    }
}