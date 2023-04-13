import { ChatInputCommandInteraction, Collection, Message } from 'discord.js'
import { RunningClockFooter } from './constants'
import { buildClockMessageOptions } from './buildClockMessageOptions'

export const findClocks = async (interaction: ChatInputCommandInteraction) => {
  const pinnedList =
    (await interaction.channel?.messages.fetchPinned()) as Collection<
      string,
      Message<true>
    >
  if (pinnedList !== undefined) {
    return pinnedList.filter(
      (message) =>
        message.embeds[0].footer?.text === RunningClockFooter &&
        message.author.bot
    )
  }
  return [] as unknown as Collection<string, Message<true>>
}

export async function clock(interaction: ChatInputCommandInteraction) {
  const name = interaction.options.getString('name') || 'A New Clock'
  const segments = interaction.options.getInteger('segments') || 4

  if ([4, 6, 8, 12].indexOf(segments) === -1) {
    interaction.reply({
      content: `Segments must be one of 4, 6, 8, or 12`,
      ephemeral: true
    })
    return
  }

  const clockList = await findClocks(interaction)
  const clockExists =
    clockList.find((message) => message.embeds[0].title === name) !== undefined
  // sometimes this breaks if run quickly in succession with another command.
  // I wonder if we are hitting a rate limit, somehow
  if (clockExists) {
    interaction.reply({
      content: `A Clock named "${name}" already exists!`,
      ephemeral: true
    })
  } else {
    const message = await interaction.channel?.send(
      buildClockMessageOptions(name, segments)
    )
    message?.pin()
    interaction.reply({ content: `Created Clock "${name}"`, ephemeral: true })
  }
}
