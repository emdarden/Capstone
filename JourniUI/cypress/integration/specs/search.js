describe('search for a place', () => {
  it('inputs search query', () => {
    cy.visit('http://localhost:4200') 

    cy.get('input')
      .type('Paris')
      .should('have.value', 'Paris')

    cy.get('button').click()

    cy.url().should('include', 'search?query=Paris')
  
  })
})