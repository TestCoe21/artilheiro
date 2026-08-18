import type { Player } from "../../domain/player/player";

export function developPlayer(player: Player): Player {
  return {
    ...player,
    attributes: {
      ...player.attributes,
    },
  };
}