import type { SeasonPerformance } from "../../domain/career/season-performance";

export interface SeasonPerformanceEvaluation {
developmentLimit: number;
}

export function evaluateSeasonPerformance(
season: SeasonPerformance
): SeasonPerformanceEvaluation {
if (season.matchesPlayed <= 0) {
return {
developmentLimit: 0,
};
}

const goalContributions = season.goals + season.assists;
const contributionsPerMatch =
goalContributions / season.matchesPlayed;

if (contributionsPerMatch >= 0.8) {
return {
developmentLimit: 4,
};
}

if (contributionsPerMatch >= 0.6) {
return {
developmentLimit: 3,
};
}

if (contributionsPerMatch >= 0.4) {
return {
developmentLimit: 2,
};
}

if (contributionsPerMatch >= 0.2) {
return {
developmentLimit: 1,
};
}

return {
developmentLimit: 0,
};
}