import {
  APIEmbedField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from 'discord.js'
import { RunningClockFooter, StoppedClockFooter } from './constants'
import { clockImage } from './clockImage'
import { getColor } from './getColor'

type ClockOptions = {
  name: string
  segments: number
  progress?: number
  footerText?: string
  link?: string
}

export const buildClockMessageOptions = ({
  name,
  segments,
  progress = 0,
  footerText = RunningClockFooter,
  link
}: ClockOptions) => {
  const fields: APIEmbedField[] = [
    {
      name: 'Progress',
      value: `${progress}/${segments}`
    }
  ]
  if (link) {
    fields.push({
      name: ' ',
      value: `[See Clock](${link})`
    })
  }

  const embed = new EmbedBuilder()
    .setTitle(name)
    .setThumbnail(clockImage(progress, segments))
    .setColor(getColor(progress, segments))
    .setFooter({ text: footerText })
    .addFields(fields)

  const showStop = footerText === RunningClockFooter
  const showDecrement = showStop && progress > 0 && progress <= segments
  const showIncrement = showStop && progress < segments
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
