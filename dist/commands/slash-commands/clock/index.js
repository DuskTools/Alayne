"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clock = void 0;
const tslib_1 = require("tslib");
const buildClockMessageOptions_1 = require("../utils/buildClockMessageOptions");
const ClockService_1 = tslib_1.__importDefault(require("../../../services/ClockService"));
const CampaignService_1 = tslib_1.__importDefault(require("../../../services/CampaignService"));
async function clock(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const discordGuildId = interaction.guildId || '';
    const name = interaction.options.getString('name') || 'A New Clock';
    const segments = interaction.options.getInteger('segments') || 4;
    if (interaction.guildId === null) {
        await interaction.editReply({
            content: `Cannot find guildId`
        });
    }
    if ([4, 6, 8, 12].indexOf(segments) === -1) {
        return await interaction.editReply({
            content: `Segments must be one of 4, 6, 8, or 12`
        });
    }
    const campaign = await CampaignService_1.default.findOrCreateByDiscordId(discordGuildId);
    const clockList = await ClockService_1.default.getActiveClocks(campaign.id);
    const clockExists = clockList.find((message) => message.name === name) !== undefined;
    if (clockExists) {
        return await interaction.editReply({
            content: `A Clock named ${name} already exists!`
        });
    }
    const newClockOptions = {
        name,
        segments,
        active: true,
        progress: 0,
        discordGuildId
    };
    const clockMessage = await interaction.channel?.send((0, buildClockMessageOptions_1.buildClockMessageOptions)(newClockOptions));
    await interaction.editReply({
        content: `Created Clock "${name}"`
    });
    await ClockService_1.default.create({
        ...newClockOptions,
        campaign_id: campaign.id,
        link: clockMessage?.url || ''
    });
}
exports.clock = clock;
