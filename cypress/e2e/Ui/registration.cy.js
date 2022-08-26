/// <reference types="cypress" />
const faker = require('faker-br');

describe('User registration', () => {
    const userName = `Jaqueline ${faker.name.lastName()}`
    const userEmail = faker.internet.email()
    const password = faker.internet.password()

    beforeEach(() => {
        cy.visit('cadastrar')
    });
    it('Register a new user successfully', () => {
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

        cy.get('[data-test="dashboard-welcome"]')
            .should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-welcome"]')
            .should('contain', userName)
    });
});