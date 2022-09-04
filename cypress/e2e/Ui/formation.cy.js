/// <reference types="cypress" />
const formationPage = require('../../support/Formation/formationPage')
const dashboardPage = require('../../support/Dashboard/dashboardPage')
import form from "../../fixtures/formation.json"

describe('Academic formation registration', () => {
    beforeEach(() => {
        cy.fixture("users").then(($users) => {
            cy.login($users[0].email, Cypress.env('password'))
        })
        dashboardPage.deleteAllFormations()
        cy.visit('adicionar-formacao')
    });
    it('Add a academic formation successfully', () => {
        formationPage.addFormation(form.school, form.level, form.course, form.startDate, form.endDate, form.description)
        dashboardPage.validateAlert('Formação Acadêmica Adicionada')
        dashboardPage.validateFormationsTable(form.school, form.level, form.startDate, form.endDate)
    });
    it('Delete a academic formation successfully', () => {
        formationPage.addFormation(form.school, form.level, form.course, form.startDate, form.endDate, form.description)
        formationPage.deleteFirstFormation()
        dashboardPage.validateAlert('Formação Acadêmica Removida')
    });

    it('Add current academic formation successfully', () => {
        formationPage.addCurrentFormation(form.school, form.level, form.course, form.endDate, form.description)
        dashboardPage.validateAlert('Formação Acadêmica Adicionada')
    });
    it('Return successfully', () => {
        formationPage.returnToDashboard()
        dashboardPage.validateDashboardPage()
    });
});