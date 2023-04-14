"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDecrement = void 0;
const buildClockMessageOptions_1 = require("../utils/buildClockMessageOptions");
const extractClockInfoFromEmbed_1 = require("../utils/extractClockInfoFromEmbed");
const clockNameLink_1 = require("./clockNameLink");
const handleDecrement = async (interaction) => {
    const link = interaction.message.url;
    const { name, segments, progress } = (0, extractClockInfoFromEmbed_1.extractClockInfoFromEmbed)(interaction.message.embeds[0]);
    const newProgress = progress - 1;
    if (newProgress < 0) {
        await interaction.reply({
            content: `${(0, clockNameLink_1.clockNameLink)(name, link)} cannot be reduced below 0`,
            ephemeral: true
        });
    }
    else {
        await interaction.message.edit((0, buildClockMessageOptions_1.buildClockMessageOptions)({
            name,
            segments,
            progress: newProgress
        }));
        await interaction.reply({
            content: `${(0, clockNameLink_1.clockNameLink)(name, link)} ticked down: **${newProgress}/${segments}**`
        });
    }
};
exports.handleDecrement = handleDecrement;
