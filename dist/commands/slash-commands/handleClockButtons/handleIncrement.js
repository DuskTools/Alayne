import { buildClockMessageOptions } from '../utils/buildClockMessageOptions.js';
import { extractClockInfoFromButtonInteraction } from '../utils/extractClockInfoFromButtonInteraction.js';
import { clockNameLink } from './clockNameLink.js';
import ClockService from '../../../services/ClockService.js';
export const handleIncrement = async (interaction) => {
    const link = interaction.message.url;
    const discordGuildId = interaction.guildId || '';
    const clockOptions = await extractClockInfoFromButtonInteraction(interaction);
    const newProgress = clockOptions.progress + 1;
    if (newProgress >= clockOptions.segments) {
        const newClockOptions = {
            ...clockOptions,
            progress: clockOptions.segments,
            active: false
        };
        await interaction.message.edit(buildClockMessageOptions(newClockOptions));
        await interaction.reply({
            content: `${clockNameLink(newClockOptions.name, link)} completed - **${newClockOptions.segments}/${newClockOptions.segments}**`
        });
        await ClockService.updateClock({
            ...newClockOptions,
            discordGuildId
        });
    }
    else {
        const newClockOptions = {
            ...clockOptions,
            progress: newProgress,
            active: true
        };
        await interaction.message.edit(buildClockMessageOptions(newClockOptions));
        await interaction.reply({
            content: `${clockNameLink(newClockOptions.name, link)} ticked up: **${newProgress}/${newClockOptions.segments}**`
        });
        await ClockService.updateClock({
            ...newClockOptions,
            discordGuildId
        });
    }
};
