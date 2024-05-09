// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />

Cypress.Commands.add("fillLoginForm", (accountData) => {
    const { email, password } = accountData

    cy.get(".login-form > h2")
        .should("be.visible")
        .and("contain.text", "Login to your account")

    cy.get("[data-qa=login-email]").type(email)
    cy.get("[data-qa=login-password]").type(password)
    cy.get("[data-qa=login-button]").click()
})

Cypress.Commands.add("fillSignupForm", (accountData) => {
    const { name, email } = accountData

    cy.get(".signup-form > h2")
        .should("be.visible")
        .and("contain.text", "New User Signup!")

    cy.get("[data-qa=signup-name]").type(name)
    cy.get("[data-qa=signup-email]").type(email)
    cy.get("[data-qa=signup-button]").click()
})

Cypress.Commands.add("fillAccountInformationForm", (accountData) => {
    cy.get(":nth-child(1) > b").should("be.visible")

    cy.get("#id_gender1").click()
    cy.get("[data-qa=password]").type(accountData.password)

    cy.get("[data-qa=days]").select(accountData.days)
    cy.get("[data-qa=months]").select(accountData.months)
    cy.get("[data-qa=years]").select(accountData.years)

    cy.get("#newsletter").click()
    cy.get("#optin").click()

    cy.get("[data-qa=first_name]").type(accountData.firstName)
    cy.get("[data-qa=last_name]").type(accountData.lastName)

    cy.get("[data-qa=company]").type(accountData.company)
    cy.get("[data-qa=address]").type(accountData.address)

    cy.get("[data-qa=country]").select(accountData.country)
    cy.get("[data-qa=state]").type(accountData.state)
    cy.get("[data-qa=city]").type(accountData.city)
    cy.get("[data-qa=zipcode]").type(accountData.zipcode)

    cy.get("[data-qa=mobile_number]").type(accountData.mobile)

    cy.get("[data-qa=create-account]").click()
})

Cypress.Commands.add("signupUser", (accountData) => {
    cy.contains("Signup / Login").click()
    cy.fillSignupForm(accountData)
    cy.fillAccountInformationForm(accountData)

    cy.get("[data-qa=account-created]")
        .should("be.visible")
        .and("contain.text", "Account Created!")

    cy.get("[data-qa=continue-button]").click()
})

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

Cypress.Commands.add("addProducToCart", (productNumber) => {
    // Hover over the element with class "product-image-wrapper"
    cy.get(".product-image-wrapper")
        .eq(productNumber - 1)
        .trigger("mouseover")
        .within(() => {
            cy.get(".add-to-cart").first().click()
        })

    cy.contains("Continue Shopping").click()
})

Cypress.Commands.add("getUserByAPI", (email) => {
    return cy.request({
        method: "GET",
        url: `https://automationexercise.com/api/getUserDetailByEmail?email=${email}`,
        failOnStatusCode: false,
    })
})

Cypress.Commands.add("registerUserByAPI", (accountData) => {
    return cy.request({
        method: "POST",
        url: "https://automationexercise.com/api/createAccount",
        failOnStatusCode: false,
        form: true,
        body: {
            name: accountData.name,
            email: accountData.email,
            password: accountData.password,

            birth_date: accountData.days,
            birth_month: accountData.months,
            birth_year: accountData.years,

            firstname: accountData.firstName,
            lastname: accountData.lastName,

            company: accountData.company,
            address1: accountData.address,

            country: accountData.country,
            state: accountData.state,
            city: accountData.city,
            zipcode: accountData.zipcode,

            mobile_number: accountData.mobile,
        },
    })
})

Cypress.Commands.add("deleteUserByAPI", (accountData) => {
    const { email, password } = accountData
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
