import type { Player } from "../../domain/player/player";
import { PLAYER_CONFIG } from "../../config/player-config";
import { createPotential } from "./create-potential";

export function createPlayer(): Player {
  return {
    identity: {
      name: "Novo Jogador",
      nationality: "BRA",
      age: PLAYER_CONFIG.initialAge,
      shirtNumber: 9,
      dominantFoot: "right",
      primaryPosition: "ST",
      primaryRole: "ST",
      secondaryPositions: [],
      dream: "become_top_scorer",
    },

    attributes: {
      ...PLAYER_CONFIG.defaultAttributes,
    },

    state: {
      fatigue: 0,
      health: 100,
      formLevel: 0,
      confidence: 50,
      pressure: 0,
      mood: 50,
    },

    potential: createPotential(),
  };
}