import { Client, Events } from 'discord.js'
import { buildClockMessageOptions } from '../clock/buildClockMessageOptions'
import { extractClockInfoFromEmbed } from '../clock/extractClockInfoFromEmbed'

const clockNameLink = (name: string, link: string) => `[${name}](${link}) clock`
export const handleClockButtons = async (client: Client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return
    const link = interaction.message.url

    if (interaction.customId.startsWith('bitdclock')) {
      const { name, segments, progress } = extractClockInfoFromEmbed(
        interaction.message.embeds[0]
      )

      if (interaction.customId.startsWith('bitdclock--increment')) {
        const newProgress = progress + 1

        if (newProgress >= segments) {
          await interaction.message.edit(
            buildClockMessageOptions({
              name,
              segments,
              progress: segments,
              footerText: 'A Completed Blades in the Darkscord clock'
            })
          )
          await interaction.reply({
            content: `${clockNameLink(
              name,
              link
            )} completed - **${segments}/${segments}**`
          })
        } else {
          await interaction.message.edit(
            buildClockMessageOptions({
              name,
              segments,
              progress: newProgress
            })
          )
          await interaction.reply({
            content: `${clockNameLink(
              name,
              link
            )} ticked up: **${newProgress}/${segments}**`
          })
        }
      }

      if (interaction.customId.startsWith('bitdclock--decrement')) {
        const newProgress = progress - 1

        if (newProgress < 0) {
          await interaction.reply({
            content: `${clockNameLink(name, link)} cannot be reduced below 0`,
            ephemeral: true
          })
        } else {
          await interaction.message.edit(
            buildClockMessageOptions({
              name,
              segments,
              progress: newProgress
            })
          )
          await interaction.reply({
            content: `${clockNameLink(
              name,
              link
            )} ticked down: **${newProgress}/${segments}**`
          })
        }
      }

      if (interaction.customId.startsWith('bitdclock--stop')) {
        await interaction.message.edit(
          buildClockMessageOptions({
            name,
            segments,
            progress: progress,
            footerText: 'A Stopped Blades in the Darkcord Clock'
          })
        )
        await interaction.reply({
          content: `${clockNameLink(name, link)} **Stopped**`
        })
      }

      if (interaction.customId.startsWith('bitdclock--start')) {
        await interaction.message.edit(
          buildClockMessageOptions({
            name,
            segments,
            progress: progress
          })
        )
        await interaction.reply({
          content: `${clockNameLink(name, link)} **Restarted**`
        })
      }
    }
  })
}
