import { fireEvent, render } from "@testing-library/react";
import { DatePicker } from "components";
import { baseTheme } from "constants/baseTheme";

import { mockGetItem, mockRemoveItem, mockSetItem } from "./mocks";

import "jest-styled-components";

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: (...args: string[]) => mockGetItem(...args),
    setItem: (...args: string[]) => mockSetItem(...args),
    removeItem: (...args: string[]) => mockRemoveItem(...args),
  },
});

describe("DatePicker controls", () => {
  beforeEach(() => {
    mockSetItem.mockClear();
    mockSetItem.mockClear();
  });
  it("should open selected date", () => {
    const { getByTestId, getByText } = render(<DatePicker />);
    const input = getByTestId("date-select-input");

    fireEvent.change(input, { target: { value: "12/12/2020" } });

    const calendarMonthBtn = getByText("December");
    const clanedarYearBrn = getByText("2020");
    const clearButton = getByTestId("clear-button");
    const selectDate = getByText("12");

    expect(input).toBeDefined();
    expect(selectDate).toHaveStyleRule("background", baseTheme.colors.blue);
    expect(clearButton).toBeDefined();
    expect(calendarMonthBtn).toBeDefined();
    expect(clanedarYearBrn).toBeDefined();
  });

  it("should open dates range", () => {
    const { getByTestId, getByText } = render(<DatePicker />);
    const fromDateInput = getByTestId("date-range-from-input");
    const toDateInput = getByTestId("date-range-to-input");

    fireEvent.change(fromDateInput, { target: { value: "12/12/2020" } });
    fireEvent.change(toDateInput, { target: { value: "18/12/2020" } });

    const calendarMonthBtn = getByText("December");
    const clanedarYearBrn = getByText("2020");
    const clearButton = getByTestId("clear-button");
    const startRangeBtn = getByText("12");
    const inRangeBtn = getByText("13");
    const endRangeBtn = getByText("18");

    expect(fromDateInput).toBeDefined();
    expect(toDateInput).toBeDefined();
    expect(clearButton).toBeDefined();

    expect(calendarMonthBtn).toBeDefined();
    expect(clanedarYearBrn).toBeDefined();

    expect(startRangeBtn).toHaveStyleRule("background", baseTheme.colors.lightBlue);
    expect(inRangeBtn).toHaveStyleRule("background", baseTheme.colors.veryLightBlue);
    expect(endRangeBtn).toHaveStyleRule("background", baseTheme.colors.lightBlue);
  });

  it("should open text-input", () => {
    const { getByPlaceholderText, getByText, getByTestId, queryByPlaceholderText } = render(
      <DatePicker />,
    );

    const dateBtn = getByText("12");

    fireEvent.click(dateBtn);

    const textInput = getByPlaceholderText("Add task...") as HTMLInputElement;
    fireEvent.change(textInput, { target: { value: "New task" } });

    const saveButton = getByTestId("save-btn");
    fireEvent.click(saveButton);

    const date = new Date();
    date.setDate(12);

    expect(queryByPlaceholderText("Add task...") as HTMLInputElement).toBeNull();

    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith(
      "todos",
      JSON.stringify([{ date: date.toDateString(), todo: ["New task"] }]),
    );
  });
});
