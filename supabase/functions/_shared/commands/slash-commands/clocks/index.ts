import { ChatInputCommandInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions.js'
import ClockService from '../../../services/ClockService.js'
import CampaignService from '../../../services/CampaignService.js'

export const clocks = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: true })

  if (interaction.guildId === null) {
    await interaction.editReply({
      content: `Cannot find guildId`
    })
  }
  const campaign = await CampaignService.findOrCreateByDiscordId(
    interaction.guildId!
  )
  const clocks = await ClockService.getActiveClocks(campaign.id)
  const embeds = clocks.map((clockOptions) => {
    return buildClockMessageOptions(clockOptions).embeds[0]
  })

  if (embeds.length > 0) {
    interaction.editReply({ embeds })
  } else {
    interaction.editReply({ content: 'No clocks found!' })
  }
}
