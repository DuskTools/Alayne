"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBladesRollType = void 0;
const getBladesRollType = (result, quantity) => {
    if (result.total === 6) {
        const isCritical = result.initialRolls.filter((roll) => roll === 6).length >= 2;
        if (isCritical && quantity > 0) {
            return 'critical';
        }
        return 'success';
    }
    if (result.total === 4 || result.total === 5) {
        return 'partial';
    }
    return 'failure';
};
exports.getBladesRollType = getBladesRollType;
