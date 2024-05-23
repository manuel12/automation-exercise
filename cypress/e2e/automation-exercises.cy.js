/// <reference types="cypress" />

const userCredentials = require("../fixtures/user-credentials.json")
const accountDataValuesToCheck = [
    userCredentials.firstName,
    userCredentials.lastName,
    userCredentials.company,
    userCredentials.address,
    userCredentials.country,
    userCredentials.state,
    userCredentials.city,
    userCredentials.zipcode,
    userCredentials.mobile,
]

describe("Automation Exercises", () => {
    context("1.", () => {
        beforeEach(() => {
            cy.deleteUserByAPI(userCredentials)

            cy.visit("https://automationexercise.com/")
            cy.get("body").should("be.visible")
        })

        it("Test Case 1: Register User", () => {
            cy.signupUser(userCredentials)

            cy.contains(`Logged in as ${userCredentials.name}`)

            cy.contains("Delete Account").click()

            cy.getElementAndAssertText(
                '[data-qa="account-deleted"]',
                "Account Deleted!",
            )

            cy.get('[data-qa="continue-button"]').click()
        })
    })

    context("2.", () => {
        beforeEach(() => {
            cy.deleteUserByAPI(userCredentials)
            cy.registerUserByAPI(userCredentials)

            cy.visit("https://automationexercise.com/")
            cy.get("body").should("be.visible")
        })

        it("Test Case 2: Login User with correct email and password", () => {
            cy.contains("Signup / Login").click()

            cy.fillLoginForm(userCredentials)

            cy.contains(`Logged in as ${userCredentials.name}`)

            cy.contains("Delete Account").click()

            cy.getElementAndAssertText(
                '[data-qa="account-deleted"]',
                "Account Deleted!",
            )
        })

        it("Test Case 3: Login User with incorrect email and password", () => {
            cy.contains("Signup / Login").click()

            cy.fillLoginForm({
                email: "invalidEmail@gmail.com",
                password: userCredentials.password,
            })

            cy.contains("Your email or password is incorrect!")
        })

        it("Test Case 4: Logout User", () => {
            cy.contains("Signup / Login").click()

            cy.fillLoginForm(userCredentials)

            cy.contains(`Logged in as ${userCredentials.name}`)

            cy.contains("Logout").click()

            cy.url().should("eq", "https://automationexercise.com/login")
        })

        it("Test Case 5: Register User with existing email", () => {
            cy.contains("Signup / Login").click()
            cy.fillSignupForm(userCredentials)

            cy.contains("Email Address already exist!")
        })

        it("Test Case 6: Contact Us Form", () => {
            cy.contains("Contact us").click()

            cy.getElementAndAssertText(
                "div.contact-form > .title",
                "Get In Touch",
            )

            cy.get('[data-qa="name"]').type(userCredentials.name)

            cy.get('[data-qa="email"]').type(userCredentials.email)

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

            cy.getElementAndAssertText(".title", "Test Cases")
        })

        it("Test Case 8: Verify All Products and product detail page", () => {
            cy.contains("Products").click()

            cy.get("body").should("be.visible")

            cy.url().should("eq", "https://automationexercise.com/products")

            cy.getElementAndAssertText(".title", "All Products")

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

            cy.getElementAndAssertText(".title", "All Products")

            cy.get("#search_product").type("Premium Polo T-Shirts")
            cy.get("#submit_search").click()

            cy.getElementAndAssertText(".title", "Searched Products")

            cy.get(".product-image-wrapper").its("length").should("eq", 1)
        })

        it("Test Case 10: Verify Subscription in home page", () => {
            cy.get("#footer").scrollIntoView()
            cy.get("#footer").within(() => {
                cy.contains("Subscription")

                cy.get("#susbscribe_email").type(userCredentials.email)
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

            cy.get("#footer").scrollIntoView()

            cy.get("#footer").within(() => {
                cy.contains("Subscription")

                cy.get("#susbscribe_email").type(userCredentials.email)
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

            cy.addProductToCart(1)

            cy.contains("Continue Shopping").click()

            cy.addProductToCart(2)

            cy.contains("View Cart").click()

            cy.getElementAndAssertText("#product-1", "Blue Top")

            cy.getElementAndAssertText("#product-1", "Women > Tops")

            cy.getElementAndAssertText("#product-2", "Men Tshirt")

            cy.getElementAndAssertText("#product-2", "Men > Tshirts")
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

            cy.getElementAndAssertText("#product-1", "Blue Top")

            cy.getElementAndAssertText(".cart_quantity > .disabled", "4")
        })
    })

    context("3.", () => {
        beforeEach(() => {
            cy.deleteUserByAPI(userCredentials)

            cy.visit("https://automationexercise.com/")
            cy.get("body").should("be.visible")
        })

        it("Test Case 14: Place Order: Register while Checkout", () => {
            cy.contains("Products").click()

            cy.addProductToCart(1)

            cy.contains("Continue Shopping").click()

            cy.contains("Cart").click()

            cy.get("body").should("be.visible")

            cy.url().should(
                "contain",
                "https://automationexercise.com/view_cart",
            )

            cy.contains("Proceed To Checkout").click()

            cy.get(".modal-content a").click()
            cy.fillSignupForm(userCredentials)
            cy.fillAccountInformationForm(userCredentials)

            cy.getElementAndAssertText(
                "[data-qa=account-created]",
                "Account Created!",
            )

            cy.get("[data-qa=continue-button]").click()

            cy.contains(`Logged in as ${userCredentials.name}`)

            cy.contains("Cart").click()

            cy.contains("Proceed To Checkout").click()

            accountDataValuesToCheck.forEach((value) => {
                cy.get("#address_delivery").should("contain.text", value)

                cy.get("#address_invoice").should("contain.text", value)
            })
        })

        it("Test Case 15: Place Order: Register before Checkout", () => {
            cy.signupUser(userCredentials)

            cy.contains(`Logged in as ${userCredentials.name}`)

            cy.addProductToCart(1)

            cy.contains("Continue Shopping").click()

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

            cy.fillPaymentDetails(userCredentials)

            cy.get(".title").should("contain.text", "Order Placed!")

            cy.contains("Congratulations! Your order has been confirmed!")

            cy.contains("Delete Account").click()

            cy.getElementAndAssertText(
                '[data-qa="account-deleted"]',
                "Account Deleted!",
            )
        })
    })

    context("4.", () => {
        beforeEach(() => {
            cy.deleteUserByAPI(userCredentials)
            cy.registerUserByAPI(userCredentials)

            cy.visit("https://automationexercise.com/")
            cy.get("body").should("be.visible")
        })

        it("Test Case 16: Place Order: Login before Checkout", () => {
            cy.contains("Signup / Login").click()

            cy.fillLoginForm(userCredentials)

            cy.addProductToCart(1)

            cy.contains("Continue Shopping").click()

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

            cy.fillPaymentDetails(userCredentials)

            cy.contains("Congratulations! Your order has been confirmed!")

            cy.contains("Delete Account").click()

            cy.getElementAndAssertText(
                '[data-qa="account-deleted"]',
                "Account Deleted!",
            )
        })

        it("Test Case 17: Remove Products From Cart", () => {
            cy.addProductToCart(1)

            cy.contains("Continue Shopping").click()

            cy.contains("Cart").click()

            cy.get("body").should("be.visible")

            cy.url().should(
                "contain",
                "https://automationexercise.com/view_cart",
            )

            cy.getElementAndAssertText("#product-1", "Blue Top")

            cy.getElementAndAssertText("#product-1", "Women > Tops").within(
                () => {
                    cy.get(".cart_quantity_delete").click()
                },
            )

            cy.get("#empty_cart")
                .should("be.visible")
                .and(
                    "contain.text",
                    "Cart is empty! Click here to buy products.",
                )
        })

        it("Test Case 18: View Category Products", () => {
            cy.getElementAndAssertText(".left-sidebar", "Category")

            cy.contains("Women").click()

            cy.contains("Tops").click()

            cy.getElementAndAssertText(".title", "Women - Tops Products")

            cy.contains("Men").click()

            cy.contains("Jeans").click()

            cy.getElementAndAssertText(".title", "Men - Jeans Products")
        })

        it("Test Case 19: View & Cart Brand Products", () => {
            cy.contains("Products").click()

            cy.get(".brands_products").should("be.visible")

            cy.contains("H&M").click()

            cy.getElementAndAssertText(".title", "Brand - H&M Products")

            cy.contains("Polo").click()

            cy.getElementAndAssertText(".title", "Brand - Polo Products")
        })

        it("Test Case 20: Search Products and Verify Cart After Login", () => {
            cy.contains("Products").click()

            cy.get("body").should("be.visible")

            cy.url().should("eq", "https://automationexercise.com/products")

            cy.getElementAndAssertText(".title", "All Products")

            cy.get("#search_product").type("TShirt")
            cy.get("#submit_search").click()

            cy.getElementAndAssertText(".title", "Searched Products")

            cy.get(".product-image-wrapper").its("length").should("eq", 6)

            cy.get(".product-image-wrapper").each(($el, $index) => {
                cy.log($el)
                cy.log($index)

                cy.get($el).within(() => {
                    cy.get(".add-to-cart").first().click()
                })
                cy.get("#cartModal").should("be.visible")
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

            cy.fillLoginForm(userCredentials)

            cy.contains(`Logged in as ${userCredentials.name}`)

            cy.contains("Cart").click()

            cy.get("#product-2").should("be.visible")
            cy.get("#product-28").should("be.visible")
            cy.get("#product-29").should("be.visible")

            cy.get("#product-30").should("be.visible")
            cy.get("#product-31").should("be.visible")
            cy.get("#product-43").should("be.visible")
        })

        it("Test Case 21: Add review on product", () => {
            cy.contains("Products").click()

            cy.get("body").should("be.visible")

            cy.url().should("eq", "https://automationexercise.com/products")

            cy.getElementAndAssertText(".title", "All Products")

            cy.get(".product-image-wrapper")
                .first()
                .within(() => {
                    cy.contains("View Product").click()
                })

            cy.get("#name").type(userCredentials.name)

            cy.get("#email").type(userCredentials.email)

            cy.get("textarea").type("This is a great product!")

            cy.get("#button-review").click()

            cy.getElementAndAssertText(
                ".alert-success",
                "Thank you for your review",
            )
        })

        it("Test Case 22: Add to cart from Recommended items", () => {
            cy.get(".recommended_items").scrollIntoView()

            cy.getElementAndAssertText(".title", "recommended items")

            cy.get("#recommended-item-carousel > .left > .fa").click()
            cy.get("#recommended-item-carousel > .right > .fa").click()

            cy.get(".recommended_items").within(() => {
                cy.get(".add-to-cart").first().click()
            })

            cy.contains("View Cart").click()

            cy.get("#product-1").should("be.visible")
        })
    })

    context("5.", () => {
        beforeEach(() => {
            cy.deleteUserByAPI(userCredentials)

            cy.visit("https://automationexercise.com/")
            cy.get("body").should("be.visible")
        })

        it("Test Case 23: Verify address details in checkout page", () => {
            cy.signupUser(userCredentials)

            cy.contains(`Logged in as ${userCredentials.name}`)

            cy.addProductToCart(1)

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

            cy.contains("Delete Account").click()

            cy.getElementAndAssertText(
                '[data-qa="account-deleted"]',
                "Account Deleted!",
            )
        })

        it("Test Case 24: Download Invoice after purchase order", () => {
            cy.addProductToCart(1)

            cy.contains("Continue Shopping").click()

            cy.contains("Cart").click()

            cy.get("body").should("be.visible")

            cy.url().should(
                "contain",
                "https://automationexercise.com/view_cart",
            )

            cy.contains("Proceed To Checkout").click()

            cy.get(".modal-content a").click()
            cy.fillSignupForm(userCredentials)
            cy.fillAccountInformationForm(userCredentials)

            cy.getElementAndAssertText(
                '[data-qa="account-created"]',
                "Account Created!",
            )

            cy.get("[data-qa=continue-button]").click()

            cy.contains(`Logged in as ${userCredentials.name}`)

            cy.contains("Cart").click()

            cy.contains("Proceed To Checkout").click()

            accountDataValuesToCheck.forEach((value) => {
                cy.get("#address_delivery").should("contain.text", value)

                cy.get("#address_invoice").should("contain.text", value)
            })

            cy.get(".form-control").type("I want to buy this items!")

            cy.contains("Place Order").click()

            cy.fillPaymentDetails(userCredentials)

            cy.get(".title").should("contain.text", "Order Placed!")

            cy.contains("Congratulations! Your order has been confirmed!")

            cy.contains("Download Invoice").click()

            cy.downloadFile(
                "https://automationexercise.com/payment_done/1400",
                "Downloads",
                "invoice.txt",
            )

            cy.contains("Delete Account").click()

            cy.getElementAndAssertText(
                '[data-qa="account-deleted"]',
                "Account Deleted!",
            )
        })

        it("Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality", () => {
            cy.get("#footer").scrollIntoView()

            cy.getElementAndAssertText(".single-widget > h2", "Subscription")

            cy.get("#scrollUp").click()

            cy.getElementAndAssertText(
                "#slider-carousel",
                "Full-Fledged practice website for Automation Engineers",
            )
        })

        it("Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", () => {
            // Scroll to the bottom of the page
            cy.window().then((win) => {
                win.scrollTo(0, win.document.body.scrollHeight)
            })

            cy.getElementAndAssertText(".single-widget > h2", "Subscription")

            // Scroll to the top of the page
            cy.window().then((win) => {
                win.scrollTo(0, 0)
            })

            cy.getElementAndAssertText(
                "#slider-carousel",
                "Full-Fledged practice website for Automation Engineers",
            )
        })
    })
})
