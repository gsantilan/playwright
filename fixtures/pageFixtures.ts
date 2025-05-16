// fixtures/pageFixture.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { CheckOutPage } from '../pages/checkOutPage';
import { OrderPage } from '../pages/orderPage';
import { GridPage } from '../pages/gridPage';
import { SearchPage } from '../pages/searchPage';

// Playwright reccomends to use fixtures to encapsulate and re use code to simplify tests.

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  checkoutPage: CheckOutPage
  orderPage: OrderPage
  gridPage: GridPage
  searchPage: SearchPage
};

// Defining the custom fixture
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(); // Automatically navigates to the login page
    await use(loginPage); // Makes loginPage available in the tests
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage); // Makes homePage available in the tests
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckOutPage(page);
    await use(checkoutPage); // Makes check out page available in the tests
  },
  orderPage: async ({ page }, use) => {
    const orderPage = new OrderPage(page);
    await use(orderPage); // Makes order available in the tests
  },

   gridPage: async ({ page }, use) => {
    const girdPage = new GridPage(page);
    await use(girdPage); // Makes grid page available in the tests
  },
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage); // Makes grid page available in the tests
  }
});

export { expect } from '@playwright/test';
