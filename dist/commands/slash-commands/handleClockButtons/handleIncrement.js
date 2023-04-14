"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIncrement = void 0;
const buildClockMessageOptions_1 = require("../utils/buildClockMessageOptions");
const extractClockInfoFromEmbed_1 = require("../utils/extractClockInfoFromEmbed");
const clockNameLink_1 = require("./clockNameLink");
const handleIncrement = async (interaction) => {
    const link = interaction.message.url;
    const { name, segments, progress } = (0, extractClockInfoFromEmbed_1.extractClockInfoFromEmbed)(interaction.message.embeds[0]);
    const newProgress = progress + 1;
    if (newProgress >= segments) {
        await interaction.message.edit((0, buildClockMessageOptions_1.buildClockMessageOptions)({
            name,
            segments,
            progress: segments,
            footerText: 'A Completed Blades in the Darkscord clock'
        }));
        await interaction.reply({
            content: `${(0, clockNameLink_1.clockNameLink)(name, link)} completed - **${segments}/${segments}**`
        });
    }
    else {
        await interaction.message.edit((0, buildClockMessageOptions_1.buildClockMessageOptions)({
            name,
            segments,
            progress: newProgress
        }));
        await interaction.reply({
            content: `${(0, clockNameLink_1.clockNameLink)(name, link)} ticked up: **${newProgress}/${segments}**`
        });
    }
};
exports.handleIncrement = handleIncrement;
