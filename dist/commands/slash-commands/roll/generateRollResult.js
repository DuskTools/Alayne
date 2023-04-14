"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRollResult = void 0;
const randsum_1 = require("randsum");
const generateRollResult = (quantity) => {
    const sides = 6;
    const isZero = quantity === 0;
    return (0, randsum_1.roll)({
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
