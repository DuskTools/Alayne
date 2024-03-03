"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDecrement = void 0;
const tslib_1 = require("tslib");
const buildClockMessageOptions_1 = require("../utils/buildClockMessageOptions");
const extractClockInfoFromButtonInteraction_1 = require("../utils/extractClockInfoFromButtonInteraction");
const clockNameLink_1 = require("./clockNameLink");
const ClockService_1 = tslib_1.__importDefault(require("../../../services/ClockService"));
const CampaignService_1 = tslib_1.__importDefault(require("../../../services/CampaignService"));
const handleDecrement = async (interaction) => {
    const link = interaction.message.url;
    const discordGuildId = interaction.guildId || '';
    const clockOptions = await (0, extractClockInfoFromButtonInteraction_1.extractClockInfoFromButtonInteraction)(interaction);
    const newProgress = clockOptions.progress - 1;
    if (newProgress < 0) {
        await interaction.reply({
            content: `${(0, clockNameLink_1.clockNameLink)(clockOptions.name, link)} cannot be reduced below 0`,
            ephemeral: true
        });
    }
    else {
        const newClockOptions = {
            ...clockOptions,
            progress: newProgress
        };
        await interaction.message.edit((0, buildClockMessageOptions_1.buildClockMessageOptions)(newClockOptions));
        await interaction.reply({
            content: `${(0, clockNameLink_1.clockNameLink)(newClockOptions.name, link)} ticked down: **${newProgress}/${newClockOptions.segments}**`
        });
        const campaign = await CampaignService_1.default.findOrCreateByDiscordId(discordGuildId);
        await ClockService_1.default.updateClock({
            ...newClockOptions,
            campaign_id: campaign.id,
        });
    }
};
exports.handleDecrement = handleDecrement;
