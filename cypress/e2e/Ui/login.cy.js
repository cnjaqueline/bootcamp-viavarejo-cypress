/// <reference types="cypress" />

describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    });
    it('Login successfully', () => {
        cy.login('jaque@bootcamp.com', '123456')
        cy.get('[data-test="dashboard-welcome"]')
            .should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-welcome"]')
            .should('contain', 'Jaqueline Constantino')
    });

    it('Validate error message when entering invalid email and password', () => {
        cy.login('jaquequw@bootcamp.com', '123456xxx')
        cy.get('[data-test="alert"]')
            .should('be.visible')
            .should('contain', 'Credenciais inválidas')
    });
});