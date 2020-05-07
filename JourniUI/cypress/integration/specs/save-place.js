describe('place', () => {
    it('should successfully save place', () => {
        cy.visit('/search?query=Paris')
        // cy.login()
        cy.contains('.card-name', 'Louvre Museum').siblings('.heart-icon').click({force: true})

        // cy.get('#id2 > .place-card > .card-body > .header-a > .heart-icon')

    });
    
});