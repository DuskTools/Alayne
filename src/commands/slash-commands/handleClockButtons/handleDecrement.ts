import { ButtonInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions'
import { extractClockInfoFromButtonInteraction } from '../utils/extractClockInfoFromButtonInteraction'
import { clockNameLink } from './clockNameLink'
import ClockService from '../../../services/ClockService'
import CampaignService from '../../../services/CampaignService'

export const handleDecrement = async (interaction: ButtonInteraction) => {
  const link = interaction.message.url
  const discordGuildId = interaction.guildId || ''
  const clockOptions = await extractClockInfoFromButtonInteraction(interaction)

  const newProgress = clockOptions.progress - 1

  if (newProgress < 0) {
    await interaction.reply({
      content: `${clockNameLink(
        clockOptions.name,
        link
      )} cannot be reduced below 0`,
      ephemeral: true
    })
  } else {
    const newClockOptions = {
      ...clockOptions,
      progress: newProgress
    }
    await interaction.message.edit(buildClockMessageOptions(newClockOptions))
    await interaction.reply({
      content: `${clockNameLink(
        newClockOptions.name,
        link
      )} ticked down: **${newProgress}/${newClockOptions.segments}**`
    })
    const campaign = await CampaignService.findOrCreateByDiscordId(discordGuildId)
    await ClockService.updateClock({
      ...newClockOptions,
      campaign_id: campaign.id,
    })
  }
}
