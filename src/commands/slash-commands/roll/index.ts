import { EmbedBuilder } from '@discordjs/builders'
import { ChatInputCommandInteraction } from 'discord.js'
import { generateRollResult } from './generateRollResult'
import { getColor } from './getColor'
import { getExplanation } from './getExplanation'
import { parseRolls } from './parseRolls'
import { getThumbnail } from './getThumbail'
import { getBladesRollType } from './getBladesRollType'
import { getSuccessString } from './getSuccessString'

const buildEmbed = (interaction: ChatInputCommandInteraction): EmbedBuilder => {
  const diceArg = interaction.options.getInteger('dice_pool')
  const quantity = diceArg === 0 ? 0 : diceArg || 1
  const result = generateRollResult(quantity)
  const bladesSuccess = getBladesRollType(result, quantity)
  const [explanationTitle, explanationValue] = getExplanation(
    quantity,
    interaction.user
  )
  const [successTitle, successValue] = getSuccessString(bladesSuccess)
  const thumbnail = getThumbnail(result.total, bladesSuccess)

  return new EmbedBuilder()
    .setColor(getColor(bladesSuccess))
    .setTitle(successTitle)
    .setDescription(successValue)
    .setThumbnail(thumbnail)
    .addFields({ name: '\u200B', value: '\u200B' })
    .addFields({ name: explanationTitle, value: explanationValue })
    .addFields(
      {
        name: 'Rolls',
        value: `[${parseRolls(result, bladesSuccess)}]`,
        inline: true
      },
      { name: 'Total', value: `** ${result.total} **`, inline: true }
    )
}

export async function roll(interaction: ChatInputCommandInteraction) {
  const embed = buildEmbed(interaction)

  interaction.reply({ embeds: [embed] })
}
