import { ButtonInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions'
import { extractClockInfoFromEmbed } from '../utils/extractClockInfoFromEmbed'
import { clockNameLink } from './clockNameLink'

export const handleDecrement = async (interaction: ButtonInteraction) => {
  const link = interaction.message.url
  const { name, segments, progress } = extractClockInfoFromEmbed(
    interaction.message.embeds[0]
  )

  const newProgress = progress - 1

  if (newProgress < 0) {
    await interaction.reply({
      content: `${clockNameLink(name, link)} cannot be reduced below 0`,
      ephemeral: true
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
      )} ticked down: **${newProgress}/${segments}**`
    })
  }
}
