/// <reference types="Cypress" />
import auth from "../fixtures/auth.json"

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, {
        timeout: 30000
    })
    cy.wait('@loadpage')
})

Cypress.Commands.add('login', (email, senha) => {
    cy.visit('login')
    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input')
        .type(email)
    cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input')
        .type(senha)
    cy.get('[data-test="login-submit"]')
        .click()
})

Cypress.Commands.add('registration', (userName, userEmail, password) => {
    cy.visit('cadastrar')
    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input')
        .type(userName)
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input')
        .type(userEmail)
    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input')
        .type(password)
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input')
        .type(password)
    cy.get('[data-test="register-submit"]')
        .click()
})

Cypress.Commands.add("getTokenJwt", () => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: auth
    }).then((response) => {
        return response.body.jwt
    })
})

Cypress.Commands.add("createPost", (token, msg) => {
    cy.request({
        method: 'POST',
        url: '/api/posts',
        headers: {
            Cookie: token
        },
        body: {
            "text": msg
        }
    }).then((response) => {
        console.log(response)
        return response
    })
})
Cypress.Commands.add("createProfile", (token, $body) => {
    cy.request({
        method: 'POST',
        url: '/api/profile',
        headers: {
            Cookie: token
        },
        body: $body
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add("registrationByAPI", (userName, userEmail, password) => {
    cy.request({
        method: "POST",
        url: "api/users",
        body: {
            "name": userName,
            "email": userEmail,
            "password": password
        }
    }).then((response) => {
        return response.body.jwt
    })
})