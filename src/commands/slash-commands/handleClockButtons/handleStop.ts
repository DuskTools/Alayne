import { ButtonInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions.js'
import { extractClockInfoFromButtonInteraction } from '../utils/extractClockInfoFromButtonInteraction.js'
import { clockNameLink } from './clockNameLink.js'
import ClockService from '../../../services/ClockService.js'

export const handleStop = async (interaction: ButtonInteraction) => {
  const link = interaction.message.url
  const discordGuildId = interaction.guildId || ''
  const clockOptions = await extractClockInfoFromButtonInteraction(interaction)

  await interaction.message.edit(
    buildClockMessageOptions({ ...clockOptions, active: false })
  )
  await interaction.reply({
    content: `${clockNameLink(clockOptions.name, link)} **Stopped**`
  })
  await ClockService.updateClock({
    ...clockOptions,
    discordGuildId,
    active: false
  })
}
