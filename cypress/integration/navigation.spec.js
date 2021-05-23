describe("Navigation", () => {

  beforeEach(() => {
    cy.request("http://localhost:8001/api/debug/reset");
  })

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday").click()
      .should("have.class", "day-list__item--selected");
  });

  it("should book an interview", () => {

    // Visits the root of our web server
    cy.visit("/");

    // Clicks on the "Add" button in the second appointment
    cy.get(":nth-child(2) > .appointment__add > .appointment__add-button").click();

    // Enters their name
    cy.get("[data-testid=student-name-input]").type("Jessica Jones");

    // Chooses an interviewer
    cy.get(":nth-child(2) > .interviewers__item-image").click();

    // Clicks the save button
    cy.get(".button--confirm").click();

    // Sees the booked appointment
    cy.get(":nth-child(2) > .appointment__card > .appointment__card-left > h2.text--regular")
      .should("text", "Jessica Jones")
      .get(":nth-child(2) > .appointment__card > .appointment__card-left > .interviewer > .text--regular")
      .should("text", "Tori Malcolm")

  });

});