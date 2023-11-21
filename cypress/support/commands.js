// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// // No arguments
// Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
//   cy.get("#firstName").type("Anakonda");
//   cy.get("#lastName").type("Joshua");
//   cy.get("#email").type("email@mail.com");
//   cy.get("#open-text-area").type(" some text text text some text text text");
//   cy.get(".button").contains("Send").click();
// });

// Arguments object
// Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (data) => {
//   cy.get("#firstName").type(data.firstName);
//   cy.get("#lastName").type(data.lastName);
//   cy.get("#email").type(data.email);
//   cy.get("#open-text-area").type(data.text);
//   cy.get(".button").contains("Send").click();
// });

//Arguments object with data
Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  (
    data = {
      firstName: "Barbara",
      lastName: "Streizer",
      email: "email@mail.com",
      text: "some text text text some text text text",
    }
  ) => {
    cy.get("#firstName").type(data.firstName);
    cy.get("#lastName").type(data.lastName);
    cy.get("#email").type(data.email);
    cy.get("#open-text-area").type(data.text);
    cy.contains(".button", "Send").click();
  }
);
