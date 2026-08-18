import { describe, expect, it } from "vitest";
import { evaluateSeasonPerformance } from "../src/engine/career/evaluate-season-performance";
import type { SeasonPerformance } from "../src/domain/career/season-performance";

describe("evaluateSeasonPerformance", () => {
it("deve considerar excelente uma temporada com 80% ou mais de participações em gols", () => {
const season: SeasonPerformance = {
appearancesByRole: {
ST: 10,
},
matchesPlayed: 10,
goals: 5,
assists: 3,
};

const result = evaluateSeasonPerformance(season);


expect(result.developmentLimit).toBe(4);

});

it("deve considerar boa uma temporada com 60% ou mais de participações em gols", () => {
const season: SeasonPerformance = {
appearancesByRole: {
ST: 10,
},
matchesPlayed: 10,
goals: 4,
assists: 2,
};

const result = evaluateSeasonPerformance(season);


expect(result.developmentLimit).toBe(3);

});

it("deve considerar normal uma temporada com 40% ou mais de participações em gols", () => {
const season: SeasonPerformance = {
appearancesByRole: {
ST: 10,
},
matchesPlayed: 10,
goals: 2,
assists: 2,
};

const result = evaluateSeasonPerformance(season);


expect(result.developmentLimit).toBe(2);

});

it("deve considerar fraca uma temporada com 20% ou mais de participações em gols", () => {
const season: SeasonPerformance = {
appearancesByRole: {
ST: 10,
},
matchesPlayed: 10,
goals: 1,
assists: 1,
};

const result = evaluateSeasonPerformance(season);


expect(result.developmentLimit).toBe(1);

});

it("deve considerar sem desenvolvimento uma temporada abaixo de 20%", () => {
const season: SeasonPerformance = {
appearancesByRole: {
ST: 10,
},
matchesPlayed: 10,
goals: 1,
assists: 0,
};

const result = evaluateSeasonPerformance(season);


expect(result.developmentLimit).toBe(0);

});

it("deve retornar 0 quando o jogador não disputar partidas", () => {
const season: SeasonPerformance = {
appearancesByRole: {},
matchesPlayed: 0,
goals: 10,
assists: 5,
};

const result = evaluateSeasonPerformance(season);


expect(result.developmentLimit).toBe(0);

});
});