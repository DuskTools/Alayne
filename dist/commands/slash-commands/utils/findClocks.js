"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClocks = void 0;
const constants_1 = require("../clock/constants");
const messageArr = Array.from({ length: 5 }, () => ({}));
const findClocks = async (interaction) => {
    const messageList = await messageArr.reduce(async (accumulator, _current, index) => {
        const resolvedAccumulator = await accumulator;
        if (index > 0 && resolvedAccumulator.length < 100 * index) {
            return resolvedAccumulator;
        }
        const lastMessage = resolvedAccumulator[resolvedAccumulator.length - 1];
        const messageList = await interaction.channel?.messages.fetch({
            cache: true,
            limit: 100,
            before: lastMessage?.id
        });
        return [...resolvedAccumulator, ...(messageList?.values() || [])];
    }, Promise.resolve([]));
    return messageList.filter((message) => message.embeds[0] &&
        message.embeds[0].footer?.text === constants_1.RunningClockFooter &&
        message.author.bot &&
        message.author.id === interaction.client.user?.id);
};
exports.findClocks = findClocks;
