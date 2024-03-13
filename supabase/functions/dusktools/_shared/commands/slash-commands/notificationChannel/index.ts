import {
  APIApplicationCommandInteraction,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"

import CampaignService from "../../../../../_shared/services/CampaignService.ts"
import deferredResponse from "../../../deferredResponse.ts"

const handleNotificationChannel = async (
  interaction: APIApplicationCommandInteraction,
) => {
  return deferredResponse(async () => {
    const application_id = interaction.application_id
    const interaction_token = interaction.token

    const discord_guild_id = interaction.guild_id!
    const notification_channel =
      (interaction.data as unknown as { options: [{ value: string }] }).options
        ?.[0]?.value

    const { error } = await CampaignService
      .update(
        discord_guild_id,
        { notification_channel },
      )

    if (error) {
      return {
        application_id,

        interaction_token,
        body: {
          content: "Server not initialized. Please run /init first.",
        },
      }
    }

    const content = "Notification Channel Updated!"
    return {
      application_id,
      interaction_token,
      body: {
        content,
      },
    }
  }, true)
}

export default handleNotificationChannel
