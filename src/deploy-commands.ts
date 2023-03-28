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

const commands = [roll].map((command) => command.toJSON())

const rest = new REST({ version: '10' }).setToken(
  process.env.TOKEN || 'NO_TOKEN'
)

rest
  .put(Routes.applicationCommands(process.env.APP_ID || 'NO_APP_ID'), {
    body: commands
  })
  .catch(console.error)
