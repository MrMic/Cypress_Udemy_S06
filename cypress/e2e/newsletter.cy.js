/// <reference types="cypress"/>

describe('Newsletter', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  })

  it('should display a success message', () => {
    // * INFO: Will intercept POST requests to /newsletter?anything
    cy.intercept('POST', '/newsletter*', { status: 201 }).as('subscribe');
    cy.visit('/');
    cy.wait(50).get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@subscribe');
    cy.contains("Thanks for signing up");
  });
});
