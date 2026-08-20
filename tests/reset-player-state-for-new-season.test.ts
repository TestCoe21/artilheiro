import { describe, expect, it } from "vitest";

import { resetPlayerStateForNewSeason } from "../src/engine/career/reset-player-state-for-new-season";

describe("resetPlayerStateForNewSeason", () => {
  it("should reset health to 100", () => {
    const state = resetPlayerStateForNewSeason({
      health: 60,
      fatigue: 80,
      formLevel: 70,
      confidence: 50,
      pressure: 40,
      mood: 50,
    });

    expect(state.health).toBe(100);
  });

  it("should reset fatigue to 0", () => {
    const state = resetPlayerStateForNewSeason({
      health: 60,
      fatigue: 80,
      formLevel: 70,
      confidence: 50,
      pressure: 40,
      mood: 50,
    });

    expect(state.fatigue).toBe(0);
  });

  it("should reset form to 0", () => {
    const state = resetPlayerStateForNewSeason({
      health: 60,
      fatigue: 80,
      formLevel: 70,
      confidence: 50,
      pressure: 40,
      mood: 50,
    });

    expect(state.formLevel).toBe(0);
  });

  it("should increase confidence by 25", () => {
    const state = resetPlayerStateForNewSeason({
      health: 60,
      fatigue: 80,
      formLevel: 70,
      confidence: 50,
      pressure: 40,
      mood: 50,
    });

    expect(state.confidence).toBe(75);
  });

  it("should decrease pressure by 25", () => {
    const state = resetPlayerStateForNewSeason({
      health: 60,
      fatigue: 80,
      formLevel: 70,
      confidence: 50,
      pressure: 40,
      mood: 50,
    });

    expect(state.pressure).toBe(15);
  });

  it("should increase mood by 25", () => {
    const state = resetPlayerStateForNewSeason({
      health: 60,
      fatigue: 80,
      formLevel: 70,
      confidence: 50,
      pressure: 40,
      mood: 50,
    });

    expect(state.mood).toBe(75);
  });

  it("should never exceed 100", () => {
    const state = resetPlayerStateForNewSeason({
      health: 40,
      fatigue: 90,
      formLevel: 80,
      confidence: 90,
      pressure: 10,
      mood: 90,
    });

    expect(state.confidence).toBe(100);
    expect(state.mood).toBe(100);
  });

  it("should never go below 0", () => {
    const state = resetPlayerStateForNewSeason({
      health: 40,
      fatigue: 90,
      formLevel: 80,
      confidence: 20,
      pressure: 10,
      mood: 20,
    });

    expect(state.pressure).toBe(0);
  });
});