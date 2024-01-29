export const parseRolls = (result, bladesSuccess) => {
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
