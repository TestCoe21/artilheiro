import { describe, expect, it, vi } from "vitest";
import { createPlayer } from "../src/engine/career/create-player";
import { developPlayerAttributes } from "../src/engine/career/develop-player-attributes";

describe("developPlayerAttributes", () => {
  it("deve evoluir atributos compatíveis com a função predominante da temporada", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);

    const player = createPlayer();

    const performance = {
      appearancesByRole: {
        ST: 20,
        CAM: 5,
      },
    };

    const developedPlayer = developPlayerAttributes(
      player,
      performance,
    );

    expect(developedPlayer.attributes.finishing).toBeGreaterThan(
      player.attributes.finishing,
    );

    expect(developedPlayer.attributes.marking).toBe(
      player.attributes.marking,
    );

    vi.restoreAllMocks();
  });

  it("deve usar a função mais exercida na temporada", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);

    const player = createPlayer();

    const performance = {
      appearancesByRole: {
        CAM: 20,
        ST: 5,
      },
    };

    const developedPlayer = developPlayerAttributes(
      player,
      performance,
    );

    expect(developedPlayer.attributes.passing).toBeGreaterThan(
      player.attributes.passing,
    );

    expect(developedPlayer.attributes.vision).toBeGreaterThan(
      player.attributes.vision,
    );

    vi.restoreAllMocks();
  });

  it("não deve evoluir atributos quando não houver função predominante", () => {
    const player = createPlayer();

    const performance = {
      appearancesByRole: {},
    };

    const developedPlayer = developPlayerAttributes(
      player,
      performance,
    );

    expect(developedPlayer.attributes).toEqual(player.attributes);
  });

  it("não deve ultrapassar o ceiling do jogador", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);

    const player = createPlayer();

    const playerWithHighAttribute = {
      ...player,
      attributes: {
        ...player.attributes,
        finishing: player.potential.ceiling - 1,
      },
    };

    const performance = {
      appearancesByRole: {
        ST: 20,
      },
    };

    const developedPlayer = developPlayerAttributes(
      playerWithHighAttribute,
      performance,
    );

    expect(developedPlayer.attributes.finishing).toBeLessThanOrEqual(
      player.potential.ceiling,
    );

    vi.restoreAllMocks();
  });

  it("não deve alterar o jogador original", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);

    const player = createPlayer();

    const originalAttributes = {
      ...player.attributes,
    };

    const performance = {
      appearancesByRole: {
        ST: 20,
      },
    };

    developPlayerAttributes(player, performance);

    expect(player.attributes).toEqual(originalAttributes);

    vi.restoreAllMocks();
  });
});