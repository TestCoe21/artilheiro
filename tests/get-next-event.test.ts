import { describe, expect, it } from "vitest";

import { getNextEvent } from "../src/engine/time/get-next-event";
import type { GameEvent } from "../src/domain/time/game-event";

describe("getNextEvent", () => {
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

  it("should find the next event", () => {
    const result = getNextEvent(
      {
        year: 2026,
        month: 8,
        day: 18,
        window: "08:30",
      },
      events,
    );

    expect(result?.id).toBe("training-001");
  });

  it("should skip empty time windows", () => {
    const result = getNextEvent(
      {
        year: 2026,
        month: 8,
        day: 18,
        window: "21:00",
      },
      events,
    );

    expect(result?.id).toBe("personal-001");
  });

  it("should return the closest future event", () => {
    const result = getNextEvent(
      {
        year: 2026,
        month: 8,
        day: 18,
        window: "16:30",
      },
      events,
    );

    expect(result?.id).toBe("personal-001");
  });

  it("should return null when there are no future events", () => {
    const result = getNextEvent(
      {
        year: 2026,
        month: 8,
        day: 20,
        window: "21:00",
      },
      events,
    );

    expect(result).toBeNull();
  });

  it("should correctly compare different months", () => {
    const monthlyEvents: GameEvent[] = [
      {
        id: "september-event",
        type: "personal",
        time: {
          year: 2026,
          month: 9,
          day: 1,
          window: "08:30",
        },
        title: "Evento de setembro",
      },
    ];

    const result = getNextEvent(
      {
        year: 2026,
        month: 8,
        day: 31,
        window: "21:00",
      },
      monthlyEvents,
    );

    expect(result?.id).toBe("september-event");
  });
});