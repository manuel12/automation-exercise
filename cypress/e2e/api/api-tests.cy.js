/// <reference types="cypress" />

const userCredentials = require("../../fixtures/user-credentials.json")

describe("API Tests", () => {
    beforeEach(() => {
        cy.request({
            method: "DELETE",
            url: "https://automationexercise.com/api/deleteAccount",
            failOnStatusCode: false,
            form: true,
            body: {
                email: userCredentials.email,
                password: userCredentials.password,
            },
        })
    })

    it("API 1: Get All Products List", () => {
        cy.request({
            method: "GET",
            url: "https://automationexercise.com/api/productsList",
            failOnStatusCode: false,
        }).then((res) => {
            const parsedBody = JSON.parse(res.body)
            expect(parsedBody.responseCode).to.eq(200)
            expect(parsedBody.products).to.not.be.null
            expect(parsedBody.products).to.be.an("array")

            parsedBody.products.forEach((product) => {
                expect(product).to.be.an("object")

                expect(product).to.have.all.keys(
                    "brand",
                    "category",
                    "id",
                    "name",
                    "price",
                )
            })
        })
    })

    it("API 2: POST To All Products List", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/productsList",
            failOnStatusCode: false,
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            expect(parsedBody.responseCode).to.eq(405)
            expect(parsedBody.message).to.eq(
                "This request method is not supported.",
            )
        })
    })

    it("API 3: Get All Brands List", () => {
        cy.request({
            method: "GET",
            url: "https://automationexercise.com/api/brandsList",
            failOnStatusCode: false,
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            expect(parsedBody.responseCode).to.eq(200)
            expect(parsedBody.brands).to.be.an("array")

            parsedBody.brands.forEach((brand) => {
                expect(brand).to.be.an("object")
                expect(brand).to.have.all.keys("brand", "id")
            })
        })
    })

    it("API 4: PUT To All Brands List", () => {
        cy.request({
            method: "PUT",
            url: "https://automationexercise.com/api/brandsList",
            failOnStatusCode: false,
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            expect(parsedBody.responseCode).to.eq(405)
            expect(parsedBody.message).to.eq(
                "This request method is not supported.",
            )
        })
    })

    it("API 5: POST To Search Product", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/searchProduct",
            failOnStatusCode: false,
            form: true,
            body: {
                search_product: "tshirt",
            },
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            expect(parsedBody.responseCode).to.eq(200)
            expect(parsedBody.products).to.not.be.null
            expect(parsedBody.products).to.be.an("array")

            parsedBody.products.forEach((product) => {
                expect(product).to.be.an("object")

                expect(product).to.have.all.keys(
                    "brand",
                    "category",
                    "id",
                    "name",
                    "price",
                )
            })
        })
    })

    it("API 6: POST To Search Product without search_product parameter", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/searchProduct",
            failOnStatusCode: false,
            form: true,
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            expect(parsedBody.responseCode).to.eq(400)
            expect(parsedBody.message).to.eq(
                "Bad request, search_product parameter is missing in POST request.",
            )
        })
    })

    it("API 7: POST To Verify Login with valid details", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/verifyLogin",
            failOnStatusCode: false,
            form: true,
            body: {
                email: userCredentials.email,
                password: userCredentials.password,
            },
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            expect(parsedBody.responseCode).to.eq(200)
            expect(parsedBody.message).to.eq("User exists!")
        })
    })

    it("API 8: POST To Verify Login without email parameter", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/verifyLogin",
            failOnStatusCode: false,
            form: true,
            body: {
                password: userCredentials.password,
            },
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            expect(parsedBody.responseCode).to.eq(400)
            expect(parsedBody.message).to.eq(
                "Bad request, email or password parameter is missing in POST request.",
            )
        })
    })

    it("API 9: DELETE To Verify Login", () => {
        cy.request({
            method: "DELETE",
            url: "https://automationexercise.com/api/verifyLogin",
            failOnStatusCode: false,
            form: true,
            body: {
                email: "nonExistantEmail@no.com",
                password: "nonExistantPassword!",
            },
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            expect(parsedBody.responseCode).to.eq(405)
            expect(parsedBody.message).to.eq(
                "This request method is not supported.",
            )
        })
    })

    it("API 10: POST To Verify Login with invalid details", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/verifyLogin",
            failOnStatusCode: false,
            form: true,
            body: {
                email: "nonExistantEmail@no.com",
                password: "nonExistantPassword!",
            },
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            expect(parsedBody.responseCode).to.eq(404)
            expect(parsedBody.message).to.eq("User not found!")
        })
    })

    it("API 11: POST To Create/Register User Account", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/createAccount",
            failOnStatusCode: false,
            form: true,
            body: {
                name: userCredentials.name,
                email: userCredentials.email,
                password: userCredentials.password,

                title: userCredentials.title,
                birth_date: userCredentials.days,
                birth_month: userCredentials.months,
                birth_year: userCredentials.years,

                firstname: userCredentials.firstName,
                lastname: userCredentials.lastName,

                company: userCredentials.company,
                address1: userCredentials.address,
                address2: userCredentials.address,

                country: userCredentials.country,
                zipcode: userCredentials.zipcode,
                state: userCredentials.state,
                city: userCredentials.city,

                mobile_number: userCredentials.mobile,
            },
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            console.log(parsedBody)
            expect(parsedBody.responseCode).to.eq(201)
            expect(parsedBody.message).to.eq("User created!")
        })
    })

    it("API 12: DELETE METHOD To Delete User Account", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/createAccount",
            failOnStatusCode: false,
            form: true,
            body: {
                name: userCredentials.name,
                email: userCredentials.email,
                password: userCredentials.password,

                title: userCredentials.title,
                birth_date: userCredentials.days,
                birth_month: userCredentials.months,
                birth_year: userCredentials.years,

                firstname: userCredentials.firstName,
                lastname: userCredentials.lastName,

                company: userCredentials.company,
                address1: userCredentials.address,
                address2: userCredentials.address,

                country: userCredentials.country,
                zipcode: userCredentials.zipcode,
                state: userCredentials.state,
                city: userCredentials.city,

                mobile_number: userCredentials.mobile,
            },
        })

        cy.request({
            method: "DELETE",
            url: "https://automationexercise.com/api/deleteAccount",
            failOnStatusCode: false,
            form: true,
            body: {
                email: userCredentials.email,
                password: userCredentials.password,
            },
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            console.log(parsedBody)
            expect(parsedBody.responseCode).to.eq(200)
            expect(parsedBody.message).to.eq("Account deleted!")
        })
    })

    it("API 13: PUT METHOD To Update User Account", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/createAccount",
            failOnStatusCode: false,
            form: true,
            body: {
                name: userCredentials.name,
                email: userCredentials.email,
                password: userCredentials.password,

                title: userCredentials.title,
                birth_date: userCredentials.days,
                birth_month: userCredentials.months,
                birth_year: userCredentials.years,

                firstname: userCredentials.firstName,
                lastname: userCredentials.lastName,

                company: userCredentials.company,
                address1: userCredentials.address,
                address2: userCredentials.address,

                country: userCredentials.country,
                zipcode: userCredentials.zipcode,
                state: userCredentials.state,
                city: userCredentials.city,

                mobile_number: userCredentials.mobile,
            },
        })
        cy.request({
            method: "PUT",
            url: "https://automationexercise.com/api/updateAccount",
            failOnStatusCode: false,
            form: true,
            body: {
                name: "New user",
                email: userCredentials.email,
                password: userCredentials.password,

                title: userCredentials.title,
                birth_date: userCredentials.days,
                birth_month: userCredentials.months,
                birth_year: userCredentials.years,

                firstname: userCredentials.firstName,
                lastname: userCredentials.lastName,

                company: userCredentials.company,
                address1: userCredentials.address,
                address2: userCredentials.address,

                country: userCredentials.country,
                zipcode: userCredentials.zipcode,
                state: userCredentials.state,
                city: userCredentials.city,

                mobile_number: userCredentials.mobile,
            },
        }).then((res) => {
            console.log(res)
            const parsedBody = JSON.parse(res.body)
            console.log(parsedBody)
            expect(parsedBody.responseCode).to.eq(200)
            expect(parsedBody.message).to.eq("User updated!")
        })
    })

    it("API 14: GET user account detail by email", () => {
        cy.request({
            method: "GET",
            url: `https://automationexercise.com/api/getUserDetailByEmail?email=${userCredentials.email}`,
            failOnStatusCode: false,
        }).then((res) => {
            const parsedBody = JSON.parse(res.body)
            console.log(parsedBody)
            expect(parsedBody.responseCode).to.eq(200)

            expect(parsedBody.user).to.not.be.null
            expect(parsedBody.user).to.be.an("object")

            expect(parsedBody.user).to.have.all.keys(
                "address1",
                "address2",
                "birth_day",
                "birth_month",
                "birth_year",
                "city",
                "company",
                "country",
                "email",
                "first_name",
                "id",
                "last_name",
                "name",
                "state",
                "title",
                "zipcode",
            )
        })
    })
})
