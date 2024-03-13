import {
  APIApplicationCommandInteraction,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"

import ClockService from "../../../../../_shared/services/ClockService.ts"
import CampaignService from "../../../../../_shared/services/CampaignService.ts"
import { buildClockMessageOptions } from "../utils/buildClockMessageOptions.ts"
import deferredResponse from "../../../deferredResponse.ts"

const handleClocks = (interaction: APIApplicationCommandInteraction) => {
  return deferredResponse(async () => {
    const application_id = interaction.application_id
    const interaction_token = interaction.token
    const discord_guild_id = interaction.guild_id!
    const campaign = await CampaignService.findByDiscordGuildId(
      { discord_guild_id },
    )
    if (!campaign) {
      return {
        application_id,
        interaction_token,
        body: {
          content:
            "This Campaign has not been initialized! Use /init to initialize it.",
          flags: 1 << 6,
        },
      }
    }
    const clocks = await ClockService.getActiveClocks(campaign.id)
    const embeds = clocks.map((clockOptions) => {
      return buildClockMessageOptions(clockOptions).embeds[0]
    })

    const content = embeds.length > 0
      ? { embeds }
      : { content: "No clocks found!" }

    return {
      application_id,
      interaction_token,
      body: {
        ...content,
        flags: 1 << 6,
      },
    }
  }, true)
}

export default handleClocks
