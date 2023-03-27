import { ChatInputCommandInteraction } from 'discord.js'

export async function roll(interaction: ChatInputCommandInteraction) {
  const diceNum = interaction.options.getInteger('dice')
}
