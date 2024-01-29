import ClockService from '../../../services/ClockService.js';
export const extractClockInfoFromButtonInteraction = async (interaction) => {
    const discordGuildId = interaction.guildId || '';
    const name = String(interaction.message.embeds[0].title);
    return (await ClockService.getClock({ name, discordGuildId })).data();
};
