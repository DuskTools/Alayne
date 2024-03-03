"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExplanation = void 0;
const getExplanation = (quantity, user) => {
    const isZero = quantity === 0;
    return [
        `${user.username} rolled ${isZero ? 2 : quantity} D6`,
        `and took the ${isZero ? 'lowest' : 'highest'} result`
    ];
};
exports.getExplanation = getExplanation;
