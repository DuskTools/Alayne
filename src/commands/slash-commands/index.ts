import { Client } from 'discord.js'
import { roll } from './roll'
import { clock } from './clock'
import { handleClockButtons } from './handleClockButtons'
import { clocks } from './clocks'

export function slashCommands(client: Client) {
  handleClockButtons(client)

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const { commandName } = interaction

    if (commandName === 'roll') {
      roll(interaction)
    }

    if (commandName === 'clocks') {
      clocks(interaction)
    }

    if (commandName === 'clock') {
      await clock(interaction)
    }
  })
}
