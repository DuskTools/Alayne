import { Client, Events } from 'discord.js'
import { buildClockMessageOptions } from './buildClockMessageOptions'
import { extractClockInfoFromMessage } from './extractClockInfoFromMessage'

export const handleClockButtons = (client: Client) => {
  client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isButton()) return

    if (interaction.customId.startsWith('bitdclock')) {
      const { name, segments, progress } = extractClockInfoFromMessage(
        interaction.message
      )

      if (interaction.customId.startsWith('bitdclock--increment')) {
        const newProgress = progress + 1

        if (newProgress >= segments) {
          interaction.message.edit(
            buildClockMessageOptions(
              name,
              segments,
              segments,
              'A Completed Blades in the Darkscord clock'
            )
          )
          interaction.message.unpin()
          interaction.reply({
            content: `"${name}" Clock has been Completed! - **${segments}/${segments}**`
          })
          return
        }

        interaction.message.edit(
          buildClockMessageOptions(name, segments, newProgress)
        )
        interaction.reply({
          content: `${interaction.user} Incremeneted the "${name}" Clock - **${newProgress}/${segments}**`
        })
      }

      if (interaction.customId.startsWith('bitdclock--decrement')) {
        const newProgress = progress - 1

        if (newProgress < 0) {
          interaction.reply({
            content: `"${name}" Clock Cannot be reduced below 0`,
            ephemeral: true
          })
          return
        }
        interaction.message.edit(
          buildClockMessageOptions(name, segments, newProgress)
        )
        interaction.reply({
          content: `"${name}" Clock Decremented - **${newProgress}/${segments}**`
        })
      }

      if (interaction.customId.startsWith('bitdclock--stop')) {
        interaction.message.edit(
          buildClockMessageOptions(
            name,
            segments,
            progress,
            'A Stopped Blades in the Darkcord Clock'
          )
        )
        interaction.message.unpin()
        interaction.reply({ content: `"${name}" Clock has been Stopped!` })
      }
    }
  })
}
