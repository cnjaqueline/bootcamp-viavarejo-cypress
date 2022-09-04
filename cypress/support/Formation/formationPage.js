class FormationPage {
    get school() {
        return cy.get('[data-test="education-school"]')
    }
    get level() {
        return cy.get('[data-test="education-degree"]')
    }
    get course() {
        return cy.get('[data-test="education-fieldOfStudy"]')
    }
    get startDate() {
        return cy.get('#from')
    }
    get endDate() {
        return cy.get('#to')
    }
    get checkStudying() {
        return cy.get('[data-test="education-current"]')
    }
    get description() {
        return cy.get('[rows="1"]')
    }
    get buttonAddFormation() {
        return cy.get('[data-test="education-submit"]')
    }
    get buttonReturn() {
        return cy.get('[data-test="education-dashboard"]')
    }
    get buttonDelete() {
        return cy.get('[data-test="education-delete"]')
    }
    addFormation(school, level, course, startDate, endDate, description) {
        this.school.type(school)
        this.level.type(level)
        this.course.type(course)
        this.startDate.type(startDate)
        this.endDate.type(endDate)
        this.description.type(description)
        this.buttonAddFormation.click()
    }
    addCurrentFormation(school, level, course, startDate, description) {
        this.school.type(school)
        this.level.type(level)
        this.course.type(course)
        this.startDate.type(startDate)
        this.checkStudying.click()
        this.description.type(description)
        this.buttonAddFormation.click()
    }
    deleteFirstFormation() {
        this.buttonDelete.first().click()
    }
    returnToDashboard() {
        this.buttonReturn.click()
    }
}
module.exports = new FormationPage()