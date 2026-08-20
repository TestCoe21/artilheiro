import { describe, expect, it } from "vitest";

import { resolvePass } from "../src/engine/match/resolve-pass";

describe("resolvePass", () => {
  it("should complete a pass with a favorable roll", () => {
    const result = resolvePass(80, 20, 0.1);

    expect(result).toBe("complete");
  });

  it("should fail a pass with an unfavorable roll", () => {
    const result = resolvePass(40, 80, 0.99);

    expect(result).toBe("incomplete");
  });

  it("should be influenced by ball control", () => {
    const excellent = resolvePass(90, 50, 0.5);
    const poor = resolvePass(30, 50, 0.5);

    expect(excellent).toBe("complete");
    expect(poor).toBe("incomplete");
  });

  it("should be harder under high pressure", () => {
    const lowPressure = resolvePass(70, 10, 0.5);
    const highPressure = resolvePass(70, 90, 0.5);

    expect(lowPressure).toBe("complete");
    expect(highPressure).toBe("incomplete");
  });

  it("should return only a valid result", () => {
    const result = resolvePass(50, 50, 0.5);

    expect(["complete", "incomplete"]).toContain(result);
  });
});