// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (overrides = {}) => {
    const payload = {
      "realm":"Username-Password-Authentication",
      "audience":Cypress.env('auth_audience'),
      "client_id":Cypress.env('auth_client_id'),
      "scope":"openid profile",
      "grant_type":"http://auth0.com/oauth/grant-type/password-realm",
      "username":Cypress.env('auth_username'),
      "password":Cypress.env('auth_password')
    };
      
    cy.request('POST', Cypress.env('auth_url'), payload)
      .then((response) => {
        const token = response.body['access_token'];
        const expiresIn = response.body['expires_in'];
        const idToken = response.body['id_token'];
        const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
        
        window.localStorage.setItem('expires_at', expiresAt);
        window.localStorage.setItem('access_token', token);
        window.localStorage.setItem('id_token', idToken);
      });
  });