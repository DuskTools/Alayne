import { buildClockMessageOptions } from '../utils/buildClockMessageOptions.js';
import { extractClockInfoFromEmbed } from '../utils/extractClockInfoFromEmbed.js';
import { clockNameLink } from './clockNameLink.js';
import ClockService from '../../../services/ClockService.js';
export const handleDecrement = async (interaction) => {
    const link = interaction.message.url;
    const discordGuildId = interaction.guildId || '';
    const { name, segments, progress } = extractClockInfoFromEmbed(interaction.message.embeds[0]);
    const newProgress = progress - 1;
    if (newProgress < 0) {
        await interaction.reply({
            content: `${clockNameLink(name, link)} cannot be reduced below 0`,
            ephemeral: true
        });
    }
    else {
        await interaction.message.edit(buildClockMessageOptions({
            name,
            segments,
            progress: newProgress
        }));
        await interaction.reply({
            content: `${clockNameLink(name, link)} ticked down: **${newProgress}/${segments}**`
        });
        await ClockService.updateClock({
            name,
            discordGuildId,
            progress: newProgress,
            active: newProgress > 0
        });
    }
};
