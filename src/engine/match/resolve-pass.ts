export type PassResult = "complete" | "incomplete";

export function resolvePass(
  ballControl: number,
  pressure: number,
  random: number = Math.random(),
): PassResult {
  const control = Math.max(0, Math.min(100, ballControl));
  const defensivePressure = Math.max(0, Math.min(100, pressure));
  const roll = Math.max(0, Math.min(1, random));

  const chance =
    0.35 +
    control * 0.004 -
    defensivePressure * 0.003;

  return roll < chance ? "complete" : "incomplete";
}