import { describe, expect, it } from "vitest";
import { createPlayer } from "../src/engine/career/create-player";
import { advanceYear } from "../src/engine/career/advance-year";
import { developPlayer } from "../src/engine/career/develop-player";

describe("createPlayer", () => {
  it("deve criar um jogador com a idade inicial correta", () => {
    const player = createPlayer();

    expect(player.identity.age).toBe(16);
  });

  it("deve criar um jogador com os atributos padrão", () => {
    const player = createPlayer();

    expect(player.attributes.passing).toBe(50);
    expect(player.attributes.finishing).toBe(50);
    expect(player.attributes.speed).toBe(50);
    expect(player.attributes.vision).toBe(50);
  });

  it("deve criar um jogador com o estado inicial correto", () => {
    const player = createPlayer();

    expect(player.state.fatigue).toBe(0);
    expect(player.state.health).toBe(100);
    expect(player.state.formLevel).toBe(0);
    expect(player.state.confidence).toBe(50);
    expect(player.state.pressure).toBe(0);
    expect(player.state.mood).toBe(50);
  });

  it("deve criar um jogador com a identidade inicial correta", () => {
    const player = createPlayer();

    expect(player.identity.name).toBe("Novo Jogador");
    expect(player.identity.nationality).toBe("BRA");
    expect(player.identity.shirtNumber).toBe(9);
    expect(player.identity.dominantFoot).toBe("right");
    expect(player.identity.primaryPosition).toBe("ST");
    expect(player.identity.primaryRole).toBe("ST");
    expect(player.identity.secondaryPositions).toEqual([]);
    expect(player.identity.dream).toBe("become_top_scorer");
  });

it("deve criar um potencial válido para o jogador", () => {
  const player = createPlayer();

  expect(player.potential.base).toBeGreaterThanOrEqual(1);
  expect(player.potential.base).toBeLessThanOrEqual(99);

  expect(player.potential.ceiling).toBeGreaterThanOrEqual(1);
  expect(player.potential.ceiling).toBeLessThanOrEqual(99);

  expect(
    Math.abs(player.potential.ceiling - player.potential.base)
  ).toBeLessThanOrEqual(15);
});
});

describe("advanceYear", () => {
  const emptySeasonResult = {
    collectiveAwards: 0,
    individualAwards: 0,
    promoted: false,
    relegated: false,
  };

  it("deve aumentar a idade do jogador em 1 ano", () => {
    const player = createPlayer();

    const advancedPlayer = advanceYear(player, emptySeasonResult);

    expect(advancedPlayer.identity.age).toBe(17);
  });

  it("não deve alterar o jogador original", () => {
    const player = createPlayer();

    advanceYear(player, emptySeasonResult);

    expect(player.identity.age).toBe(16);
  });

  it("deve zerar a fadiga ao avançar o ano", () => {
    const player = createPlayer();

    player.state.fatigue = 75;

    const advancedPlayer = advanceYear(player, emptySeasonResult);

    expect(advancedPlayer.state.fatigue).toBe(0);
  });

  it("deve reduzir a pressão em 25% ao avançar o ano", () => {
    const player = createPlayer();

    player.state.pressure = 80;

    const advancedPlayer = advanceYear(player, emptySeasonResult);

    expect(advancedPlayer.state.pressure).toBe(60);
  });

  it("deve zerar a forma ao avançar o ano", () => {
    const player = createPlayer();

    player.state.formLevel = 75;

    const advancedPlayer = advanceYear(player, emptySeasonResult);

    expect(advancedPlayer.state.formLevel).toBe(0);
  });

  it("deve aumentar o mood em 25% ao avançar o ano", () => {
    const player = createPlayer();

    player.state.mood = 60;

    const advancedPlayer = advanceYear(player, emptySeasonResult);

    expect(advancedPlayer.state.mood).toBe(75);
  });

  it("deve reduzir a health em 2,5% ao avançar o ano", () => {
    const player = createPlayer();

    const advancedPlayer = advanceYear(player, emptySeasonResult);

    expect(advancedPlayer.state.health).toBe(97.5);
  });

  it("deve calcular a confiança com base no resultado da temporada", () => {
    const player = createPlayer();

    const seasonResult = {
      collectiveAwards: 1,
      individualAwards: 1,
      promoted: false,
      relegated: false,
    };

    const advancedPlayer = advanceYear(player, seasonResult);

    expect(advancedPlayer.state.confidence).toBe(90);
  });

  it("deve aumentar o controle emocional em 2 pontos ao avançar o ano", () => {
    const player = createPlayer();

    player.attributes.emotionalControl = 50;

    const seasonResult = {
      collectiveAwards: 0,
      individualAwards: 0,
      promoted: false,
      relegated: false,
    };

    const advancedPlayer = advanceYear(player, seasonResult);

    expect(advancedPlayer.attributes.emotionalControl).toBe(52);
  });

it("não deve ultrapassar 99 de controle emocional", () => {
  const player = createPlayer();

  player.attributes.emotionalControl = 99;

  const seasonResult = {
    collectiveAwards: 0,
    individualAwards: 0,
    promoted: false,
    relegated: false,
  };

  const advancedPlayer = advanceYear(player, seasonResult);

  expect(advancedPlayer.attributes.emotionalControl).toBe(99);
});

});

describe("developPlayer", () => {
  it("deve retornar um novo jogador", () => {
    const player = createPlayer();

    const developedPlayer = developPlayer(player);

    expect(developedPlayer).not.toBe(player);
  });

  it("não deve alterar o jogador original", () => {
    const player = createPlayer();

    const originalAttributes = { ...player.attributes };

    developPlayer(player);

    expect(player.attributes).toEqual(originalAttributes);
  });
});