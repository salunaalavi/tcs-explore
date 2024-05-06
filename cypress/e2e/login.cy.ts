import { cy, describe, beforeEach, it, context } from "local-cypress"
describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("successfully loads", () => {
    cy.url().should("include", "/login");
  });

  it("does login", () => {
    cy.findByRole("textbox", { name: /email/i}).type("marmar12@gmail.com")
    cy.findByLabelText(/password/i).type("secret")

    cy.findByText(/submit/i).click()

    cy.url().should("include", "/app/beranda");
  })

  context("on non mobile device", () => {
    beforeEach(() => {
      cy.viewport("macbook-13")
      cy.visit("/login");
    });
    
    it("successfully loads", () => {
      cy.url().should("include", "/login");
    });

    it("does login", () => {
      cy.findByRole("textbox", { name: /email/i}).type("marmar12@gmail.com")
      cy.findByLabelText(/password/i).type("secret")

      cy.findByText(/submit/i).click()

      cy.url().should("include", "/app/beranda");
    })
  })
})