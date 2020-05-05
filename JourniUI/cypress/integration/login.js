describe('login', () => {
    it('should successfully log into app', () => {
        cy.visit('/')
        cy.login(Cypress.env('auth_username'), Cypress.env("auth_password")).then(() => {
            // cy.visit('/search?query=Paris')
        })
        // cy.visit('/trips')

        // cy.login()
        // .then((resp) => {
        //     return resp.body;
        // })
        // .then((body) => {
        //     const {access_token, expires_in, id_token} = body;
        //     const auth0State = {
        //         nonce: '',
        //         state: 'some-random-state'
        //     };
        //     const callbackUrl = `#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
        //     // cy.setCookie('auth0', )
        //     cy.visit(callbackUrl, {
        //         onBeforeLoad(win) {
        //         win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
        //         }
        //     });

        // })
    });
  });