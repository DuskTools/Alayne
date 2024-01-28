import { ButtonInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions.js'
import { extractClockInfoFromEmbed } from '../utils/extractClockInfoFromEmbed.js'
import { clockNameLink } from './clockNameLink.js'
import ClockService from '../../../services/ClockService.js'

export const handleStop = async (interaction: ButtonInteraction) => {
  const link = interaction.message.url
  const discordGuildId = interaction.guildId || ''
  const { name, segments, progress } = extractClockInfoFromEmbed(
    interaction.message.embeds[0]
  )

  await interaction.message.edit(
    buildClockMessageOptions({
      name,
      segments,
      progress: progress,
      footerText: 'A Stopped Blades in the Darkcord Clock'
    })
  )
  await interaction.reply({
    content: `${clockNameLink(name, link)} **Stopped**`
  })
  await ClockService.updateClock({
    name,
    discordGuildId,
    active: false
  })
}
