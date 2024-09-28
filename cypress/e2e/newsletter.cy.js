/// <reference types="cypress"/>

describe('Newsletter', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  })

  it('should display a success message', () => {
    // * INFO: Will intercept POST requests to /newsletter?anything
    cy.intercept('POST', '/newsletter*', { status: 201 }).as('subscribe');
    cy.visit('/');
    cy.wait(500).get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@subscribe');
    cy.contains("Thanks for signing up");
  });

  it('should display validation error', () => {
    // * INFO: Will intercept POST requests to /newsletter?anything
    cy.intercept('POST', '/newsletter*', { message: 'Email exists already.' }).as('subscribe');
    cy.visit('/');
    cy.wait(500).get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@subscribe');
    cy.contains("Email exists already.");
  });

  it('should successfully create a new contact', () => {
    cy.request({
      method: 'POST',
      url: '/newsletter',
      form: true,
      body: {
        email: 'test@example.com'
      }
    }).then(response => {
      expect(response.status).to.eq(201);
    });
  });
});
