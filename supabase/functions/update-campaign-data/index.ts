import { json, serve } from "https://deno.land/x/sift@0.6.0/mod.ts"
import { adminClient } from "../_shared/supabase/index.ts"

import { REST } from "npm:@discordjs/rest"
import { Routes } from "npm:discord-api-types/v10"

serve({
  "/update-campaign-data": updateCampaignData,
})

async function updateCampaignData(request: Request) {
  const { discord_guild_id } = await request.json() as {
    discord_guild_id: string
  }

  const discordRest = new REST({ version: "10" }).setToken(
    Deno.env.get("DISCORD_BOT_TOKEN")!,
  )

  const { name } = await discordRest.get(Routes.guild(discord_guild_id)) as {
    name: string
  }

  const { error } = await adminClient
    .from("campaigns")
    .update({ name })
    .eq(
      "discord_guild_id",
      discord_guild_id,
    )

  if (error) throw error

  return json({ message: "Campaign Updated" }, { status: 200 })
}
