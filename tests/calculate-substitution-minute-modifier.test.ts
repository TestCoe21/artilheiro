import { describe, expect, it } from "vitest";

import { calculateSubstitutionMinuteModifier } from "../src/engine/selection/calculate-substitution-minute-modifier";

describe("calculateSubstitutionMinuteModifier", () => {
  it("should give no bonus before minute 36", () => {
    expect(calculateSubstitutionMinuteModifier(0)).toBe(0);
    expect(calculateSubstitutionMinuteModifier(35)).toBe(0);
  });

  it("should give a small bonus from minute 36 to 44", () => {
    expect(calculateSubstitutionMinuteModifier(36)).toBe(2);
    expect(calculateSubstitutionMinuteModifier(44)).toBe(2);
  });

  it("should give a large bonus at minute 45", () => {
    expect(calculateSubstitutionMinuteModifier(45)).toBe(30);
  });

  it("should give a 10 point bonus from minute 46 to 60", () => {
    expect(calculateSubstitutionMinuteModifier(46)).toBe(10);
    expect(calculateSubstitutionMinuteModifier(60)).toBe(10);
  });

  it("should give a 20 point bonus from minute 61 to 70", () => {
    expect(calculateSubstitutionMinuteModifier(61)).toBe(20);
    expect(calculateSubstitutionMinuteModifier(70)).toBe(20);
  });

  it("should give a 30 point bonus from minute 71 to 75", () => {
    expect(calculateSubstitutionMinuteModifier(71)).toBe(30);
    expect(calculateSubstitutionMinuteModifier(75)).toBe(30);
  });

  it("should give a 40 point bonus from minute 76 to 80", () => {
    expect(calculateSubstitutionMinuteModifier(76)).toBe(40);
    expect(calculateSubstitutionMinuteModifier(80)).toBe(40);
  });

  it("should give a 50 point bonus from minute 81 to 85", () => {
    expect(calculateSubstitutionMinuteModifier(81)).toBe(50);
    expect(calculateSubstitutionMinuteModifier(85)).toBe(50);
  });

  it("should give a 60 point bonus from minute 86 to 89", () => {
    expect(calculateSubstitutionMinuteModifier(86)).toBe(60);
    expect(calculateSubstitutionMinuteModifier(89)).toBe(60);
  });

  it("should give a 30 point bonus from minute 90 onward", () => {
    expect(calculateSubstitutionMinuteModifier(90)).toBe(30);
    expect(calculateSubstitutionMinuteModifier(95)).toBe(30);
  });
});