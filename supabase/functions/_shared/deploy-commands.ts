import { REST, Routes, SlashCommandBuilder } from "npm:discord.js"
import { load } from "https://deno.land/std@0.219.0/dotenv/mod.ts"
import { SlashCommands } from "./types.ts"

const env = await load()

const roll = new SlashCommandBuilder()
  .setName(SlashCommands.Roll)
  .setDescription("Roll some dice. Test your luck.")
  .addIntegerOption((option) =>
    option
      .setName("dice_pool")
      .setDescription("The number of dice to roll")
      .setMinValue(0)
      .setMaxValue(10)
      .setRequired(true)
  )

const init = new SlashCommandBuilder()
  .setName(SlashCommands.Init)
  .setDescription("Setup DuskTools in the Server")
  .addChannelOption((option) =>
    option
      .setName("notification_channel")
      .setDescription("The channel to send notifications to")
      .setRequired(true)
  )

const register = new SlashCommandBuilder()
  .setName(SlashCommands.Register)
  .setDescription("Register yourself with DuskTools")

const notifications = new SlashCommandBuilder()
  .setName(SlashCommands.Notifications)
  .setDescription("Register a new Notification Channel")
  .addChannelOption((option) =>
    option
      .setName("notification_channel")
      .setDescription("The channel to send notifications to")
      .setRequired(true)
  )

const clocks = new SlashCommandBuilder()
  .setName(SlashCommands.Clocks)
  .setDescription("Show all running clocks")

const commands = [roll, clocks, init, notifications, register].map((command) =>
  command.toJSON()
)

const DISCORD_BOT_TOKEN = env["DISCORD_BOT_TOKEN"] ||
  Deno.env.get("DISCORD_BOT_TOKEN")
const DISCORD_APP_ID = env["DISCORD_APP_ID"] || Deno.env.get("DISCORD_APP_ID")

if (!DISCORD_APP_ID) {
  throw ("DISCORD_APP_ID is not set")
}
if (!DISCORD_BOT_TOKEN) {
  throw ("DISCORD_BOT_TOKEN is not set")
}

const rest = new REST({ version: "10" }).setToken(
  DISCORD_BOT_TOKEN,
)
rest
  .put(Routes.applicationCommands(DISCORD_APP_ID!), {
    body: commands,
  })
  .catch(console.error)
