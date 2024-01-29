import { buildClockMessageOptions } from '../utils/buildClockMessageOptions.js';
import ClockService from '../../../services/ClockService.js';
export async function clock(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const discordGuildId = interaction.guildId || '';
    const name = interaction.options.getString('name') || 'A New Clock';
    const segments = interaction.options.getInteger('segments') || 4;
    if (interaction.guildId === null) {
        await interaction.editReply({
            content: `Cannot find guildId`
        });
    }
    if ([4, 6, 8, 12].indexOf(segments) === -1) {
        return await interaction.editReply({
            content: `Segments must be one of 4, 6, 8, or 12`
        });
    }
    const clockList = (await ClockService.getClocks(discordGuildId)).map((ref) => ref.data());
    const clockExists = clockList.find((message) => message.name === name) !== undefined;
    if (clockExists) {
        return await interaction.editReply({
            content: `A Clock named ${name} already exists!`
        });
    }
    const newClockOptions = {
        name,
        segments,
        active: true,
        progress: 0,
        discordGuildId
    };
    const clockMessage = await interaction.channel?.send(buildClockMessageOptions(newClockOptions));
    await interaction.editReply({
        content: `Created Clock "${name}"`
    });
    await ClockService.create({
        ...newClockOptions,
        link: clockMessage?.url || ''
    });
}
