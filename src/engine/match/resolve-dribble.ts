export type DribbleResult = "success" | "fail";

export function resolveDribble(
  ballControl: number,
  pressure: number,
  random: number = Math.random(),
): DribbleResult {
  const control = Math.max(0, Math.min(100, ballControl));
  const defensivePressure = Math.max(0, Math.min(100, pressure));
  const roll = Math.max(0, Math.min(1, random));

  const chance =
    0.30 +
    control * 0.005 -
    defensivePressure * 0.003;

  return roll < chance ? "success" : "fail";
}