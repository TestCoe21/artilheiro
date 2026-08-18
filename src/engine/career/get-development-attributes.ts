import type { PlayerAttributes } from "../../domain/player/player-attributes";

export type DevelopmentAttribute = keyof PlayerAttributes;

const DEVELOPMENT_ATTRIBUTES: Record<string, DevelopmentAttribute[]> = {
  ST: [
    "finishing",
    "positioning",
    "speed",
    "dribbling",
    "ballControl",
    "heading",
    "strength",
  ],

  CF: [
    "finishing",
    "positioning",
    "vision",
    "passing",
    "dribbling",
    "ballControl",
    "heading",
  ],

  LW: [
    "speed",
    "dribbling",
    "ballControl",
    "crossing",
    "finishing",
    "passing",
    "agility",
  ],

  RW: [
    "speed",
    "dribbling",
    "ballControl",
    "crossing",
    "finishing",
    "passing",
    "agility",
  ],

  CAM: [
    "passing",
    "vision",
    "ballControl",
    "dribbling",
    "finishing",
    "positioning",
    "setPieces",
  ],

  CM: [
    "passing",
    "vision",
    "ballControl",
    "endurance",
    "positioning",
    "tackling",
    "crossing",
  ],

  CDM: [
    "passing",
    "vision",
    "tackling",
    "marking",
    "positioning",
    "strength",
    "endurance",
  ],

  LM: [
    "speed",
    "endurance",
    "crossing",
    "passing",
    "dribbling",
    "ballControl",
    "agility",
  ],

  RM: [
    "speed",
    "endurance",
    "crossing",
    "passing",
    "dribbling",
    "ballControl",
    "agility",
  ],

  LB: [
    "speed",
    "endurance",
    "crossing",
    "tackling",
    "marking",
    "agility",
  ],

  RB: [
    "speed",
    "endurance",
    "crossing",
    "tackling",
    "marking",
    "agility",
  ],

  CB: [
    "tackling",
    "marking",
    "heading",
    "strength",
    "positioning",
    "aggression",
    "endurance",
  ],

  GK: [
    "positioning",
    "vision",
    "emotionalControl",
    "agility",
    "strength",
  ],
};

export function getDevelopmentAttributes(
  role: string,
): DevelopmentAttribute[] {
  return DEVELOPMENT_ATTRIBUTES[role] ?? [];
}