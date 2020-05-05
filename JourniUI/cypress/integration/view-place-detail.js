describe('view place detail', () => {
    it('views place detail', () => {
      cy.visit('/search?query=Paris')
      
      cy.contains('.place-card .place-card', 'Louvre Museum').click()

      cy.url().should('include', 'place=Louvre%20Museum')
    
    })
  })