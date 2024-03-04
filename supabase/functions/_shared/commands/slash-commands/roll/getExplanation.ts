import { User } from 'discord.js'

export const getExplanation = (quantity: number, user: User): string[] => {
  const isZero = quantity === 0
  return [
    `${user.username} rolled ${isZero ? 2 : quantity} D6`,
    `and took the ${isZero ? 'lowest' : 'highest'} result`
  ]
}
