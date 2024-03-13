import { adminClient } from "../supabase/index.ts"
import { User } from "../supabase/types.ts"

const create = async (createParams: User["Insert"]): Promise<User["Row"]> => {
  const { data, error } = await adminClient
    .from("users")
    .insert(createParams)
    .select()
    .single()
  if (error) {
    throw error
  }

  return data!
}

const update = async (
  id: User["Row"]["id"],
  updateParams: User["Update"],
): Promise<User["Row"]> => {
  const { data, error } = await adminClient
    .from("users")
    .update(updateParams)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data!
}

const findByDiscordId = async ({
  discord_id,
}: Pick<User["Row"], "discord_id">): Promise<User["Row"] | null> => {
  const { data, error } = await adminClient
    .from("users")
    .select()
    .eq("discord_id", discord_id)
    .maybeSingle()
  if (error) {
    throw error
  }

  return data
}

export default {
  findByDiscordId,
  create,
  update,
}
