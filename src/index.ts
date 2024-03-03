import { Client, GatewayIntentBits, Partials } from 'discord.js'
import { config } from 'dotenv'
import { slashCommands } from './commands/slash-commands/index.js'

config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction]
})

client.once('ready', () => {
  console.log('Ready!')
})

slashCommands(client)

client.login(process.env.TOKEN)
