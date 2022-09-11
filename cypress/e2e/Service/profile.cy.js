/// <reference types="cypress" />
import profile from "../../fixtures/profile.json"
import users from "../../fixtures/users.json"
const faker = require('faker-br');

describe('Profile registration', () => {
    let token
    let deleteToken

    beforeEach(() => {
        cy.getTokenJwt().then((auth) => {
            token = auth
        })
    });

    context('POST Method', () => {
        it('POST Create a new profile successfully', () => {
            cy.request({
                method: "POST",
                url: "api/profile",
                headers: {
                    Cookie: token
                },
                body: profile
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq('OK')
                expect(response.duration).to.not.be.greaterThan(1000)
            })
        })
        it('POST Create a new profile with incorrect body', () => {
            cy.request({
                method: "POST",
                url: "api/profile",
                failOnStatusCode: false,
                headers: {
                    Cookie: token
                },
                body: {}
            }).then((response) => {
                console.log(response)
                expect(response.status).to.eq(400)
                expect(response.statusText).to.eq('Bad Request')
            })
        })
    });

    context('GET Method', () => {
        it('GET Get all profiles successfully', () => {
            cy.request({
                method: "GET",
                url: "api/profile",
                headers: {
                    Cookies: token
                }
            }).then((response) => {
                console.log(response)
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq('OK')
                expect(response.duration).to.not.be.greaterThan(12000)
            })
        })
        it('GET Get my profiles successfully', () => {
            cy.request({
                method: "GET",
                url: 'api/profile/me',
                headers: {
                    Cookies: token
                }
            }).then((response) => {
                console.log(response)
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq('OK')
                expect(response.duration).to.not.be.greaterThan(1000)
            })
        })
    });

    context('DELETE Method', () => {
        beforeEach(() => {
            const userEmail = faker.internet.email()
            cy.registrationByAPI(users[2].name, userEmail, users[2].password).then((auth) => {
                deleteToken = auth
            })
        });

        it('DELETE a profile successfully', () => {
            cy.createProfile(deleteToken, profile).then((response) => {
                expect(response.status).to.eq(201)
                cy.request({
                    method: "DELETE",
                    url: 'api/profile',
                    headers: {
                        Cookies: deleteToken
                    }
                }).then((response) => {
                    console.log(response)
                    expect(response.status).to.eq(200)
                    expect(response.body.msg).to.eq('Usuário removido')
                    expect(response.statusText).to.eq('OK')
                    expect(response.duration).to.not.be.greaterThan(1000)
                })
            })
        })
    });
});