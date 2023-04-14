import { Embed } from 'discord.js'
import { ClockOptions } from '../clock/types'

type ExtractedClockOptions = Omit<ClockOptions, 'progress'> & {
  progress: number
}
export const extractClockInfoFromEmbed = (
  embed: Embed
): ExtractedClockOptions => {
  const name = String(embed.title)
  const totalProgress = embed.fields.find(
    ({ name }) => name === 'Progress'
  )?.value
  const link = embed.fields.find(({ name }) => name === ' ')?.value
  const footerText = embed.footer?.text
  if (!totalProgress) {
    throw new Error('Could not find progress')
  }
  const [progress, segments] = totalProgress.split('/').map(Number)

  return { name, segments, progress, link, footerText }
}
