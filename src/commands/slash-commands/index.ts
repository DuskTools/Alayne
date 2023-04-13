import { Client } from 'discord.js'
import { roll } from './roll'
import { clock } from './clock'
import { findClocks } from './clock/findClocks'

export function slashCommands(client: Client) {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const { commandName } = interaction

    if (commandName === 'roll') {
      roll(interaction)
    }

    if (commandName === 'clocks') {
      await interaction.deferReply({ ephemeral: true })
      const clocks = await findClocks(interaction)

      const embeds = clocks.map((clock) => clock.embeds[0])

      interaction.editReply({ embeds })
    }

    if (commandName === 'clock') {
      await clock(interaction)
    }
  })
}
