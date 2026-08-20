import { describe, expect, it } from "vitest";

import { resolveDribble } from "../src/engine/match/resolve-dribble";

describe("resolveDribble", () => {
  it("should succeed with a very favorable roll", () => {
    const result = resolveDribble(80, 20, 0.1);

    expect(result).toBe("success");
  });

  it("should fail with a very unfavorable roll", () => {
    const result = resolveDribble(40, 80, 0.99);

    expect(result).toBe("fail");
  });

  it("should be influenced by ball control", () => {
    const excellent = resolveDribble(90, 50, 0.5);
    const poor = resolveDribble(30, 50, 0.5);

    expect(excellent).toBe("success");
    expect(poor).toBe("fail");
  });

  it("should be harder under high defensive pressure", () => {
    const lowPressure = resolveDribble(70, 10, 0.5);
    const highPressure = resolveDribble(70, 90, 0.5);

    expect(lowPressure).toBe("success");
    expect(highPressure).toBe("fail");
  });

  it("should return only a valid result", () => {
    const result = resolveDribble(50, 50, 0.5);

    expect(["success", "fail"]).toContain(result);
  });
});