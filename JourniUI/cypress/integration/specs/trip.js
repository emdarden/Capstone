describe('trip', () => {
    it('should successfully create trip', () => {
        cy.visit('/trips')
        cy.login()
        cy.contains('Create a Trip').click()

        cy.get('.modal-body input').type('Berlin').should('have.value', 'Berlin')
        cy.contains('Save').click()



    });

    it('should successfully show trip', () => {
        cy.visit('/trips')
        cy.contains('.card-a', 'BERLIN').click()
        
    });

    it('should successfully delete trip', () => {
        cy.visit('/trips')
        cy.contains('.trip-name', 'BERLIN').siblings('.fa-times').click()

        cy.get('.remove').click()

        cy.contains('Berlin').should('not.exist')
        
    });
    
});