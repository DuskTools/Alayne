import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from 'discord.js'
import { RunningClockFooter } from './constants'

export const buildClockMessageOptions = (
  name: string,
  segments: number,
  completeSegments = 0,
  footerText = RunningClockFooter
) => {
  const embed = new EmbedBuilder()
    .setTitle(name)
    .setFooter({ text: footerText })
    .addFields({ name: '\u200B', value: '\u200B' })
    .addFields([
      {
        name: 'Progress',
        value: completeSegments.toString()
      },
      {
        name: 'Segments',
        value: segments.toString()
      }
    ])

  const showStop = footerText === RunningClockFooter
  const showDecrement = showStop && completeSegments > 0
  const showIncrement = showStop && completeSegments < segments

  const buttons = [
    showIncrement &&
      new ButtonBuilder()
        .setCustomId(`bitdclock--increment`)
        .setLabel('Up Tick')
        .setStyle(ButtonStyle.Primary),
    showDecrement &&
      new ButtonBuilder()
        .setCustomId(`bitdclock--decrement`)
        .setLabel('Down Tick')
        .setStyle(ButtonStyle.Secondary),
    showStop &&
      new ButtonBuilder()
        .setCustomId(`bitdclock--stop`)
        .setLabel('Stop Clock')
        .setStyle(ButtonStyle.Danger)
  ].filter((button) => button !== false) as ButtonBuilder[]

  const components = new ActionRowBuilder<ButtonBuilder>().addComponents(
    buttons
  )

  if (components.components.length > 0) {
    return { embeds: [embed], components: [components] }
  }
  return { embeds: [embed], components: [] }
}
