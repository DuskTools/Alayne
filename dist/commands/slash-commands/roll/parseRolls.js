"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRolls = void 0;
const parseRolls = (result, bladesSuccess) => {
    return result.initialRolls
        .map((roll, index, array) => {
        const isCritical = bladesSuccess === 'critical';
        const firstInstaceOfRoll = array.indexOf(roll) === index;
        return roll === result.total && (isCritical || firstInstaceOfRoll)
            ? `**${roll}**`
            : `~~${roll}~~`;
    })
        .join(', ');
};
exports.parseRolls = parseRolls;
