import { describe, expect, it } from "vitest";

import { createMatch } from "../src/engine/match/create-match";
import { startMatch } from "../src/engine/match/start-match";

describe("startMatch", () => {
  it("should start a scheduled match", () => {
    const match = createMatch(
      "Coritiba",
      "Brasileirão",
      true,
    );

    const startedMatch = startMatch(match);

    expect(startedMatch.status).toBe("in_progress");
    expect(startedMatch.minute).toBe(0);
  });

  it("should preserve the match information", () => {
    const match = createMatch(
      "Coritiba",
      "Brasileirão",
      true,
    );

    const startedMatch = startMatch(match);

    expect(startedMatch.opponent).toBe("Coritiba");
    expect(startedMatch.competition).toBe("Brasileirão");
    expect(startedMatch.home).toBe(true);
    expect(startedMatch.homeGoals).toBe(0);
    expect(startedMatch.awayGoals).toBe(0);
  });

  it("should not mutate the original match", () => {
    const match = createMatch(
      "Coritiba",
      "Brasileirão",
      true,
    );

    const startedMatch = startMatch(match);

    expect(match.status).toBe("scheduled");
    expect(startedMatch).not.toBe(match);
  });
});