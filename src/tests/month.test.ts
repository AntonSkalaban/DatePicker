import { getDaysInMonth, getMonthName, getNextMonth, getPrevMonth } from "utils/index";

import { date } from "./mocks";

describe("Month tests", () => {
  it("should get month name", () => {
    expect(getMonthName(date)).toStrictEqual("December");
  });
  it("should get days in month", () => {
    expect(getDaysInMonth(date)).toStrictEqual(31);
  });
  it("should get prev month", () => {
    expect(getPrevMonth(date.getFullYear(), date.getMonth())).toStrictEqual([1999, 10]);
  });
  it("should get next month", () => {
    expect(getNextMonth(date.getFullYear(), date.getMonth())).toStrictEqual([2000, 0]);
  });
});
