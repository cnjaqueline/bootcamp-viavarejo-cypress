/// <reference types="cypress" />
import auth from "../../fixtures/auth.json"

describe('Auth', () => {
    it('POST Auth successfully', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: auth
        }).then((response) => {
            console.log(response)
            cy.log(response)
            expect(response.status).to.eq(200)
            expect(response.body).to.not.empty
            expect(response.body).to.have.property("jwt")
        })
    });
    it('POST Auth with invalid user successfully', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            failOnStatusCode: false,
            body: {
                "email": "jaqueline@bootcamp.com.br",
                "password": "abcdef"
            }
        }).then((response) => {
            expect(response.status).to.eq(401)
        })
    });
});