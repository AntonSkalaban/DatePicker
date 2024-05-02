import { dateStrToFullDate, isDateValid, isMonthValid, isRangeCorrect } from "utils/index";

describe("Validation tests", () => {
  it("is date valid", () => {
    expect(isDateValid("12/12/1999")).toStrictEqual(true);
    expect(isDateValid("30/02/1999")).toStrictEqual(false);
  });
  it("should return is month valid", () => {
    expect(isMonthValid("12/12/1999")).toStrictEqual(true);
    expect(isMonthValid("12/13/1999")).toStrictEqual(false);
  });
  it("should return is date in range", () => {
    expect(
      isRangeCorrect(dateStrToFullDate("12/02/1999"), dateStrToFullDate("12/12/1999")),
    ).toStrictEqual(true);
    expect(
      isRangeCorrect(dateStrToFullDate("12/02/1999"), dateStrToFullDate("12/01/1999")),
    ).toStrictEqual(false);
  });
});
