/// <reference types="cypress" />
import users from "../../fixtures/users.json"

describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    });
    it('Login successfully', () => {
        cy.login("jaque@bootcamp.com", Cypress.env('password'))
        cy.get('[data-test="dashboard-welcome"]')
            .should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-welcome"]')
            .should('contain', 'Jaqueline Constantino')
    });

    it('Validate error message when entering invalid email and password', () => {
        cy.login("jaquequw@bootcamp.com", "123456xxx")
        cy.get('[data-test="alert"]')
            .should('be.visible')
            .should('contain', 'Credenciais inválidas')
    });
    it('Login successfully using import', () => {
        cy.login(users[0].email, Cypress.env('password'))
        cy.get('[data-test="dashboard-welcome"]')
            .should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-welcome"]')
            .should('contain', 'Jaqueline Constantino')
    });
    it('Validate error message when entering invalid email and password using import', () => {
        cy.login(users[1].email, users[1].password)
        cy.get('[data-test="alert"]')
            .should('be.visible')
            .should('contain', 'Credenciais inválidas')
    });
    it('Login successfully using fixture', () => {
        cy.fixture("users").then(($users) => {
            cy.login($users[0].email, Cypress.env('password'))
            cy.get('[data-test="dashboard-welcome"]')
                .should('contain', 'Bem-vindo')
            cy.get('[data-test="dashboard-welcome"]')
                .should('contain', 'Jaqueline Constantino')
        })
    });
    it('Validate error message when entering invalid email and password using fixture', () => {
        cy.fixture("users").then(($users) => {
            cy.login($users[1].email, $users[1].password)
            cy.get('[data-test="alert"]')
                .should('be.visible')
                .should('contain', 'Credenciais inválidas')
        })
    });
});