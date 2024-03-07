import { roll } from "npm:randsum";

export const generateRollResult = (quantity: number) => {
  const sides = 6;
  const isZero = quantity === 0;
  return roll({
    sides,
    quantity: isZero ? 2 : quantity,
    modifiers: [
      {
        drop: isZero
          ? {
            highest: 1,
          }
          : {
            lowest: quantity - 1,
          },
      },
    ],
  });
};
