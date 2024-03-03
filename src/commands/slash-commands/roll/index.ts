import { EmbedBuilder } from '@discordjs/builders'
import { ChatInputCommandInteraction } from 'discord.js'
import { getColor } from './getColor.js'
import { getExplanation } from './getExplanation.js'
import { parseRolls } from './parseRolls.js'
import { getThumbnail } from './getThumbail.js'
import { getBladesRollType } from './getBladesRollType.js'
import { getSuccessString } from './getSuccessString.js'
import { generateRollResult } from './generateRollResult.js'

const buildEmbed = async (
  interaction: ChatInputCommandInteraction
): Promise<EmbedBuilder> => {
  const diceArg = interaction.options.getInteger('dice_pool')
  const quantity = diceArg === 0 ? 0 : diceArg || 1
  const result = await generateRollResult(quantity)
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
  const embed = await buildEmbed(interaction)

  interaction.reply({ embeds: [embed] })
}
