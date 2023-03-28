"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roll = void 0;
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
const getSuccessString = (type) => {
    const responseArray = ['====================================='];
    switch (type) {
        case 'critical':
            responseArray.push('|                        __**Critical Success**__                         |');
            responseArray.push('|          *Things go better than expected*           |');
            break;
        case 'success':
            responseArray.push('|                                 __**Success**__                                |');
            responseArray.push('|                            *Things go well*                          |');
            break;
        case 'partial':
            responseArray.push('|                        __**Partial Success**__                          |');
            responseArray.push('|        *Things go well, but not perfectly*           |');
            break;
        case 'failure':
            responseArray.push('|                                __**Failure**__                                   |');
            responseArray.push('|                       *Things go poorly*                          |');
            break;
    }
    responseArray.push('=====================================');
    return responseArray.join('\n');
};
const getBladesRollType = (result, quantity) => {
    if (result.total === 6) {
        const isCritical = result.rollParameters.initialRolls.filter((roll) => roll === 6).length >=
            2;
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
const parseRolls = (result, bladesSuccess) => {
    return result.rollParameters.initialRolls
        .map((roll, index, array) => {
        const isCritical = bladesSuccess === 'critical';
        const firstInstaceOfRoll = array.indexOf(roll) === index;
        return roll === result.total && (isCritical || firstInstaceOfRoll)
            ? `**${roll}**`
            : `~~${roll}~~`;
    })
        .join(', ');
};
const getExplanation = (quantity, user) => {
    const isZero = quantity === 0;
    return [
        `${user} rolls ${isZero ? 2 : quantity} D6`,
        `and takes the ${isZero ? 'lowest' : 'highest'} result...`
    ].join('\n');
};
async function roll(interaction) {
    const diceArg = interaction.options.getInteger('dice_pool');
    const quantity = diceArg === 0 ? 0 : diceArg || 1;
    const result = generateRollResult(quantity);
    const bladesSuccess = getBladesRollType(result, quantity);
    interaction.reply({
        content: [
            `*${getExplanation(quantity, interaction.user)}*`,
            '',
            `[${parseRolls(result, bladesSuccess)}] => ** ${result.total} ** `,
            '',
            getSuccessString(bladesSuccess)
        ].join('\n')
    });
}
exports.roll = roll;
