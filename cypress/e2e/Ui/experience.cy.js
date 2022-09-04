/// <reference types="cypress" />
const experiencePage = require('../../support/Experience/experiencePage')
const dashboardPage = require('../../support/Dashboard/dashboardPage')
import exp from "../../fixtures/experience.json"

describe('Professional experience registration', () => {
    beforeEach(() => {
        cy.fixture("users").then(($users) => {
            cy.login($users[0].email, Cypress.env('password'))
        })
        dashboardPage.deleteAllExperiences()
        cy.visit('adicionar-experiencia')
    });

    it('Add a professional experience successfully', () => {
        experiencePage.addExperience(exp.position, exp.company, exp.place, exp.startDate, exp.endDate, exp.description)
        experiencePage.validateAlert('Experiência Adicionada')
    });

    it('Delete a professional experience successfully', () => {
        experiencePage.addExperience(exp.position, exp.company, exp.place, exp.startDate, exp.endDate, exp.description)
        experiencePage.deleteFirstExperience()
        experiencePage.validateAlert('Experiência Removida')
    });

    it('Add current professional experience successfully', () => {
        experiencePage.addCurrentExperience(exp.position, exp.company, exp.place, exp.startDate, exp.description)
        experiencePage.validateAlert('Experiência Adicionada')
    });

    it('Delete current professional experience successfully', () => {
        experiencePage.addCurrentExperience(exp.position, exp.company, exp.place, exp.startDate, exp.description)
        experiencePage.deleteFirstExperience()
        experiencePage.validateAlert('Experiência Removida')
    });
});