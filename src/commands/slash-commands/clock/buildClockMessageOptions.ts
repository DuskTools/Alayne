import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from 'discord.js'
import { RunningClockFooter, StoppedClockFooter } from './constants'
import { clockImage } from './clockImage'
import { getColor } from './getColor'

export const buildClockMessageOptions = (
  name: string,
  segments: number,
  completeSegments = 0,
  footerText = RunningClockFooter
) => {
  const embed = new EmbedBuilder()
    .setTitle(name)
    .setThumbnail(clockImage(completeSegments, segments))
    .setColor(getColor(completeSegments, segments))
    .setFooter({ text: footerText })
    .addFields({
      name: 'Progress',
      value: `${completeSegments}/${segments}`
    })

  const showStop = footerText === RunningClockFooter
  const showDecrement =
    showStop && completeSegments > 0 && completeSegments <= segments
  const showIncrement = showStop && completeSegments < segments
  const showStart = footerText === StoppedClockFooter

  const buttons = [
    showIncrement &&
      new ButtonBuilder()
        .setCustomId(`bitdclock--increment`)
        .setLabel('+')
        .setStyle(ButtonStyle.Primary),
    showDecrement &&
      new ButtonBuilder()
        .setCustomId(`bitdclock--decrement`)
        .setLabel('-')
        .setStyle(ButtonStyle.Secondary),
    showStart &&
      new ButtonBuilder()
        .setCustomId(`bitdclock--start`)
        .setLabel('Restart')
        .setStyle(ButtonStyle.Primary),
    showStop &&
      new ButtonBuilder()
        .setCustomId(`bitdclock--stop`)
        .setLabel('Stop')
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
