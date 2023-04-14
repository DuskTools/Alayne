import { ButtonInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions'
import { extractClockInfoFromEmbed } from '../utils/extractClockInfoFromEmbed'
import { clockNameLink } from './clockNameLink'

export const handleIncrement = async (interaction: ButtonInteraction) => {
  const link = interaction.message.url
  const { name, segments, progress } = extractClockInfoFromEmbed(
    interaction.message.embeds[0]
  )
  const newProgress = progress + 1

  if (newProgress >= segments) {
    await interaction.message.edit(
      buildClockMessageOptions({
        name,
        segments,
        progress: segments,
        footerText: 'A Completed Blades in the Darkscord clock'
      })
    )
    await interaction.reply({
      content: `${clockNameLink(
        name,
        link
      )} completed - **${segments}/${segments}**`
    })
  } else {
    await interaction.message.edit(
      buildClockMessageOptions({
        name,
        segments,
        progress: newProgress
      })
    )
    await interaction.reply({
      content: `${clockNameLink(
        name,
        link
      )} ticked up: **${newProgress}/${segments}**`
    })
  }
}
