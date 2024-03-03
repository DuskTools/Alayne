import { ButtonInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions.js'
import { extractClockInfoFromButtonInteraction } from '../utils/extractClockInfoFromButtonInteraction.js'
import { clockNameLink } from './clockNameLink.js'
import ClockService from '../../../services/ClockService.js'
import CampaignService from '../../../services/CampaignService.js'

export const handleIncrement = async (interaction: ButtonInteraction) => {
  const link = interaction.message.url
  const discordGuildId = interaction.guildId || ''
  const clockOptions = await extractClockInfoFromButtonInteraction(interaction)
  const newProgress = clockOptions.progress + 1

  if (newProgress >= clockOptions.segments) {
    const newClockOptions = {
      ...clockOptions,
      progress: clockOptions.segments,
      active: false
    }
    await interaction.message.edit(buildClockMessageOptions(newClockOptions))
    await interaction.reply({
      content: `${clockNameLink(newClockOptions.name, link)} completed - **${newClockOptions.segments
        }/${newClockOptions.segments}**`
    })
    const campaign = await CampaignService.findOrCreateByDiscordId(discordGuildId)
    await ClockService.updateClock({
      ...newClockOptions,
      campaign_id: campaign.id,
    })
  } else {
    const newClockOptions = {
      ...clockOptions,
      progress: newProgress,
      active: true
    }
    await interaction.message.edit(buildClockMessageOptions(newClockOptions))
    await interaction.reply({
      content: `${clockNameLink(
        newClockOptions.name,
        link
      )} ticked up: **${newProgress}/${newClockOptions.segments}**`
    })

    const campaign = await CampaignService.findOrCreateByDiscordId(discordGuildId)
    await ClockService.updateClock({
      ...newClockOptions,
      campaign_id: campaign.id,
    })
  }
}
