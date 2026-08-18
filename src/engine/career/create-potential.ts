import type { PlayerPotential } from "../../domain/career/player-potential";

export function createPotential(): PlayerPotential {
  const base = Math.floor(Math.random() * 99) + 1;

  const variation = Math.floor(Math.random() * 31) - 15;

  const ceiling = Math.max(1, Math.min(99, base + variation));

  return {
    base,
    ceiling,
  };
}