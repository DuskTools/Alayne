import { ChatInputCommandInteraction, Collection, Message } from 'discord.js'
import { RunningClockFooter } from '../clock/constants'

export const findClocks = async (interaction: ChatInputCommandInteraction) => {
  const messageList: Collection<string, Message<boolean>> | undefined =
    await interaction.channel?.messages.fetch({ cache: true, limit: 100 })

  if (messageList == undefined) {
    return new Collection<string, Message<boolean>>()
  }

  return messageList.filter(
    (message) =>
      message.embeds[0] &&
      message.embeds[0].footer?.text === RunningClockFooter &&
      message.author.bot &&
      message.author.id === interaction.client.user?.id
  )
}
