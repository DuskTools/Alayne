import { Embed } from 'discord.js'

export const extractClockInfoFromEmbed = (embed: Embed) => {
  const name = String(embed.title)
  const totalProgress = embed.fields.find(
    ({ name }) => name === 'Progress'
  )?.value
  if (!totalProgress) {
    throw new Error('Could not find progress')
  }
  const [progress, segments] = totalProgress.split('/').map(Number)

  return { name, segments, progress }
}
