import { Client } from 'discord.js'
import { roll } from './activate'

export function slashCommands(client: Client) {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const { commandName } = interaction

    if (commandName === 'roll') {
      roll(interaction)
    }
  })
}
