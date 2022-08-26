/// <reference types="cypress" />
const faker = require('faker-br');

describe('Create profile', () => {
    const userEmail = faker.internet.email()
    const password = Cypress.env('password')
    const userName = 'Jaqueline'

    beforeEach(() => {
        cy.registration(userName, userEmail, password)
    });

    it('Create a new profile successfully', () => {
        cy.get('[data-test="dashboard-createProfile"]')
            .click()
        cy.get('#mui-component-select-status')
            .click()
        cy.get('[data-test="status-2"]')
            .contains('QA Pleno')
            .click()
        cy.get('[data-test="profile-company"]')
            .type('GFT')
        cy.get('[data-test="profile-webSite"]')
            .type('https://www.gft.com')
        cy.get('[data-test="profile-location"]')
            .type('Sorocaba-SP')
        cy.get('[data-test="profile-skills"]')
            .type('Testes de Integração, Automação de Testes, Cypress, Testes Manuais')
        cy.get('[data-test="profile-gitHub"]')
            .type('https://github.com/cnjaqueline')
        cy.get('[data-test="profile-bio"]')
            .type('Não se aplica')
        cy.get('[data-test="profile-submit"]')
            .should('be.visible')
            .click()

        // Assertions
        cy.get('[data-test="alert"]')
            .should('be.visible')
            .should('contain', 'Perfil Criado')
        cy.get('.large')
            .should('be.visible')
            .should('have.text', 'Dashboard')
        cy.get('[data-test="dashboard-welcome"]')
            .should('contain', 'Bem-vindo')
        cy.get('[data-test="dashboard-welcome"]')
            .should('contain', userName)
        cy.get('[data-test="dashboard-editProfile"]')
            .should('be.visible')
        cy.get('[data-test="dashboard-addExperience"]')
            .should('be.visible')
        cy.get('[href="/adicionar-formacao"]')
            .should('be.visible')
        cy.get('.container')
            .contains('Experiências')
            .should('be.visible')
        cy.get('.container')
            .contains('Formações Acadêmicas')
            .should('be.visible')
        cy.get('[data-test="dashboard-deleteProfile"]')
            .should('exist')
            .should('have.css', 'background-color', 'rgb(220, 53, 69)')
            .should('contain.text', 'Excluir Conta')

        cy.get('[data-test="dashboard-deleteProfile"]')
            .click()
    });

    it('Try to insert with required fields not filled in', () => {
        cy.get('[data-test="dashboard-createProfile"]')
            .click()
        cy.get('[data-test="profile-submit"]')
            .should('be.visible')
            .click()

        // Assertions
        cy.get('#status')
            .should('have.css', 'color', 'rgb(244, 67, 54)')
        cy.get('label.MuiInputLabel-root')
            .contains('Status')
            .should('have.css', 'color', 'rgb(244, 67, 54)')
        cy.get('.MuiFormHelperText-root')
            .should('be.visible')
            .should('have.text', 'Conhecimentos é obrigatório')
            .should('have.css', 'color', 'rgb(244, 67, 54)')
    });
});