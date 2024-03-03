import { ChatInputCommandInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions'
import ClockService from '../../../services/ClockService'
import CampaignService from '../../../services/CampaignService'

export async function clock(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true })
  const discordGuildId = interaction.guildId || ''
  const name = interaction.options.getString('name') || 'A New Clock'
  const segments = interaction.options.getInteger('segments') || 4

  if (interaction.guildId === null) {
    await interaction.editReply({
      content: `Cannot find guildId`
    })
  }

  if ([4, 6, 8, 12].indexOf(segments) === -1) {
    return await interaction.editReply({
      content: `Segments must be one of 4, 6, 8, or 12`
    })
  }

  const campaign = await CampaignService.findOrCreateByDiscordId(discordGuildId)
  const clockList = await ClockService.getActiveClocks(campaign.id)
  const clockExists =
    clockList.find((message) => message.name === name) !== undefined
  if (clockExists) {
    return await interaction.editReply({
      content: `A Clock named ${name} already exists!`
    })
  }
  const newClockOptions = {
    name,
    segments,
    active: true,
    progress: 0,
    discordGuildId
  }
  const clockMessage = await interaction.channel?.send(
    buildClockMessageOptions(newClockOptions)
  )
  await interaction.editReply({
    content: `Created Clock "${name}"`
  })

  await ClockService.create({
    ...newClockOptions,
    campaign_id: campaign.id,
    link: clockMessage?.url || ''
  })
}
