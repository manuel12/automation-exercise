# Automation Exercise - Cypress Tests

The Automation Exercise [website](https://automationexercise.com/) is a full-fledged website built for atuomation practice purposes.

This project aims to complete all the tests cases outlined in https://automationexercise.com/test_cases

It implements all such tests cases using the [Cypress](https://www.cypress.io/) testing framework. The test cases are outlined below.

# Test Case List

✅ = Automated Test Case implemented

## UI Test Cases

-   ✅ Test Case 1: Register User
-   ✅ Test Case 2: Login User with correct email and password
-   ✅ Test Case 3: Login User with incorrect email and password
-   ✅ Test Case 4: Logout User
-   ✅ Test Case 5: Register User with existing email
-   ✅ Test Case 6: Contact Us Form
-   ✅ Test Case 7: Verify - Test Cases Page
-   ✅ Test Case 8: Verify All Products and product detail page
-   ✅ Test Case 9: Search Product
-   ✅ Test Case 10: Verify Subscription in home page
-   ✅ Test Case 11: Verify Subscription in Cart page
-   ✅ Test Case 12: Add Products in Cart
-   ✅ Test Case 13: Verify Product quantity in Cart
-   ✅ Test Case 14: Place Order: Register while Checkout
-   ✅ Test Case 15: Place Order: Register before Checkout
-   ✅ Test Case 16: Place Order: Login before Checkout
-   ✅ Test Case 17: Remove Products From Cart
-   ✅ Test Case 18: View Category Products
-   ✅ Test Case 19: View & Cart Brand Products
-   ✅ Test Case 20: Search Products and Verify Cart After Login
-   ✅ Test Case 21: Add review on product
-   ✅ Test Case 22: Add to cart from Recommended items
-   ✅ Test Case 23: Verify address details in checkout page
-   ✅ Test Case 24: Download Invoice after purchase order
-   ✅ Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
-   ✅ Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality

[(See test cases)](https://docs.google.com/spreadsheets/d/1ODyuiiMTqNZFfyQl-OzS5PkaVBxl3plYPinB0eI0_Ss/edit#gid=0) [(See test code)](cypress/e2e/ui-tests.cy.js)

## API Test Cases

-   ✅ API 1: Get All Products List
-   ✅ API 2: POST To All Products List
-   ✅ API 3: Get All Brands List
-   ✅ API 4: PUT To All Brands List
-   ✅ API 5: POST To Search Product
-   ✅ API 6: POST To Search Product without search_product parameter
-   ✅ API 7: POST To Verify Login with valid details
-   ✅ API 8: POST To Verify Login without email parameter
-   ✅ API 9: DELETE To Verify Login
-   ✅ API 10: POST To Verify Login with invalid details
-   ✅ API 11: POST To Create/Register User Account
-   ✅ API 12: DELETE METHOD To Delete User Account
-   ✅ API 13: PUT METHOD To Update User Account
-   ✅ API 14: GET user account detail by email

[(See test cases)](https://docs.google.com/spreadsheets/d/1ODyuiiMTqNZFfyQl-OzS5PkaVBxl3plYPinB0eI0_Ss/edit#gid=999865229) [(See test code)](cypress/e2e/api-tests.cy.js)

## Installation - Cypress

For installing cypress cd to the project's root folder and run:

    npm install

## Tests

| Type | Location                                                 |
| ---- | -------------------------------------------------------- |
| api  | [front-end/cypress/e2e/api/](front-end/cypress/e2e/api/) |
| ui   | [front-end/cypress/e2e/ui/](front-end/cypress/e2e/ui/)   |

## Running tests

For opening cypress client cd to the project's root folder and run:

    npx cypress open

Or if running from the CLI use one of the scripts found in package.json:

```
'test:chrome': 'cypress run --browser chrome',
'test:firefox': 'cypress run --browser firefox',
'test:edge': 'cypress run --browser edge',
'test:electron': 'cypress run --browser electron',
'test:all-browsers': 'npm run test:chrome && npm run test:firefox && npm run test:edge && npm run test:electron',
'test:api': 'cypress run --spec 'cypress/e2e/api/'',
'test:ui': 'cypress run --spec 'cypress/e2e/ui/'',
```

## Features

 - Test pyramid followed: 70/20/10
 - Boundary validation tests
 - Equivalence partitioning tests
 - React component tests
 - API tests
 - UI functional tests(mocked & stubbed)
 - End- to- end tests
 - Accessibility tests
 - Responsiveness test
 - Visual tests

## Uses

-   Cypress
-   Prettier
-   ???
