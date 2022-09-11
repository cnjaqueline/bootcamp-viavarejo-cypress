/// <reference types="cypress" />

describe('Post registration', () => {
    let token

    beforeEach(() => {
        cy.getTokenJwt().then((auth) => {
            token = auth
        })
    });
    it('POST Create a new post successfully', () => {
        cy.request({
            method: "POST",
            url: "api/posts",
            headers: {
                Cookie: token
            },
            body: {
                "text": "Postagem pelo Cypress"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    })
    it('GET Get a post successfully', () => {
        cy.request({
            method: "GET",
            url: "api/posts",
            headers: {
                Cookies: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('GET Get a post by Id successfully', () => {
        cy.createPost(token, "PostId").then((response) => {
            let id = response.body._id

            cy.request({
                method: "GET",
                url: `api/posts/${id}`,
                headers: {
                    Cookies: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })
    it('DELETE a post successfully', () => {
        cy.createPost(token, "PostId").then((response) => {
            let id = response.body._id

            cy.request({
                method: "DELETE",
                url: `api/posts/${id}`,
                headers: {
                    Cookies: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })
});