"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractClockInfoFromButtonInteraction = void 0;
const tslib_1 = require("tslib");
const ClockService_1 = tslib_1.__importDefault(require("../../../services/ClockService"));
const CampaignService_1 = tslib_1.__importDefault(require("../../../services/CampaignService"));
const extractClockInfoFromButtonInteraction = async (interaction) => {
    const discordGuildId = interaction.guildId || '';
    const name = String(interaction.message.embeds[0].title);
    const campaign = await CampaignService_1.default.findOrCreateByDiscordId(discordGuildId);
    return await ClockService_1.default.getClock({ name, campaign_id: campaign.id });
};
exports.extractClockInfoFromButtonInteraction = extractClockInfoFromButtonInteraction;
