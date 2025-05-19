import { test } from '../fixtures/pageFixtures';
import { loginTestData } from '../utils/loginTestData';

test.beforeEach(async ({ loginPage, homePage, gridPage }) => {
    /* I added a before each test here to automatically login and navigates to the desired page
    The app does not require the login, but in a real world working app this is an issue, and for the purpose of the test
    I reproduce it the a more realistic way. The fixture already navigates to login page, so it is not neccesary to add it here*/
    await loginPage.login(loginTestData.validUser.username, loginTestData.validUser.password);
    await homePage.verifyWelcomePage();
    await gridPage.navigateToGrid();
});
test.describe( 'Grid Test Cases',{tag: '@grid'}, () => {

    test('Grid Super Pepperoni Item Test',{tag: ['@smoke']}, async ({ gridPage }) => {

        /* I think in Two Ways to validate the same here, the first one will need the price to validate
        , Here is directly inserted as we are validating one item, but it can also be added in a new test data script. */

        // This first method will look for Supper Pepperoni Item, extract the price and compare it with the provided one
        await gridPage.verifySupperPepperonyPriceMethod1('$10')

        /* This second medthod is much simpler and easier for this case, as every card needs to follow the same pattern 
        , with only searching the whole card, you are already comparing Price and visibily, the extra assertion is just to double check*/
        await gridPage.verifySupperPepperonyPriceMethod2()

    });

        test('Grid All Item Test Does Follow The Correct Structure', async ({ gridPage }) => {

        /* I think in Two Ways to validate the same here, the first one will need the price to validate
        , Here is directly inserted as we are validating one item, but it can also be added in a new test data script. */

        await gridPage.verifyAllItemsStructure();
    });

})