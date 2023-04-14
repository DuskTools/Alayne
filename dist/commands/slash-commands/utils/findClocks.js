"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClocks = void 0;
const discord_js_1 = require("discord.js");
const constants_1 = require("../clock/constants");
const findClocks = async (interaction) => {
    const messageList = await interaction.channel?.messages.fetch({ cache: true, limit: 100 });
    if (messageList == undefined) {
        return new discord_js_1.Collection();
    }
    return messageList.filter((message) => message.embeds[0] &&
        message.embeds[0].footer?.text === constants_1.RunningClockFooter &&
        message.author.bot &&
        message.author.id === interaction.client.user?.id);
};
exports.findClocks = findClocks;
