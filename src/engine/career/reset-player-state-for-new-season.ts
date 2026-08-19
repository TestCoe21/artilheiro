import type { PlayerState } from "../../domain/player/player-state";

export function resetPlayerStateForNewSeason(
  state: PlayerState,
): PlayerState {
  return {
    health: 100,
    fatigue: 0,
    formLevel: 0,
    confidence: Math.min(state.confidence + 25, 100),
    pressure: Math.max(state.pressure - 25, 0),
    mood: Math.min(state.mood + 25, 100),
  };
}