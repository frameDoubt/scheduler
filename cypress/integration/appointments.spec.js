describe("Application", () => {

  beforeEach(() => {

    cy.request("GET","/api/debug/reset");

    // Visits the root of our web server
    cy.visit("/");
    cy.contains("Monday");
    
  });

  it("should book an interview", () => {
  
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();
  
    // Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
  
    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
  
    // Clicks the save button
    cy.contains("Save").click();
  
    // Sees the booked appointment
    cy.get("[data-testid=appointment]")
      .contains(".appointment__card--show", "Lydia Miller-Jones")
      .contains(".appointment__card--show", "Sylvia Palmer")
  
  });
  
  it("should edit an interview", () => {
  
    // Clicks the edit button for the existing appointment
    // had to be forced due to visibility issue
    cy.get("[alt=Edit]").click({ force: true })

    // Changes the name and the interviewer
    cy.get("[data-testid=student-name-input]").clear()
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
    
    // Clicks the save button
    cy.contains("Save").click();
  
    // Sees the edit to the appointment
    cy.get("[data-testid=appointment]")
    .contains(".appointment__card--show", "Lydia Miller-Jones")
    .contains(".appointment__card--show", "Tori Malcolm")
  
  });
});