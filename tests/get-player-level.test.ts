import { describe, expect, it } from "vitest";

import { createPlayer } from "../src/engine/career/create-player";
import { getPlayerLevel } from "../src/engine/player/get-player-level";

describe("getPlayerLevel", () => {
  it("should calculate the average of player attributes", () => {
    const player = createPlayer();

    player.attributes = {
      passing: 80,
      finishing: 70,
      dribbling: 60,
    };

    expect(getPlayerLevel(player)).toBe(70);
  });

  it("should round down the result", () => {
    const player = createPlayer();

    player.attributes = {
      passing: 80,
      finishing: 70,
      dribbling: 61,
    };

    expect(getPlayerLevel(player)).toBe(70);
  });

  it("should return zero when there are no attributes", () => {
    const player = createPlayer();

    player.attributes = {};

    expect(getPlayerLevel(player)).toBe(0);
  });
});