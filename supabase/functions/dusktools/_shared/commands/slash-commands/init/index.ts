import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"
import {
  APIApplicationCommandInteraction,
  InteractionResponseType,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"

import ClockService from "../../../../../_shared/services/ClockService.ts"
import CampaignService from "../../../../../_shared/services/CampaignService.ts"
import { buildClockMessageOptions } from "../utils/buildClockMessageOptions.ts"

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

  console.log(interaction)
  const content = "Testing"
  return json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content,
      flags: 1 << 6,
    },
  })
}

export default handleInit
