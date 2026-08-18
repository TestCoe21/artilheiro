import type { PlayerAttributes } from "./player-attributes";
import type { PlayerState } from "./player-state";
import type { PlayerPotential } from "../career/player-potential";

export interface Player {
  identity: {
    name: string;
    nationality: string;
    age: number;
    shirtNumber: number;
    dominantFoot: "left" | "right";
    primaryPosition: string;
    primaryRole: string;
    secondaryPositions: string[];
    dream: string;
  };

  attributes: PlayerAttributes;

  state: PlayerState;

  potential: PlayerPotential;
}