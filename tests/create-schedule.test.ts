import { describe, expect, it } from "vitest";

import { createSchedule } from "../src/engine/time/create-schedule";

describe("createSchedule", () => {
  it("should create the initial weekly schedule", () => {
    const schedule = createSchedule({
      year: 2026,
      month: 8,
      day: 17,
    });

    expect(schedule.events).toHaveLength(8);
  });

  it("should place matches on Wednesday and Sunday", () => {
    const schedule = createSchedule({
      year: 2026,
      month: 8,
      day: 17,
    });

    const matches = schedule.events.filter(
      (event) => event.type === "match",
    );

    expect(matches).toHaveLength(2);

    expect(matches[0].time).toEqual({
      year: 2026,
      month: 8,
      day: 19,
      window: "16:30",
    });

    expect(matches[1].time).toEqual({
      year: 2026,
      month: 8,
      day: 23,
      window: "16:30",
    });
  });

  it("should schedule recovery training on the afternoon after a match", () => {
    const schedule = createSchedule({
      year: 2026,
      month: 8,
      day: 17,
    });

    const recoveryTraining = schedule.events.find(
      (event) => event.id === "training-003",
    );

    expect(recoveryTraining).toBeDefined();

    expect(recoveryTraining?.time).toEqual({
      year: 2026,
      month: 8,
      day: 20,
      window: "16:30",
    });
  });

  it("should schedule concentration on the afternoon before the second match", () => {
    const schedule = createSchedule({
      year: 2026,
      month: 8,
      day: 17,
    });

    const concentration = schedule.events.find(
      (event) => event.id === "personal-001",
    );

    expect(concentration).toBeDefined();

    expect(concentration?.time).toEqual({
      year: 2026,
      month: 8,
      day: 22,
      window: "16:30",
    });
  });
});