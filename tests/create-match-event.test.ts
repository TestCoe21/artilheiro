import { describe, expect, it } from "vitest";

import type { MatchEvent } from "../src/domain/match/match-event";
import { createMatchEvent } from "../src/engine/match/create-match-event";

describe("MatchEvent", () => {
  it("should represent a match event", () => {
    const event: MatchEvent = {
      minute: 12,
      type: "pass",
      description: "O jogador recebe a bola no meio-campo.",
    };

    expect(event.minute).toBe(12);
    expect(event.type).toBe("pass");
    expect(event.description).toBe(
      "O jogador recebe a bola no meio-campo.",
    );
  });
});

describe("createMatchEvent", () => {
  it("should return null when there is no event", () => {
    const event = createMatchEvent(20, 0.2);

    expect(event).toBeNull();
  });

  it("should create an event when the random value triggers one", () => {
    const event = createMatchEvent(20, 0.6);

    expect(event).not.toBeNull();
    expect(event?.minute).toBe(20);
  });

  it("should never create an event at minute zero", () => {
    const event = createMatchEvent(0, 0.9);

    expect(event).toBeNull();
  });

  it("should never create an event after 89 minutes", () => {
    const event = createMatchEvent(90, 0.9);

    expect(event).toBeNull();
  });

  it("should create a valid event type", () => {
    const event = createMatchEvent(45, 0.6);

    expect([
      "pass",
      "dribble",
      "shot",
      "tackle",
      "save",
    ]).toContain(event?.type);
  });
});