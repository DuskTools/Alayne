import {
  APIEmbedField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from 'discord.js'
import { Colors } from 'discord.js'
import { Clock } from '../../../types.js'

const clockImage = (progress: number, segment: number) =>
  `https://raw.githubusercontent.com/alxjrvs/bladesinthediscord/main/src/assets/clocks/${segment}/${progress}.png`

const getColor = (progress: number, segment: number, active: boolean) => {
  const ratio = progress / segment

  switch (true) {
    case !active:
      return Colors.Red
    case ratio < 0.3333:
      return Colors.Green
    case ratio < 0.6666:
      return Colors.Yellow
    case ratio < 1:
      return Colors.Red
    default:
      return Colors.DarkRed
  }
}

export const buildClockMessageOptions = ({
  name,
  segments,
  progress = 0,
  active,
  link
}: Omit<Clock, 'campaign_id' | 'link' | 'id' | 'created_at'> &
  Partial<Pick<Clock, 'link'>>) => {
  const fields: APIEmbedField[] = [
    {
      name: 'Progress',
      value: `${progress}/${segments}`
    }
  ]

  if (link) {
    fields.push({
      name: ' ',
      value: `[Jump To Clock](${link})`
    })
  }

  const embed = new EmbedBuilder()
    .setTitle(name)
    .setThumbnail(clockImage(progress, segments))
    .setColor(getColor(progress, segments, active))
    .addFields(fields)

  const showStop = active
  const showDecrement = showStop && progress > 0 && progress <= segments
  const showIncrement = showStop && progress < segments
  const showRestart = progress < segments && !active

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
    showRestart &&
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
