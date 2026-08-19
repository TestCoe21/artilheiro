import type { Player } from "../../domain/player/player";

export function getPlayerLevel(player: Player): number {
  const values = Object.values(player.attributes);

  if (values.length === 0) {
    return 0;
  }

  return Math.floor(
    values.reduce((total, value) => total + value, 0) / values.length,
  );
}