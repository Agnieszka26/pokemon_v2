/// <reference types="cypress" />
describe('Loading String and Carousel Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display a Loading component while the page is loading', () => {
    cy.get('div.loading.loading-bars.loading-xs').should('be.visible');
  });
  it('Loading component should not be visible after 2s. ', () => {
    cy.wait(2000);
    cy.contains('div.loading.loading-bars.loading-xs').should('not.exist');
  });

  it('should click the next button on first element of carousel', () => {
    cy.wait(2000);
    cy.get('button[aria-label="Go to next slide"]').click();
    cy.contains('charmander').should('be.visible');
  });
});
