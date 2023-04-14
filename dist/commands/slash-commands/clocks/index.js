"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clocks = void 0;
const findClocks_1 = require("../utils/findClocks");
const extractClockInfoFromEmbed_1 = require("../clock/extractClockInfoFromEmbed");
const buildClockMessageOptions_1 = require("../clock/buildClockMessageOptions");
const clocks = async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const clocks = await (0, findClocks_1.findClocks)(interaction);
    const embeds = clocks.map((clock) => {
        const embed = clock.embeds[0];
        const options = (0, extractClockInfoFromEmbed_1.extractClockInfoFromEmbed)(embed);
        const link = clock.url;
        return (0, buildClockMessageOptions_1.buildClockMessageOptions)({ ...options, link }).embeds[0];
    });
    if (embeds.length > 0) {
        interaction.editReply({ embeds });
    }
    else {
        interaction.editReply({ content: 'No clocks found!' });
    }
};
exports.clocks = clocks;
