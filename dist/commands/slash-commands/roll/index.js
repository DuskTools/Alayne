"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roll = void 0;
const builders_1 = require("@discordjs/builders");
const generateRollResult_1 = require("./generateRollResult");
const getColor_1 = require("./getColor");
const getExplanation_1 = require("./getExplanation");
const parseRolls_1 = require("./parseRolls");
const getThumbail_1 = require("./getThumbail");
const getBladesRollType_1 = require("./getBladesRollType");
const getSuccessString_1 = require("./getSuccessString");
const buildEmbed = (interaction) => {
    const diceArg = interaction.options.getInteger('dice_pool');
    const quantity = diceArg === 0 ? 0 : diceArg || 1;
    const result = (0, generateRollResult_1.generateRollResult)(quantity);
    const bladesSuccess = (0, getBladesRollType_1.getBladesRollType)(result, quantity);
    const [explanationTitle, explanationValue] = (0, getExplanation_1.getExplanation)(quantity, interaction.user);
    const [successTitle, successValue] = (0, getSuccessString_1.getSuccessString)(bladesSuccess);
    const thumbnail = (0, getThumbail_1.getThumbnail)(result.total, bladesSuccess);
    return new builders_1.EmbedBuilder()
        .setColor((0, getColor_1.getColor)(bladesSuccess))
        .setTitle(successTitle)
        .setDescription(successValue)
        .setThumbnail(thumbnail)
        .addFields({ name: '\u200B', value: '\u200B' })
        .addFields({ name: explanationTitle, value: explanationValue })
        .addFields({
        name: 'Rolls',
        value: `[${(0, parseRolls_1.parseRolls)(result, bladesSuccess)}]`,
        inline: true
    }, { name: 'Total', value: `** ${result.total} **`, inline: true });
};
async function roll(interaction) {
    const embed = buildEmbed(interaction);
    interaction.reply({ embeds: [embed] });
}
exports.roll = roll;
