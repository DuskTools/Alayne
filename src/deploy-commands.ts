import { REST, SlashCommandBuilder, Routes } from 'discord.js'
import { config } from 'dotenv'
config()

const roll = new SlashCommandBuilder()
  .setName('roll')
  .setDescription('Roll a number of dice in the Blades in the Dark system')
  .addIntegerOption((option) =>
    option
      .setName('dice_pool')
      .setDescription('The number of dice to roll')
      .setMinValue(0)
      .setMaxValue(10)
      .setRequired(true)
  )

const clocks = new SlashCommandBuilder()
  .setName('clocks')
  .setDescription('Show all running clocks')

const clock = new SlashCommandBuilder()
  .setName('clock')
  .setDescription('Add a running clock')
  .addStringOption((option) =>
    option
      .setName('name')
      .setDescription('The name of the clock')
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName('segments')
      .setMinValue(4)
      .setMaxValue(12)
      .setDescription(
        'the maximum number of segments on the clock (4, 6, 8, or 12'
      )
      .setRequired(true)
  )

const commands = [roll, clock, clocks].map((command) => command.toJSON())

const rest = new REST({ version: '10' }).setToken(
  process.env.TOKEN || 'NO_TOKEN'
)

rest
  .put(Routes.applicationCommands(process.env.APP_ID || 'NO_APP_ID'), {
    body: commands
  })
  .catch(console.error)
