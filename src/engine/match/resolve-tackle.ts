export type TackleResult = "success" | "fail";

export function resolveTackle(
  tackling: number,
  pressure: number,
  random: number = Math.random(),
): TackleResult {
  const tackle = Math.max(0, Math.min(100, tackling));
  const defensivePressure = Math.max(0, Math.min(100, pressure));
  const roll = Math.max(0, Math.min(1, random));

  const chance =
    0.30 +
    tackle * 0.005 -
    defensivePressure * 0.003;

  return roll < chance ? "success" : "fail";
}