import { ButtonInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions.js'
import { extractClockInfoFromButtonInteraction } from '../utils/extractClockInfoFromButtonInteraction.js'
import { clockNameLink } from './clockNameLink.js'
import ClockService from '../../../services/ClockService.js'

export const handleRestart = async (interaction: ButtonInteraction) => {
  const discordGuildId = interaction.guildId || ''
  const link = interaction.message.url
  const clockOptions = await extractClockInfoFromButtonInteraction(interaction)
  const newClockOptions = {
    ...clockOptions,
    active: true
  }
  await interaction.message.edit(buildClockMessageOptions(newClockOptions))
  await interaction.reply({
    content: `${clockNameLink(clockOptions.name, link)} **Restarted**`
  })

  await ClockService.updateClock({
    ...newClockOptions,
    discordGuildId
  })
}
