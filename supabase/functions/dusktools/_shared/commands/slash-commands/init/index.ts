import {
  APIApplicationCommandInteraction,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"

import CampaignService from "../../../../../_shared/services/CampaignService.ts"
import { adminClient } from "../../../../../_shared/supabase/index.ts"
import deferredResponse from "../../../deferredResponse.ts"

const handleInit = (interaction: APIApplicationCommandInteraction) => {
  return deferredResponse(async () => {
    const application_id = interaction.application_id
    const interaction_token = interaction.token
    const discord_guild_id = interaction.guild_id!
    const discord_user_id = interaction.member?.user.id!
    const notification_channel =
      (interaction.data as unknown as { options: [{ value: string }] }).options
        ?.[0]?.value

    const { campaign: newCampaign, error, joinError } = await CampaignService
      .create({
        discord_guild_id,
        notification_channel,
        name: "TEMP = " + discord_guild_id,
      }, { discord_id: discord_user_id! })

    if (error || joinError) {
      return {
        application_id,
        interaction_token,
        body: {
          content: error?.code === "23505"
            ? "This Server has already been registered!"
            : error || "Error creating campaign",
          flags: 1 << 6,
        },
      }
    }

    adminClient.functions.invoke("sync-campaign-with-discord", {
      body: { discord_guild_id },
    })

    const content = `Campaign Created! ${newCampaign.id}`
    return {
      application_id,
      interaction_token,
      body: {
        content,
        flags: 1 << 6,
      },
    }
  }, true)
}

export default handleInit
