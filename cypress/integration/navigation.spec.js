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
    cy.visits("/");
    // Clicks on the "Add" button in the second appointment
    
    // Enters their name

    // Chooses an interviewer

    // Clicks the save button

    // Sees the booked appointment
  });

});