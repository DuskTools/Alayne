"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildClockMessageOptions = void 0;
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const clockImage = (progress, segment) => `https://raw.githubusercontent.com/alxjrvs/bladesinthediscord/main/src/assets/clocks/${segment}/${progress}.png`;
const getColor = (progress, segment, active) => {
    const ratio = progress / segment;
    switch (true) {
        case !active:
            return discord_js_2.Colors.Red;
        case ratio < 0.3333:
            return discord_js_2.Colors.Green;
        case ratio < 0.6666:
            return discord_js_2.Colors.Yellow;
        case ratio < 1:
            return discord_js_2.Colors.Red;
        default:
            return discord_js_2.Colors.DarkRed;
    }
};
const buildClockMessageOptions = ({ name, segments, progress = 0, active, link }) => {
    const fields = [
        {
            name: 'Progress',
            value: `${progress}/${segments}`
        }
    ];
    if (link) {
        fields.push({
            name: ' ',
            value: `[Jump To Clock](${link})`
        });
    }
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(name)
        .setThumbnail(clockImage(progress, segments))
        .setColor(getColor(progress, segments, active))
        .addFields(fields);
    const showStop = active;
    const showDecrement = showStop && progress > 0 && progress <= segments;
    const showIncrement = showStop && progress < segments;
    const showRestart = progress < segments && !active;
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
        showRestart &&
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
