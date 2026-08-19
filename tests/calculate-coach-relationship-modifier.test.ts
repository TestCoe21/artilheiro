import { describe, expect, it } from "vitest";

import { calculateCoachRelationshipModifier } from "../src/engine/selection/calculate-coach-relationship-modifier";

describe("calculateCoachRelationshipModifier", () => {
  it("should give -20 for very low relationship", () => {
    expect(calculateCoachRelationshipModifier(0)).toBe(-20);
    expect(calculateCoachRelationshipModifier(19)).toBe(-20);
  });

  it("should give -10 for low relationship", () => {
    expect(calculateCoachRelationshipModifier(20)).toBe(-10);
    expect(calculateCoachRelationshipModifier(39)).toBe(-10);
  });

  it("should give 0 for neutral relationship", () => {
    expect(calculateCoachRelationshipModifier(40)).toBe(0);
    expect(calculateCoachRelationshipModifier(59)).toBe(0);
  });

  it("should give +5 for good relationship", () => {
    expect(calculateCoachRelationshipModifier(60)).toBe(5);
    expect(calculateCoachRelationshipModifier(79)).toBe(5);
  });

  it("should give +10 for excellent relationship", () => {
    expect(calculateCoachRelationshipModifier(80)).toBe(10);
    expect(calculateCoachRelationshipModifier(100)).toBe(10);
  });
});