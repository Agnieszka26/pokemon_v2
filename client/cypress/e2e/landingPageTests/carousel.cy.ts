/// <reference types="cypress" />
describe('Loading String Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display a loading strin while the page is loading', () => {
    cy.contains('Loading...').should('be.visible');
  });
  it('should not be visible afret 5s. ', () => {
    cy.wait(2000);
    cy.contains('Loading...').should('not.exist');
  });

  it('click the next button on first element of carousel', () => {
    cy.wait(2000);
    cy.get('#item1').find('#button_next').click();
    cy.get('#item2').should('be.visible');
  });
});
