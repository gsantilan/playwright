// pages/checkOutPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class CheckOutPage {
    private readonly page: Page;
    private readonly paymentHeader: Locator
    private readonly fullNameInput: Locator
    private readonly nameOnCardInput: Locator
    private readonly emailInput: Locator
    private readonly creditCardNumberInput: Locator
    private readonly addressInput: Locator
    private readonly expMonthSelector: Locator
    private readonly cityInput: Locator
    private readonly expYearInput: Locator
    private readonly cvvInput: Locator
    private readonly stateInput: Locator
    private readonly zipInput: Locator
    private readonly shippingCheckbox: Locator
    private readonly checkoutButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.paymentHeader = page.getByRole('heading', { name: 'Payment' });
        this.fullNameInput = page.getByRole('textbox', { name: ' Full Name' });
        this.nameOnCardInput = page.getByRole('textbox', { name: 'Name on Card' });
        this.emailInput = page.getByRole('textbox', { name: ' Email' });
        this.creditCardNumberInput = page.getByRole('textbox', { name: 'Credit card number' });
        this.addressInput = page.getByRole('textbox', { name: ' Address' });
        this.expMonthSelector = page.getByLabel('Exp Month');
        this.cityInput = page.getByRole('textbox', { name: ' City' });
        this.expYearInput = page.getByRole('textbox', { name: 'Exp Year' });
        this.cvvInput = page.getByRole('textbox', { name: 'CVV' });
        this.stateInput = page.getByRole('textbox', { name: 'State' });
        this.zipInput = page.getByRole('textbox', { name: 'Zip' });
        this.shippingCheckbox = page.getByRole('checkbox', { name: 'Shipping address same as' });
        this.checkoutButton = page.getByRole('button', { name: 'Continue to checkout' });
    }

    /* after this points are the reusable functions for the Check out Page page */


    async verifyCheckOutPage() {
        await expect(this.paymentHeader).toBeVisible();
    }

    async fillCheckOutForm(fullName: string, nameOnCard: string, email: string,
        creditCardNumber: string, address: string, expMonth: string,
        cityInput: string, expYear: string, cvv: string, state: string, zip: string) {
        await this.fullNameInput.fill(fullName);
        await this.nameOnCardInput.fill(nameOnCard);
        await this.emailInput.fill(email);
        await this.creditCardNumberInput.fill(creditCardNumber);
        await this.addressInput.fill(address);
        await this.expMonthSelector.selectOption(expMonth);
        await this.cityInput.fill(cityInput);
        await this.expYearInput.fill(expYear);
        await this.cvvInput.fill(cvv);
        await this.stateInput.fill(state);
        await this.zipInput.fill(zip);
    }

    async navigateToCheckOut() {
        await this.page.goto('/checkout');
    }

    async checkShippingCheckbox() {
        /* the option setChecked can recive true or false values, if the status is already on the desired state, the method returns immediately,
        So is not neccesary any other logic condition.*/
        await this.shippingCheckbox.setChecked(true);
    }

    async uncheckShippingCheckbox() {
        /* the option setChecked can recive true or false values, if the status is already on the desired state, the method returns immediately,
        So is not neccesary any other logic condition.*/
        await this.shippingCheckbox.setChecked(false);
    }
    async continueToCheckOut() {
        await this.checkoutButton.click();
    }

    async verifyShippingCheckboxError() {
        // Waiting for the dialog to appear and handling it
        const [dialog] = await Promise.all([
            this.page.waitForEvent('dialog'), // Waits for the dialog to appear
        ]);
        // Verifying the dialog message
        expect(dialog.message()).toBe('Shipping address same as billing checkbox must be selected.');
        // Accepting (closing) the dialog
        await dialog.accept();
        // Verifying that the dialog is closed
        expect(await this.page.$('dialog')).toBeNull(); // Verifies that no dialog is present
    }

    async sumTotalCartItems() {
        await this.checkoutButton.click();
    }

    async verifyCartTotal() {
        /* To verify Cart total is bit tricky, as is it not a list, is a container with the product and every product is a new paragraph,
        So, to make it robust, I capture all the elements with the use of CSS selector */

        // Selector for all product price elements (excluding "Total"), where Price is the class on every element inside the container
        const productPrices = await this.page.$$eval('.container p:not(:last-of-type) .price', elements => {
            //mapping all the elements inside of an array, taking out the symbol $ and empty spaces, if there is an error on the content, it will add a 0
            return elements.map(el => parseFloat(el.textContent?.replace('$', '').trim() || '0'));
        });
        console.log(productPrices)

        /*Calculating the sum of all product prices, to do this, reduce will take all the numbers product proces*/
        const calculatedTotal = productPrices.reduce((sum, price) => sum + price, 0);
        console.log(calculatedTotal)
        // Extracting the displayed total value
        const displayedTotal = await this.page.textContent('.container p:last-of-type .price b');
        const displayedTotalValue = parseFloat(displayedTotal?.replace('$', '').trim() || '0');
        console.log(displayedTotalValue)
        // Comparing the calculated total with the displayed total
        expect(calculatedTotal).toBeCloseTo(displayedTotalValue, 2); // 2 decimals for precision
    }
}
