"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIncrement = void 0;
const tslib_1 = require("tslib");
const buildClockMessageOptions_1 = require("../utils/buildClockMessageOptions");
const extractClockInfoFromButtonInteraction_1 = require("../utils/extractClockInfoFromButtonInteraction");
const clockNameLink_1 = require("./clockNameLink");
const ClockService_1 = tslib_1.__importDefault(require("../../../services/ClockService"));
const CampaignService_1 = tslib_1.__importDefault(require("../../../services/CampaignService"));
const handleIncrement = async (interaction) => {
    const link = interaction.message.url;
    const discordGuildId = interaction.guildId || '';
    const clockOptions = await (0, extractClockInfoFromButtonInteraction_1.extractClockInfoFromButtonInteraction)(interaction);
    const newProgress = clockOptions.progress + 1;
    if (newProgress >= clockOptions.segments) {
        const newClockOptions = {
            ...clockOptions,
            progress: clockOptions.segments,
            active: false
        };
        await interaction.message.edit((0, buildClockMessageOptions_1.buildClockMessageOptions)(newClockOptions));
        await interaction.reply({
            content: `${(0, clockNameLink_1.clockNameLink)(newClockOptions.name, link)} completed - **${newClockOptions.segments}/${newClockOptions.segments}**`
        });
        const campaign = await CampaignService_1.default.findOrCreateByDiscordId(discordGuildId);
        await ClockService_1.default.updateClock({
            ...newClockOptions,
            campaign_id: campaign.id,
        });
    }
    else {
        const newClockOptions = {
            ...clockOptions,
            progress: newProgress,
            active: true
        };
        await interaction.message.edit((0, buildClockMessageOptions_1.buildClockMessageOptions)(newClockOptions));
        await interaction.reply({
            content: `${(0, clockNameLink_1.clockNameLink)(newClockOptions.name, link)} ticked up: **${newProgress}/${newClockOptions.segments}**`
        });
        const campaign = await CampaignService_1.default.findOrCreateByDiscordId(discordGuildId);
        await ClockService_1.default.updateClock({
            ...newClockOptions,
            campaign_id: campaign.id,
        });
    }
};
exports.handleIncrement = handleIncrement;
