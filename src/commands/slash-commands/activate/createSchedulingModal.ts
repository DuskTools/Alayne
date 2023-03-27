import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalActionRowComponentBuilder
} from 'discord.js'

export const SchedulingModalId = 'gameScheduler'
export function createSchedulingModal() {
  const modal = new ModalBuilder()
    .setCustomId(SchedulingModalId)
    .setTitle('Schedule Game')

  const inputs = [
    new TextInputBuilder()
      .setCustomId('name')
      .setLabel('What is the Short name (role)')
      .setPlaceholder('Oct2022')
      .setStyle(TextInputStyle.Short)
      .setRequired(true),
    new TextInputBuilder()
      .setCustomId('date')
      .setLabel('What Date is the game?')
      .setPlaceholder('MM/DD/YY')
      .setStyle(TextInputStyle.Short)
      .setRequired(true),
    new TextInputBuilder()
      .setCustomId('startTime')
      .setLabel('When will the game kick-off?')
      .setPlaceholder('HH:MM AM')
      .setValue('10:00 AM')
      .setStyle(TextInputStyle.Short)
      .setRequired(true),
    new TextInputBuilder()
      .setCustomId('gameLocation')
      .setLabel('Location of event')
      .setPlaceholder('123 Main Street')
      .setStyle(TextInputStyle.Short)
      .setRequired(true),
    new TextInputBuilder()
      .setCustomId('description')
      .setLabel('Any Special description?')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false)
  ]
  const components = inputs.map((input) =>
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(input)
  )
  modal.addComponents(components)
  return modal
}
