import { Client } from 'discord.js'
import { roll } from './roll/index.js'
import { clock } from './clock/index.js'
import { handleClockButtons } from './handleClockButtons/index.js'
import { clocks } from './clocks/index.js'

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
