import { REST } from "npm:@discordjs/rest"

export default new REST({ version: "10" }).setToken(
  Deno.env.get("DISCORD_BOT_TOKEN")!,
)
