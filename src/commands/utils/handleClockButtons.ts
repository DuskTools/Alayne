import { Client, Events } from 'discord.js'
import { buildClockMessageOptions } from '../slash-commands/clock/buildClockMessageOptions'
import { extractClockInfoFromMessage } from '../slash-commands/clock/extractClockInfoFromMessage'

export const handleClockButtons = async (client: Client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return

    if (interaction.customId.startsWith('bitdclock')) {
      const { name, segments, progress } = extractClockInfoFromMessage(
        interaction.message
      )

      if (interaction.customId.startsWith('bitdclock--increment')) {
        const newProgress = progress + 1

        if (newProgress >= segments) {
          await interaction.message.edit(
            buildClockMessageOptions(
              name,
              segments,
              segments,
              'A Completed Blades in the Darkscord clock'
            )
          )
          await interaction.message.unpin()
          await interaction.reply({
            content: `"${name}" clock completed - **${segments}/${segments}**`
          })
        } else {
          await interaction.message.edit(
            buildClockMessageOptions(name, segments, newProgress)
          )
          await interaction.reply({
            content: `"${name}" clock ticked down: **${newProgress}/${segments}**`
          })
        }
      }

      if (interaction.customId.startsWith('bitdclock--decrement')) {
        const newProgress = progress - 1

        if (newProgress < 0) {
          await interaction.reply({
            content: `"${name}" Clock Cannot be reduced below 0`,
            ephemeral: true
          })
        } else {
          await interaction.message.edit(
            buildClockMessageOptions(name, segments, newProgress)
          )
          await interaction.reply({
            content: `"${name}" clock ticked up: **${newProgress}/${segments}**`
          })
        }
      }

      if (interaction.customId.startsWith('bitdclock--stop')) {
        await interaction.message.edit(
          buildClockMessageOptions(
            name,
            segments,
            progress,
            'A Stopped Blades in the Darkcord Clock'
          )
        )
        await interaction.message.unpin()
        await interaction.reply({
          content: `"${name}" clock **Stopped**`
        })
      }

      if (interaction.customId.startsWith('bitdclock--start')) {
        await interaction.message.edit(
          buildClockMessageOptions(name, segments, progress)
        )
        await interaction.message.pin()
        await interaction.reply({
          content: `"${name}" clock **Restarted**`
        })
      }
    }
  })
}
