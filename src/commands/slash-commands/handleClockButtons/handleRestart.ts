import { ButtonInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions'
import { extractClockInfoFromEmbed } from '../utils/extractClockInfoFromEmbed'
import { clockNameLink } from './clockNameLink'

export const handleRestart = async (interaction: ButtonInteraction) => {
  const link = interaction.message.url
  const { name, segments, progress } = extractClockInfoFromEmbed(
    interaction.message.embeds[0]
  )
  await interaction.message.edit(
    buildClockMessageOptions({
      name,
      segments,
      progress: progress
    })
  )
  await interaction.reply({
    content: `${clockNameLink(name, link)} **Restarted**`
  })
}
