
# Project Summary

This project contains the initial project template for an automated testing framework using Playwright in TypeScript. It aims to provide a simple way to perform automated tests, ensuring system functionality and compliance with requirements.

## Requirements

To use this framework, the following must be installed:

* [Node.js](https://nodejs.org/)

  * Make sure Node.js is installed and properly configured.

* [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
  
* [Playwright Official Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
  * Recommended for both execution and debugging

* [Docker](https://www.docker.com/) (for Dockerized execution).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gsantilan/playwright.git
   cd <repository_folder>
   npm install
   ```
2. Install Playwright Browsers:

   ```bash
   npx playwright install 
   ```

## Project Structure

```
project-root/
├── dockerfile/
│   └── dockerfile
├── tests/
│   ├── login.spec.ts
│   ├── checkout.spec.ts
│   └── ...
├── pages/
│   ├── LoginPage.ts
│   ├── CheckoutPage.ts
│   └── ...
├── fixtures/
│   └── pageFixtures.ts
├── utils/
│   └── testData.ts
├── html-report/
│   └── index.html
├── playwright.config.ts
├── package.json
├── docker-compose.yml
└── tsconfig.json
```

## Running Tests

### Running Locally

* **Using VSCode:**

  * Open the project in VSCode.
  * Open any test file and click on the "Run Test" or "Debug Test" options. It can be a 'Play' Symbol on the left side of the scrypt page. If you left click on it, it will run the test or test if clicked with right button, it will open the options to debug.

* **Using Command Line:**
  * Basic example on how to execute tests, this will execute all the tests in the project with all the available configurations (mobile and web ones)
  ```bash
  npx playwright test
  ```

  * Run specific test file:
    * This command will run the specified test script.
    ```bash
    npx playwright test tests/login.spec.ts
    ```

  * Run with tags:
    * we can specify test tags in our test files so we can group them and execute as demmanded, sometimes we do not need to execute all the suite, but only the test consideres as smoke or only the login test cases

    ```bash
    npx playwright test --grep "@smoke"
    ```
  * Run with specifyc project:
    * we can specify the browser or device on which we want to run our tests if neccesary. You can check the available ones on the  ```playwright.config.ts``` file or on * [Playwright Projects](https://playwright.dev/docs/test-projects#configure-projects-for-multiple-browsers) if you want to add more

    ```bash
    npx playwright test --project "@firefox"
    ```
These commands can be combined, for example

```bash
    npx playwright test --project "@firefox" --grep "@smoke"
```
Will execute all the smoke test on firefox web browser.

### Running with Docker

* This project has a docker compse file and a docker image, with both, is possible to execute the project and the demo app on an isolated and reproducible environment. 

* Prerequisites

Docker and Docker Compose installed on your system.

* Steps to follow
The following steps must be done to execute on the docker container:

1. Build the Docker container:

   ```bash
   cd <repository_folder>
   docker-compose build
   ```
2. Run the Docker container:

Here the only difference with running local is that we need to use ```docker-compose run ``` to run the tests, it follows the same logic as running it in local, so you can add the options in the same way, here are some examples.

* To run tests with a specific tag:
```bash
docker-compose run playwright-tests --grep "@smoke"  
```
* To run tests on a specific browser:

```bash
docker-compose run playwright-tests playwright --project=chromium
```
As in local, here also you can combine the command options

```bash
docker-compose run playwright-tests playwright --project=chromium --grep "@smoke" 
```

## Reports

* Test reports are generated in the `/playwright-report` directory for both, local and docker execution. you can open it with your default browser or with the following command:

  ```bash
  npx playwright show-report
  ```



