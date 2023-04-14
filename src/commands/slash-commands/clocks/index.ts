import { ChatInputCommandInteraction } from 'discord.js'
import { findClocks } from '../utils/findClocks'
import { extractClockInfoFromEmbed } from '../utils/extractClockInfoFromEmbed'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions'

export const clocks = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: true })
  const clocks = await findClocks(interaction)

  const embeds = clocks.map((clock) => {
    const embed = clock.embeds[0]
    const options = extractClockInfoFromEmbed(embed)
    const link = clock.url
    return buildClockMessageOptions({ ...options, link }).embeds[0]
  })

  if (embeds.length > 0) {
    interaction.editReply({ embeds })
  } else {
    interaction.editReply({ content: 'No clocks found!' })
  }
}
