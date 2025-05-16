// pages/orderPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class OrderPage {

    private readonly orderConfirmationHeader: Locator
    private readonly orderNumberHeader: Locator

    constructor(page: Page) {
        this.orderConfirmationHeader = page.getByRole('heading', { name: 'Order Confirmed!' });
        this.orderNumberHeader = page.getByText('Order Number:');
    }

    /* after this points are the reusable functions for the Check out Page page */


    async verifyOrderConfirmation() {
        await expect(this.orderConfirmationHeader).toBeVisible();
        await expect(this.orderNumberHeader).toBeVisible();
    }


}
