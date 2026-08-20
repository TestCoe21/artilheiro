export type ShotResult = "goal" | "miss";

interface ResolveShotInput {
  finishing: number;
  positioning: number;
  ballControl: number;
  confidence: number;
  defensivePressure?: number;
  random?: number;
}

export function resolveShot({
  finishing,
  positioning,
  ballControl,
  confidence,
  defensivePressure = 0,
  random = Math.random(),
}: ResolveShotInput): ShotResult {
  const attackingQuality =
    finishing * 0.5 +
    positioning * 0.2 +
    ballControl * 0.15 +
    confidence * 0.15;

  const pressurePenalty = defensivePressure * 0.3;

  const chance = Math.max(
    0,
    attackingQuality - pressurePenalty,
  );

  const normalizedChance = chance / 100;

  return random < normalizedChance ? "goal" : "miss";
}