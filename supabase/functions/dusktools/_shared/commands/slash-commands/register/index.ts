import {
  APIApplicationCommandInteraction,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"

import CampaignService from "../../../../../_shared/services/CampaignService.ts"
import deferredResponse from "../../../deferredResponse.ts"

const handleRegister = (interaction: APIApplicationCommandInteraction) => {
  return deferredResponse(async () => {
    const application_id = interaction.application_id
    const interaction_token = interaction.token
    const discord_guild_id = interaction.guild_id!
    const discord_user_id = interaction.member?.user.id!

    const { user } = await CampaignService
      .registerUserForCampaign(
        discord_guild_id,
        { discord_id: discord_user_id! },
      )

    const content = `User registered with this campaign! ${user!.id}`
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

export default handleRegister
