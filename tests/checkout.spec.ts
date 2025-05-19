import { test } from '../fixtures/pageFixtures';
import { checkOutTestData } from '../utils/checkOutFormData';
import { loginTestData } from '../utils/loginTestData';

test.beforeEach(async ({ loginPage,homePage,checkoutPage }) => {
    /* I added a before each test here to automatically login and navigates to the desired page
    The app does not require the login, but in a real world working app this is an issue, and for the purpose of the test
    I reproduce it the a more realistic way. The fixture already navigates to login page, so it is not neccesary to add it here*/
  await loginPage.login(loginTestData.validUser.username, loginTestData.validUser.password);
  await homePage.verifyWelcomePage();
  await checkoutPage.navigateToCheckOut();
});

test.describe('Check Out Test Cases',{tag: '@checkOut'}, () => {
    /*I added some examples of test tag and suit tag, to specify the module or the type of test it can be grouped into*/
    test('Check Out Form Order Success ',{tag: ['@smoke']}, async ({checkoutPage,orderPage }) => {
        
        /* The test data is imported from checkOutFormData.ts, in this way, is easier to maintain and reuse */
        await checkoutPage.fillCheckOutForm(checkOutTestData.validForm.fullName,
            checkOutTestData.validForm.nameOnCard,
            checkOutTestData.validForm.email,
            checkOutTestData.validForm.creditCardNumber, 
            checkOutTestData.validForm.address,
            checkOutTestData.validForm.expMonth,
            checkOutTestData.validForm.city,
            checkOutTestData.validForm.expYear,
            checkOutTestData.validForm.cvv,
            checkOutTestData.validForm.state,
            checkOutTestData.validForm.zip
        )
        await checkoutPage.checkShippingCheckbox();
        await checkoutPage.continueToCheckOut();
        await orderPage.verifyOrderConfirmation();
        
    });

    test('Check Out Form Alert', async ({checkoutPage }) => {
        
        await checkoutPage.fillCheckOutForm(checkOutTestData.validForm.fullName,
            checkOutTestData.validForm.nameOnCard,
            checkOutTestData.validForm.email,
            checkOutTestData.validForm.creditCardNumber, 
            checkOutTestData.validForm.address,
            checkOutTestData.validForm.expMonth,
            checkOutTestData.validForm.city,
            checkOutTestData.validForm.expYear,
            checkOutTestData.validForm.cvv,
            checkOutTestData.validForm.state,
            checkOutTestData.validForm.zip
        );
        await checkoutPage.uncheckShippingCheckbox();
        await checkoutPage.continueToCheckOut();
        await checkoutPage.verifyShippingCheckboxError();

    });

        test('Cart Total Amount Is Correct', async ({checkoutPage }) => {
        
        await checkoutPage.verifyCartTotal();
    

    });
})