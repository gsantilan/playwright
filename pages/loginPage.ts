// pages/loginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly emptyFieldError: Locator;
    private readonly wrongCredentialsError: Locator;


    constructor(page: Page) {
        this.page = page;
        /* Even that is possible to use id. to locate elements in the login page, Playwright does not recommend this approach.
        Is prefereable to use get by role as it is the closest way to how users and assistive technology perceive the page.
        https://playwright.dev/docs/locators#locate-by-role */

        this.usernameInput = page.getByRole('textbox', { name: 'USERNAME' });
        this.passwordInput = page.getByRole('textbox', { name: 'PASSWORD' });
        this.loginButton = page.getByRole('button', { name: 'Sign In' });
        this.emptyFieldError = page.getByRole('heading', { name: 'Fields can not be empty' });
        this.wrongCredentialsError = page.getByRole('heading', { name: 'Wrong credentials' });
    }

    /* after this points are the reusable functions for the login page*/
    
    async navigate() {
        await this.page.goto('/login');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyEmptyfieldsError() {
        await expect(this.emptyFieldError).toBeVisible();
    }

    async verifyWrongCredentialErrors() {
        await expect(this.wrongCredentialsError).toBeVisible();
    }

}
