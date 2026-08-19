import { describe, expect, it } from "vitest";

import { getEventAtTime } from "../src/engine/time/get-event-at-time";

describe("getEventAtTime", () => {
  const calendar = [
    {
      id: "training-1",
      date: {
        year: 2026,
        month: 8,
        day: 18,
      },
      window: "08:30" as const,
      type: "training" as const,
      title: "Treino da equipe",
    },
    {
      id: "match-1",
      date: {
        year: 2026,
        month: 8,
        day: 20,
      },
      window: "21:00" as const,
      type: "match" as const,
      title: "Coritiba x Paraná",
    },
  ];

  it("should find an event at the current time", () => {
    const result = getEventAtTime(calendar, {
      year: 2026,
      month: 8,
      day: 18,
      window: "08:30",
    });

    expect(result?.id).toBe("training-1");
  });

  it("should return null when there is no event", () => {
    const result = getEventAtTime(calendar, {
      year: 2026,
      month: 8,
      day: 18,
      window: "12:00",
    });

    expect(result).toBeNull();
  });

  it("should find a match event", () => {
    const result = getEventAtTime(calendar, {
      year: 2026,
      month: 8,
      day: 20,
      window: "21:00",
    });

    expect(result?.type).toBe("match");
  });
});