import {
  APIApplicationCommandInteraction,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"

import CampaignService, {
  CampaignError,
} from "../../../../../_shared/services/CampaignService.ts"
import deferredResponse from "../../../deferredResponse.ts"

const handleRegister = (interaction: APIApplicationCommandInteraction) => {
  return deferredResponse(async () => {
    const application_id = interaction.application_id
    const interaction_token = interaction.token
    const discord_guild_id = interaction.guild_id!
    const discord_user_id = interaction.member?.user.id!
    const discordUser = interaction.member?.user

    try {
      const { user } = await CampaignService
        .registerUserForCampaign(
          discord_guild_id,
          {
            discord_id: discord_user_id!,
            avatar_url: discordUser?.avatar!,
            email: discordUser?.email!,
          },
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
    } catch (error) {
      console.error(error)
      if (error.code === CampaignError.NO_CAMPAIGN) {
        return {
          application_id,
          interaction_token,
          body: {
            content: "Your DM needs to run `/init` before you can register!",
            flags: 1 << 6,
          },
        }
      }
      if (error.code === "23505") {
        return {
          application_id,
          interaction_token,
          body: {
            content: "You are already registered with this campaign!",
            flags: 1 << 6,
          },
        }
      }

      return {
        application_id,
        interaction_token,
        body: {
          content:
            "There was an error registering this user. Please try again.",
          flags: 1 << 6,
        },
      }
    }
  }, true)
}

export default handleRegister
