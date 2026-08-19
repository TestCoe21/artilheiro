import { describe, expect, it } from "vitest";

import { advanceTime } from "../src/engine/time/advance-time";

describe("advanceTime", () => {

  it("should advance from 08:30 to 12:00", () => {

    const result = advanceTime({
      year: 2026,
      month: 8,
      day: 18,
      window: "08:30",
    });

    expect(result.window).toBe("12:00");
  });

  it("should advance from 12:00 to 16:30", () => {

    const result = advanceTime({
      year: 2026,
      month: 8,
      day: 18,
      window: "12:00",
    });

    expect(result.window).toBe("16:30");
  });

  it("should advance to next day after 21:00", () => {

    const result = advanceTime({
      year: 2026,
      month: 8,
      day: 18,
      window: "21:00",
    });

    expect(result).toEqual({
      year: 2026,
      month: 8,
      day: 19,
      window: "08:30",
    });
  });

  it("should change month correctly", () => {

    const result = advanceTime({
      year: 2026,
      month: 8,
      day: 31,
      window: "21:00",
    });

    expect(result).toEqual({
      year: 2026,
      month: 9,
      day: 1,
      window: "08:30",
    });
  });

});