import { Message } from 'discord.js'

export const extractClockInfoFromMessage = (message: Message<boolean>) => {
  const name = String(message.embeds[0].title)
  const segments = Number(
    message.embeds[0].fields.find(({ name }) => name === 'Segments')?.value
  )
  const progress = Number(
    message.embeds[0].fields.find(({ name }) => name === 'Progress')?.value
  )

  return { name, segments, progress }
}
