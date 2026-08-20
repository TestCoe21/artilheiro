import { describe, expect, it } from "vitest";

import { createMatch } from "../src/engine/match/create-match";
import { startMatch } from "../src/engine/match/start-match";
import { advanceMatchMinute } from "../src/engine/match/advance-match-minute";

describe("advanceMatchMinute", () => {
  it("should advance the match by one minute", () => {
    const match = startMatch(
      createMatch(
        "Coritiba",
        "Brasileirão",
        true,
      ),
    );

    const advancedMatch = advanceMatchMinute(match);

    expect(advancedMatch.minute).toBe(1);
  });

  it("should preserve the match status", () => {
    const match = startMatch(
      createMatch(
        "Coritiba",
        "Brasileirão",
        true,
      ),
    );

    const advancedMatch = advanceMatchMinute(match);

    expect(advancedMatch.status).toBe("in_progress");
  });

  it("should not mutate the original match", () => {
    const match = startMatch(
      createMatch(
        "Coritiba",
        "Brasileirão",
        true,
      ),
    );

    const advancedMatch = advanceMatchMinute(match);

    expect(match.minute).toBe(0);
    expect(advancedMatch.minute).toBe(1);
    expect(advancedMatch).not.toBe(match);
  });

  it("should advance from any current minute", () => {
    const match = {
      ...startMatch(
        createMatch(
          "Coritiba",
          "Brasileirão",
          true,
        ),
      ),
      minute: 75,
    };

    const advancedMatch = advanceMatchMinute(match);

    expect(advancedMatch.minute).toBe(76);
  });

  it("should finish the match at 90 minutes", () => {
    const match = {
      ...startMatch(
        createMatch(
          "Coritiba",
          "Brasileirão",
          true,
        ),
      ),
      minute: 89,
    };

    const advancedMatch = advanceMatchMinute(match);

    expect(advancedMatch.minute).toBe(90);
    expect(advancedMatch.status).toBe("finished");
  });

  it("should not advance a finished match", () => {
    const match = {
      ...startMatch(
        createMatch(
          "Coritiba",
          "Brasileirão",
          true,
        ),
      ),
      minute: 90,
      status: "finished" as const,
    };

    const advancedMatch = advanceMatchMinute(match);

    expect(advancedMatch.minute).toBe(90);
    expect(advancedMatch.status).toBe("finished");
    expect(advancedMatch).toBe(match);
  });
});