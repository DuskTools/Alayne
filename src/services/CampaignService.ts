import supabase from '../supabase/index.js'

async function findOrCreateByDiscordId(discordGuildId: string) {
  const { data, error } = await supabase.from('campaigns').upsert({ discord_guild_id: discordGuildId }).select().single()
  if (error) {
    throw new Error(error.message)
  }

  return data
}

async function findByDiscordId(discordGuildId: string) {
  const { data, error } = await supabase.from('campaigns').select().eq('discord_guild_id', discordGuildId).limit(1).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export default { findOrCreateByDiscordId }
