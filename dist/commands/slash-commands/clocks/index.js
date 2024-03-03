"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clocks = void 0;
const tslib_1 = require("tslib");
const buildClockMessageOptions_1 = require("../utils/buildClockMessageOptions");
const ClockService_1 = tslib_1.__importDefault(require("../../../services/ClockService"));
const CampaignService_1 = tslib_1.__importDefault(require("../../../services/CampaignService"));
const clocks = async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    if (interaction.guildId === null) {
        await interaction.editReply({
            content: `Cannot find guildId`
        });
    }
    const campaign = await CampaignService_1.default.findOrCreateByDiscordId(interaction.guildId);
    const clocks = await ClockService_1.default.getActiveClocks(campaign.id);
    const embeds = clocks.map((clockOptions) => {
        return (0, buildClockMessageOptions_1.buildClockMessageOptions)(clockOptions).embeds[0];
    });
    if (embeds.length > 0) {
        interaction.editReply({ embeds });
    }
    else {
        interaction.editReply({ content: 'No clocks found!' });
    }
};
exports.clocks = clocks;
