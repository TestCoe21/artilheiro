import type { DevelopmentAttribute } from "./get-development-attributes";

export function selectDevelopmentAttributes(
  attributes: DevelopmentAttribute[],
): DevelopmentAttribute[] {
  if (attributes.length <= 4) {
    return [...attributes];
  }

  const shuffled = [...attributes];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const amount = 2 + Math.floor(Math.random() * 3);

  return shuffled.slice(0, amount);
}