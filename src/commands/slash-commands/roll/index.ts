import { EmbedBuilder } from '@discordjs/builders'
import { ChatInputCommandInteraction, Colors, User } from 'discord.js'
import { RollResult, roll as randsum } from 'randsum'

const generateRollResult = (quantity: number) => {
  const sides = 6
  const isZero = quantity === 0
  return randsum({
    sides,
    quantity: isZero ? 2 : quantity,
    modifiers: [
      {
        drop: isZero
          ? {
              highest: 1
            }
          : {
              lowest: quantity - 1
            }
      }
    ]
  })
}

type BladesRollType = 'critical' | 'success' | 'partial' | 'failure'

const getSuccessString = (type: BladesRollType): string[] => {
  const responseArray = []
  switch (type) {
    case 'critical':
      responseArray.push('__**Critical Success**__')
      responseArray.push('*Things go better than expected*')
      break
    case 'success':
      responseArray.push('__**Success**__')
      responseArray.push('*Things go well*')
      break
    case 'partial':
      responseArray.push('__**Partial Success**__')
      responseArray.push('*Things go well, but not perfectly*')
      break
    case 'failure':
      responseArray.push('__**Failure**__')
      responseArray.push('*Things go poorly*')
      break
  }

  return responseArray
}

const getBladesRollType = (
  result: RollResult<number>,
  quantity: number
): BladesRollType => {
  if (result.total === 6) {
    const isCritical =
      result.initialRolls.filter((roll) => roll === 6).length >= 2
    if (isCritical && quantity > 0) {
      return 'critical'
    }
    return 'success'
  }
  if (result.total === 4 || result.total === 5) {
    return 'partial'
  }
  return 'failure'
}

const parseRolls = (
  result: RollResult<number>,
  bladesSuccess: BladesRollType
): string => {
  return result.initialRolls
    .map((roll, index, array) => {
      const isCritical = bladesSuccess === 'critical'
      const firstInstaceOfRoll = array.indexOf(roll) === index
      return roll === result.total && (isCritical || firstInstaceOfRoll)
        ? `**${roll}**`
        : `~~${roll}~~`
    })
    .join(', ')
}

const getExplanation = (quantity: number, user: User): string[] => {
  const isZero = quantity === 0
  return [
    `${user.username} rolled ${isZero ? 2 : quantity} D6`,
    `and took the ${isZero ? 'lowest' : 'highest'} result`
  ]
}

const color = (type: BladesRollType): number => {
  switch (type) {
    case 'critical':
      return Colors.Gold
    case 'success':
      return Colors.Green
    case 'partial':
      return Colors.Yellow
    case 'failure':
      return Colors.Red
  }
}

const thumbnailImage = (total: number, type: BladesRollType): string => {
  const root =
    'https://raw.githubusercontent.com/alxjrvs/bladesinthediscord/main/src/assets/d6/'
  switch (total) {
    case 1:
      return `${root}one.png`
    case 2:
      return `${root}two.png`
    case 3:
      return `${root}three.png`
    case 4:
      return `${root}four.png`
    case 5:
      return `${root}five.png`
    case 6:
      if (type === 'critical') {
        return `${root}double6.png`
      }
      return `${root}six.png`
  }
  throw new Error('Invalid total')
}

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
  const thumbnail = thumbnailImage(result.total, bladesSuccess)

  return new EmbedBuilder()
    .setColor(color(bladesSuccess))
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
