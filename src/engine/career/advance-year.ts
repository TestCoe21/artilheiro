import type { Player } from "../../domain/player/player";
import type { SeasonResult } from "../../domain/career/season-result";
import { calculateConfidence } from "./calculate-confidence";

export function advanceYear(
  player: Player,
  seasonResult: SeasonResult,
): Player {
  return {
    ...player,

    identity: {
      ...player.identity,
      age: player.identity.age + 1,
    },

    attributes: {
      ...player.attributes,
      emotionalControl: Math.min(
        99,
        player.attributes.emotionalControl + 2,
      ),
    },

    state: {
      ...player.state,
      fatigue: 0,
      health: player.state.health * 0.975,
      formLevel: 0,
      confidence: calculateConfidence(
        player.state.confidence,
        seasonResult,
      ),
      pressure: player.state.pressure * 0.75,
      mood: Math.min(
        100,
        player.state.mood * 1.25,
      ),
    },
  };
}