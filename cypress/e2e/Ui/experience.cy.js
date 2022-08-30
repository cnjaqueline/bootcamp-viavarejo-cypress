/// <reference types="cypress" />
const experiencePage = require('../../support/Experience/experiencePage')

describe('Add experience', () => {
    beforeEach(() => {
        cy.fixture("users").then(($users) => {
            cy.login($users[0].email, Cypress.env('password'))
        })
        cy.visit('adicionar-experiencia')
    });

    it('Add a experience successfully', () => {
        experiencePage.addExperience('QA', 'GFT', 'SP', '01/01/2020', '01/01/2022', 'Muita dedicação para ser a melhor profissional.')
        experiencePage.validateAlert('Experiência Adicionada')
    });

    it('Delete a experience successfully', () => {
        experiencePage.addExperience('QA', 'GFT', 'SP', '01/01/2020', '01/01/2022', 'Muita dedicação para ser a melhor profissional.')
        experiencePage.deleteFirstExperience()
        experiencePage.validateAlert('Experiência Removida')
    });

    it('Add current experience successfully', () => {
        experiencePage.addCurrentExperience('QA', 'GFT', 'SP', '01/01/2020', 'Muita dedicação para ser a melhor profissional.')
        experiencePage.validateAlert('Experiência Adicionada')
    });

    it('Delete current experience successfully', () => {
        experiencePage.addCurrentExperience('QA', 'GFT', 'SP', '01/01/2020', 'Muita dedicação para ser a melhor profissional.')
        experiencePage.deleteFirstExperience()
        experiencePage.validateAlert('Experiência Removida')
    });
});