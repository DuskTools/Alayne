import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"
import {
  APIApplicationCommandInteraction,
  InteractionResponseType,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"

import ClockService from "../../../../../_shared/services/ClockService.ts"
import CampaignService from "../../../../../_shared/services/CampaignService.ts"
import { buildClockMessageOptions } from "../utils/buildClockMessageOptions.ts"

const handleClocks = async (interaction: APIApplicationCommandInteraction) => {
  const discord_guild_id = interaction.guild_id!
  const campaign = await CampaignService.findByDiscordGuildId(
    { discord_guild_id },
  )
  if (!campaign) {
    return json({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content:
          "This Campaign has not been initialized! Use /init to initialize it.",
        flags: 1 << 6,
      },
    })
  }
  const clocks = await ClockService.getActiveClocks(campaign.id)
  const embeds = clocks.map((clockOptions) => {
    return buildClockMessageOptions(clockOptions).embeds[0]
  })

  const content = embeds.length > 0
    ? { embeds }
    : { content: "No clocks found!" }

  return json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      ...content,
      flags: 1 << 6,
    },
  })
}

export default handleClocks
