import { describe, expect, it } from "vitest";

import { advanceToNextEvent } from "../src/engine/time/advance-to-next-event";
import type { GameEvent } from "../src/domain/time/game-event";

describe("advanceToNextEvent", () => {
  const events: GameEvent[] = [
    {
      id: "training-001",
      type: "training",
      time: {
        year: 2026,
        month: 8,
        day: 18,
        window: "16:30",
      },
      title: "Treinamento",
    },
    {
      id: "personal-001",
      type: "personal",
      time: {
        year: 2026,
        month: 8,
        day: 19,
        window: "12:00",
      },
      title: "Evento pessoal",
    },
    {
      id: "match-001",
      type: "match",
      time: {
        year: 2026,
        month: 8,
        day: 20,
        window: "16:30",
      },
      title: "Jogo",
    },
  ];

  it("should skip empty windows and stop at the next event", () => {
    const result = advanceToNextEvent(
      {
        year: 2026,
        month: 8,
        day: 18,
        window: "08:30",
      },
      events,
    );

    expect(result).toEqual({
      year: 2026,
      month: 8,
      day: 18,
      window: "16:30",
    });
  });

  it("should advance to an event on the next day", () => {
    const result = advanceToNextEvent(
      {
        year: 2026,
        month: 8,
        day: 18,
        window: "21:00",
      },
      events,
    );

    expect(result).toEqual({
      year: 2026,
      month: 8,
      day: 19,
      window: "12:00",
    });
  });

  it("should advance across multiple days", () => {
    const result = advanceToNextEvent(
      {
        year: 2026,
        month: 8,
        day: 19,
        window: "16:30",
      },
      events,
    );

    expect(result).toEqual({
      year: 2026,
      month: 8,
      day: 20,
      window: "16:30",
    });
  });

  it("should keep the current time when there are no future events", () => {
    const currentTime = {
      year: 2026,
      month: 8,
      day: 21,
      window: "08:30" as const,
    };

    const result = advanceToNextEvent(currentTime, events);

    expect(result).toEqual(currentTime);
  });
});