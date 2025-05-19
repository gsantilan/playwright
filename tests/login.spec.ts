import { test } from '../fixtures/pageFixtures';
import { loginTestData } from '../utils/loginTestData';
test.describe('Login Test Cases',{tag: '@login'}, () => {

    test('Login Success',{tag: ['@smoke']}, async ({ loginPage, homePage }) => {
        await loginPage.login(loginTestData.validUser.username, loginTestData.validUser.password);
        await homePage.verifyWelcomePage();
    });
    test('Login Failure - Bad Username And Password', async ({ loginPage }) => {
        await loginPage.login(loginTestData.invalidUser.username, loginTestData.invalidUser.password);
        await loginPage.verifyWrongCredentialErrors();
    });
    test('Login Failure - Empty Both Textboxes', async ({ loginPage }) => {
        await loginPage.login('', '');
        await loginPage.verifyEmptyfieldsError();
    });
})