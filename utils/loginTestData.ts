// utils/loginTestData.ts

/* In this script there are the test data corresponding to the Login Page, is prefereable to always consolidate test data in scripts
separate by page to maitain order and make the mainetance more easier */
export const loginTestData = {
    validUser: {
        username: 'johndoe19',
        password: 'supersecret'
    },
    invalidUser: {
        username: 'invalid_username',
        password: 'invalid_password'
    }
};