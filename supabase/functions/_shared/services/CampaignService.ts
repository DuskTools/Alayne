import { adminClient } from "../supabase/index.ts"
import { Campaign, User } from "../supabase/types.ts"
import UserService from "./UserService.ts"

const create = async (
  createParams: Campaign["Insert"],
  userParams: Pick<User["Row"], "discord_id">,
): Promise<Campaign["Row"]> => {
  const { data: campaign, error } = await adminClient
    .from("campaigns")
    .insert(createParams)
    .select()
    .single()

  if (error) {
    throw error
  }

  const user = await UserService.findByDiscordId(
    userParams,
  )

  const { error: joinError } = await adminClient
    .from("campaign_user")
    .insert({ campaign_id: campaign!.id, user_id: user!.id, admin: true })
    .select()
    .single()

  if (joinError) {
    throw joinError
  }

  return campaign!
}

const update = async (
  id: Campaign["Row"]["id"],
  updateParams: Campaign["Update"],
): Promise<Campaign["Row"]> => {
  const { data, error } = await adminClient
    .from("campaigns")
    .update(updateParams)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data!
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
  findByDiscordGuildId,
  update,
  create,
}
