"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildClockMessageOptions = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("./constants");
const clockImage_1 = require("./clockImage");
const getColor_1 = require("./getColor");
const buildClockMessageOptions = ({ name, segments, progress = 0, footerText = constants_1.RunningClockFooter, link }) => {
    const fields = [
        {
            name: 'Progress',
            value: `${progress}/${segments}`
        }
    ];
    if (link) {
        fields.push({
            name: ' ',
            value: `[See Clock](${link})`
        });
    }
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(name)
        .setThumbnail((0, clockImage_1.clockImage)(progress, segments))
        .setColor((0, getColor_1.getColor)(progress, segments))
        .setFooter({ text: footerText })
        .addFields(fields);
    const showStop = footerText === constants_1.RunningClockFooter;
    const showDecrement = showStop && progress > 0 && progress <= segments;
    const showIncrement = showStop && progress < segments;
    const showStart = footerText === constants_1.StoppedClockFooter;
    const buttons = [
        showIncrement &&
            new discord_js_1.ButtonBuilder()
                .setCustomId(`bitdclock--increment`)
                .setLabel('+')
                .setStyle(discord_js_1.ButtonStyle.Primary),
        showDecrement &&
            new discord_js_1.ButtonBuilder()
                .setCustomId(`bitdclock--decrement`)
                .setLabel('-')
                .setStyle(discord_js_1.ButtonStyle.Secondary),
        showStart &&
            new discord_js_1.ButtonBuilder()
                .setCustomId(`bitdclock--start`)
                .setLabel('Restart')
                .setStyle(discord_js_1.ButtonStyle.Primary),
        showStop &&
            new discord_js_1.ButtonBuilder()
                .setCustomId(`bitdclock--stop`)
                .setLabel('Stop')
                .setStyle(discord_js_1.ButtonStyle.Danger)
    ].filter((button) => button !== false);
    const components = new discord_js_1.ActionRowBuilder().addComponents(buttons);
    if (components.components.length > 0) {
        return { embeds: [embed], components: [components] };
    }
    return { embeds: [embed], components: [] };
};
exports.buildClockMessageOptions = buildClockMessageOptions;
