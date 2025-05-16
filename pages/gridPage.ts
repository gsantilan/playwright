import { Page, Locator, expect } from '@playwright/test';

export class GridPage {
    private readonly page: Page;
    private readonly superPepperoniItem: Locator
    private readonly superPepperoniPrice: Locator
    private readonly wholeSupperPepperoniCard: Locator
    private readonly menuItems: Locator;

    // Selector paths (reusable)
    private readonly itemTitleSelector = '[data-test-id="item-name"]';
    private readonly itemImageSelector = 'img';
    private readonly itemPriceSelector = '#item-price';
    private readonly itemButtonSelector = '[data-test-id="add-to-order"]';


    constructor(page: Page) {
        this.page = page;
        this.superPepperoniItem = page.getByText('Super Pepperoni');
        this.superPepperoniPrice = page.locator('#menu div').filter({ hasText: 'Super Pepperoni' }).locator('#item-price');
        this.wholeSupperPepperoniCard = page.getByText('Super Pepperoni $10 Add to Order');
        this.menuItems = page.locator('#menu .item');

    }

    /* after this points are the reusable functions for the Check out Page page */

    async navigateToGrid() {
        await this.page.goto('/grid');
    }



    async verifySupperPepperonyPriceMethod1(price: string) {
        await this.superPepperoniItem.scrollIntoViewIfNeeded()
        const actualPrice = await this.superPepperoniPrice.textContent();
        expect(actualPrice?.trim()).toBe(price);
    }
    async verifySupperPepperonyPriceMethod2() {
        await this.wholeSupperPepperoniCard.scrollIntoViewIfNeeded()
        await expect(this.wholeSupperPepperoniCard).toBeVisible()
    }

    async verifyAllItemsStructure() {
        const itemCount = await this.menuItems.count();

        for (let i = 0; i < itemCount; i++) {
            const currentItem = this.menuItems.nth(i);

            // Using selector paths directly
            const title = currentItem.locator(this.itemTitleSelector);
            const image = currentItem.locator(this.itemImageSelector);
            const price = currentItem.locator(this.itemPriceSelector);
            const button = currentItem.locator(this.itemButtonSelector);

            // Verifying the item has a title (product name)
            await expect(title).toBeVisible();
            const titleText = await title.textContent();
            expect(titleText).not.toBeNull();
            expect(titleText?.trim().length).toBeGreaterThan(0);

            // Verifying the item has an image
            await expect(image).toBeVisible();
            const imageSrc = await image.getAttribute('src');
            expect(imageSrc).not.toBeNull();
            expect(imageSrc?.trim().length).toBeGreaterThan(0);

            // Verifying the item has a price
            await expect(price).toBeVisible();
            const priceText = await price.textContent();
            expect(priceText).not.toBeNull();
            expect(priceText?.trim().startsWith('$')).toBeTruthy();
            expect(priceText?.trim().length).toBeGreaterThan(1);

            // Verifying the item has an Add to Order button
            await expect(button).toBeVisible();
            const buttonText = await button.textContent();
            expect(buttonText).not.toBeNull();
            expect(buttonText?.trim()).toBe('Add to Order');
        }
    }


}