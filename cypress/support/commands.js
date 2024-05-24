/// <reference types="cypress" />

require("cypress-downloadfile/lib/downloadFileCommand")

/**
 *
 *  --- UI METHODS ---
 *
 */

/**
 * Fills the login form with provided user credentials.
 * @param {Object} userCredentials - Object containing email and password.
 */

Cypress.Commands.add("fillLoginForm", (userCredentials) => {
    const { email, password } = userCredentials

    cy.get(".login-form > h2")
        .should("be.visible")
        .and("contain.text", "Login to your account")

    cy.get("[data-qa=login-email]").type(email)
    cy.get("[data-qa=login-password]").type(password)
    cy.get("[data-qa=login-button]").click()
})

/**
 * Fills the signup form with provided user credentials.
 * @param {Object} userCredentials - Object containing name and email.
 */

Cypress.Commands.add("fillSignupForm", (userCredentials) => {
    const { name, email } = userCredentials

    cy.get(".signup-form > h2")
        .should("be.visible")
        .and("contain.text", "New User Signup!")

    cy.get("[data-qa=signup-name]").type(name)
    cy.get("[data-qa=signup-email]").type(email)
    cy.get("[data-qa=signup-button]").click()
})

/**
 * Fills the account information form with provided data.
 * @param {Object} userCredentials - Object containing account information.
 */

Cypress.Commands.add("fillAccountInformationForm", (userCredentials) => {
    cy.get(":nth-child(1) > b").should("be.visible")

    cy.get("#id_gender1").click()
    cy.get("[data-qa=password]").type(userCredentials.password)

    cy.get("[data-qa=days]").select(userCredentials.days)
    cy.get("[data-qa=months]").select(userCredentials.months)
    cy.get("[data-qa=years]").select(userCredentials.years)

    cy.get("#newsletter").click()
    cy.get("#optin").click()

    cy.get("[data-qa=first_name]").type(userCredentials.firstName)
    cy.get("[data-qa=last_name]").type(userCredentials.lastName)

    cy.get("[data-qa=company]").type(userCredentials.company)
    cy.get("[data-qa=address]").type(userCredentials.address)

    cy.get("[data-qa=country]").select(userCredentials.country)
    cy.get("[data-qa=state]").type(userCredentials.state)
    cy.get("[data-qa=city]").type(userCredentials.city)
    cy.get("[data-qa=zipcode]").type(userCredentials.zipcode)

    cy.get("[data-qa=mobile_number]").type(userCredentials.mobile)

    cy.get("[data-qa=create-account]").click()
})

/**
 * Signs up a user with provided user credentials.
 * @param {Object} userCredentials - Object containing user credentials.
 */

Cypress.Commands.add("signupUser", (userCredentials) => {
    cy.contains("Signup / Login").click()
    cy.fillSignupForm(userCredentials)
    cy.fillAccountInformationForm(userCredentials)

    cy.get("[data-qa=account-created]")
        .should("be.visible")
        .and("contain.text", "Account Created!")

    cy.get("[data-qa=continue-button]").click()
})

/**
 * Fills the payment details form with provided data.
 * @param {Object} paymentData - Object containing payment details.
 */

Cypress.Commands.add("fillPaymentDetails", (paymentData) => {
    const { nameOnCard, ccNumber, CVC, expirationMonth, expirationYear } =
        paymentData

    cy.get('[data-qa="name-on-card"]').type(nameOnCard)
    cy.get('[data-qa="card-number"]').type(ccNumber)
    cy.get('[data-qa="cvc"]').type(CVC)
    cy.get('[data-qa="expiry-month"]').type(expirationMonth)
    cy.get('[data-qa="expiry-year"]').type(expirationYear)

    cy.get('[data-qa="pay-button"]').click()
})

/**
 * Adds a product to the cart.
 * @param {number} productNumber - Index of the product to add.
 */

Cypress.Commands.add("addProductToCart", (productNumber) => {
    // Hover over the element with class "product-image-wrapper"
    cy.get(".product-image-wrapper")
        .eq(productNumber - 1)
        .trigger("mouseover")
        .within(() => {
            cy.get(".add-to-cart").first().click()
        })
})

/**
 * Retrieves an element and asserts its text content.
 * @param {string} element - Selector of the element to retrieve.
 * @param {string} text - Expected text content of the element.
 */

Cypress.Commands.add("getElementAndAssertText", (element, text) => {
    cy.get(element).should("be.visible").and("contain.text", text)
})

Cypress.Commands.add("searchProduct", (productQuery) => {
    cy.get("#search_product").type(productQuery)

    cy.get("#submit_search").click()
})

/**
 *
 *  --- API METHODS ---
 *
 */

/**
 * Retrieves user details by making an API request.
 * @param {string} email - Email of the user.
 * @returns {Object} - Object containing response from the API.
 */

Cypress.Commands.add("getUserWithAPI", (email) => {
    return cy.request({
        method: "GET",
        url: `https://automationexercise.com/api/getUserDetailByEmail?email=${email}`,
        failOnStatusCode: false,
    })
})

/**
 * Logins a user by making an API request.
 * @param {Object} userCredentials - Object containing user credentials.
 * @returns {Object} - Object containing response from the API.
 */

Cypress.Commands.add("loginUserWithAPI", (userCredentials) => {
    const { email, password } = userCredentials
    return cy.request({
        method: "POST",
        url: `https://automationexercise.com/api/verifyLogin`,
        failOnStatusCode: false,
        form: true,
        body: { email, password },
    })
})

/**
 * Registers a user by making an API request.
 * @param {Object} userCredentials - Object containing user credentials.
 * @returns {Object} - Object containing response from the API.
 */

Cypress.Commands.add("registerUserWithAPI", (userCredentials) => {
    return cy.request({
        method: "POST",
        url: "https://automationexercise.com/api/createAccount",
        failOnStatusCode: false,
        form: true,
        body: {
            name: userCredentials.name,
            email: userCredentials.email,
            password: userCredentials.password,

            birth_date: userCredentials.days,
            birth_month: userCredentials.months,
            birth_year: userCredentials.years,

            firstname: userCredentials.firstName,
            lastname: userCredentials.lastName,

            company: userCredentials.company,
            address1: userCredentials.address,

            country: userCredentials.country,
            state: userCredentials.state,
            city: userCredentials.city,
            zipcode: userCredentials.zipcode,

            mobile_number: userCredentials.mobile,
        },
    })
})

/**
 * Deletes a user account by making an API request.
 * @param {Object} userCredentials - Object containing user credentials.
 * @returns {Object} - Object containing response from the API.
 */

Cypress.Commands.add("deleteUserWithAPI", (userCredentials) => {
    const { email, password } = userCredentials
    return cy.request({
        method: "DELETE",
        url: `https://automationexercise.com/api/deleteAccount`,
        failOnStatusCode: false,
        form: true,
        body: {
            email,
            password,
        },
    })
})
