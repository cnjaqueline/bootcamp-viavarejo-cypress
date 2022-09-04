class Dashboard {
    get alertResult() {
        return cy.get('[data-test="alert"]')
    }
    get formationsTable() {
        return cy.get('tr[data-test^="education-"]')
    }
    get deleteFormationButton() {
        return cy.get('.table')
            .eq(1)
            .then($table => {
                if ($table.find('[data-test="education-delete"]').length > 0) {
                    return cy.get('[data-test="education-delete"]')
                } else {
                    return null
                }
            })
    }
    get deleteExperienceButton() {
        return cy.get('.table')
            .eq(0)
            .then($table => {
                if ($table.find('[data-test="experience-delete"]').length > 0) {
                    return cy.get('[data-test="experience-delete"]')
                } else {
                    return null
                }
            })
    }
    get pageTitle() {
        return cy.get('.large')
    }
    validateAlert(message) {
        this.alertResult
            .should('be.visible')
            .should('have.text', message)
    }
    validateFormationsTable(school, level, startDate, endDate) {
        this.formationsTable
            .first()
            .should('contain', school)
            .should('contain', level)
            .should('contain', `${startDate} - ${endDate}`)
    }
    deleteAllFormations() {
        this.deleteFormationButton.then($el => {
            if (!$el) {
                return
            }
            this.deleteFormationButton.each(($el) => {
                cy.wrap($el).click()
            })

        })
    }
    deleteAllExperiences() {
        this.deleteExperienceButton.then($el => {
            if (!$el) {
                return
            }
            this.deleteExperienceButton.each(($el) => {
                cy.wrap($el).click()
            })

        })
    }
    validateDashboardPage() {
        this.pageTitle
            .should('contain', 'Dashboard')
        cy.url().should('include', '/dashboard')
    }
}
module.exports = new Dashboard()