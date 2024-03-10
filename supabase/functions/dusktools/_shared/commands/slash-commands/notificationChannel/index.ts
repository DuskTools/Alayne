import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"
import {
  APIApplicationCommandInteraction,
  InteractionResponseType,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"

import CampaignService from "../../../../../_shared/services/CampaignService.ts"

const handleNotificationChannel = async (
  interaction: APIApplicationCommandInteraction,
) => {
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
    return json({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: "Server not initialized. Please run /init first.",
        flags: 1 << 6,
      },
    })
  }

  const content = "Notification Channel Updated!"
  return json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content,
      flags: 1 << 6,
    },
  })
}

export default handleNotificationChannel
