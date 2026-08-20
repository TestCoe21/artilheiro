import { describe, expect, it } from "vitest";

import { resolveMatchEvent } from "../src/engine/match/resolve-match-event";
import type { Match } from "../src/domain/match/match";
import type { MatchEvent } from "../src/domain/match/match-event";

describe("resolveMatchEvent", () => {
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

  it("should increase the home score when the player scores", () => {
    const event: MatchEvent = {
      minute: 30,
      type: "shot",
      description: "O jogador finaliza.",
    };

    const result = resolveMatchEvent(baseMatch, event, {
      finishing: 90,
      positioning: 90,
      ballControl: 90,
      confidence: 90,
      defensivePressure: 0,
      random: 0,
    });

    expect(result.homeGoals).toBe(1);
    expect(result.awayGoals).toBe(0);
  });

  it("should increase the away score when the player scores away from home", () => {
    const match = {
      ...baseMatch,
      home: false,
    };

    const event: MatchEvent = {
      minute: 30,
      type: "shot",
      description: "O jogador finaliza.",
    };

    const result = resolveMatchEvent(match, event, {
      finishing: 90,
      positioning: 90,
      ballControl: 90,
      confidence: 90,
      defensivePressure: 0,
      random: 0,
    });

    expect(result.homeGoals).toBe(0);
    expect(result.awayGoals).toBe(1);
  });

  it("should not change the score when the shot misses", () => {
    const event: MatchEvent = {
      minute: 30,
      type: "shot",
      description: "O jogador finaliza.",
    };

    const result = resolveMatchEvent(baseMatch, event, {
      finishing: 20,
      positioning: 20,
      ballControl: 20,
      confidence: 20,
      defensivePressure: 100,
      random: 0.99,
    });

    expect(result.homeGoals).toBe(0);
    expect(result.awayGoals).toBe(0);
  });

  it("should not change the match for non-shot events", () => {
    const event: MatchEvent = {
      minute: 30,
      type: "pass",
      description: "O jogador recebe a bola.",
    };

    const result = resolveMatchEvent(baseMatch, event, {
      finishing: 90,
      positioning: 90,
      ballControl: 90,
      confidence: 90,
      defensivePressure: 0,
      random: 0,
    });

    expect(result).toEqual(baseMatch);
  });
});