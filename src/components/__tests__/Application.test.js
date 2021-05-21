import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await  waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // expect(day).toHaveValue("no spots remaining")
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    console.log(prettyDOM(day));

    console.log(prettyDOM(appointment));
  }); 
  it("loads data, cancels an interview and increases the spot remaining for Monday by 1", async () => {
    // render Application
    const { container } = render(<Application />);
    // wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"))
    // click the "Delete" button on booked appointment
    // const appointment = getAllByTestId(container, "appointment").find(appt => queryByText(appt, "Archie Cohen"));
    // fireEvent.click(getByAltText(appointment, "Delete"));

    // check that the confirmation message is shown
    // click the "Confirm" button on the confirmation
    // check that element with text "Deleting" is displayed
    // wait until the element with the "Add" button is displayed
    // check that the DayListItem with the text "Monday" also has the text "2 spots remaining"

  });
});
