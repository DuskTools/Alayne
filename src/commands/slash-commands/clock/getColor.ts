import { Colors } from 'discord.js'

export const getColor = (progress: number, segment: number) => {
  const ratio = progress / segment

  switch (true) {
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
