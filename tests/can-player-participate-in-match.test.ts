import { describe, expect, it } from "vitest";

import { canPlayerParticipateInMatch } from "../src/engine/match/can-player-participate-in-match";
import type { Match } from "../src/domain/match/match";

describe("canPlayerParticipateInMatch", () => {
  const baseMatch: Match = {
    opponent: "Paraná",
    competition: "Brasileirão",
    home: true,

    minute: 30,
    status: "in_progress",

    homeGoals: 0,
    awayGoals: 0,

    playerSelected: true,
    playerStarting: true,
    playerEntered: false,
    playerExited: false,
  };

  it("should allow a starting player to participate", () => {
    expect(canPlayerParticipateInMatch(baseMatch)).toBe(true);
  });

  it("should allow a substitute who has entered the match", () => {
    const match: Match = {
      ...baseMatch,
      playerStarting: false,
      playerEntered: true,
    };

    expect(canPlayerParticipateInMatch(match)).toBe(true);
  });

  it("should not allow a selected substitute who has not entered", () => {
    const match: Match = {
      ...baseMatch,
      playerStarting: false,
      playerEntered: false,
    };

    expect(canPlayerParticipateInMatch(match)).toBe(false);
  });

  it("should not allow a player who has exited", () => {
    const match: Match = {
      ...baseMatch,
      playerExited: true,
    };

    expect(canPlayerParticipateInMatch(match)).toBe(false);
  });

  it("should not allow a player who was not selected", () => {
    const match: Match = {
      ...baseMatch,
      playerSelected: false,
      playerStarting: false,
      playerEntered: false,
    };

    expect(canPlayerParticipateInMatch(match)).toBe(false);
  });

  it("should not allow participation after the match has finished", () => {
    const match: Match = {
      ...baseMatch,
      status: "finished",
    };

    expect(canPlayerParticipateInMatch(match)).toBe(false);
  });
});