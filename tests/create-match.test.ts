import { describe, expect, it } from "vitest";

import { createMatch } from "../src/engine/match/create-match";

describe("createMatch", () => {
  it("should create a scheduled home match", () => {
    const match = createMatch(
      "Coritiba",
      "Brasileirão",
      true,
    );

    expect(match).toEqual({
      opponent: "Coritiba",
      competition: "Brasileirão",
      home: true,

      minute: 0,
      status: "scheduled",

      homeGoals: 0,
      awayGoals: 0,

      playerSelected: false,
      playerStarting: false,
      playerEntered: false,
      playerExited: false,
    });
  });

  it("should create a scheduled away match", () => {
    const match = createMatch(
      "Athletico",
      "Brasileirão",
      false,
    );

    expect(match.home).toBe(false);
    expect(match.opponent).toBe("Athletico");
    expect(match.status).toBe("scheduled");
    expect(match.minute).toBe(0);
  });
});