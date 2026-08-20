import { describe, expect, it } from "vitest";

import { processMatchMinute } from "../src/engine/match/process-match-minute";
import type { Match } from "../src/domain/match/match";

describe("processPlayerMatchEvent", () => {
  const baseMatch: Match = {
    opponent: "Paraná",
    competition: "Brasileirão",
    home: true,

    minute: 10,
    status: "in_progress",

    homeGoals: 0,
    awayGoals: 0,

    playerSelected: true,
    playerStarting: true,
    playerEntered: false,
    playerExited: false,
  };

  const input = {
    finishing: 70,
    positioning: 70,
    ballControl: 70,
    confidence: 70,
    defensivePressure: 20,
    random: 0.8,
  };

  it("should allow an active player to receive a match event", () => {
    const result = processMatchMinute(baseMatch, input);

    expect(result.event).not.toBeNull();
  });

  it("should not give a player event when the player is on the bench", () => {
    const match: Match = {
      ...baseMatch,
      playerStarting: false,
      playerEntered: false,
    };

    const result = processMatchMinute(match, input);

    expect(result.event).toBeNull();
  });

  it("should not give a player event after being substituted", () => {
    const match: Match = {
      ...baseMatch,
      playerExited: true,
    };

    const result = processMatchMinute(match, input);

    expect(result.event).toBeNull();
  });

  it("should allow a substitute after entering the match", () => {
    const match: Match = {
      ...baseMatch,
      playerStarting: false,
      playerEntered: true,
    };

    const result = processMatchMinute(match, input);

    expect(result.event).not.toBeNull();
  });
});