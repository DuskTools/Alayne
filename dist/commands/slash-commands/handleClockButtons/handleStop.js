"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStop = void 0;
const tslib_1 = require("tslib");
const buildClockMessageOptions_1 = require("../utils/buildClockMessageOptions");
const extractClockInfoFromButtonInteraction_1 = require("../utils/extractClockInfoFromButtonInteraction");
const clockNameLink_1 = require("./clockNameLink");
const ClockService_1 = tslib_1.__importDefault(require("../../../services/ClockService"));
const CampaignService_1 = tslib_1.__importDefault(require("../../../services/CampaignService"));
const handleStop = async (interaction) => {
    const link = interaction.message.url;
    const discordGuildId = interaction.guildId || '';
    const clockOptions = await (0, extractClockInfoFromButtonInteraction_1.extractClockInfoFromButtonInteraction)(interaction);
    await interaction.message.edit((0, buildClockMessageOptions_1.buildClockMessageOptions)({ ...clockOptions, active: false }));
    await interaction.reply({
        content: `${(0, clockNameLink_1.clockNameLink)(clockOptions.name, link)} **Stopped**`
    });
    const campaign = await CampaignService_1.default.findOrCreateByDiscordId(discordGuildId);
    await ClockService_1.default.updateClock({
        ...clockOptions,
        campaign_id: campaign.id,
        active: false
    });
};
exports.handleStop = handleStop;
