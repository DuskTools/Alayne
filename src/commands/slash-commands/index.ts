import { Client } from 'discord.js'
import { roll } from './roll/index'
import { clock } from './clock/index'
import { handleClockButtons } from './handleClockButtons/index'
import { clocks } from './clocks/index'

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
