import { buildClockMessageOptions } from '../utils/buildClockMessageOptions.js';
import { extractClockInfoFromEmbed } from '../utils/extractClockInfoFromEmbed.js';
import { clockNameLink } from './clockNameLink.js';
import ClockService from '../../../services/ClockService.js';
export const handleRestart = async (interaction) => {
    const discordGuildId = interaction.guildId || '';
    const link = interaction.message.url;
    const { name, segments, progress } = extractClockInfoFromEmbed(interaction.message.embeds[0]);
    await interaction.message.edit(buildClockMessageOptions({
        name,
        segments,
        progress: progress
    }));
    await interaction.reply({
        content: `${clockNameLink(name, link)} **Restarted**`
    });
    await ClockService.updateClock({
        name,
        discordGuildId,
        active: true
    });
};
