import { Message } from 'discord.js'

export const extractClockInfoFromMessage = (message: Message<boolean>) => {
  const name = String(message.embeds[0].title)
  const totalProgress = message.embeds[0].fields.find(
    ({ name }) => name === 'Progress'
  )?.value
  if (!totalProgress) {
    throw new Error('Could not find progress')
  }
  const [progress, segments] = totalProgress.split('/').map(Number)

  return { name, segments, progress }
}
