import { describe, expect, it } from "vitest";

import {
  BRAZIL_CLUBS,
  getBrazilianClubById,
  getBrazilianClubsByDivision,
  getBrazilianClubsByRegionalCompetition,
  getBrazilianClubsByState,
  getSelectableBrazilianClubs,
} from "../../src/data/clubs/brazil-clubs";

describe("Brazilian club catalog", () => {
  it("should contain 40 selectable clubs", () => {
    const clubs = getSelectableBrazilianClubs();

    expect(clubs).toHaveLength(40);
    expect(clubs.every((club) => club.selectable)).toBe(true);
  });

  it("should contain 20 Serie A clubs", () => {
    const clubs = getBrazilianClubsByDivision("serie-a");

    expect(clubs).toHaveLength(20);
    expect(clubs.every((club) => club.selectable)).toBe(true);
  });

  it("should contain 20 Serie B clubs", () => {
    const clubs = getBrazilianClubsByDivision("serie-b");

    expect(clubs).toHaveLength(20);
    expect(clubs.every((club) => club.selectable)).toBe(true);
  });

  it("should find Palmeiras by id", () => {
    const club = getBrazilianClubById("palmeiras");

    expect(club).toBeDefined();
    expect(club?.name).toBe("Palmeiras");
    expect(club?.strength).toBe(80);
    expect(club?.state).toBe("SP");
    expect(club?.division).toBe("serie-a");
  });

  it("should classify clubs by regional competition", () => {
    const nordeste = getBrazilianClubsByRegionalCompetition("nordeste");
    const sulSudeste =
      getBrazilianClubsByRegionalCompetition("sul-sudeste");
    const verde =
      getBrazilianClubsByRegionalCompetition("verde");

    expect(nordeste.length).toBeGreaterThan(0);
    expect(sulSudeste.length).toBeGreaterThan(0);
    expect(verde.length).toBeGreaterThan(0);
  });

  it("should find clubs by state", () => {
    const parana = getBrazilianClubsByState("PR");

    expect(parana.map((club) => club.id)).toContain("coritiba");
    expect(parana.map((club) => club.id)).toContain("athletico-pr");
    expect(parana.map((club) => club.id)).toContain("operario");
  });

  it("should contain non-selectable Brazilian clubs", () => {
    const nonSelectable = BRAZIL_CLUBS.filter(
      (club) => !club.selectable,
    );

    expect(nonSelectable.length).toBeGreaterThan(0);
    expect(
      nonSelectable.some((club) => club.id === "csa"),
    ).toBe(true);
    expect(
      nonSelectable.some((club) => club.id === "paysandu"),
    ).toBe(true);
  });
});
