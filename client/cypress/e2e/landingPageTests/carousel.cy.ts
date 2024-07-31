/// <reference types="cypress" />
describe('Loading String and Carousel Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display a loading string while the page is loading', () => {
    cy.contains('Loading...').should('be.visible');
  });
  it('loading string should not be visible after 5s. ', () => {
    cy.wait(2000);
    cy.contains('Loading...').should('not.exist');
  });

  it('should click the next button on first element of carousel', () => {
    cy.wait(2000);
    cy.get('#item1').find('#button_next').click();
    cy.get('#item2').should('be.visible');
  });
});
