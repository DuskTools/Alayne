import { Client, Events } from 'discord.js'
import { handleIncrement } from './handleIncrement'
import { handleDecrement } from './handleDecrement'
import { handleStop } from './handleStop'
import { handleRestart } from './handleRestart'

export const handleClockButtons = async (client: Client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return

    if (interaction.customId.startsWith('bitdclock--increment')) {
      handleIncrement(interaction)
    }

    if (interaction.customId.startsWith('bitdclock--decrement')) {
      handleDecrement(interaction)
    }

    if (interaction.customId.startsWith('bitdclock--stop')) {
      handleStop(interaction)
    }

    if (interaction.customId.startsWith('bitdclock--start')) {
      handleRestart(interaction)
    }
  })
}
