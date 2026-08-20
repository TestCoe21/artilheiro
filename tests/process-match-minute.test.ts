import { describe, expect, it } from "vitest";

import { processMatchMinute } from "../src/engine/match/process-match-minute";
import type { Match } from "../src/domain/match/match";

describe("processMatchMinute", () => {
  const baseMatch: Match = {
    opponent: "Paraná",
    competition: "Brasileirão",
    home: true,

    minute: 29,
    status: "in_progress",

    homeGoals: 0,
    awayGoals: 0,

    playerSelected: true,
    playerStarting: true,
    playerEntered: false,
    playerExited: false,
  };

  it("should advance the match by one minute", () => {
    const result = processMatchMinute(baseMatch, {
      finishing: 70,
      positioning: 70,
      ballControl: 70,
      confidence: 70,
      defensivePressure: 20,
      random: 0.99,
    });

    expect(result.match.minute).toBe(30);
  });

  it("should generate an event when the random roll creates one", () => {
    const result = processMatchMinute(baseMatch, {
      finishing: 70,
      positioning: 70,
      ballControl: 70,
      confidence: 70,
      defensivePressure: 20,
      random: 0.8,
    });

    expect(result.event).not.toBeNull();
    expect(result.event?.minute).toBe(30);
  });

  it("should resolve a goal when the event is a shot", () => {
    const result = processMatchMinute(baseMatch, {
      finishing: 90,
      positioning: 90,
      ballControl: 90,
      confidence: 90,
      defensivePressure: 0,
      random: 0.6,
    });

    if (result.event?.type === "shot") {
      expect(result.match.homeGoals).toBe(1);
    }
  });

  it("should return null when no event occurs", () => {
    const result = processMatchMinute(baseMatch, {
      finishing: 70,
      positioning: 70,
      ballControl: 70,
      confidence: 70,
      defensivePressure: 20,
      random: 0.1,
    });

    expect(result.event).toBeNull();
  });
});