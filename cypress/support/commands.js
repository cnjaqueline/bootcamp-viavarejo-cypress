/// <reference types="Cypress" />

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