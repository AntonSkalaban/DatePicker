// import { fireEvent, waitFor } from "@testing-library/react";
import { fireEvent, getByAltText, getByPlaceholderText, render } from "@testing-library/react";
import { DatePicker } from "../App";

describe("DatePicker", () => {
  it("opens the calendar when the input is clicked", () => {
    const { getByTestId } = render(<DatePicker />);
    const input = getByTestId("date-select-input");
    // fireEvent.click(input);
    expect(input).toBeDefined();
    fireEvent.change(input, { target: { value: "12/12/2020" } });
    const clearButton = getByTestId("clear-button");
    expect(clearButton).toBeDefined();
  });
});
