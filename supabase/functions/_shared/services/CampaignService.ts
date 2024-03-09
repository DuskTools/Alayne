import { adminClient } from "../supabase/index.ts"
import { Campaign } from "../supabase/types.ts"

const create = async (
  createParams: Campaign["Insert"],
): Promise<Campaign["Row"]> => {
  const { data, error } = await adminClient
    .from("campaigns")
    .insert(createParams)
    .select()
    .single()
  if (error) {
    console.log("Find or create user error")
    console.log(error)
  }

  return data!
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
    console.log("Update User Error")
    console.log(error)
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
    console.log("Find User Error")
    console.log(error)
  }

  return data
}

export default {
  findByDiscordGuildId,
  update,
  create,
}
