import type { Player } from "../../domain/player/player";
import type { SeasonPerformance } from "../../domain/career/season-performance";
import { calculateAttributeDevelopment } from "./calculate-attribute-development";
import { getDevelopmentAttributes } from "./get-development-attributes";
import { selectDevelopmentAttributes } from "./select-development-attributes";
import { getPrimarySeasonRole } from "./get-primary-season-role";

export function developPlayerAttributes(
  player: Player,
  performance: SeasonPerformance,
): Player {
  const primaryRole = getPrimarySeasonRole(performance);

  if (!primaryRole) {
    return {
      ...player,
      attributes: {
        ...player.attributes,
      },
    };
  }

  const developmentAttributes = getDevelopmentAttributes(primaryRole);

  const selectedAttributes = selectDevelopmentAttributes(
    developmentAttributes,
  );

  const attributes = {
    ...player.attributes,
  };

  for (const attribute of selectedAttributes) {
    const development = calculateAttributeDevelopment(player.identity.age);

    const currentValue = attributes[attribute];

    attributes[attribute] = Math.min(
      currentValue + development,
      player.potential.ceiling,
    );
  }

  return {
    ...player,
    attributes,
  };
}