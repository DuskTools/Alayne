import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"
import {
  APIApplicationCommandInteraction,
  InteractionResponseType,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"

import { REST } from "npm:@discordjs/rest"
import { Routes } from "npm:@discordjs/rest"
import CampaignService from "../../../../../_shared/services/CampaignService.ts"

const handleInit = async (interaction: APIApplicationCommandInteraction) => {
  const discord_guild_id = interaction.guild_id!
  console.log(discord_guild_id)
  const campaign = await CampaignService.findByDiscordGuildId(
    { discord_guild_id },
  )

  if (campaign) {
    return json({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: "This Campaign has already initialized",
        flags: 1 << 6,
      },
    })
  }

  const discordRest = new REST({ version: "10" }).setToken(
    Deno.env.get("DISCORD_BOT_TOKEN")!,
  )

  try {
    const foo = await discordRest.get(Routes.guild(discord_guild_id))

    console.log(foo)
    const content = "Testing"
    return json({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content,
        flags: 1 << 6,
      },
    })
  } catch (e) {
    console.error(e)
  }
}

export default handleInit
