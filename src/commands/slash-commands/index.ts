import { Client } from 'discord.js'
import { roll } from './roll'
import { clock } from './clock'
import { findClocks } from './clock/findClocks'
import { handleClockButtons } from './clock/handleClockButtons'

export function slashCommands(client: Client) {
  handleClockButtons(client)
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

      if (embeds.length > 0) {
        interaction.editReply({ embeds })
      } else {
        interaction.editReply({ content: 'No clocks found!' })
      }
    }

    if (commandName === 'clock') {
      await clock(interaction)
    }
  })
}
