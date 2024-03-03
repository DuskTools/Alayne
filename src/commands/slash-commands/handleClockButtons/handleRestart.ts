import { ButtonInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions'
import { extractClockInfoFromButtonInteraction } from '../utils/extractClockInfoFromButtonInteraction'
import { clockNameLink } from './clockNameLink'
import ClockService from '../../../services/ClockService'
import CampaignService from '../../../services/CampaignService'

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

  const campaign = await CampaignService.findOrCreateByDiscordId(discordGuildId)

  await ClockService.updateClock({
    ...newClockOptions,
    campaign_id: campaign.id,
  })
}
