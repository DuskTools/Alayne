import { ChatInputCommandInteraction, Message } from 'discord.js'
import { RunningClockFooter } from '../clock/constants'

const messageArr = Array.from({ length: 5 }, () => ({}))
export const findClocks = async (interaction: ChatInputCommandInteraction) => {
  const messageList = await messageArr.reduce<Promise<Message<boolean>[]>>(
    async (accumulator, _current, index) => {
      const resolvedAccumulator = await accumulator

      if (index > 0 && resolvedAccumulator.length < 100 * index) {
        return resolvedAccumulator
      }

      const lastMessage = resolvedAccumulator[resolvedAccumulator.length - 1]
      const messageList = await interaction.channel?.messages.fetch({
        cache: true,
        limit: 100,
        before: lastMessage?.id
      })
      return [...resolvedAccumulator, ...(messageList?.values() || [])]
    },
    Promise.resolve([]) as Promise<Message<boolean>[]>
  )

  return messageList.filter(
    (message) =>
      message.embeds[0] &&
      message.embeds[0].footer?.text === RunningClockFooter &&
      message.author.bot &&
      message.author.id === interaction.client.user?.id
  )
}
