/// <reference types="cypress" />

const registerData = require("../fixtures/register-data.json")
const accountDataValuesToCheck = [
    registerData.firstName,
    registerData.lastName,
    registerData.company,
    registerData.address,
    registerData.country,
    registerData.state,
    registerData.city,
    registerData.zipcode,
    registerData.mobile,
]

const paymentData = {
    nameOnCard: "Manuel Pineda",
    ccNumber: "5555 5555 5555 4444",
    CVC: "123",
    expirationMonth: "12",
    expirationYear: "25",
}

describe("Automation Exercises", () => {
    context("1.", () => {
        beforeEach(() => {
            cy.deleteUserByAPI(registerData)

            cy.visit("https://automationexercise.com/")
            cy.get("body").should("be.visible")
        })

        it("Test Case 1: Register User", () => {
            cy.signupUser(registerData)

            cy.contains("Logged in as Manuel")

            cy.contains("Delete Account").click()

            cy.get('[data-qa="account-deleted"]')
                .should("be.visible")
                .and("contain.text", "Account Deleted!")

            cy.get('[data-qa="continue-button"]').click()
        })
    })

    context("2.", () => {
        beforeEach(() => {
            cy.deleteUserByAPI(registerData)
            cy.registerUserByAPI(registerData)

            cy.visit("https://automationexercise.com/")
            cy.get("body").should("be.visible")
        })

        it("Test Case 2: Login User with correct email and password", () => {
            cy.contains("Signup / Login").click()

            cy.fillLoginForm(registerData)

            cy.contains("Logged in as Manuel")

            cy.contains("Delete Account").click()

            cy.get('[data-qa="account-deleted"]')
                .should("be.visible")
                .and("contain.text", "Account Deleted!")
        })

        it("Test Case 3: Login User with incorrect email and password", () => {
            cy.contains("Signup / Login").click()

            cy.fillLoginForm(registerData)

            cy.contains("Your email or password is incorrect!")
        })

        it("Test Case 4: Logout User", () => {
            cy.contains("Signup / Login").click()

            cy.fillLoginForm(registerData)

            cy.contains("Logged in as Manuel")

            cy.contains("Logout").click()

            cy.url().should("eq", "https://automationexercise.com/login")
        })

        it("Test Case 5: Register User with existing email", () => {
            cy.contains("Signup / Login").click()
            cy.fillSignupForm(registerData)

            cy.contains("Email Address already exist!")
        })

        it("Test Case 6: Contact Us Form", () => {
            cy.contains("Contact us").click()

            cy.get("div.contact-form > .title")
                .should("be.visible")
                .and("contain.text", "Get In Touch")

            cy.get('[data-qa="name"]').type(registerData.name)

            cy.get('[data-qa="email"]').type(registerData.email)

            cy.get('[data-qa="subject"]').type("I would like to be in contact!")

            cy.get('[data-qa="message"]').type(
                "Would be great we could correspond!",
            )

            cy.get(":nth-child(6) > .form-control").selectFile("package.json")

            cy.get('[data-qa="submit-button"]').click()

            cy.get(".status")
                .should("be.visible")
                .and(
                    "contain.text",
                    "Success! Your details have been submitted successfully.",
                )

            cy.get("#form-section > .btn").click()

            cy.get("body").should("be.visible")

            cy.url().should("eq", "https://automationexercise.com/")
        })

        it("Test Case 7: Verify Test Cases Page", () => {
            cy.contains("Test Cases").click()

            cy.get("body").should("be.visible")

            cy.url().should("eq", "https://automationexercise.com/test_cases")

            cy.get(".title")
                .should("be.visible")
                .and("contain.text", "Test Cases")
        })

        it("Test Case 8: Verify All Products and product detail page", () => {
            cy.contains("Products").click()

            cy.get("body").should("be.visible")

            cy.url().should("eq", "https://automationexercise.com/products")

            cy.get(".title")
                .should("be.visible")
                .and("contain.text", "All Products")

            cy.get(".product-image-wrapper")
                .first()
                .within(() => {
                    cy.contains("View Product").click()
                })

            cy.get(".product-information > h2").should("be.visible")

            cy.get(".product-information > :nth-child(3)").should("be.visible")

            cy.get(":nth-child(5) > span").should("be.visible")

            cy.get(".product-information > :nth-child(6)").should("be.visible")

            cy.get(".product-information > :nth-child(7)").should("be.visible")

            cy.get(".product-information > :nth-child(8)").should("be.visible")
        })

        it("Test Case 9: Search Product", () => {
            cy.contains("Products").click()

            cy.get("body").should("be.visible")

            cy.url().should("eq", "https://automationexercise.com/products")

            cy.get(".title")
                .should("be.visible")
                .and("contain.text", "All Products")

            cy.get("#search_product").type("Premium Polo T-Shirts")
            cy.get("#submit_search").click()

            cy.get(".title")
                .should("be.visible")
                .and("contain.text", "Searched Products")

            cy.get(".product-image-wrapper").its("length").should("eq", 1)
        })

        it("Test Case 10: Verify Subscription in home page", () => {
            cy.get(".footer").scrollIntoView()
            cy.get(".footer").within(() => {
                cy.contains("Subscription")

                cy.get("#email").type(registerData.email)
                cy.get("#subscribe").click()

                cy.get("#success-subscribe")
                    .should("be.visible")
                    .and(
                        "contain.text",
                        "You have been successfully subscribed!",
                    )
            })
        })

        it("Test Case 11: Verify Subscription in Cart page", () => {
            cy.contains("Cart").click()

            cy.get(".footer").scrollIntoView()

            cy.get(".footer").within(() => {
                cy.contains("Subscription")

                cy.get("#susbscribe_email").type(registerData.email)
                cy.get("#subscribe").click()

                cy.get("#success-subscribe")
                    .should("be.visible")
                    .and(
                        "contain.text",
                        "You have been successfully subscribed!",
                    )
            })
        })

        it("Test Case 12: Add Products in Cart", () => {
            cy.contains("Products").click()

            cy.addProducToCart(2)

            cy.contains("View Cart").click()

            cy.get("#product-1")
                .should("be.visible")
                .and("contain.text", "Blue Top")

            cy.get("#product-1")
                .should("be.visible")
                .and("contain.text", "Women > Tops")

            cy.get("#product-2")
                .should("be.visible")
                .and("contain.text", "Men Tshirt")
            cy.get("#product-2")
                .should("be.visible")
                .and("contain.text", "Men > Tshirts")
        })

        it("Test Case 13: Verify Product quantity in Cart", () => {
            cy.contains("Products").click()

            cy.contains("View Product").click()

            cy.get("body").should("be.visible")

            cy.url().should(
                "contain",
                "https://automationexercise.com/product_details",
            )

            cy.get(".product-details").should("be.visible")
            cy.get("#quantity").clear().type("4")

            cy.contains("Add to cart").click()

            cy.contains("View Cart").click()

            cy.get("#product-1")
                .should("be.visible")
                .and("contain.text", "Blue Top")

            cy.get(".cart_quantity > .disabled")
                .should("be.visible")
                .and("have.text", "4")
        })
    })

    context("3.", () => {
        beforeEach(() => {
            cy.deleteUserByAPI(registerData)

            cy.visit("https://automationexercise.com/")
            cy.get("body").should("be.visible")
        })

        it("Test Case 14: Place Order: Register while Checkout", () => {
            cy.contains("Products").click()

            cy.addProducToCart(1)

            cy.contains("Cart").click()

            cy.get("body").should("be.visible")

            cy.url().should(
                "contain",
                "https://automationexercise.com/view_cart",
            )

            cy.contains("Proceed To Checkout").click()

            cy.get(".modal-content a").click()
            cy.fillSignupForm(registerData)
            cy.fillAccountInformationForm(registerData)

            cy.get("[data-qa=account-created]")
                .should("be.visible")
                .and("contain.text", "Account Created!")

            cy.get("[data-qa=continue-button]").click()

            cy.contains("Logged in as Manuel")

            cy.contains("Cart").click()

            cy.contains("Proceed To Checkout").click()

            accountDataValuesToCheck.forEach((value) => {
                cy.get("#address_delivery").should("contain.text", value)

                cy.get("#address_invoice").should("contain.text", value)
            })
        })

        it("Test Case 15: Place Order: Register before Checkout", () => {
            cy.signupUser(registerData)

            cy.contains("Logged in as Manuel")

            cy.addProducToCart(1)

            cy.contains("Cart").click()

            cy.get("body").should("be.visible")

            cy.url().should(
                "contain",
                "https://automationexercise.com/view_cart",
            )

            cy.contains("Proceed To Checkout").click()

            accountDataValuesToCheck.forEach((value) => {
                cy.get("#address_delivery").should("contain.text", value)

                cy.get("#address_invoice").should("contain.text", value)
            })

            cy.get(".form-control").type("I want to buy this items!")

            cy.contains("Place Order").click()

            cy.fillPaymentDetails(paymentData)

            cy.get(".title").should("contain.text", "Order Placed!")

            cy.contains("Congratulations! Your order has been confirmed!")

            cy.contains("Delete Account").click()

            cy.get('[data-qa="account-deleted"]')
                .should("be.visible")
                .and("contain.text", "Account Deleted!")
        })
    })

    context("4.", () => {
        beforeEach(() => {
            cy.deleteUserByAPI(registerData)
            cy.registerUserByAPI(registerData)

            cy.visit("https://automationexercise.com/")
            cy.get("body").should("be.visible")
        })

        it("Test Case 16: Place Order: Login before Checkout", () => {
            cy.contains("Signup / Login").click()

            cy.fillLoginForm(registerData)

            cy.addProducToCart(1)

            cy.contains("Cart").click()

            cy.get("body").should("be.visible")

            cy.url().should(
                "contain",
                "https://automationexercise.com/view_cart",
            )

            cy.contains("Proceed To Checkout").click()

            accountDataValuesToCheck.forEach((value) => {
                cy.get("#address_delivery").should("contain.text", value)

                cy.get("#address_invoice").should("contain.text", value)
            })

            cy.get(".form-control").type("I want to buy this items!")

            cy.contains("Place Order").click()

            cy.fillPaymentDetails(paymentData)

            cy.contains("Congratulations! Your order has been confirmed!")

            cy.contains("Delete Account").click()

            cy.get('[data-qa="account-deleted"]')
                .should("be.visible")
                .and("contain.text", "Account Deleted!")
        })

        it("Test Case 17: Remove Products From Cart", () => {
            cy.addProducToCart(1)

            cy.contains("Cart").click()

            cy.get("body").should("be.visible")

            cy.url().should(
                "contain",
                "https://automationexercise.com/view_cart",
            )

            cy.get("#product-1")
                .should("be.visible")
                .and("contain.text", "Blue Top")
                .and("contain.text", "Women > Tops")
                .within(() => {
                    cy.get(".cart_quantity_delete").click()
                })

            cy.get("#empty_cart")
                .should("be.visible")
                .and(
                    "contain.text",
                    "Cart is empty! Click here to buy products.",
                )
        })

        it("Test Case 18: View Category Products", () => {
            cy.get(".left-sidebar")
                .should("be.visible")
                .and("contain.text", "Category")

            cy.contains("Women").click()

            cy.contains("Tops").click()

            cy.get(".title")
                .should("be.visible")
                .and("contain.text", "Women - Tops Products")

            cy.contains("Men").click()

            cy.contains("Jeans").click()

            cy.get(".title")
                .should("be.visible")
                .and("contain.text", "Men - Jeans Products")
        })

        it("Test Case 19: View & Cart Brand Products", () => {
            cy.contains("Products").click()

            cy.get(".brands_products").should("be.visible")

            cy.contains("H&M").click()

            cy.get(".title")
                .should("be.visible")
                .and("contain.text", "Brand - H&M Products")

            cy.contains("Polo").click()

            cy.get(".title")
                .should("be.visible")
                .and("contain.text", "Brand - Polo Products")
        })

        it("Test Case 20: Search Products and Verify Cart After Login", () => {
            cy.contains("Products").click()

            cy.get("body").should("be.visible")

            cy.url().should("eq", "https://automationexercise.com/products")

            cy.get(".title")
                .should("be.visible")
                .and("contain.text", "All Products")

            cy.get("#search_product").type("TShirt")
            cy.get("#submit_search").click()

            cy.get(".title")
                .should("be.visible")
                .and("contain.text", "Searched Products")

            cy.get(".product-image-wrapper").its("length").should("eq", 6)

            cy.get(".product-image-wrapper").each(($el) => {
                cy.get($el).within(() => {
                    cy.get(".add-to-cart").first().click()
                })
                cy.contains("Continue Shopping").click()
            })

            cy.contains("Cart").click()

            cy.get("#product-2").should("be.visible")
            cy.get("#product-28").should("be.visible")
            cy.get("#product-29").should("be.visible")

            cy.get("#product-30").should("be.visible")
            cy.get("#product-31").should("be.visible")
            cy.get("#product-43").should("be.visible")

            cy.contains("Signup / Login").click()

            cy.fillLoginForm(registerData)

            cy.contains("Logged in as Manuel")

            cy.contains("Cart").click()

            cy.get("#product-2").should("be.visible")
            cy.get("#product-28").should("be.visible")
            cy.get("#product-29").should("be.visible")

            cy.get("#product-30").should("be.visible")
            cy.get("#product-31").should("be.visible")
            cy.get("#product-43").should("be.visible")
        })

        it("Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality", () => {
            cy.get("#footer").scrollIntoView()

            cy.get(".single-widget > h2")
                .should("be.visible")
                .and("contain.text", "Subscription")

            cy.get("#scrollUp").click()

            cy.get("#slider-carousel")
                .should("be.visible")
                .and(
                    "contain.text",
                    "Full-Fledged practice website for Automation Engineers",
                )
        })

        it.only("Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", () => {
            // Scroll to the bottom of the page
            cy.window().then((win) => {
                win.scrollTo(0, win.document.body.scrollHeight)
            })

            cy.get(".single-widget > h2")
                .should("be.visible")
                .and("contain.text", "Subscription")

            // Scroll to the top of the page
            cy.window().then((win) => {
                win.scrollTo(0, 0)
            })

            cy.get("#slider-carousel")
                .should("be.visible")
                .and(
                    "contain.text",
                    "Full-Fledged practice website for Automation Engineers",
                )
        })
    })
})
