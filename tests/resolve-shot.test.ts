import { describe, expect, it } from "vitest";

import { resolveShot } from "../src/engine/match/resolve-shot";

describe("resolveShot", () => {
  it("should score with a very favorable roll", () => {
    const result = resolveShot({
      finishing: 90,
      positioning: 80,
      ballControl: 80,
      confidence: 80,
      random: 0.01,
    });

    expect(result).toBe("goal");
  });

  it("should miss with a very unfavorable roll", () => {
    const result = resolveShot({
      finishing: 20,
      positioning: 20,
      ballControl: 20,
      confidence: 20,
      random: 0.99,
    });

    expect(result).toBe("miss");
  });

  it("should return only a valid result", () => {
    const result = resolveShot({
      finishing: 60,
      positioning: 60,
      ballControl: 60,
      confidence: 50,
      random: 0.5,
    });

    expect(["goal", "miss"]).toContain(result);
  });

  it("should be influenced by finishing", () => {
    const excellent = resolveShot({
      finishing: 90,
      positioning: 50,
      ballControl: 50,
      confidence: 50,
      random: 0.5,
    });

    const poor = resolveShot({
      finishing: 20,
      positioning: 50,
      ballControl: 50,
      confidence: 50,
      random: 0.5,
    });

    expect(excellent).toBe("goal");
    expect(poor).toBe("miss");
  });

  it("should be harder to score under high defensive pressure", () => {
  const lowPressure = resolveShot({
    finishing: 80,
    positioning: 70,
    ballControl: 70,
    confidence: 70,
    defensivePressure: 20,
    random: 0.5,
  });

  const highPressure = resolveShot({
    finishing: 80,
    positioning: 70,
    ballControl: 70,
    confidence: 70,
    defensivePressure: 80,
    random: 0.6,
  });

  expect(lowPressure).toBe("goal");
  expect(highPressure).toBe("miss");
});

it("should treat defensive pressure as a value between 0 and 100", () => {
  const result = resolveShot({
    finishing: 70,
    positioning: 70,
    ballControl: 70,
    confidence: 70,
    defensivePressure: 50,
    random: 0.6,
  });

  expect(["goal", "miss"]).toContain(result);
});
});