import { test } from '../fixtures/pageFixtures';
import { loginTestData } from '../utils/loginTestData';
test.describe('Login Test Cases',{tag: '@login'}, () => {

    /*I added some examples of test tag and suit tag, to specify the module or the type of test it can be grouped into*/

    test('Login Success',{tag: ['@smoke']}, async ({ loginPage, homePage }) => {

        /* the data for login is grabbed from loginTestData.ts, in this way, you only maintain one file with all the login data,
        making it easier to reuse on other tests o test other combinations. */

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