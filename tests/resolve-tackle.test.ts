import { describe, expect, it } from "vitest";

import { resolveTackle } from "../src/engine/match/resolve-tackle";

describe("resolveTackle", () => {
  it("should succeed with a very favorable roll", () => {
    const result = resolveTackle(85, 20, 0.1);

    expect(result).toBe("success");
  });

  it("should fail with a very unfavorable roll", () => {
    const result = resolveTackle(40, 80, 0.99);

    expect(result).toBe("fail");
  });

  it("should be influenced by tackling", () => {
    const excellent = resolveTackle(90, 50, 0.5);
    const poor = resolveTackle(30, 50, 0.5);

    expect(excellent).toBe("success");
    expect(poor).toBe("fail");
  });

  it("should be harder under high defensive pressure", () => {
    const lowPressure = resolveTackle(70, 10, 0.5);
    const highPressure = resolveTackle(70, 90, 0.5);

    expect(lowPressure).toBe("success");
    expect(highPressure).toBe("fail");
  });

  it("should return only a valid result", () => {
    const result = resolveTackle(50, 50, 0.5);

    expect(["success", "fail"]).toContain(result);
  });
});