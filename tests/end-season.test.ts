import { describe, expect, it } from "vitest";
import { createPlayer } from "../src/engine/career/create-player";
import { endSeason } from "../src/engine/career/end-season";

describe("endSeason", () => {
  it("deve avançar o jogador para a próxima temporada", () => {
    const player = createPlayer();

    const seasonResult = {
      collectiveAwards: 1,
      individualAwards: 1,
      promoted: false,
      relegated: false,
    };

    const nextSeasonPlayer = endSeason(player, seasonResult);

    expect(nextSeasonPlayer.identity.age).toBe(17);
    expect(nextSeasonPlayer.state.confidence).toBe(90);
  });

  it("não deve alterar o jogador original", () => {
    const player = createPlayer();

    const seasonResult = {
      collectiveAwards: 0,
      individualAwards: 0,
      promoted: false,
      relegated: false,
    };

    endSeason(player, seasonResult);

    expect(player.identity.age).toBe(16);
    expect(player.state.confidence).toBe(50);
  });
});