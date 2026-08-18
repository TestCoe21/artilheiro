export function developAttribute(
  currentValue: number,
  ceiling: number,
  development: number,
): number {
  const nextValue = currentValue + development;

  return Math.min(nextValue, ceiling, 99);
}