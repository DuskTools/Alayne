"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRollResult = void 0;
const generateRollResult = async (quantity) => {
    const { roll } = await import('randsum');
    const sides = 6;
    const isZero = quantity === 0;
    return roll({
        sides,
        quantity: isZero ? 2 : quantity,
        modifiers: [
            {
                drop: isZero
                    ? {
                        highest: 1
                    }
                    : {
                        lowest: quantity - 1
                    }
            }
        ]
    });
};
exports.generateRollResult = generateRollResult;
