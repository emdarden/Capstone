describe('login', () => {
    it('should successfully log into app', () => {
        cy.visit('/')
        cy.login()
        // cy.contains('Log In').click()
    });
  });