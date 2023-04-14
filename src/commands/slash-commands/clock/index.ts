import { ChatInputCommandInteraction } from 'discord.js'
import { buildClockMessageOptions } from './buildClockMessageOptions'
import { findClocks } from '../utils/findClocks'

export async function clock(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true })
  const name = interaction.options.getString('name') || 'A New Clock'
  const segments = interaction.options.getInteger('segments') || 4

  if ([4, 6, 8, 12].indexOf(segments) === -1) {
    await interaction.editReply({
      content: `Segments must be one of 4, 6, 8, or 12`
    })
  } else {
    const clockList = await findClocks(interaction)
    const clockExists =
      clockList.find((message) => message.embeds[0]?.title === name) !==
      undefined
    if (clockExists) {
      await interaction.editReply({
        content: `A Clock named ${name} already exists!`
      })
    } else {
      await interaction.channel?.send(
        buildClockMessageOptions({ name, segments })
      )
      await interaction.editReply({
        content: `Created Clock "${name}"`
      })
    }
  }
}
