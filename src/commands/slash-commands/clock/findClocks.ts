import { ChatInputCommandInteraction, Collection, Message } from 'discord.js'
import { RunningClockFooter } from './constants'

export const findClocks = async (interaction: ChatInputCommandInteraction) => {
  const pinnedList: Collection<string, Message<boolean>> | undefined =
    await interaction.channel?.messages.fetchPinned()

  if (pinnedList == undefined) {
    return new Collection<string, Message<boolean>>()
  }

  return pinnedList.filter(
    (message) =>
      message.embeds[0].footer?.text === RunningClockFooter &&
      message.author.bot
  )
}
