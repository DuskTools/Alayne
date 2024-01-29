import { buildClockMessageOptions } from '../utils/buildClockMessageOptions.js';
import { extractClockInfoFromEmbed } from '../utils/extractClockInfoFromEmbed.js';
import { clockNameLink } from './clockNameLink.js';
import ClockService from '../../../services/ClockService.js';
export const handleIncrement = async (interaction) => {
    const link = interaction.message.url;
    const discordGuildId = interaction.guildId || '';
    const { name, segments, progress } = extractClockInfoFromEmbed(interaction.message.embeds[0]);
    const newProgress = progress + 1;
    if (newProgress >= segments) {
        await interaction.message.edit(buildClockMessageOptions({
            name,
            segments,
            progress: segments,
            footerText: 'A Completed Blades in the Darkscord clock'
        }));
        await interaction.reply({
            content: `${clockNameLink(name, link)} completed - **${segments}/${segments}**`
        });
        await ClockService.updateClock({
            name,
            discordGuildId,
            progress: newProgress,
            active: false
        });
    }
    else {
        await interaction.message.edit(buildClockMessageOptions({
            name,
            segments,
            progress: newProgress
        }));
        await interaction.reply({
            content: `${clockNameLink(name, link)} ticked up: **${newProgress}/${segments}**`
        });
        await ClockService.updateClock({
            name,
            discordGuildId,
            progress: newProgress
        });
    }
};
