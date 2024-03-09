import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"
import {
  APIApplicationCommandInteraction,
  InteractionResponseType,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"

import CampaignService from "../../../../../_shared/services/CampaignService.ts"
import { adminClient } from "../../../../../_shared/supabase/index.ts"

const handleInit = async (interaction: APIApplicationCommandInteraction) => {
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
    return json({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: error?.code === "23505"
          ? "This Server has already been registered!"
          : error || "Error creating campaign",
        flags: 1 << 6,
      },
    })
  }

  adminClient.functions.invoke("sync-campaign-with-discord", {
    body: { discord_guild_id },
  })

  const content = `Campaign Created! ${newCampaign.id}`
  return json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content,
      flags: 1 << 6,
    },
  })
}

export default handleInit
