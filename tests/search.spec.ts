import { test } from '../fixtures/pageFixtures';
import { loginTestData } from '../utils/loginTestData';

test.beforeEach(async ({ loginPage, homePage, searchPage }) => {
    /* I added a before each test here to automatically login and navigates to the desired page
    The app does not require the login, but in a real world working app this is an issue, and for the purpose of the test
    I reproduce it the a more realistic way. The fixture already navigates to login page, so it is not neccesary to add it here*/
    await loginPage.login(loginTestData.validUser.username, loginTestData.validUser.password);
    await homePage.verifyWelcomePage();
    await searchPage.navigateToSearch();
});
test.describe( 'Search Test Cases', {tag: '@search'},() => {
    /*I added some examples of test tag and suit tag, to specify the module or the type of test it can be grouped into*/

    /*The only complexity is that the first result will be always Searching, So I used expect.poll to check for the result to appear*/
    test('Search For An Item',{tag: ['@smoke']}, async ({ searchPage }) => {
       await searchPage.searchForItem('Classic Muzzarella');
       await searchPage.verifySuccessSearch('Classic Muzzarella');

    });

       test('Search Empty Box', async ({ searchPage }) => {
        await searchPage.searchForItem('');
        await searchPage.verifyEmptySearch();
        
    });

})