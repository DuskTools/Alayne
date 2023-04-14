"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRestart = void 0;
const buildClockMessageOptions_1 = require("../utils/buildClockMessageOptions");
const extractClockInfoFromEmbed_1 = require("../utils/extractClockInfoFromEmbed");
const clockNameLink_1 = require("./clockNameLink");
const handleRestart = async (interaction) => {
    const link = interaction.message.url;
    const { name, segments, progress } = (0, extractClockInfoFromEmbed_1.extractClockInfoFromEmbed)(interaction.message.embeds[0]);
    await interaction.message.edit((0, buildClockMessageOptions_1.buildClockMessageOptions)({
        name,
        segments,
        progress: progress
    }));
    await interaction.reply({
        content: `${(0, clockNameLink_1.clockNameLink)(name, link)} **Restarted**`
    });
};
exports.handleRestart = handleRestart;
