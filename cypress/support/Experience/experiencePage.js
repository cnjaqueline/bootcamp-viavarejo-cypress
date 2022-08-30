class ExperiencePage {
    get addExperienceButton() {
        return cy.get('[data-test="dashboard-addExperience"]')
    }
    get position() {
        return cy.get('[data-test="experience-title"]')
    }
    get company() {
        return cy.get('[data-test="experience-company"]')
    }
    get place() {
        return cy.get('[data-test="experience-location"]')
    }
    get startDate() {
        return cy.get('[data-test="experience-from"]')
    }
    get endDate() {
        return cy.get('[data-test="experience-to"]')
    }
    get description() {
        return cy.get('[data-test="experience-description"]')
    }
    get checkCurrentDate() {
        return cy.get('input[name="current"]')
    }
    get buttonAddExperience() {
        return cy.get('[data-test="experience-submit"]')
    }
    get alertResult() {
        return cy.get('[data-test="alert"]')
    }
    get buttonDelete() {
        return cy.get('[data-test="experience-delete"]')
    }

    addExperience(position, company, place, startDate, endDate, description) {
        //this.addExperienceButton.click()
        this.position.type(position)
        this.company.type(company)
        this.place.type(place)
        this.startDate.type(startDate)
        this.endDate.type(endDate)
        this.description.type(description)
        this.buttonAddExperience.click()
    }
    addCurrentExperience(position, company, place, startDate, description) {
        //this.addExperienceButton.click()
        this.position.type(position)
        this.company.type(company)
        this.place.type(place)
        this.startDate.type(startDate)
        this.checkCurrentDate.check()
        this.description.type(description)
        this.buttonAddExperience.click()
    }
    validateAlert(message) {
        this.alertResult.should('have.text', message)
    }
    deleteFirstExperience() {
        this.buttonDelete.first().click()
    }
}

module.exports = new ExperiencePage()