import supabase from '../supabase/index.js'

async function findOrCreateByDiscordId(discordGuildId: string) {
  const data = await findByDiscordId(discordGuildId)
  if (data) {
    return data
  }

  const { data: newData, error: createError } = await supabase.from('campaigns').insert({ discord_guild_id: discordGuildId }).select().single()
  if (createError) {
    throw new Error(createError.message)
  }

  return newData
}

async function findByDiscordId(discordGuildId: string) {
  const { data, error } = await supabase.from('campaigns').select().eq('discordGuildId', discordGuildId).limit(1).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export default { findOrCreateByDiscordId }
