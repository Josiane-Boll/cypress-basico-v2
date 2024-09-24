Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Josi')
    cy.get('#lastName').type('Boll')
    cy.get('#email').type('josiboll@exemplo.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click() 
})