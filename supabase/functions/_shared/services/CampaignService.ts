import { adminClient } from "../supabase/index.ts"
import { Campaign, User } from "../supabase/types.ts"
import UserService from "./UserService.ts"

export enum CampaignError {
  NO_CAMPAIGN,
  NO_USER,
}

const create = async (
  createParams: Campaign["Insert"],
  userParams: Pick<User["Row"], "discord_id">,
  nickname: string,
) => {
  const { data: campaign, error } = await adminClient
    .from("campaigns")
    .insert(createParams)
    .select()
    .single()

  if (error) {
    return { error }
  }

  const user = await UserService.findByDiscordId(
    userParams,
  )

  const { error: joinError } = await adminClient
    .from("campaign_user")
    .insert({
      campaign_id: campaign!.id,
      user_id: user!.id,
      admin: true,
      nickname,
    })
    .select()
    .single()

  if (joinError) {
    return { joinError }
  }

  return { campaign: campaign! }
}

const update = async (
  discord_guild_id: Campaign["Row"]["discord_guild_id"],
  updateParams: Campaign["Update"],
) =>
  await adminClient
    .from("campaigns")
    .update(updateParams)
    .eq("discord_guild_id", discord_guild_id)
    .select()
    .single()

const registerUserForCampaign = async (
  discord_guild_id: Campaign["Row"]["discord_guild_id"],
  userParams: User["Insert"],
  nickname: string,
) => {
  const campaign = await findByDiscordGuildId({ discord_guild_id })

  if (!campaign) {
    throw { code: CampaignError.NO_CAMPAIGN }
  }

  const user = await UserService.create(userParams)

  if (!user) {
    throw { code: CampaignError.NO_CAMPAIGN }
  }

  const { error: joinError } = await adminClient
    .from("campaign_user")
    .insert({
      campaign_id: campaign.id,
      user_id: user!.id,
      admin: false,
      nickname,
    })
    .select()
    .single()

  if (joinError) {
    throw joinError
  }
  return { user }
}

const findByDiscordGuildId = async ({
  discord_guild_id,
}: Pick<Campaign["Row"], "discord_guild_id">): Promise<
  Campaign["Row"] | null
> => {
  const { data, error } = await adminClient
    .from("campaigns")
    .select()
    .eq("discord_guild_id", discord_guild_id)
    .maybeSingle()
  if (error) {
    throw error
  }

  return data
}

export default {
  registerUserForCampaign,
  findByDiscordGuildId,
  update,
  create,
}
