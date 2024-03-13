import { json, serve } from "https://deno.land/x/sift@0.6.0/mod.ts"
import { adminClient } from "../_shared/supabase/index.ts"

import { Routes } from "npm:discord-api-types/v10"
import discordRest from "../dusktools/_shared/discordRest.ts"
import corsResponse from "../dusktools/_shared/corsResponse.ts"

serve({
  "/sync-campaign-with-discord": syncCampaignWithDiscord,
})

async function syncCampaignWithDiscord(request: Request) {
  if (request.method === "OPTIONS") {
    return corsResponse()
  }
  const { discord_guild_id } = await request.json() as {
    discord_guild_id: string
  }

  const { name } = await discordRest.get(Routes.guild(discord_guild_id)) as {
    name: string
  }
  console.log({ name })
  console.log({ discord_guild_id })

  const { data, error } = await adminClient
    .from("campaigns")
    .update({ name })
    .eq(
      "discord_guild_id",
      discord_guild_id,
    )

  if (error) throw error

  return json({ data }, { status: 200 })
}
